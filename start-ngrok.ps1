# ==============================================================
# start-ngrok.ps1 - School Records Ngrok Launcher
# Run: .\start-ngrok.ps1
# ==============================================================

# Force UTF-8 output to avoid encoding issues
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

$NGROK_DOMAIN = "gauze-broaden-awkward.ngrok-free.dev"
$NGROK_URL    = "https://$NGROK_DOMAIN"
$ENV_FILE     = ".env"
$COMPOSE_BASE = "docker-compose.prod.yml"
$COMPOSE_NGROK= "docker-compose.ngrok.yml"

function Write-Step { param($msg) Write-Host "  >> $msg" -ForegroundColor Cyan }
function Write-OK   { param($msg) Write-Host "  [OK] $msg" -ForegroundColor Green }
function Write-Warn { param($msg) Write-Host "  [!!] $msg" -ForegroundColor Yellow }
function Write-Fail { param($msg) Write-Host "  [ERR] $msg" -ForegroundColor Red }
function Write-Div  { Write-Host ("=" * 50) -ForegroundColor DarkGray }

Write-Host ""
Write-Div
Write-Host "  School Records -- Ngrok Tunnel Launcher" -ForegroundColor Cyan
Write-Div
Write-Host ""

# --- Step 1: Check .env ---
Write-Step "Checking .env file..."
if (-not (Test-Path $ENV_FILE)) {
    Write-Fail ".env not found! Copy .env.example to .env first."
    exit 1
}
Write-OK ".env found"

# --- Step 2: Validate NGROK_AUTHTOKEN ---
Write-Step "Validating NGROK_AUTHTOKEN..."
$envLines = Get-Content $ENV_FILE -Encoding UTF8
$tokenLine = $envLines | Where-Object { $_ -match "^NGROK_AUTHTOKEN\s*=" } | Select-Object -First 1
$ngrokToken = ($tokenLine -split "=", 2)[1].Trim()

if ([string]::IsNullOrWhiteSpace($ngrokToken) -or $ngrokToken -eq "your_ngrok_authtoken_here") {
    Write-Fail "NGROK_AUTHTOKEN is not set in .env"
    Write-Host ""
    Write-Host "    1. Go to: https://dashboard.ngrok.com/get-started/your-authtoken" -ForegroundColor Yellow
    Write-Host "    2. Copy your authtoken" -ForegroundColor Yellow
    Write-Host "    3. Set it in .env:  NGROK_AUTHTOKEN=<your_token>" -ForegroundColor Yellow
    Write-Host ""
    exit 1
}
Write-OK "NGROK_AUTHTOKEN is set"

# --- Step 3: Start containers ---
Write-Host ""
Write-Step "Starting all services (this may rebuild images)..."
Write-Host ""
docker compose -f $COMPOSE_BASE -f $COMPOSE_NGROK up -d --build

if ($LASTEXITCODE -ne 0) {
    Write-Fail "docker compose failed. Check the output above."
    exit 1
}

# --- Step 4: Wait for ngrok to connect ---
Write-Host ""
Write-Step "Waiting for ngrok tunnel to establish..."
$maxRetries = 15
$retryCount = 0
$tunnelActive = $false

while ($retryCount -lt $maxRetries) {
    try {
        $result = Invoke-RestMethod -Uri "http://localhost:4040/api/tunnels" `
                                    -ErrorAction Stop `
                                    -TimeoutSec 2
        $httpsUrl = $result.tunnels | Where-Object { $_.proto -eq "https" } |
                    Select-Object -ExpandProperty public_url -First 1
        if ($httpsUrl) {
            $tunnelActive = $true
            break
        }
    } catch {}
    $retryCount++
    Write-Host "    Waiting... ($retryCount/$maxRetries)" -ForegroundColor DarkGray
    Start-Sleep -Seconds 2
}

# --- Step 5: Print result ---
Write-Host ""
Write-Div
if ($tunnelActive) {
    Write-Host "  TUNNEL ACTIVE!" -ForegroundColor Green
    Write-Host ""
    Write-Host "  Public URL  : $NGROK_URL"     -ForegroundColor Cyan
    Write-Host "  API Endpoint: $NGROK_URL/api"  -ForegroundColor Cyan
    Write-Host "  Ngrok UI    : http://localhost:4040" -ForegroundColor Cyan
    Write-Host ""
    Write-OK "Share the Public URL above with the remote machine."
} else {
    Write-Warn "Could not auto-detect tunnel URL. Check manually:"
    Write-Host "    docker logs school-records-ngrok"  -ForegroundColor Gray
    Write-Host "    http://localhost:4040"             -ForegroundColor Gray
}
Write-Div
Write-Host ""
Write-Host "  To stop: docker compose -f $COMPOSE_BASE -f $COMPOSE_NGROK down" -ForegroundColor DarkGray
Write-Host ""
