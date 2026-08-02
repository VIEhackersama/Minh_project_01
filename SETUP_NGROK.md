# Ngrok Remote Access — Setup & Startup Guide

## Overview

This project uses Ngrok to expose the local stack to remote machines.
The application runs entirely on **this machine** — Ngrok is only a tunnel.

```
Remote Browser
     │ HTTPS
     ▼
Ngrok Cloud  ──tunnel──►  Nginx (port 80)  ──►  Frontend (3000)
                                           └──►  Backend  (8080)
```

**Public URL (static, never changes):**
```
https://gauze-broaden-awkward.ngrok-free.dev
```

**API endpoint:**
```
https://gauze-broaden-awkward.ngrok-free.dev/api
```

---

## Files Involved

| File | Purpose |
|------|---------|
| `docker-compose.prod.yml` | Main stack: DB, MinIO, Backend, Frontend, Nginx |
| `docker-compose.ngrok.yml` | Ngrok tunnel service (override) |
| `start-ngrok.ps1` | One-click launcher script |
| `.env` | Contains `NGROK_AUTHTOKEN` and CORS config |

---

## Startup Procedure

### After every machine restart or Docker restart

**Step 1 — Open PowerShell in the project directory:**
```powershell
cd C:\Users\Admin\Documents\GitHub\Minh_project_01
```

**Step 2 — Run the launcher:**
```powershell
.\start-ngrok.ps1
```

The script will:
- Validate `NGROK_AUTHTOKEN` in `.env`
- Start all containers (`--build` only rebuilds if source changed)
- Wait for the tunnel to establish
- Print the public URL and confirm it is live

**Step 3 — Verify tunnel is active (look for this line):**
```
  TUNNEL ACTIVE!
  Public URL  : https://gauze-broaden-awkward.ngrok-free.dev
```

---

## Manual Commands (if script fails)

```powershell
# Start full stack + ngrok
docker compose -f docker-compose.prod.yml -f docker-compose.ngrok.yml up -d

# Check all containers are running
docker compose -f docker-compose.prod.yml -f docker-compose.ngrok.yml ps

# Check ngrok tunnel log
docker logs school-records-ngrok --tail 20

# Check tunnel via local API
Invoke-RestMethod http://localhost:4040/api/tunnels | ConvertTo-Json
```

---

## Container Health Check

All 6 containers must be `Up` before the tunnel works:

| Container | Expected Status |
|-----------|----------------|
| `school-records-db-prod` | `Up (healthy)` |
| `school-records-minio-prod` | `Up (healthy)` |
| `school-records-backend-prod` | `Up` |
| `school-records-frontend-prod` | `Up` |
| `school-records-nginx-prod` | `Up` |
| `school-records-ngrok` | `Up` |

Check with:
```powershell
docker ps --format "table {{.Names}}`t{{.Status}}"
```

---

## Troubleshooting

### Tunnel not connecting
```powershell
# Restart only the ngrok container
docker restart school-records-ngrok

# Then check logs
docker logs school-records-ngrok --tail 30
```

Look for this line in logs (means tunnel is active):
```
started tunnel ... url=https://gauze-broaden-awkward.ngrok-free.dev
```

### Backend not starting (crash loop)
DB may not be ready yet. Wait 30 seconds, then:
```powershell
docker restart school-records-backend-prod
docker logs school-records-backend-prod --tail 30
```

### CORS errors in browser
The backend must have the ngrok domain in its CORS list.
Check `.env` — `CORS_ALLOWED_ORIGINS_NGROK` must include the ngrok URL:
```
CORS_ALLOWED_ORIGINS_NGROK=http://localhost,http://localhost:3000,http://127.0.0.1,https://gauze-broaden-awkward.ngrok-free.dev
```
Then restart backend:
```powershell
docker restart school-records-backend-prod
```

### Remote browser shows "Visit Site" warning page
This is a Ngrok free-tier interstitial. The remote user must click "Visit Site" once.
To skip it programmatically, add header: `ngrok-skip-browser-warning: true`

### Full reset (nuclear option)
```powershell
docker compose -f docker-compose.prod.yml -f docker-compose.ngrok.yml down
docker compose -f docker-compose.prod.yml -f docker-compose.ngrok.yml up -d --build
```

---

## Stop the Tunnel

```powershell
docker compose -f docker-compose.prod.yml -f docker-compose.ngrok.yml down
```

To stop only the tunnel (keep app running locally):
```powershell
docker stop school-records-ngrok
```

---

## Key Facts for Agents

- The **Ngrok authtoken** is in `.env` under `NGROK_AUTHTOKEN`. Do not regenerate it.
- The **static domain** is `gauze-broaden-awkward.ngrok-free.dev` — it never changes as long as the same Ngrok account is used.
- `NEXT_PUBLIC_API_URL` is baked into the frontend image at build time as `/api` (relative). Do not change it.
- The `--url` flag in `docker-compose.ngrok.yml` binds the tunnel to the static domain.
- `restart: unless-stopped` means containers auto-start after Docker daemon restarts, but **not after machine sleep/hibernate** — manual `.\start-ngrok.ps1` is required.
- Ngrok Web Inspector (traffic viewer): http://localhost:4040
