<!-- Dashboard Quản trị -->
<!DOCTYPE html><html lang="vi"><head><meta charset="utf-8"><meta content="width=device-width, initial-scale=1.0" name="viewport"><link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet"><script src="https://cdn.tailwindcss.com"></script></head><body class="bg-canvas-white font-body-base text-on-surface"><aside class="fixed left-0 top-0 h-full w-[280px] bg-charcoal-ink z-50 flex flex-col shadow-xl"><div class="p-8 mb-4 flex items-center gap-3"><img alt="School Logo" class="h-10 w-auto object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpMbZCuyFP9B7rvjyQ_38EbvjBtJc2soSJMu46eeRNdMe2k-t5qucw8ipWPe0-w7FRa2g0XwQMqf_cbKuvhkJxExfmSdxl7xsXABb0kkHGcOiu7PLCwlpLtYRBi33-E1Ccogx8efgthBKRRWgNFV-RVGbehqRkgv1bBPad9itS44dP5bYbX7TjE9k0_H8C1Pq_nabfCS1qOMfhHoGGfOPJ1tpkYpvlyR1IB4ykQYah5K5KldDTpNu1Msb6DGbgcuBelezRWuh-_Wc"><span class="text-white font-headline-lg text-headline-md tracking-tight">EduArchive</span></div><nav class="flex-1 px-4 space-y-1" data-active-classes="bg-primary-container text-on-primary-container font-semibold rounded-xl"><a aria-current="page" class="flex items-center px-4 py-3 transition-all duration-200 group bg-primary-container text-on-primary-container font-semibold rounded-xl" data-path="dashboard" href="#"><span class="material-symbols-outlined mr-4 opacity-70 group-hover:opacity-100" data-original-icon="dashboard">dashboard</span>Dashboard</a><a class="flex items-center px-4 py-3 text-secondary-fixed hover:bg-white/5 hover:text-white rounded-xl transition-all duration-200 group" data-path="quan-ly-ho-so" href="#"><span class="material-symbols-outlined mr-4 opacity-70 group-hover:opacity-100" data-original-icon="folder_open">folder_open</span>Quản lý Hồ sơ</a><a class="flex items-center px-4 py-3 text-secondary-fixed hover:bg-white/5 hover:text-white rounded-xl transition-all duration-200 group" data-path="muon-tra" href="#"><span class="material-symbols-outlined mr-4 opacity-70 group-hover:opacity-100" data-original-icon="assignment_return">assignment_return</span>Mượn trả</a><a class="flex items-center px-4 py-3 text-secondary-fixed hover:bg-white/5 hover:text-white rounded-xl transition-all duration-200 group" data-path="bao-cao" href="#"><span class="material-symbols-outlined mr-4 opacity-70 group-hover:opacity-100">analytics</span>Báo cáo</a><a class="flex items-center px-4 py-3 text-secondary-fixed hover:bg-white/5 hover:text-white rounded-xl transition-all duration-200 group" data-path="quan-tri-he-thong" href="#"><span class="material-symbols-outlined mr-4 opacity-70 group-hover:opacity-100">settings</span>Hệ thống</a></nav><div class="mt-auto p-4 mx-4 mb-8 bg-white/5 rounded-2xl border border-white/10"><div class="flex items-center gap-3 mb-4"><img alt="Profile" class="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPxZCkCqEdxnSzr3u1rq52Npp8s-aWlblCs32Kiexcg5xwl8aaHoiZvee7Auz2LFNy2QAroCujn6vfTuXHbQvZ3bmYKPsTtp8IQEOedyQE9pR9IHXEccLkgqHa9Bu2iiq8-XGVFpGpdvyxzFaXE-1VKqzwKW94IvunR4WM1nPaSEh5vLGyQ2wMNbfYBb21SNlrnKqx8kwBNoI-qLMF6nLW2zXWLoLhDXLj-26zfepg43IGSGSK7VX5stHuOUD6zY9Ow1HeC0Lb2QU"><div class="overflow-hidden"><p class="text-white text-sm font-semibold truncate">Admin User</p><p class="text-secondary-fixed-dim text-xs truncate">Quản trị viên</p></div></div><button class="w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-danger-red hover:bg-danger-red/10 rounded-lg transition-colors"><span class="material-symbols-outlined text-sm">logout</span>Đăng xuất</button></div></aside><div class="pl-[280px] min-h-screen flex flex-col"><header class="sticky top-0 h-20 bg-pure-surface/80 backdrop-blur-xl z-40 border-b border-whisper-border px-10 flex items-center justify-between"><div class="flex items-center gap-6 flex-1 max-w-2xl"><div class="relative w-full"><span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span><input class="w-full pl-12 pr-4 py-2.5 bg-surface-container-low border-none rounded-full text-body-sm focus:ring-2 focus:ring-primary/20 focus:bg-pure-surface transition-all" placeholder="Tìm kiếm hồ sơ, học sinh..." type="text"></div></div><div class="flex items-center gap-6"><button class="relative p-2 text-on-surface-variant hover:bg-surface-container rounded-full transition-colors"><span class="material-symbols-outlined" data-original-icon="notifications">notifications</span><span class="absolute top-2 right-2 w-2 h-2 bg-danger-red rounded-full ring-2 ring-pure-surface"></span></button><button class="flex items-center gap-2 px-6 py-2.5 bg-primary text-on-primary rounded-full font-semibold shadow-lg shadow-primary/20 hover:bg-primary-container hover:scale-[1.02] transition-all"><span class="material-symbols-outlined text-lg" data-original-icon="add_circle">add_circle</span><span>Tạo mới Hồ sơ</span></button></div></header><main class="flex-1 p-content-padding-desktop"><div class="flex flex-col w-full gap-8">
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
<div class="relative overflow-hidden bg-surface-container rounded-2xl p-6 shadow-sm group">
<div class="absolute -right-6 -top-6 w-24 h-24 bg-primary/10 rounded-full blur-xl group-hover:bg-primary/20 transition-colors duration-500"></div>
<div class="flex justify-between items-start mb-4 relative z-10">
<div>
<p class="font-mono-label text-mono-label text-on-surface-variant uppercase tracking-wider mb-1">Total Records</p>
<h2 class="font-headline-xl text-headline-xl text-on-surface">1,248</h2>
</div>
<div class="p-3 bg-primary text-on-primary rounded-xl shadow-md shadow-primary/20">
<span class="material-symbols-outlined text-[24px]">folder_copy</span>
</div>
</div>
<div class="flex items-center gap-2 text-success-green relative z-10">
<span class="material-symbols-outlined text-[16px]">trending_up</span>
<span class="font-body-sm text-body-sm font-medium">+12% from last month</span>
</div>
</div>
<div class="relative overflow-hidden bg-surface-container rounded-2xl p-6 shadow-sm group">
<div class="absolute -right-6 -top-6 w-24 h-24 bg-warning-orange/10 rounded-full blur-xl group-hover:bg-warning-orange/20 transition-colors duration-500"></div>
<div class="flex justify-between items-start mb-4 relative z-10">
<div>
<p class="font-mono-label text-mono-label text-on-surface-variant uppercase tracking-wider mb-1">Active Loans</p>
<h2 class="font-headline-xl text-headline-xl text-on-surface">85</h2>
</div>
<div class="p-3 bg-warning-orange text-white rounded-xl shadow-md shadow-warning-orange/20">
<span class="material-symbols-outlined text-[24px]">swap_horiz</span>
</div>
</div>
<div class="flex items-center gap-2 text-success-green relative z-10">
<span class="material-symbols-outlined text-[16px]">trending_up</span>
<span class="font-body-sm text-body-sm font-medium">+5 this week</span>
</div>
</div>
<div class="relative overflow-hidden bg-surface-container rounded-2xl p-6 shadow-sm group">
<div class="absolute -right-6 -top-6 w-24 h-24 bg-success-green/10 rounded-full blur-xl group-hover:bg-success-green/20 transition-colors duration-500"></div>
<div class="flex justify-between items-start mb-4 relative z-10">
<div>
<p class="font-mono-label text-mono-label text-on-surface-variant uppercase tracking-wider mb-1">Users Online</p>
<h2 class="font-headline-xl text-headline-xl text-on-surface">12</h2>
</div>
<div class="p-3 bg-success-green text-white rounded-xl shadow-md shadow-success-green/20">
<span class="material-symbols-outlined text-[24px]">group</span>
</div>
</div>
<div class="flex items-center gap-2 text-on-surface-variant relative z-10">
<span class="material-symbols-outlined text-[16px]">schedule</span>
<span class="font-body-sm text-body-sm">Currently active</span>
</div>
</div>
<div class="relative overflow-hidden bg-error-container rounded-2xl p-6 shadow-sm group">
<div class="absolute -right-6 -top-6 w-24 h-24 bg-danger-red/10 rounded-full blur-xl group-hover:bg-danger-red/20 transition-colors duration-500"></div>
<div class="flex justify-between items-start mb-4 relative z-10">
<div>
<p class="font-mono-label text-mono-label text-on-error-container uppercase tracking-wider mb-1">Overdue Alerts</p>
<h2 class="font-headline-xl text-headline-xl text-on-error-container">7</h2>
</div>
<div class="p-3 bg-danger-red text-white rounded-xl shadow-md shadow-danger-red/20">
<span class="material-symbols-outlined text-[24px]">warning</span>
</div>
</div>
<div class="flex items-center gap-2 text-danger-red relative z-10">
<span class="material-symbols-outlined text-[16px]">trending_down</span>
<span class="font-body-sm text-body-sm font-medium">Requires immediate action</span>
</div>
</div>
</div>
<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
<div class="lg:col-span-2 bg-pure-surface rounded-3xl p-8 shadow-lg shadow-surface-dim/20 relative overflow-hidden">
<div class="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
<h3 class="font-headline-md text-headline-md text-on-surface mb-6 flex items-center gap-3">
<span class="material-symbols-outlined text-primary">history</span>
        Recent Activity
      </h3>
<div class="space-y-6 relative z-10">
<div class="flex gap-4">
<div class="relative">
<img class="w-12 h-12 rounded-full object-cover shadow-sm" data-alt="A portrait of a young Vietnamese professional woman in a modern office environment, wearing business casual attire. Soft natural lighting, shallow depth of field. Colors should subtly feature professional blues and warm whites to match the UI theme." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2ssvznbSe7H_O7rAwmRBLdPQFVIseGiaENE0-lx69KcLCv3uSzhQqLBSzevFesEpOTkjVo5fHx4MR2yrJ2MV6cc5ZeUwT8g2BMRLPSZZLYQj620No8v4EpPSZT2lFfGBEl9Ogpp_uVfUkDTtFYsYpE2o1pIgRltK99-WDGuvFawzs5JdApV6zJEA0ZzVK48nJIRjWuHqVaBOJD1Bl-Uk3YJWAVMwlgi7CQsDl0at2X9ip-ARGUwv_-_H2AsRThlS-XZsuvZ7E3zA">
<div class="absolute bottom-0 right-0 w-3 h-3 bg-success-green rounded-full ring-2 ring-pure-surface"></div>
</div>
<div class="flex-1 bg-surface-container-low rounded-2xl p-4 shadow-sm transition-transform hover:-translate-y-1 duration-300">
<p class="font-body-base text-body-base text-on-surface"><span class="font-semibold text-primary">Văn thư Nguyễn</span> vừa tải lên tài liệu mới</p>
<p class="font-mono-label text-mono-label text-on-surface-variant mt-1">Báo cáo tổng kết học kỳ 1 (PDF)</p>
<p class="font-body-sm text-body-sm text-outline mt-2 text-right">10 mins ago</p>
</div>
</div>
<div class="flex gap-4">
<div class="relative">
<img class="w-12 h-12 rounded-full object-cover shadow-sm" data-alt="A portrait of a middle-aged Vietnamese male teacher in a classroom setting, looking focused. Natural daylight, soft focus background. Incorporate warm terracotta and neutral tones." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPh_doJyHNqZFiV1K8UHstQickW3YvSRM_le_Pj6F8cwbc4LETYyXdENKc_RK_JcKLJQ6W-eGWNjux0LK_D5TMIU-KcpKqJ4f6WlcrcZNzoS9pcniQdevs0077TQ9TX7dHcCDsoK_93O9o1C5ZuS9hBiVrVl7VTECYrI1A4fzPUe7PwJnVN_tCmyGMoJI9v4f4NETP7fQHWs0yHW35Wei7jVO_LmDZSrXI9PARQO_2x5T2_DM_4G8wyWMxzuWo0OzIhDaH9EYP6Bw">
<div class="absolute bottom-0 right-0 w-3 h-3 bg-success-green rounded-full ring-2 ring-pure-surface"></div>
</div>
<div class="flex-1 bg-surface-container-low rounded-2xl p-4 shadow-sm transition-transform hover:-translate-y-1 duration-300">
<p class="font-body-base text-body-base text-on-surface"><span class="font-semibold text-primary">Giáo viên Trần</span> yêu cầu mượn hồ sơ</p>
<p class="font-mono-label text-mono-label text-on-surface-variant mt-1">Hồ sơ học sinh khối 10 - Năm học 2023-2024</p>
<div class="mt-3 flex gap-2">
<span class="px-3 py-1 bg-warning-orange/20 text-warning-orange font-mono-label text-mono-label rounded-full">Pending Approval</span>
</div>
<p class="font-body-sm text-body-sm text-outline mt-2 text-right">45 mins ago</p>
</div>
</div>
<div class="flex gap-4">
<div class="w-12 h-12 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shadow-sm shrink-0">
<span class="material-symbols-outlined">system_update_alt</span>
</div>
<div class="flex-1 bg-surface-container-low rounded-2xl p-4 shadow-sm transition-transform hover:-translate-y-1 duration-300">
<p class="font-body-base text-body-base text-on-surface"><span class="font-semibold text-primary">System</span> completed scheduled backup</p>
<p class="font-mono-label text-mono-label text-on-surface-variant mt-1">All database records successfully archived.</p>
<p class="font-body-sm text-body-sm text-outline mt-2 text-right">2 hours ago</p>
</div>
</div>
</div>
<button class="mt-6 text-primary font-body-sm text-body-sm font-semibold hover:underline w-full text-center">View All Activity</button>
</div>
<div class="lg:col-span-1 flex flex-col gap-8">
<div class="bg-charcoal-ink text-canvas-white rounded-3xl p-8 shadow-xl relative overflow-hidden group">
<div class="absolute -right-12 -top-12 w-40 h-40 bg-primary-fixed/20 rounded-full blur-2xl group-hover:bg-primary-fixed/30 transition-all duration-700"></div>
<h3 class="font-headline-md text-headline-md mb-6 flex items-center gap-3 relative z-10">
<span class="material-symbols-outlined text-primary-fixed-dim">bolt</span>
          Quick Actions
        </h3>
<div class="space-y-4 relative z-10">
<button class="w-full bg-white/10 hover:bg-white/20 text-white font-body-base text-body-base py-4 px-6 rounded-2xl flex items-center justify-between transition-colors backdrop-blur-sm group/btn">
<span class="flex items-center gap-3">
<span class="material-symbols-outlined text-primary-fixed-dim">person_add</span>
              Thêm người dùng
            </span>
<span class="material-symbols-outlined opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all">arrow_forward</span>
</button>
<button class="w-full bg-white/10 hover:bg-white/20 text-white font-body-base text-body-base py-4 px-6 rounded-2xl flex items-center justify-between transition-colors backdrop-blur-sm group/btn">
<span class="flex items-center gap-3">
<span class="material-symbols-outlined text-primary-fixed-dim">qr_code_scanner</span>
              In mã QR
            </span>
<span class="material-symbols-outlined opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all">arrow_forward</span>
</button>
<button class="w-full bg-primary hover:bg-primary-container text-on-primary font-body-base text-body-base py-4 px-6 rounded-2xl flex items-center justify-between transition-colors shadow-lg shadow-primary/20 group/btn mt-2">
<span class="flex items-center gap-3">
<span class="material-symbols-outlined">add_circle</span>
              Tạo hồ sơ mới
            </span>
<span class="material-symbols-outlined opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all">arrow_forward</span>
</button>
</div>
</div>
<div class="bg-surface-container rounded-3xl p-6 shadow-sm flex-1 flex flex-col justify-between overflow-hidden relative">
<div class="absolute -left-8 -bottom-8 w-32 h-32 bg-secondary/10 rounded-full blur-xl"></div>
<div>
<h4 class="font-headline-md text-headline-md text-on-surface mb-2">Storage Usage</h4>
<p class="font-body-sm text-body-sm text-on-surface-variant">System capacity is currently optimal.</p>
</div>
<div class="mt-6 relative z-10">
<div class="flex justify-between font-mono-label text-mono-label text-on-surface-variant mb-2">
<span>42GB Used</span>
<span>100GB Total</span>
</div>
<div class="w-full h-3 bg-surface-dim rounded-full overflow-hidden">
<div class="h-full bg-primary w-[42%] rounded-full shadow-[0_0_10px_rgba(0,74,198,0.5)]"></div>
</div>
</div>
</div>
</div>
</div>
</div></main></div></body></html>

<!-- Chi tiết Hồ sơ - EduArchive -->
<html lang="vi"><head><meta charset="utf-8"/><meta content="width=device-width, initial-scale=1.0" name="viewport"/><style>@layer base{html,body{margin:0;padding:0;}body{overscroll-behavior:none;}main>:first-child{margin-top:0!important;}main>:last-child{margin-bottom:0!important;}}::-webkit-scrollbar{display:none;}</style><script src="https://cdn.tailwindcss.com"></script><script>tailwind.config={theme:{extend:{"colors":{"on-tertiary-fixed":"#360f00","on-secondary-fixed":"#1a1b22","primary-fixed-dim":"#b4c5ff","surface-dim":"#d9d9e5","outline-variant":"#c3c6d7","canvas-white":"#F9FAFB","on-background":"#191b23","surface-container-highest":"#e1e2ed","surface-container":"#ededf9","surface-container-high":"#e7e7f3","whisper-border":"rgba(226, 232, 240, 0.5)","surface-container-low":"#f3f3fe","primary-fixed":"#dbe1ff","on-tertiary":"#ffffff","tertiary-container":"#bc4800","surface-container-lowest":"#ffffff","primary":"#004ac6","on-primary":"#ffffff","charcoal-ink":"#18181B","surface-bright":"#faf8ff","on-surface":"#191b23","error-container":"#ffdad6","inverse-surface":"#2e3039","secondary":"#5d5e66","on-error-container":"#93000a","on-surface-variant":"#434655","secondary-fixed":"#e3e1ec","on-tertiary-container":"#ffede6","on-tertiary-fixed-variant":"#7d2d00","success-green":"#10B981","on-secondary-container":"#63646c","secondary-container":"#e3e1ec","tertiary-fixed":"#ffdbcd","surface-variant":"#e1e2ed","inverse-primary":"#b4c5ff","on-secondary-fixed-variant":"#46464e","on-primary-fixed-variant":"#003ea8","danger-red":"#EF4444","on-primary-fixed":"#00174b","surface-tint":"#0053db","surface":"#faf8ff","tertiary":"#943700","warning-orange":"#F59E0B","tertiary-fixed-dim":"#ffb596","background":"#faf8ff","pure-surface":"#FFFFFF","on-error":"#ffffff","secondary-fixed-dim":"#c6c5cf","outline":"#737686","on-primary-container":"#eeefff","primary-container":"#2563eb","inverse-on-surface":"#f0f0fb","on-secondary":"#ffffff","error":"#ba1a1a"},"borderRadius":{"DEFAULT":"0.25rem","lg":"0.5rem","xl":"0.75rem","full":"9999px"},"spacing":{"sidebar-width":"280px","gutter":"1.5rem","content-padding-desktop":"4rem","margin-mobile":"1rem"},"fontFamily":{"headline-lg":["Geist"],"mono-label":["JetBrains Mono"],"headline-md":["Geist"],"headline-xl":["Geist"],"body-base":["Geist"],"body-sm":["Geist"]},"fontSize":{"headline-lg":["1.5rem",{"lineHeight":"1.3","letterSpacing":"-0.025em","fontWeight":"700"}],"mono-label":["0.75rem",{"lineHeight":"1.2","fontWeight":"500"}],"headline-md":["1.25rem",{"lineHeight":"1.4","fontWeight":"600"}],"headline-xl":["2.25rem",{"lineHeight":"1.2","letterSpacing":"-0.025em","fontWeight":"700"}],"body-base":["1rem",{"lineHeight":"1.65","fontWeight":"400"}],"body-sm":["0.875rem",{"lineHeight":"1.6","fontWeight":"400"}]}}}}</script><link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap" rel="stylesheet"/></head><body class="bg-canvas-white font-body-base text-on-surface"><aside class="fixed left-0 top-0 h-full w-[280px] bg-charcoal-ink z-50 flex flex-col shadow-xl"><div class="p-8 mb-4 flex items-center gap-3"><img alt="School Logo" class="h-10 w-auto object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpMbZCuyFP9B7rvjyQ_38EbvjBtJc2soSJMu46eeRNdMe2k-t5qucw8ipWPe0-w7FRa2g0XwQMqf_cbKuvhkJxExfmSdxl7xsXABb0kkHGcOiu7PLCwlpLtYRBi33-E1Ccogx8efgthBKRRWgNFV-RVGbehqRkgv1bBPad9itS44dP5bYbX7TjE9k0_H8C1Pq_nabfCS1qOMfhHoGGfOPJ1tpkYpvlyR1IB4ykQYah5K5KldDTpNu1Msb6DGbgcuBelezRWuh-_Wc"/><span class="text-white font-headline-lg text-headline-md tracking-tight">EduArchive</span></div><nav class="flex-1 px-4 space-y-1" data-active-classes="bg-primary-container text-on-primary-container font-semibold rounded-xl"><a aria-current="page" class="flex items-center px-4 py-3 transition-all duration-200 group bg-primary-container text-on-primary-container font-semibold rounded-xl" data-path="dashboard" href="#"><span class="material-symbols-outlined mr-4 opacity-70 group-hover:opacity-100">dashboard</span>Dashboard</a><a class="flex items-center px-4 py-3 text-secondary-fixed hover:bg-white/5 hover:text-white rounded-xl transition-all duration-200 group" data-path="quan-ly-ho-so" href="#"><span class="material-symbols-outlined mr-4 opacity-70 group-hover:opacity-100">folder_open</span>Quản lý Hồ sơ</a><a class="flex items-center px-4 py-3 text-secondary-fixed hover:bg-white/5 hover:text-white rounded-xl transition-all duration-200 group" data-path="muon-tra" href="#"><span class="material-symbols-outlined mr-4 opacity-70 group-hover:opacity-100">assignment_return</span>Mượn trả</a><a class="flex items-center px-4 py-3 text-secondary-fixed hover:bg-white/5 hover:text-white rounded-xl transition-all duration-200 group" data-path="bao-cao" href="#"><span class="material-symbols-outlined mr-4 opacity-70 group-hover:opacity-100">analytics</span>Báo cáo</a><a class="flex items-center px-4 py-3 text-secondary-fixed hover:bg-white/5 hover:text-white rounded-xl transition-all duration-200 group" data-path="quan-tri-he-thong" href="#"><span class="material-symbols-outlined mr-4 opacity-70 group-hover:opacity-100">settings</span>Hệ thống</a></nav><div class="mt-auto p-4 mx-4 mb-8 bg-white/5 rounded-2xl border border-white/10"><div class="flex items-center gap-3 mb-4"><img alt="Profile" class="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPxZCkCqEdxnSzr3u1rq52Npp8s-aWlblCs32Kiexcg5xwl8aaHoiZvee7Auz2LFNy2QAroCujn6vfTuXHbQvZ3bmYKPsTtp8IQEOedyQE9pR9IHXEccLkgqHa9Bu2iiq8-XGVFpGpdvyxzFaXE-1VKqzwKW94IvunR4WM1nPaSEh5vLGyQ2wMNbfYBb21SNlrnKqx8kwBNoI-qLMF6nLW2zXWLoLhDXLj-26zfepg43IGSGSK7VX5stHuOUD6zY9Ow1HeC0Lb2QU"/><div class="overflow-hidden"><p class="text-white text-sm font-semibold truncate">Admin User</p><p class="text-secondary-fixed-dim text-xs truncate">Quản trị viên</p></div></div><button class="w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-danger-red hover:bg-danger-red/10 rounded-lg transition-colors"><span class="material-symbols-outlined text-sm">logout</span>Đăng xuất</button></div></aside><div class="pl-[280px] min-h-screen flex flex-col"><header class="sticky top-0 h-20 bg-pure-surface/80 backdrop-blur-xl z-40 border-b border-whisper-border px-10 flex items-center justify-between"><div class="flex items-center gap-6 flex-1 max-w-2xl"><div class="relative w-full"><span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span><input class="w-full pl-12 pr-4 py-2.5 bg-surface-container-low border-none rounded-full text-body-sm focus:ring-2 focus:ring-primary/20 focus:bg-pure-surface transition-all" placeholder="Tìm kiếm hồ sơ, học sinh..." type="text"/></div></div><div class="flex items-center gap-6"><button class="relative p-2 text-on-surface-variant hover:bg-surface-container rounded-full transition-colors"><span class="material-symbols-outlined">notifications</span><span class="absolute top-2 right-2 w-2 h-2 bg-danger-red rounded-full ring-2 ring-pure-surface"></span></button><button class="flex items-center gap-2 px-6 py-2.5 bg-primary text-on-primary rounded-full font-semibold shadow-lg shadow-primary/20 hover:bg-primary-container hover:scale-[1.02] transition-all"><span class="material-symbols-outlined text-lg">add_circle</span><span>Tạo mới Hồ sơ</span></button></div></header><main class="flex-1 p-content-padding-desktop"><div class="flex flex-col w-full gap-gutter animate-fade-in pb-12">
<!-- Header Section -->
<header class="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 bg-surface-container p-8 rounded-3xl relative overflow-hidden group">
<div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none"></div>
<div class="absolute -right-20 -top-20 w-64 h-64 bg-primary-fixed blur-3xl opacity-20 rounded-full transition-transform duration-1000 group-hover:scale-150"></div>
<div class="relative z-10 flex flex-col gap-3 max-w-2xl">
<div class="flex items-center gap-3">
<span class="px-3 py-1 bg-surface-container-high text-on-surface-variant rounded-full font-mono-label text-mono-label tracking-wider uppercase">
                    HS-2024-042
                </span>
<span class="px-3 py-1 bg-success-green/10 text-success-green rounded-full font-mono-label text-mono-label font-bold tracking-wider flex items-center gap-1.5">
<span class="w-1.5 h-1.5 rounded-full bg-success-green animate-pulse"></span>
                    Đang lưu kho
                </span>
</div>
<h1 class="text-headline-xl text-on-surface font-headline-xl tracking-tight leading-tight">
                Hồ sơ nhân sự khối 10
            </h1>
<p class="text-body-base text-secondary flex items-center gap-2">
<span class="material-symbols-outlined text-[1.2em]">folder_special</span>
                Danh mục lưu trữ năm học 2023-2024
            </p>
</div>
<div class="relative z-10 flex items-center gap-3 w-full md:w-auto mt-4 md:mt-0">
<button class="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-surface-container-high text-on-surface rounded-xl font-headline-md text-body-sm hover:bg-surface-variant transition-colors shadow-sm">
<span class="material-symbols-outlined text-[1.2em]">print</span>
                In mã QR
            </button>
<button class="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-primary text-on-primary rounded-xl font-headline-md text-body-sm hover:bg-primary-container transition-transform hover:-translate-y-0.5 shadow-md shadow-primary/20">
<span class="material-symbols-outlined text-[1.2em]">edit</span>
                Chỉnh sửa
            </button>
<button class="flex-none p-3 text-danger-red hover:bg-danger-red/10 rounded-xl transition-colors" title="Xóa hồ sơ">
<span class="material-symbols-outlined">delete</span>
</button>
</div>
</header>
<!-- Main Content Grid -->
<div class="grid grid-cols-1 lg:grid-cols-12 gap-gutter mt-4">
<!-- Left Column: Metadata (4 Cols) -->
<div class="lg:col-span-4 flex flex-col gap-gutter">
<section class="bg-pure-surface rounded-3xl p-8 shadow-sm">
<h2 class="text-headline-md font-headline-md text-on-surface mb-6 flex items-center gap-2">
<span class="material-symbols-outlined text-primary">info</span>
                    Thông tin chi tiết
                </h2>
<dl class="space-y-6">
<div class="flex flex-col gap-1 border-b border-whisper-border pb-4">
<dt class="text-mono-label font-mono-label text-outline uppercase tracking-wider">Ngày lập</dt>
<dd class="text-body-base font-body-base text-on-surface">15 tháng 4, 2024</dd>
</div>
<div class="flex flex-col gap-1 border-b border-whisper-border pb-4">
<dt class="text-mono-label font-mono-label text-outline uppercase tracking-wider">Thời hạn bảo quản</dt>
<dd class="flex items-center gap-2">
<span class="text-body-base font-body-base text-on-surface font-semibold">Vĩnh viễn</span>
<span class="material-symbols-outlined text-warning-orange text-sm">all_inclusive</span>
</dd>
</div>
<div class="flex flex-col gap-1 border-b border-whisper-border pb-4">
<dt class="text-mono-label font-mono-label text-outline uppercase tracking-wider">Vị trí lưu trữ</dt>
<dd class="flex items-start gap-3 mt-1">
<div class="p-2 bg-surface-container rounded-lg shrink-0">
<span class="material-symbols-outlined text-primary text-xl">shelves</span>
</div>
<div class="flex flex-col">
<span class="text-body-base font-body-base text-on-surface font-semibold">Kho Lưu trữ Tầng 2</span>
<span class="text-body-sm text-secondary">Kệ số 04 - Dãy B - Ngăn 3</span>
</div>
</dd>
</div>
<div class="flex flex-col gap-1">
<dt class="text-mono-label font-mono-label text-outline uppercase tracking-wider">Người tạo</dt>
<dd class="flex items-center gap-3 mt-2">
<div class="w-10 h-10 rounded-full bg-cover bg-center shrink-0" data-alt="A professional headshot of a Vietnamese school administrator in a bright modern office setting, soft natural lighting, high quality corporate photography style." style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuA_vqISBtXQN1-o6Oee0SDQ2RwuEHOZLJr0m9ZqMaXXG08q0O_KiG53hizXfOcYwFEHIQDQONw7G44YarxI4I4tMOGte2W4Uy7laO4OVxtgIuJFeHHqfgj3FZUh7zDbfSGELVVcqGQEpkLnG5gRtZNPTg6lBPcQIFwxNnzPzpJDwbrJZrp_0M2LZk1FXSN0zbEkqtlflaoQ65AGY-MElJy7nR0d6MGWqAlM2k4VwJMHh4yDhZbL2L9YuAawYFKCM1xa2kah8_8DGE4')"></div>
<div class="flex flex-col">
<span class="text-body-base font-headline-md text-on-surface">Nguyễn Thị Mai</span>
<span class="text-body-sm text-secondary">Trưởng phòng Nhân sự</span>
</div>
</dd>
</div>
</dl>
</section>
</div>
<!-- Right Column: Documents & Timeline (8 Cols) -->
<div class="lg:col-span-8 flex flex-col gap-gutter">
<!-- Documents Section -->
<section class="bg-pure-surface rounded-3xl p-8 shadow-sm">
<div class="flex items-center justify-between mb-8">
<div class="flex items-center gap-3">
<h2 class="text-headline-md font-headline-md text-on-surface flex items-center gap-2">
<span class="material-symbols-outlined text-primary">description</span>
                            Tài liệu số hóa
                        </h2>
<span class="px-2.5 py-0.5 bg-surface-container text-secondary text-sm rounded-full font-mono-label">3 Files</span>
</div>
<button class="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-xl font-headline-md text-body-sm hover:bg-primary hover:text-on-primary transition-all">
<span class="material-symbols-outlined text-[1.2em]">upload_file</span>
                        Tải lên
                    </button>
</div>
<div class="grid grid-cols-1 gap-4">
<!-- File Item: PDF -->
<div class="group relative flex items-center gap-4 p-4 rounded-2xl bg-canvas-white hover:bg-surface-container transition-colors cursor-pointer border border-whisper-border">
<div class="w-12 h-12 rounded-xl bg-danger-red/10 flex items-center justify-center shrink-0 text-danger-red">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1">picture_as_pdf</span>
</div>
<div class="flex-1 min-w-0">
<h3 class="text-body-base font-headline-md text-on-surface truncate group-hover:text-primary transition-colors">QD-ThanhLap-Khoi10.pdf</h3>
<div class="flex items-center gap-3 mt-1 text-mono-label text-secondary">
<span>24/04/2024</span>
<span class="w-1 h-1 rounded-full bg-outline-variant"></span>
<span>2.4 MB</span>
</div>
</div>
<div class="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
<button class="p-2 text-secondary hover:text-primary hover:bg-white rounded-lg transition-colors"><span class="material-symbols-outlined">visibility</span></button>
<button class="p-2 text-secondary hover:text-primary hover:bg-white rounded-lg transition-colors"><span class="material-symbols-outlined">download</span></button>
</div>
</div>
<!-- File Item: Image -->
<div class="group relative flex items-center gap-4 p-4 rounded-2xl bg-canvas-white hover:bg-surface-container transition-colors cursor-pointer border border-whisper-border">
<div class="w-12 h-12 rounded-xl bg-tertiary-container/10 flex items-center justify-center shrink-0 text-tertiary-container overflow-hidden">
<div class="w-full h-full bg-cover bg-center opacity-80" data-alt="A scanned official school document with red stamp, slightly visible text, well lit overhead scan." style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuB30rgkzeURDPXIoIEDy0Z1wDvJ2Gzt-1WSBqWYn9Gwb2OKI_BrGeeeeXR-5bE8ZNF_7dbpdye7HgGMeHEkO3xOivh8qePZLiuUwdGBYEnM4D1vWshhS86ETJqUHVR7QOwV3mlvbarmYQILS-sxHBh0RUzJ0XvKa4QI5ydZnZ7n0UvXEBOU-WYLX8583QjrH2yQmgS0P7MfDXnoAhb5giaa9KgnCNsV7S-hDzYazsLFj9kPOIZs0SiXQb5O4dD8L2kLKlYMdkkBPNk')"></div>
</div>
<div class="flex-1 min-w-0">
<h3 class="text-body-base font-headline-md text-on-surface truncate group-hover:text-primary transition-colors">BanGiao_HoSo_Scan.jpg</h3>
<div class="flex items-center gap-3 mt-1 text-mono-label text-secondary">
<span>23/04/2024</span>
<span class="w-1 h-1 rounded-full bg-outline-variant"></span>
<span>1.8 MB</span>
</div>
</div>
<div class="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
<button class="p-2 text-secondary hover:text-primary hover:bg-white rounded-lg transition-colors"><span class="material-symbols-outlined">visibility</span></button>
<button class="p-2 text-secondary hover:text-primary hover:bg-white rounded-lg transition-colors"><span class="material-symbols-outlined">download</span></button>
</div>
</div>
<!-- File Item: Confidential -->
<div class="relative overflow-hidden flex flex-col sm:flex-row items-center justify-center gap-4 p-6 rounded-2xl bg-surface-container-high border-2 border-dashed border-outline-variant">
<div class="absolute inset-0 backdrop-blur-md bg-canvas-white/60 z-10"></div>
<!-- Locked State Overlay -->
<div class="relative z-20 flex flex-col items-center justify-center text-center space-y-3">
<div class="w-16 h-16 rounded-2xl bg-surface-variant flex items-center justify-center text-secondary shadow-sm">
<span class="material-symbols-outlined text-3xl" style="font-variation-settings: 'FILL' 1">lock</span>
</div>
<div>
<span class="inline-block px-2.5 py-1 bg-danger-red text-white text-mono-label font-mono-label rounded mb-2 tracking-widest">CONFIDENTIAL</span>
<p class="text-headline-md font-headline-md text-on-surface">Tài liệu Bảo mật</p>
<p class="text-body-sm text-secondary mt-1">Bạn không có quyền truy cập file này.</p>
</div>
<button class="mt-2 text-primary font-headline-md text-body-sm hover:underline flex items-center gap-1">
                                 Yêu cầu quyền truy cập <span class="material-symbols-outlined text-sm">arrow_forward</span>
</button>
</div>
</div>
</div>
</section>
<!-- Timeline Section -->
<section class="bg-pure-surface rounded-3xl p-8 shadow-sm">
<h2 class="text-headline-md font-headline-md text-on-surface mb-8 flex items-center gap-2">
<span class="material-symbols-outlined text-primary">history</span>
                    Lịch sử trạng thái
                </h2>
<div class="relative pl-6">
<!-- Vertical Line -->
<div class="absolute left-7 top-2 bottom-6 w-0.5 bg-surface-variant"></div>
<!-- Timeline Items -->
<div class="space-y-8">
<!-- Current State -->
<div class="relative flex gap-6">
<div class="absolute -left-2 top-0.5 w-4 h-4 rounded-full bg-success-green ring-4 ring-success-green/20 z-10"></div>
<div class="flex flex-col pt-0.5">
<h3 class="text-body-base font-headline-md text-on-surface leading-none">Đã trả - Lưu kho</h3>
<p class="text-body-sm text-secondary mt-1.5">Nguyễn Thị Mai đã hoàn trả hồ sơ vào kho.</p>
<span class="text-mono-label text-outline mt-2 font-mono-label">15/05/2024 - 14:30</span>
</div>
</div>
<!-- Past State -->
<div class="relative flex gap-6">
<div class="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-outline-variant z-10"></div>
<div class="flex flex-col">
<h3 class="text-body-base font-headline-md text-secondary leading-none">Đã mượn</h3>
<p class="text-body-sm text-secondary mt-1.5 opacity-80">Trần Văn Nam mượn hồ sơ phục vụ công tác thanh tra.</p>
<div class="flex items-center gap-2 mt-2">
<span class="text-mono-label text-outline font-mono-label">10/05/2024 - 09:15</span>
<span class="px-2 py-0.5 bg-surface-container rounded text-xs text-secondary">Phòng Thanh tra</span>
</div>
</div>
</div>
<!-- Past State -->
<div class="relative flex gap-6">
<div class="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-outline-variant z-10"></div>
<div class="flex flex-col">
<h3 class="text-body-base font-headline-md text-secondary leading-none">Lưu kho lần đầu</h3>
<p class="text-body-sm text-secondary mt-1.5 opacity-80">Hồ sơ được số hóa và đưa vào Kệ số 04.</p>
<span class="text-mono-label text-outline mt-2 font-mono-label">16/04/2024 - 11:20</span>
</div>
</div>
<!-- Initial State -->
<div class="relative flex gap-6">
<div class="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-outline-variant z-10"></div>
<div class="flex flex-col">
<h3 class="text-body-base font-headline-md text-secondary leading-none">Tạo hồ sơ</h3>
<p class="text-body-sm text-secondary mt-1.5 opacity-80">Hệ thống tạo mã HS-2024-042.</p>
<span class="text-mono-label text-outline mt-2 font-mono-label">15/04/2024 - 08:00</span>
</div>
</div>
</div>
</div>
</section>
</div>
</div>
</div>
<style>
    @keyframes fade-in {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in {
        animation: fade-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
</style></main></div></body></html>

<!-- Đăng nhập - EduArchive -->
<!DOCTYPE html><html lang="vi"><head><meta charset="utf-8"><meta content="width=device-width, initial-scale=1.0" name="viewport"><link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet"><script src="https://cdn.tailwindcss.com"></script></head><body class="bg-canvas-white font-body-base text-on-surface"><aside class="fixed left-0 top-0 h-full w-[280px] bg-charcoal-ink z-50 flex flex-col shadow-xl"><div class="p-8 mb-4 flex items-center gap-3"><img alt="School Logo" class="h-10 w-auto object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpMbZCuyFP9B7rvjyQ_38EbvjBtJc2soSJMu46eeRNdMe2k-t5qucw8ipWPe0-w7FRa2g0XwQMqf_cbKuvhkJxExfmSdxl7xsXABb0kkHGcOiu7PLCwlpLtYRBi33-E1Ccogx8efgthBKRRWgNFV-RVGbehqRkgv1bBPad9itS44dP5bYbX7TjE9k0_H8C1Pq_nabfCS1qOMfhHoGGfOPJ1tpkYpvlyR1IB4ykQYah5K5KldDTpNu1Msb6DGbgcuBelezRWuh-_Wc"><span class="text-white font-headline-lg text-headline-md tracking-tight">EduArchive</span></div><nav class="flex-1 px-4 space-y-1" data-active-classes="bg-primary-container text-on-primary-container font-semibold rounded-xl"><a aria-current="page" class="flex items-center px-4 py-3 transition-all duration-200 group bg-primary-container text-on-primary-container font-semibold rounded-xl" data-path="dashboard" href="#"><span class="material-symbols-outlined mr-4 opacity-70 group-hover:opacity-100" data-original-icon="dashboard">dashboard</span>Dashboard</a><a class="flex items-center px-4 py-3 text-secondary-fixed hover:bg-white/5 hover:text-white rounded-xl transition-all duration-200 group" data-path="quan-ly-ho-so" href="#"><span class="material-symbols-outlined mr-4 opacity-70 group-hover:opacity-100" data-original-icon="folder_open">folder_open</span>Quản lý Hồ sơ</a><a class="flex items-center px-4 py-3 text-secondary-fixed hover:bg-white/5 hover:text-white rounded-xl transition-all duration-200 group" data-path="muon-tra" href="#"><span class="material-symbols-outlined mr-4 opacity-70 group-hover:opacity-100" data-original-icon="assignment_return">assignment_return</span>Mượn trả</a><a class="flex items-center px-4 py-3 text-secondary-fixed hover:bg-white/5 hover:text-white rounded-xl transition-all duration-200 group" data-path="bao-cao" href="#"><span class="material-symbols-outlined mr-4 opacity-70 group-hover:opacity-100">analytics</span>Báo cáo</a><a class="flex items-center px-4 py-3 text-secondary-fixed hover:bg-white/5 hover:text-white rounded-xl transition-all duration-200 group" data-path="quan-tri-he-thong" href="#"><span class="material-symbols-outlined mr-4 opacity-70 group-hover:opacity-100">settings</span>Hệ thống</a></nav><div class="mt-auto p-4 mx-4 mb-8 bg-white/5 rounded-2xl border border-white/10"><div class="flex items-center gap-3 mb-4"><img alt="Profile" class="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPxZCkCqEdxnSzr3u1rq52Npp8s-aWlblCs32Kiexcg5xwl8aaHoiZvee7Auz2LFNy2QAroCujn6vfTuXHbQvZ3bmYKPsTtp8IQEOedyQE9pR9IHXEccLkgqHa9Bu2iiq8-XGVFpGpdvyxzFaXE-1VKqzwKW94IvunR4WM1nPaSEh5vLGyQ2wMNbfYBb21SNlrnKqx8kwBNoI-qLMF6nLW2zXWLoLhDXLj-26zfepg43IGSGSK7VX5stHuOUD6zY9Ow1HeC0Lb2QU"><div class="overflow-hidden"><p class="text-white text-sm font-semibold truncate">Admin User</p><p class="text-secondary-fixed-dim text-xs truncate">Quản trị viên</p></div></div><button class="w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-danger-red hover:bg-danger-red/10 rounded-lg transition-colors"><span class="material-symbols-outlined text-sm">logout</span>Đăng xuất</button></div></aside><div class="pl-[280px] min-h-screen flex flex-col"><header class="sticky top-0 h-20 bg-pure-surface/80 backdrop-blur-xl z-40 border-b border-whisper-border px-10 flex items-center justify-between"><div class="flex items-center gap-6 flex-1 max-w-2xl"><div class="relative w-full"><span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span><input class="w-full pl-12 pr-4 py-2.5 bg-surface-container-low border-none rounded-full text-body-sm focus:ring-2 focus:ring-primary/20 focus:bg-pure-surface transition-all" placeholder="Tìm kiếm hồ sơ, học sinh..." type="text"></div></div><div class="flex items-center gap-6"><button class="relative p-2 text-on-surface-variant hover:bg-surface-container rounded-full transition-colors"><span class="material-symbols-outlined" data-original-icon="notifications">notifications</span><span class="absolute top-2 right-2 w-2 h-2 bg-danger-red rounded-full ring-2 ring-pure-surface"></span></button><button class="flex items-center gap-2 px-6 py-2.5 bg-primary text-on-primary rounded-full font-semibold shadow-lg shadow-primary/20 hover:bg-primary-container hover:scale-[1.02] transition-all"><span class="material-symbols-outlined text-lg" data-original-icon="add_circle">add_circle</span><span>Tạo mới Hồ sơ</span></button></div></header><main class="flex-1 p-content-padding-desktop"><div class="flex flex-col w-full h-[calc(100vh-5rem)] items-center justify-center relative overflow-hidden">
<div class="absolute inset-0 bg-surface z-0">
<div class="absolute -top-[40%] -right-[20%] w-[80%] h-[80%] rounded-full bg-primary-fixed opacity-30 mix-blend-multiply blur-3xl animate-[pulse_8s_ease-in-out_infinite]"></div>
<div class="absolute -bottom-[30%] -left-[10%] w-[60%] h-[60%] rounded-full bg-tertiary-fixed opacity-20 mix-blend-multiply blur-3xl animate-[pulse_10s_ease-in-out_infinite_reverse]"></div>
</div>
<div class="relative z-10 w-full max-w-md bg-pure-surface rounded-[2rem] shadow-xl p-10 flex flex-col items-center">
<div class="w-24 h-24 mb-6 rounded-full bg-surface-container flex items-center justify-center p-4">
<img alt="School Logo" class="w-full h-full object-contain" src="https://lh3.googleusercontent.com/aida/AP1WRLtBxY5rvcCnwrjAg8OwRk-QPOE4J0jDbjh1pOtAdlMubTvdUd-4b0EvfwEJG_p384W1mBd1pjp3V-gfx99xe66_IIG9Id18PrPivKq4uF0QKGhsqKSLD2hNoC2E5cagMqxfsC6_LfDsfiZW26KGoE84O0yAi49JQG9zNSO79FA7lKbSXo4OBCRUyARDLnRehSMUsB-luskxk7oKJuZgozBUgJrWa9BafB332oHJLhws6GtCQb-J0X2nUYE">
</div>
<h1 class="font-headline-xl text-headline-xl text-on-surface mb-2 text-center">Đăng nhập</h1>
<p class="font-body-base text-body-base text-on-surface-variant mb-10 text-center">Hệ thống quản lý hồ sơ EduArchive</p>
<form class="w-full flex flex-col gap-5">
<div class="flex flex-col gap-2">
<label class="font-mono-label text-mono-label text-secondary uppercase tracking-wider" for="username">Tên đăng nhập</label>
<div class="relative w-full">
<span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant">person</span>
<input class="w-full bg-surface-container-low pl-12 pr-4 py-3 rounded-xl font-body-base text-body-base text-on-surface focus:ring-2 focus:ring-primary focus:bg-pure-surface transition-all outline-none placeholder:text-outline-variant" id="username" placeholder="Nhập tên đăng nhập" type="text">
</div>
</div>
<div class="flex flex-col gap-2">
<label class="font-mono-label text-mono-label text-secondary uppercase tracking-wider" for="password">Mật khẩu</label>
<div class="relative w-full">
<span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant">lock</span>
<input class="w-full bg-surface-container-low pl-12 pr-12 py-3 rounded-xl font-body-base text-body-base text-on-surface focus:ring-2 focus:ring-primary focus:bg-pure-surface transition-all outline-none placeholder:text-outline-variant" id="password" placeholder="Nhập mật khẩu" type="password">
<button class="absolute right-4 top-1/2 -translate-y-1/2 text-outline-variant hover:text-on-surface transition-colors" type="button">
<span class="material-symbols-outlined text-lg">visibility_off</span>
</button>
</div>
</div>
<div class="flex items-center justify-between mt-2">
<label class="flex items-center gap-2 cursor-pointer group">
<input class="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary accent-primary" type="checkbox">
<span class="font-body-sm text-body-sm text-on-surface-variant group-hover:text-on-surface transition-colors">Ghi nhớ đăng nhập</span>
</label>
</div>
<button class="w-full py-3 mt-4 bg-primary text-on-primary font-headline-md text-headline-md rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-container hover:scale-[1.02] transition-all flex items-center justify-center gap-2 relative overflow-hidden group" type="submit">
<span class="relative z-10">Đăng nhập</span>
<span class="material-symbols-outlined relative z-10 text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
<div class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
</button>
<a class="font-body-sm text-body-sm text-primary text-center hover:text-primary-container transition-colors mt-2" href="#">Quên mật khẩu?</a>
</form>
</div>
</div></main></div></body></html>

<!-- Danh sách Hồ sơ - EduArchive -->
<html lang="vi"><head><meta charset="utf-8"/><meta content="width=device-width, initial-scale=1.0" name="viewport"/><style>@layer base{html,body{margin:0;padding:0;}body{overscroll-behavior:none;}main>:first-child{margin-top:0!important;}main>:last-child{margin-bottom:0!important;}}::-webkit-scrollbar{display:none;}</style><script src="https://cdn.tailwindcss.com"></script><script>tailwind.config={theme:{extend:{"colors":{"on-tertiary-fixed":"#360f00","on-secondary-fixed":"#1a1b22","primary-fixed-dim":"#b4c5ff","surface-dim":"#d9d9e5","outline-variant":"#c3c6d7","canvas-white":"#F9FAFB","on-background":"#191b23","surface-container-highest":"#e1e2ed","surface-container":"#ededf9","surface-container-high":"#e7e7f3","whisper-border":"rgba(226, 232, 240, 0.5)","surface-container-low":"#f3f3fe","primary-fixed":"#dbe1ff","on-tertiary":"#ffffff","tertiary-container":"#bc4800","surface-container-lowest":"#ffffff","primary":"#004ac6","on-primary":"#ffffff","charcoal-ink":"#18181B","surface-bright":"#faf8ff","on-surface":"#191b23","error-container":"#ffdad6","inverse-surface":"#2e3039","secondary":"#5d5e66","on-error-container":"#93000a","on-surface-variant":"#434655","secondary-fixed":"#e3e1ec","on-tertiary-container":"#ffede6","on-tertiary-fixed-variant":"#7d2d00","success-green":"#10B981","on-secondary-container":"#63646c","secondary-container":"#e3e1ec","tertiary-fixed":"#ffdbcd","surface-variant":"#e1e2ed","inverse-primary":"#b4c5ff","on-secondary-fixed-variant":"#46464e","on-primary-fixed-variant":"#003ea8","danger-red":"#EF4444","on-primary-fixed":"#00174b","surface-tint":"#0053db","surface":"#faf8ff","tertiary":"#943700","warning-orange":"#F59E0B","tertiary-fixed-dim":"#ffb596","background":"#faf8ff","pure-surface":"#FFFFFF","on-error":"#ffffff","secondary-fixed-dim":"#c6c5cf","outline":"#737686","on-primary-container":"#eeefff","primary-container":"#2563eb","inverse-on-surface":"#f0f0fb","on-secondary":"#ffffff","error":"#ba1a1a"},"borderRadius":{"DEFAULT":"0.25rem","lg":"0.5rem","xl":"0.75rem","full":"9999px"},"spacing":{"sidebar-width":"280px","gutter":"1.5rem","content-padding-desktop":"4rem","margin-mobile":"1rem"},"fontFamily":{"headline-lg":["Geist"],"mono-label":["JetBrains Mono"],"headline-md":["Geist"],"headline-xl":["Geist"],"body-base":["Geist"],"body-sm":["Geist"]},"fontSize":{"headline-lg":["1.5rem",{"lineHeight":"1.3","letterSpacing":"-0.025em","fontWeight":"700"}],"mono-label":["0.75rem",{"lineHeight":"1.2","fontWeight":"500"}],"headline-md":["1.25rem",{"lineHeight":"1.4","fontWeight":"600"}],"headline-xl":["2.25rem",{"lineHeight":"1.2","letterSpacing":"-0.025em","fontWeight":"700"}],"body-base":["1rem",{"lineHeight":"1.65","fontWeight":"400"}],"body-sm":["0.875rem",{"lineHeight":"1.6","fontWeight":"400"}]}}}}</script><link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap" rel="stylesheet"/></head><body class="bg-canvas-white font-body-base text-on-surface"><aside class="fixed left-0 top-0 h-full w-[280px] bg-charcoal-ink z-50 flex flex-col shadow-xl"><div class="p-8 mb-4 flex items-center gap-3"><img alt="School Logo" class="h-10 w-auto object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpMbZCuyFP9B7rvjyQ_38EbvjBtJc2soSJMu46eeRNdMe2k-t5qucw8ipWPe0-w7FRa2g0XwQMqf_cbKuvhkJxExfmSdxl7xsXABb0kkHGcOiu7PLCwlpLtYRBi33-E1Ccogx8efgthBKRRWgNFV-RVGbehqRkgv1bBPad9itS44dP5bYbX7TjE9k0_H8C1Pq_nabfCS1qOMfhHoGGfOPJ1tpkYpvlyR1IB4ykQYah5K5KldDTpNu1Msb6DGbgcuBelezRWuh-_Wc"/><span class="text-white font-headline-lg text-headline-md tracking-tight">EduArchive</span></div><nav class="flex-1 px-4 space-y-1" data-active-classes="bg-primary-container text-on-primary-container font-semibold rounded-xl"><a aria-current="page" class="flex items-center px-4 py-3 transition-all duration-200 group bg-primary-container text-on-primary-container font-semibold rounded-xl" data-path="dashboard" href="#"><span class="material-symbols-outlined mr-4 opacity-70 group-hover:opacity-100">dashboard</span>Dashboard</a><a class="flex items-center px-4 py-3 text-secondary-fixed hover:bg-white/5 hover:text-white rounded-xl transition-all duration-200 group" data-path="quan-ly-ho-so" href="#"><span class="material-symbols-outlined mr-4 opacity-70 group-hover:opacity-100">folder_open</span>Quản lý Hồ sơ</a><a class="flex items-center px-4 py-3 text-secondary-fixed hover:bg-white/5 hover:text-white rounded-xl transition-all duration-200 group" data-path="muon-tra" href="#"><span class="material-symbols-outlined mr-4 opacity-70 group-hover:opacity-100">assignment_return</span>Mượn trả</a><a class="flex items-center px-4 py-3 text-secondary-fixed hover:bg-white/5 hover:text-white rounded-xl transition-all duration-200 group" data-path="bao-cao" href="#"><span class="material-symbols-outlined mr-4 opacity-70 group-hover:opacity-100">analytics</span>Báo cáo</a><a class="flex items-center px-4 py-3 text-secondary-fixed hover:bg-white/5 hover:text-white rounded-xl transition-all duration-200 group" data-path="quan-tri-he-thong" href="#"><span class="material-symbols-outlined mr-4 opacity-70 group-hover:opacity-100">settings</span>Hệ thống</a></nav><div class="mt-auto p-4 mx-4 mb-8 bg-white/5 rounded-2xl border border-white/10"><div class="flex items-center gap-3 mb-4"><img alt="Profile" class="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPxZCkCqEdxnSzr3u1rq52Npp8s-aWlblCs32Kiexcg5xwl8aaHoiZvee7Auz2LFNy2QAroCujn6vfTuXHbQvZ3bmYKPsTtp8IQEOedyQE9pR9IHXEccLkgqHa9Bu2iiq8-XGVFpGpdvyxzFaXE-1VKqzwKW94IvunR4WM1nPaSEh5vLGyQ2wMNbfYBb21SNlrnKqx8kwBNoI-qLMF6nLW2zXWLoLhDXLj-26zfepg43IGSGSK7VX5stHuOUD6zY9Ow1HeC0Lb2QU"/><div class="overflow-hidden"><p class="text-white text-sm font-semibold truncate">Admin User</p><p class="text-secondary-fixed-dim text-xs truncate">Quản trị viên</p></div></div><button class="w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-danger-red hover:bg-danger-red/10 rounded-lg transition-colors"><span class="material-symbols-outlined text-sm">logout</span>Đăng xuất</button></div></aside><div class="pl-[280px] min-h-screen flex flex-col"><header class="sticky top-0 h-20 bg-pure-surface/80 backdrop-blur-xl z-40 border-b border-whisper-border px-10 flex items-center justify-between"><div class="flex items-center gap-6 flex-1 max-w-2xl"><div class="relative w-full"><span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span><input class="w-full pl-12 pr-4 py-2.5 bg-surface-container-low border-none rounded-full text-body-sm focus:ring-2 focus:ring-primary/20 focus:bg-pure-surface transition-all" placeholder="Tìm kiếm hồ sơ, học sinh..." type="text"/></div></div><div class="flex items-center gap-6"><button class="relative p-2 text-on-surface-variant hover:bg-surface-container rounded-full transition-colors"><span class="material-symbols-outlined">notifications</span><span class="absolute top-2 right-2 w-2 h-2 bg-danger-red rounded-full ring-2 ring-pure-surface"></span></button><button class="flex items-center gap-2 px-6 py-2.5 bg-primary text-on-primary rounded-full font-semibold shadow-lg shadow-primary/20 hover:bg-primary-container hover:scale-[1.02] transition-all"><span class="material-symbols-outlined text-lg">add_circle</span><span>Tạo mới Hồ sơ</span></button></div></header><main class="flex-1 p-content-padding-desktop"><div class="flex flex-col w-full min-h-full">
<!-- Header Section -->
<div class="flex justify-between items-end mb-8 relative z-10">
<div class="space-y-2">
<h1 class="font-headline-xl text-headline-xl text-on-surface">Quản lý Hồ sơ</h1>
<p class="font-body-base text-body-base text-on-surface-variant max-w-2xl">Tra cứu, quản lý và theo dõi trạng thái của tất cả hồ sơ lưu trữ trong hệ thống.</p>
</div>
<div class="flex items-center gap-3">
<button class="flex items-center gap-2 px-5 py-2.5 bg-surface-container-high text-on-surface hover:bg-surface-variant transition-colors rounded-lg shadow-sm font-headline-md text-sm">
<span class="material-symbols-outlined text-xl">file_download</span>
                Xuất danh sách
            </button>
<button class="flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary hover:bg-primary-container transition-colors rounded-lg shadow-md font-headline-md text-sm">
<span class="material-symbols-outlined text-xl">add</span>
                Thêm mới
            </button>
</div>
</div>
<!-- Advanced Search & Filters -->
<div class="bg-surface-container rounded-2xl p-6 mb-8 shadow-sm">
<div class="grid grid-cols-1 md:grid-cols-4 gap-4">
<!-- Search -->
<div class="md:col-span-2 relative">
<span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
<input class="w-full pl-12 pr-4 py-3 bg-pure-surface text-on-surface font-body-sm text-body-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all placeholder-on-surface-variant/50" placeholder="Tìm kiếm theo Mã hồ sơ, Tên hồ sơ..." type="text"/>
</div>
<!-- Category Filter -->
<div class="relative">
<select class="w-full appearance-none px-4 py-3 bg-pure-surface text-on-surface font-body-sm text-body-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all">
<option disabled="" selected="" value="">Danh mục</option>
<option value="hanh-chinh">Hành chính</option>
<option value="nhan-su">Nhân sự</option>
<option value="tai-chinh">Tài chính</option>
</select>
<span class="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline pointer-events-none">expand_more</span>
</div>
<!-- Location Filter -->
<div class="relative">
<select class="w-full appearance-none px-4 py-3 bg-pure-surface text-on-surface font-body-sm text-body-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all">
<option disabled="" selected="" value="">Vị trí kho</option>
<option value="kho-a">Kho A</option>
<option value="kho-b">Kho B</option>
<option value="kho-c">Kho C</option>
</select>
<span class="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline pointer-events-none">expand_more</span>
</div>
<!-- Status Filter -->
<div class="relative">
<select class="w-full appearance-none px-4 py-3 bg-pure-surface text-on-surface font-body-sm text-body-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all">
<option disabled="" selected="" value="">Trạng thái</option>
<option value="dang-luu">Đang lưu kho</option>
<option value="da-muon">Đã mượn</option>
<option value="dang-xu-ly">Đang xử lý</option>
</select>
<span class="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline pointer-events-none">expand_more</span>
</div>
<!-- Date Range (Mock) -->
<div class="relative">
<span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">calendar_today</span>
<input class="w-full pl-12 pr-4 py-3 bg-pure-surface text-on-surface font-body-sm text-body-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all placeholder-on-surface-variant/50" placeholder="Từ ngày - Đến ngày" type="text"/>
</div>
<div class="md:col-span-2 flex justify-end items-center gap-3">
<button class="px-6 py-3 bg-transparent text-on-surface-variant hover:text-on-surface font-headline-md text-sm transition-colors">
                    Thiết lập lại
                </button>
<button class="px-6 py-3 bg-secondary-container text-on-secondary-container hover:bg-secondary-fixed transition-colors rounded-xl font-headline-md text-sm shadow-sm flex items-center gap-2">
<span class="material-symbols-outlined text-lg">filter_list</span>
                    Áp dụng Bộ lọc
                </button>
</div>
</div>
</div>
<!-- Data Table -->
<div class="bg-pure-surface rounded-2xl shadow-sm overflow-hidden flex-1 flex flex-col relative">
<div class="overflow-x-auto">
<table class="w-full text-left border-collapse">
<thead>
<tr class="bg-surface-container-low text-on-surface-variant font-mono-label text-mono-label uppercase tracking-wider">
<th class="p-5 font-semibold w-12 text-center">
<input class="w-4 h-4 rounded text-primary focus:ring-primary/50 accent-primary" type="checkbox"/>
</th>
<th class="p-5 font-semibold">Mã Hồ sơ</th>
<th class="p-5 font-semibold">Tên Hồ sơ</th>
<th class="p-5 font-semibold">Loại Hồ sơ</th>
<th class="p-5 font-semibold">Vị trí</th>
<th class="p-5 font-semibold">Bảo mật</th>
<th class="p-5 font-semibold">Trạng thái</th>
<th class="p-5 font-semibold text-right">Thao tác</th>
</tr>
</thead>
<tbody class="text-body-sm font-body-sm text-on-surface">
<!-- Row 1 -->
<tr class="hover:bg-surface-container-lowest transition-colors border-b border-surface-variant/50 group">
<td class="p-5 text-center">
<input class="w-4 h-4 rounded text-primary focus:ring-primary/50 accent-primary" type="checkbox"/>
</td>
<td class="p-5">
<span class="font-mono-label text-primary font-bold">HS-2024-001</span>
</td>
<td class="p-5">
<div class="font-headline-md text-sm text-on-surface mb-0.5">Quyết định bổ nhiệm cán bộ</div>
<div class="text-xs text-on-surface-variant line-clamp-1">Phòng Nhân sự - Ký ngày 12/01/2024</div>
</td>
<td class="p-5 text-on-surface-variant">Văn bản số</td>
<td class="p-5">
<div class="flex flex-col">
<span class="font-medium text-on-surface">Kho A</span>
<span class="text-xs text-on-surface-variant">Kệ 1 - Ngăn 3</span>
</div>
</td>
<td class="p-5">
<div class="flex items-center gap-1.5 text-danger-red" title="Mật">
<span class="material-symbols-outlined text-[18px]">lock</span>
<span class="text-xs font-medium">Bảo mật</span>
</div>
</td>
<td class="p-5">
<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-success-green/10 text-success-green text-xs font-semibold">
<span class="w-1.5 h-1.5 rounded-full bg-success-green"></span>
                                Đang lưu kho
                            </span>
</td>
<td class="p-5 text-right">
<div class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
<button class="p-1.5 text-on-surface-variant hover:text-primary hover:bg-primary/10 rounded-md transition-colors" title="Xem chi tiết">
<span class="material-symbols-outlined text-[20px]">visibility</span>
</button>
<button class="p-1.5 text-on-surface-variant hover:text-primary hover:bg-primary/10 rounded-md transition-colors" title="In mã QR">
<span class="material-symbols-outlined text-[20px]">qr_code_2</span>
</button>
</div>
</td>
</tr>
<!-- Row 2 -->
<tr class="hover:bg-surface-container-lowest transition-colors border-b border-surface-variant/50 group">
<td class="p-5 text-center">
<input class="w-4 h-4 rounded text-primary focus:ring-primary/50 accent-primary" type="checkbox"/>
</td>
<td class="p-5">
<span class="font-mono-label text-primary font-bold">HS-2023-142</span>
</td>
<td class="p-5">
<div class="font-headline-md text-sm text-on-surface mb-0.5">Báo cáo tài chính quý 4/2023</div>
<div class="text-xs text-on-surface-variant line-clamp-1">Phòng Tài chính kế toán</div>
</td>
<td class="p-5 text-on-surface-variant">Báo cáo</td>
<td class="p-5">
<div class="flex flex-col">
<span class="font-medium text-on-surface">Kho B</span>
<span class="text-xs text-on-surface-variant">Kệ 4 - Ngăn 1</span>
</div>
</td>
<td class="p-5">
<div class="flex items-center gap-1.5 text-on-surface-variant" title="Thông thường">
<span class="material-symbols-outlined text-[18px]">description</span>
<span class="text-xs font-medium">Thường</span>
</div>
</td>
<td class="p-5">
<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-warning-orange/10 text-warning-orange text-xs font-semibold">
<span class="w-1.5 h-1.5 rounded-full bg-warning-orange"></span>
                                Đã mượn
                            </span>
</td>
<td class="p-5 text-right">
<div class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
<button class="p-1.5 text-on-surface-variant hover:text-primary hover:bg-primary/10 rounded-md transition-colors" title="Xem chi tiết">
<span class="material-symbols-outlined text-[20px]">visibility</span>
</button>
<button class="p-1.5 text-on-surface-variant hover:text-primary hover:bg-primary/10 rounded-md transition-colors" title="In mã QR">
<span class="material-symbols-outlined text-[20px]">qr_code_2</span>
</button>
</div>
</td>
</tr>
<!-- Row 3 -->
<tr class="hover:bg-surface-container-lowest transition-colors border-b border-surface-variant/50 group">
<td class="p-5 text-center">
<input class="w-4 h-4 rounded text-primary focus:ring-primary/50 accent-primary" type="checkbox"/>
</td>
<td class="p-5">
<span class="font-mono-label text-primary font-bold">HS-2024-055</span>
</td>
<td class="p-5">
<div class="font-headline-md text-sm text-on-surface mb-0.5">Hồ sơ trúng thầu dự án A</div>
<div class="text-xs text-on-surface-variant line-clamp-1">Ban Quản lý dự án</div>
</td>
<td class="p-5 text-on-surface-variant">Hồ sơ thầu</td>
<td class="p-5">
<div class="flex flex-col">
<span class="font-medium text-on-surface">Kho A</span>
<span class="text-xs text-on-surface-variant">Kệ 2 - Ngăn 5</span>
</div>
</td>
<td class="p-5">
<div class="flex items-center gap-1.5 text-danger-red" title="Mật">
<span class="material-symbols-outlined text-[18px]" style="font-variation-settings: 'FILL' 1;">shield</span>
<span class="text-xs font-medium">Tuyệt mật</span>
</div>
</td>
<td class="p-5">
<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
<span class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                                Đang xử lý
                            </span>
</td>
<td class="p-5 text-right">
<div class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
<button class="p-1.5 text-on-surface-variant hover:text-primary hover:bg-primary/10 rounded-md transition-colors" title="Xem chi tiết">
<span class="material-symbols-outlined text-[20px]">visibility</span>
</button>
<button class="p-1.5 text-on-surface-variant hover:text-primary hover:bg-primary/10 rounded-md transition-colors" title="In mã QR">
<span class="material-symbols-outlined text-[20px]">qr_code_2</span>
</button>
</div>
</td>
</tr>
</tbody>
</table>
</div>
<!-- Pagination -->
<div class="mt-auto px-6 py-4 bg-surface-container-low flex items-center justify-between border-t border-surface-variant/50">
<div class="text-sm font-body-sm text-on-surface-variant">
                Hiển thị <span class="font-medium text-on-surface">1</span> đến <span class="font-medium text-on-surface">10</span> trong số <span class="font-medium text-on-surface">248</span> hồ sơ
            </div>
<div class="flex items-center gap-1">
<button class="w-8 h-8 flex items-center justify-center rounded text-on-surface-variant hover:bg-surface-variant transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
<span class="material-symbols-outlined text-sm">chevron_left</span>
</button>
<button class="w-8 h-8 flex items-center justify-center rounded bg-primary text-on-primary font-medium text-sm transition-colors">1</button>
<button class="w-8 h-8 flex items-center justify-center rounded text-on-surface hover:bg-surface-variant font-medium text-sm transition-colors">2</button>
<button class="w-8 h-8 flex items-center justify-center rounded text-on-surface hover:bg-surface-variant font-medium text-sm transition-colors">3</button>
<span class="w-8 h-8 flex items-center justify-center text-on-surface-variant text-sm">...</span>
<button class="w-8 h-8 flex items-center justify-center rounded text-on-surface hover:bg-surface-variant font-medium text-sm transition-colors">25</button>
<button class="w-8 h-8 flex items-center justify-center rounded text-on-surface hover:bg-surface-variant transition-colors">
<span class="material-symbols-outlined text-sm">chevron_right</span>
</button>
</div>
</div>
</div>
</div></main></div></body></html>

<!-- Quản lý Tài khoản -->
<!DOCTYPE html><html lang="vi"><head><meta charset="utf-8"><meta content="width=device-width, initial-scale=1.0" name="viewport"><link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet"><script src="https://cdn.tailwindcss.com"></script></head><body class="bg-canvas-white font-body-base text-on-surface"><aside class="fixed left-0 top-0 h-full w-[280px] bg-charcoal-ink z-50 flex flex-col shadow-xl"><div class="p-8 mb-4 flex items-center gap-3"><img alt="School Logo" class="h-10 w-auto object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpMbZCuyFP9B7rvjyQ_38EbvjBtJc2soSJMu46eeRNdMe2k-t5qucw8ipWPe0-w7FRa2g0XwQMqf_cbKuvhkJxExfmSdxl7xsXABb0kkHGcOiu7PLCwlpLtYRBi33-E1Ccogx8efgthBKRRWgNFV-RVGbehqRkgv1bBPad9itS44dP5bYbX7TjE9k0_H8C1Pq_nabfCS1qOMfhHoGGfOPJ1tpkYpvlyR1IB4ykQYah5K5KldDTpNu1Msb6DGbgcuBelezRWuh-_Wc"><span class="text-white font-headline-lg text-headline-md tracking-tight">EduArchive</span></div><nav class="flex-1 px-4 space-y-1" data-active-classes="bg-primary-container text-on-primary-container font-semibold rounded-xl"><a aria-current="page" class="flex items-center px-4 py-3 transition-all duration-200 group bg-primary-container text-on-primary-container font-semibold rounded-xl" data-path="dashboard" href="#"><span class="material-symbols-outlined mr-4 opacity-70 group-hover:opacity-100" data-original-icon="dashboard">dashboard</span>Dashboard</a><a class="flex items-center px-4 py-3 text-secondary-fixed hover:bg-white/5 hover:text-white rounded-xl transition-all duration-200 group" data-path="quan-ly-ho-so" href="#"><span class="material-symbols-outlined mr-4 opacity-70 group-hover:opacity-100" data-original-icon="folder_open">folder_open</span>Quản lý Hồ sơ</a><a class="flex items-center px-4 py-3 text-secondary-fixed hover:bg-white/5 hover:text-white rounded-xl transition-all duration-200 group" data-path="muon-tra" href="#"><span class="material-symbols-outlined mr-4 opacity-70 group-hover:opacity-100" data-original-icon="assignment_return">assignment_return</span>Mượn trả</a><a class="flex items-center px-4 py-3 text-secondary-fixed hover:bg-white/5 hover:text-white rounded-xl transition-all duration-200 group" data-path="bao-cao" href="#"><span class="material-symbols-outlined mr-4 opacity-70 group-hover:opacity-100">analytics</span>Báo cáo</a><a class="flex items-center px-4 py-3 text-secondary-fixed hover:bg-white/5 hover:text-white rounded-xl transition-all duration-200 group" data-path="quan-tri-he-thong" href="#"><span class="material-symbols-outlined mr-4 opacity-70 group-hover:opacity-100">settings</span>Hệ thống</a></nav><div class="mt-auto p-4 mx-4 mb-8 bg-white/5 rounded-2xl border border-white/10"><div class="flex items-center gap-3 mb-4"><img alt="Profile" class="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPxZCkCqEdxnSzr3u1rq52Npp8s-aWlblCs32Kiexcg5xwl8aaHoiZvee7Auz2LFNy2QAroCujn6vfTuXHbQvZ3bmYKPsTtp8IQEOedyQE9pR9IHXEccLkgqHa9Bu2iiq8-XGVFpGpdvyxzFaXE-1VKqzwKW94IvunR4WM1nPaSEh5vLGyQ2wMNbfYBb21SNlrnKqx8kwBNoI-qLMF6nLW2zXWLoLhDXLj-26zfepg43IGSGSK7VX5stHuOUD6zY9Ow1HeC0Lb2QU"><div class="overflow-hidden"><p class="text-white text-sm font-semibold truncate">Admin User</p><p class="text-secondary-fixed-dim text-xs truncate">Quản trị viên</p></div></div><button class="w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-danger-red hover:bg-danger-red/10 rounded-lg transition-colors"><span class="material-symbols-outlined text-sm">logout</span>Đăng xuất</button></div></aside><div class="pl-[280px] min-h-screen flex flex-col"><header class="sticky top-0 h-20 bg-pure-surface/80 backdrop-blur-xl z-40 border-b border-whisper-border px-10 flex items-center justify-between"><div class="flex items-center gap-6 flex-1 max-w-2xl"><div class="relative w-full"><span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span><input class="w-full pl-12 pr-4 py-2.5 bg-surface-container-low border-none rounded-full text-body-sm focus:ring-2 focus:ring-primary/20 focus:bg-pure-surface transition-all" placeholder="Tìm kiếm hồ sơ, học sinh..." type="text"></div></div><div class="flex items-center gap-6"><button class="relative p-2 text-on-surface-variant hover:bg-surface-container rounded-full transition-colors"><span class="material-symbols-outlined" data-original-icon="notifications">notifications</span><span class="absolute top-2 right-2 w-2 h-2 bg-danger-red rounded-full ring-2 ring-pure-surface"></span></button><button class="flex items-center gap-2 px-6 py-2.5 bg-primary text-on-primary rounded-full font-semibold shadow-lg shadow-primary/20 hover:bg-primary-container hover:scale-[1.02] transition-all"><span class="material-symbols-outlined text-lg" data-original-icon="add_circle">add_circle</span><span>Tạo mới Hồ sơ</span></button></div></header><main class="flex-1 p-content-padding-desktop"><div class="flex flex-col w-full relative">
<div class="flex flex-col gap-10 max-w-6xl mx-auto w-full">
<div class="flex items-center justify-between flex-wrap gap-4">
<div class="flex flex-col gap-1">
<h1 class="font-headline-xl text-headline-xl text-on-surface tracking-tight">Danh sách Tài khoản</h1>
<p class="font-body-base text-body-base text-secondary">Quản lý và phân quyền người dùng trong hệ thống EduArchive.</p>
</div>
<button class="flex items-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-full font-headline-md text-headline-md shadow-md hover:bg-primary-container transition-all duration-300 hover:-translate-y-0.5 relative overflow-hidden group">
<span class="material-symbols-outlined text-[1.25rem] relative z-10">person_add</span>
<span class="relative z-10">Thêm tài khoản mới</span>
<div class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-full"></div>
</button>
</div>
<div class="bg-surface-container rounded-[2rem] p-6 lg:p-8 flex flex-col gap-8 shadow-sm relative overflow-hidden">
<div class="absolute top-0 right-0 w-64 h-64 bg-primary-fixed-dim/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 mix-blend-multiply pointer-events-none"></div>
<div class="flex flex-col md:flex-row gap-4 items-center justify-between relative z-10">
<div class="relative w-full md:w-96 group">
<span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">search</span>
<input class="w-full bg-pure-surface text-on-surface pl-12 pr-4 py-3 rounded-xl font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary/40 shadow-sm transition-all" placeholder="Tìm kiếm theo tên, username..." type="text">
</div>
<div class="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
<span class="font-mono-label text-mono-label text-secondary whitespace-nowrap uppercase tracking-wider">Lọc theo:</span>
<div class="flex items-center gap-2 bg-pure-surface rounded-xl p-1 shadow-sm">
<button class="px-4 py-1.5 rounded-lg bg-secondary-container text-on-secondary-container font-body-sm text-body-sm whitespace-nowrap transition-colors">Tất cả</button>
<button class="px-4 py-1.5 rounded-lg text-secondary hover:bg-surface-container-high font-body-sm text-body-sm whitespace-nowrap transition-colors">Admin</button>
<button class="px-4 py-1.5 rounded-lg text-secondary hover:bg-surface-container-high font-body-sm text-body-sm whitespace-nowrap transition-colors">Giáo viên</button>
<button class="px-4 py-1.5 rounded-lg text-secondary hover:bg-surface-container-high font-body-sm text-body-sm whitespace-nowrap transition-colors">Nhân viên</button>
</div>
</div>
</div>
<div class="w-full overflow-x-auto pb-4 relative z-10">
<table class="w-full text-left border-collapse min-w-[800px]">
<thead>
<tr class="text-secondary font-mono-label text-mono-label uppercase tracking-widest border-b border-whisper-border">
<th class="pb-4 pl-4 font-medium w-16">Avatar</th>
<th class="pb-4 font-medium w-1/4">Họ và Tên</th>
<th class="pb-4 font-medium w-1/4">Username</th>
<th class="pb-4 font-medium w-32">Vai trò</th>
<th class="pb-4 font-medium w-24 text-center">Trạng thái</th>
<th class="pb-4 pr-4 font-medium w-24 text-right">Hành động</th>
</tr>
</thead>
<tbody class="font-body-sm text-body-sm">
<tr class="group border-b border-whisper-border/50 hover:bg-pure-surface/60 transition-colors">
<td class="py-5 pl-4">
<div class="w-10 h-10 rounded-full bg-primary-fixed overflow-hidden flex items-center justify-center text-on-primary-fixed font-headline-md text-headline-md relative shadow-sm">
<img class="w-full h-full object-cover" data-alt="Professional portrait photography of a confident Asian female school administrator in a bright modern office setting, soft natural lighting, shallow depth of field, corporate portrait style." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdsEFqMb9Lj0IqWFVNihFSi1Nk75TVQznOqXw4y3C3f3xIq__BHmm4XKyla9tmmwMSQ0HLPHxz68EyVf33uke8_huglEO_JExMesZnevNF_lilPdN7U1PxlqbUqDAZAzRaQ3zwxyvNT8-N5bYup-gDIKX8V3ICh-I2RoOV5-AQjW4NGPoMcl_9_mNC7qHIsDjYHoGBb8xO8hyRRtREKZZ52-WBUXwwuoMZk1RvPPVng2b7oei8uPNciZu4FOvRZE5LV8MDe3fYkqA">
</div>
</td>
<td class="py-5">
<div class="flex flex-col">
<span class="font-headline-md text-headline-md text-on-surface group-hover:text-primary transition-colors">Nguyễn Trần Bảo Ngọc</span>
<span class="text-secondary text-[0.8rem]">ngoc.ntb@eduarchive.vn</span>
</div>
</td>
<td class="py-5 text-on-surface-variant font-mono-label text-mono-label">@ngoc.admin</td>
<td class="py-5">
<span class="inline-flex items-center px-2.5 py-1 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-mono-label text-mono-label font-medium tracking-wide">
<span class="w-1.5 h-1.5 rounded-full bg-primary mr-1.5"></span>
                                    Admin
                                </span>
</td>
<td class="py-5 text-center">
<button class="relative inline-flex h-5 w-9 items-center rounded-full bg-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
<span class="inline-block h-4 w-4 translate-x-4 transform rounded-full bg-pure-surface transition-transform shadow-sm"></span>
</button>
</td>
<td class="py-5 pr-4 text-right">
<div class="flex items-center justify-end gap-2 opacity-40 group-hover:opacity-100 transition-opacity">
<button class="p-2 text-secondary hover:text-primary hover:bg-primary-fixed/50 rounded-lg transition-colors" title="Chỉnh sửa">
<span class="material-symbols-outlined text-[1.25rem]">edit</span>
</button>
<button class="p-2 text-secondary hover:text-danger-red hover:bg-error-container/50 rounded-lg transition-colors" title="Khóa tài khoản">
<span class="material-symbols-outlined text-[1.25rem]">lock_outline</span>
</button>
</div>
</td>
</tr>
<tr class="group border-b border-whisper-border/50 hover:bg-pure-surface/60 transition-colors">
<td class="py-5 pl-4">
<div class="w-10 h-10 rounded-full bg-tertiary-fixed overflow-hidden flex items-center justify-center text-on-tertiary-fixed font-headline-md text-headline-md relative shadow-sm">
<img class="w-full h-full object-cover" data-alt="Friendly male teacher in his 30s, wearing glasses, smiling in a classroom setting with soft focus background, natural daylight, warm color palette." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjqcDiUIEwc4jO1Mpon0OSTP9mno6KaMXYGt5ePBCRnaDIJUzVSbfbD6CXEPx6-KHPmRaobmWvZayvZem5nwxHc2p1UIjoCzdGPO-Ow_0eQtOqmV2gAAlspLPS2yTy4eKOdfO3QqJ0gmJqEdjF006fD1x1dmVdnW0UAvjt8LOIg2H8EkYafOLCeONx-D2-e15QYoizjSreDkBLtmMure0ahcKuYqrRbfu85j9WxTJYYTBcSt1g5MnF0W4Z94RiJP2K3btfPd8_xSk">
</div>
</td>
<td class="py-5">
<div class="flex flex-col">
<span class="font-headline-md text-headline-md text-on-surface group-hover:text-primary transition-colors">Trần Văn Hùng</span>
<span class="text-secondary text-[0.8rem]">hung.tv@eduarchive.vn</span>
</div>
</td>
<td class="py-5 text-on-surface-variant font-mono-label text-mono-label">@hung.teacher</td>
<td class="py-5">
<span class="inline-flex items-center px-2.5 py-1 rounded-full bg-success-green/10 text-success-green font-mono-label text-mono-label font-medium tracking-wide">
<span class="w-1.5 h-1.5 rounded-full bg-success-green mr-1.5"></span>
                                    Giáo viên
                                </span>
</td>
<td class="py-5 text-center">
<button class="relative inline-flex h-5 w-9 items-center rounded-full bg-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
<span class="inline-block h-4 w-4 translate-x-4 transform rounded-full bg-pure-surface transition-transform shadow-sm"></span>
</button>
</td>
<td class="py-5 pr-4 text-right">
<div class="flex items-center justify-end gap-2 opacity-40 group-hover:opacity-100 transition-opacity">
<button class="p-2 text-secondary hover:text-primary hover:bg-primary-fixed/50 rounded-lg transition-colors" title="Chỉnh sửa">
<span class="material-symbols-outlined text-[1.25rem]">edit</span>
</button>
<button class="p-2 text-secondary hover:text-danger-red hover:bg-error-container/50 rounded-lg transition-colors" title="Khóa tài khoản">
<span class="material-symbols-outlined text-[1.25rem]">lock_outline</span>
</button>
</div>
</td>
</tr>
<tr class="group border-b border-whisper-border/50 hover:bg-pure-surface/60 transition-colors opacity-60 bg-surface-variant/30">
<td class="py-5 pl-4">
<div class="w-10 h-10 rounded-full bg-secondary-fixed overflow-hidden flex items-center justify-center text-on-secondary-fixed font-headline-md text-headline-md relative shadow-sm">
<span>LM</span>
</div>
</td>
<td class="py-5">
<div class="flex flex-col">
<span class="font-headline-md text-headline-md text-on-surface group-hover:text-primary transition-colors">Lê Thị Mai</span>
<span class="text-secondary text-[0.8rem]">mai.lt@eduarchive.vn</span>
</div>
</td>
<td class="py-5 text-on-surface-variant font-mono-label text-mono-label">@mai.staff</td>
<td class="py-5">
<span class="inline-flex items-center px-2.5 py-1 rounded-full bg-surface-variant text-on-surface-variant font-mono-label text-mono-label font-medium tracking-wide">
<span class="w-1.5 h-1.5 rounded-full bg-outline mr-1.5"></span>
                                    Nhân viên
                                </span>
</td>
<td class="py-5 text-center">
<button class="relative inline-flex h-5 w-9 items-center rounded-full bg-surface-variant transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
<span class="inline-block h-4 w-4 translate-x-1 transform rounded-full bg-pure-surface transition-transform shadow-sm"></span>
</button>
</td>
<td class="py-5 pr-4 text-right">
<div class="flex items-center justify-end gap-2 opacity-40 group-hover:opacity-100 transition-opacity">
<button class="p-2 text-secondary hover:text-primary hover:bg-primary-fixed/50 rounded-lg transition-colors" title="Chỉnh sửa">
<span class="material-symbols-outlined text-[1.25rem]">edit</span>
</button>
<button class="p-2 text-secondary hover:text-success-green hover:bg-success-green/10 rounded-lg transition-colors" title="Mở khóa">
<span class="material-symbols-outlined text-[1.25rem]">lock_open</span>
</button>
</div>
</td>
</tr>
</tbody>
</table>
</div>
<div class="flex items-center justify-between border-t border-whisper-border pt-4 mt-auto">
<p class="font-body-sm text-body-sm text-secondary">Hiển thị <span class="font-semibold text-on-surface">1</span> đến <span class="font-semibold text-on-surface">3</span> trong số <span class="font-semibold text-on-surface">12</span> tài khoản</p>
<div class="flex items-center gap-2">
<button class="w-8 h-8 flex items-center justify-center rounded-lg text-secondary hover:bg-surface-container-high hover:text-on-surface transition-colors disabled:opacity-50" disabled="">
<span class="material-symbols-outlined text-sm">chevron_left</span>
</button>
<button class="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-on-primary font-mono-label text-mono-label shadow-sm">1</button>
<button class="w-8 h-8 flex items-center justify-center rounded-lg text-secondary hover:bg-surface-container-high hover:text-on-surface font-mono-label text-mono-label transition-colors">2</button>
<button class="w-8 h-8 flex items-center justify-center rounded-lg text-secondary hover:bg-surface-container-high hover:text-on-surface transition-colors">
<span class="material-symbols-outlined text-sm">chevron_right</span>
</button>
</div>
</div>
</div>
</div>
</div></main></div></body></html>

<!-- Tạo mới Hồ sơ - EduArchive -->
<html lang="vi"><head><meta charset="utf-8"/><meta content="width=device-width, initial-scale=1.0" name="viewport"/><style>@layer base{html,body{margin:0;padding:0;}body{overscroll-behavior:none;}main>:first-child{margin-top:0!important;}main>:last-child{margin-bottom:0!important;}}::-webkit-scrollbar{display:none;}</style><script src="https://cdn.tailwindcss.com"></script><script>tailwind.config={theme:{extend:{"colors":{"on-tertiary-fixed":"#360f00","on-secondary-fixed":"#1a1b22","primary-fixed-dim":"#b4c5ff","surface-dim":"#d9d9e5","outline-variant":"#c3c6d7","canvas-white":"#F9FAFB","on-background":"#191b23","surface-container-highest":"#e1e2ed","surface-container":"#ededf9","surface-container-high":"#e7e7f3","whisper-border":"rgba(226, 232, 240, 0.5)","surface-container-low":"#f3f3fe","primary-fixed":"#dbe1ff","on-tertiary":"#ffffff","tertiary-container":"#bc4800","surface-container-lowest":"#ffffff","primary":"#004ac6","on-primary":"#ffffff","charcoal-ink":"#18181B","surface-bright":"#faf8ff","on-surface":"#191b23","error-container":"#ffdad6","inverse-surface":"#2e3039","secondary":"#5d5e66","on-error-container":"#93000a","on-surface-variant":"#434655","secondary-fixed":"#e3e1ec","on-tertiary-container":"#ffede6","on-tertiary-fixed-variant":"#7d2d00","success-green":"#10B981","on-secondary-container":"#63646c","secondary-container":"#e3e1ec","tertiary-fixed":"#ffdbcd","surface-variant":"#e1e2ed","inverse-primary":"#b4c5ff","on-secondary-fixed-variant":"#46464e","on-primary-fixed-variant":"#003ea8","danger-red":"#EF4444","on-primary-fixed":"#00174b","surface-tint":"#0053db","surface":"#faf8ff","tertiary":"#943700","warning-orange":"#F59E0B","tertiary-fixed-dim":"#ffb596","background":"#faf8ff","pure-surface":"#FFFFFF","on-error":"#ffffff","secondary-fixed-dim":"#c6c5cf","outline":"#737686","on-primary-container":"#eeefff","primary-container":"#2563eb","inverse-on-surface":"#f0f0fb","on-secondary":"#ffffff","error":"#ba1a1a"},"borderRadius":{"DEFAULT":"0.25rem","lg":"0.5rem","xl":"0.75rem","full":"9999px"},"spacing":{"sidebar-width":"280px","gutter":"1.5rem","content-padding-desktop":"4rem","margin-mobile":"1rem"},"fontFamily":{"headline-lg":["Geist"],"mono-label":["JetBrains Mono"],"headline-md":["Geist"],"headline-xl":["Geist"],"body-base":["Geist"],"body-sm":["Geist"]},"fontSize":{"headline-lg":["1.5rem",{"lineHeight":"1.3","letterSpacing":"-0.025em","fontWeight":"700"}],"mono-label":["0.75rem",{"lineHeight":"1.2","fontWeight":"500"}],"headline-md":["1.25rem",{"lineHeight":"1.4","fontWeight":"600"}],"headline-xl":["2.25rem",{"lineHeight":"1.2","letterSpacing":"-0.025em","fontWeight":"700"}],"body-base":["1rem",{"lineHeight":"1.65","fontWeight":"400"}],"body-sm":["0.875rem",{"lineHeight":"1.6","fontWeight":"400"}]}}}}</script><link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap" rel="stylesheet"/></head><body class="bg-canvas-white font-body-base text-on-surface"><aside class="fixed left-0 top-0 h-full w-[280px] bg-charcoal-ink z-50 flex flex-col shadow-xl"><div class="p-8 mb-4 flex items-center gap-3"><img alt="School Logo" class="h-10 w-auto object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpMbZCuyFP9B7rvjyQ_38EbvjBtJc2soSJMu46eeRNdMe2k-t5qucw8ipWPe0-w7FRa2g0XwQMqf_cbKuvhkJxExfmSdxl7xsXABb0kkHGcOiu7PLCwlpLtYRBi33-E1Ccogx8efgthBKRRWgNFV-RVGbehqRkgv1bBPad9itS44dP5bYbX7TjE9k0_H8C1Pq_nabfCS1qOMfhHoGGfOPJ1tpkYpvlyR1IB4ykQYah5K5KldDTpNu1Msb6DGbgcuBelezRWuh-_Wc"/><span class="text-white font-headline-lg text-headline-md tracking-tight">EduArchive</span></div><nav class="flex-1 px-4 space-y-1" data-active-classes="bg-primary-container text-on-primary-container font-semibold rounded-xl"><a aria-current="page" class="flex items-center px-4 py-3 transition-all duration-200 group bg-primary-container text-on-primary-container font-semibold rounded-xl" data-path="dashboard" href="#"><span class="material-symbols-outlined mr-4 opacity-70 group-hover:opacity-100">dashboard</span>Dashboard</a><a class="flex items-center px-4 py-3 text-secondary-fixed hover:bg-white/5 hover:text-white rounded-xl transition-all duration-200 group" data-path="quan-ly-ho-so" href="#"><span class="material-symbols-outlined mr-4 opacity-70 group-hover:opacity-100">folder_open</span>Quản lý Hồ sơ</a><a class="flex items-center px-4 py-3 text-secondary-fixed hover:bg-white/5 hover:text-white rounded-xl transition-all duration-200 group" data-path="muon-tra" href="#"><span class="material-symbols-outlined mr-4 opacity-70 group-hover:opacity-100">assignment_return</span>Mượn trả</a><a class="flex items-center px-4 py-3 text-secondary-fixed hover:bg-white/5 hover:text-white rounded-xl transition-all duration-200 group" data-path="bao-cao" href="#"><span class="material-symbols-outlined mr-4 opacity-70 group-hover:opacity-100">analytics</span>Báo cáo</a><a class="flex items-center px-4 py-3 text-secondary-fixed hover:bg-white/5 hover:text-white rounded-xl transition-all duration-200 group" data-path="quan-tri-he-thong" href="#"><span class="material-symbols-outlined mr-4 opacity-70 group-hover:opacity-100">settings</span>Hệ thống</a></nav><div class="mt-auto p-4 mx-4 mb-8 bg-white/5 rounded-2xl border border-white/10"><div class="flex items-center gap-3 mb-4"><img alt="Profile" class="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPxZCkCqEdxnSzr3u1rq52Npp8s-aWlblCs32Kiexcg5xwl8aaHoiZvee7Auz2LFNy2QAroCujn6vfTuXHbQvZ3bmYKPsTtp8IQEOedyQE9pR9IHXEccLkgqHa9Bu2iiq8-XGVFpGpdvyxzFaXE-1VKqzwKW94IvunR4WM1nPaSEh5vLGyQ2wMNbfYBb21SNlrnKqx8kwBNoI-qLMF6nLW2zXWLoLhDXLj-26zfepg43IGSGSK7VX5stHuOUD6zY9Ow1HeC0Lb2QU"/><div class="overflow-hidden"><p class="text-white text-sm font-semibold truncate">Admin User</p><p class="text-secondary-fixed-dim text-xs truncate">Quản trị viên</p></div></div><button class="w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-danger-red hover:bg-danger-red/10 rounded-lg transition-colors"><span class="material-symbols-outlined text-sm">logout</span>Đăng xuất</button></div></aside><div class="pl-[280px] min-h-screen flex flex-col"><header class="sticky top-0 h-20 bg-pure-surface/80 backdrop-blur-xl z-40 border-b border-whisper-border px-10 flex items-center justify-between"><div class="flex items-center gap-6 flex-1 max-w-2xl"><div class="relative w-full"><span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span><input class="w-full pl-12 pr-4 py-2.5 bg-surface-container-low border-none rounded-full text-body-sm focus:ring-2 focus:ring-primary/20 focus:bg-pure-surface transition-all" placeholder="Tìm kiếm hồ sơ, học sinh..." type="text"/></div></div><div class="flex items-center gap-6"><button class="relative p-2 text-on-surface-variant hover:bg-surface-container rounded-full transition-colors"><span class="material-symbols-outlined">notifications</span><span class="absolute top-2 right-2 w-2 h-2 bg-danger-red rounded-full ring-2 ring-pure-surface"></span></button><button class="flex items-center gap-2 px-6 py-2.5 bg-primary text-on-primary rounded-full font-semibold shadow-lg shadow-primary/20 hover:bg-primary-container hover:scale-[1.02] transition-all"><span class="material-symbols-outlined text-lg">add_circle</span><span>Tạo mới Hồ sơ</span></button></div></header><main class="flex-1 p-content-padding-desktop"><div class="flex flex-col w-full font-body-base text-on-surface">
<div class="max-w-4xl mx-auto w-full relative">
<!-- Header Section -->
<div class="mb-12 relative flex items-center justify-between">
<div class="absolute -left-12 top-1/2 -translate-y-1/2 w-2 h-16 bg-primary rounded-full blur-[2px]"></div>
<div>
<h1 class="font-headline-xl text-headline-xl text-on-background mb-2">Tạo mới Hồ sơ</h1>
<p class="text-on-surface-variant font-body-sm text-body-sm max-w-lg">Nhập đầy đủ thông tin để khởi tạo và lưu trữ hồ sơ mới vào hệ thống. Các trường có dấu <span class="text-danger-red">*</span> là bắt buộc.</p>
</div>
<!-- Decorative Element -->
<div class="hidden lg:block relative w-32 h-32 opacity-20 pointer-events-none">
<svg class="w-full h-full text-primary" fill="currentColor" viewbox="0 0 100 100">
<circle class="animate-[spin_20s_linear_infinite]" cx="50" cy="50" fill="none" r="40" stroke="currentColor" stroke-dasharray="4 8" stroke-width="2"></circle>
<path d="M 50 10 L 50 90 M 10 50 L 90 50" stroke="currentColor" stroke-width="1"></path>
</svg>
</div>
</div>
<!-- Form Main Container -->
<form class="bg-pure-surface rounded-[2rem] shadow-xl shadow-primary/5 p-10 relative overflow-hidden" id="create-profile-form">
<!-- Ambient Background Blob -->
<div class="absolute -right-32 -top-32 w-96 h-96 bg-primary-fixed-dim/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 pointer-events-none"></div>
<div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 relative z-10">
<!-- Section 1: Thông tin cơ bản -->
<div class="md:col-span-2 flex items-center gap-4 mb-4">
<div class="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-headline-md text-headline-md">1</div>
<h2 class="font-headline-lg text-headline-lg text-on-background">Thông tin cơ bản</h2>
<div class="flex-1 h-px bg-surface-variant ml-4"></div>
</div>
<!-- Tên hồ sơ -->
<div class="md:col-span-2 group">
<label class="block font-mono-label text-mono-label text-on-surface-variant mb-2 uppercase tracking-wider" for="profile-name">Tên hồ sơ <span class="text-danger-red">*</span></label>
<div class="relative">
<span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">description</span>
<input class="w-full pl-12 pr-4 py-4 bg-surface-container-low text-on-surface font-body-base text-body-base rounded-xl transition-all duration-300 hover:bg-surface-container focus:bg-pure-surface focus:outline-none focus:ring-2 focus:ring-primary shadow-sm" id="profile-name" placeholder="VD: Hồ sơ học bạ khối 10 năm học 2023-2024" required="" type="text"/>
</div>
</div>
<!-- Mã hồ sơ -->
<div class="group">
<label class="block font-mono-label text-mono-label text-on-surface-variant mb-2 uppercase tracking-wider" for="profile-code">Mã hồ sơ <span class="text-danger-red">*</span></label>
<div class="relative">
<span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">tag</span>
<input class="w-full pl-12 pr-4 py-3.5 bg-surface-container-low text-on-surface font-body-base text-body-base rounded-xl transition-all duration-300 hover:bg-surface-container focus:bg-pure-surface focus:outline-none focus:ring-2 focus:ring-primary shadow-sm font-mono-label" id="profile-code" placeholder="VD: HS-10-2324-001" required="" type="text"/>
</div>
<p class="mt-2 text-on-surface-variant font-body-sm text-body-sm text-[0.75rem]">Hệ thống có thể tự động tạo mã nếu để trống.</p>
</div>
<!-- Ngày lập -->
<div class="group">
<label class="block font-mono-label text-mono-label text-on-surface-variant mb-2 uppercase tracking-wider" for="creation-date">Ngày lập <span class="text-danger-red">*</span></label>
<div class="relative">
<span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">calendar_today</span>
<input class="w-full pl-12 pr-4 py-3.5 bg-surface-container-low text-on-surface font-body-base text-body-base rounded-xl transition-all duration-300 hover:bg-surface-container focus:bg-pure-surface focus:outline-none focus:ring-2 focus:ring-primary shadow-sm cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer" id="creation-date" required="" type="date"/>
</div>
</div>
<!-- Section 2: Phân loại & Vị trí -->
<div class="md:col-span-2 flex items-center gap-4 mt-8 mb-4">
<div class="w-8 h-8 rounded-full bg-tertiary-container text-on-tertiary-container flex items-center justify-center font-headline-md text-headline-md">2</div>
<h2 class="font-headline-lg text-headline-lg text-on-background">Phân loại & Lưu trữ</h2>
<div class="flex-1 h-px bg-surface-variant ml-4"></div>
</div>
<!-- Danh mục -->
<div class="group relative">
<label class="block font-mono-label text-mono-label text-on-surface-variant mb-2 uppercase tracking-wider" for="category">Danh mục</label>
<div class="relative">
<span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-tertiary transition-colors">category</span>
<select class="w-full pl-12 pr-10 py-3.5 bg-surface-container-low text-on-surface font-body-base text-body-base rounded-xl appearance-none transition-all duration-300 hover:bg-surface-container focus:bg-pure-surface focus:outline-none focus:ring-2 focus:ring-tertiary shadow-sm cursor-pointer" id="category">
<option disabled="" selected="" value="">Chọn danh mục...</option>
<option value="hoc-ba">Học bạ</option>
<option value="bang-diem">Bảng điểm</option>
<option value="chung-chi">Chứng chỉ / Văn bằng</option>
<option value="khen-thuong">Khen thưởng / Kỷ luật</option>
</select>
<span class="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline pointer-events-none">expand_more</span>
</div>
</div>
<!-- Vị trí (Kho/Kệ) -->
<div class="group relative">
<label class="block font-mono-label text-mono-label text-on-surface-variant mb-2 uppercase tracking-wider" for="location">Vị trí vật lý (Kho/Kệ)</label>
<div class="relative">
<span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-tertiary transition-colors">shelves</span>
<select class="w-full pl-12 pr-10 py-3.5 bg-surface-container-low text-on-surface font-body-base text-body-base rounded-xl appearance-none transition-all duration-300 hover:bg-surface-container focus:bg-pure-surface focus:outline-none focus:ring-2 focus:ring-tertiary shadow-sm cursor-pointer" id="location">
<option disabled="" selected="" value="">Chọn vị trí lưu trữ...</option>
<option value="kho-a-ke-1">Kho A - Kệ 01 - Tầng 1</option>
<option value="kho-a-ke-2">Kho A - Kệ 02 - Tầng 2</option>
<option value="kho-b-ke-1">Kho B - Kệ 01 - Tầng 1</option>
<option value="kho-lt">Kho Lưu Trữ Mật</option>
</select>
<span class="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline pointer-events-none">expand_more</span>
</div>
</div>
<!-- Mức độ mật (Radio Buttons) -->
<div class="md:col-span-2 mt-4 bg-surface-container-low p-6 rounded-2xl shadow-sm">
<label class="block font-mono-label text-mono-label text-on-surface-variant mb-4 uppercase tracking-wider">Mức độ bảo mật</label>
<div class="flex flex-col sm:flex-row gap-6">
<label class="relative flex-1 cursor-pointer group">
<input checked="" class="peer sr-only" name="security-level" type="radio" value="COMMON"/>
<div class="flex items-center p-4 bg-pure-surface rounded-xl shadow-sm peer-checked:ring-2 peer-checked:ring-primary peer-checked:bg-primary-fixed/20 transition-all duration-300 hover:shadow-md">
<div class="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
<span class="material-symbols-outlined text-on-surface-variant peer-checked:text-primary">public</span>
</div>
<div>
<h3 class="font-headline-md text-headline-md text-on-background">Thông thường</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant">Cho phép giáo viên và ban quản lý truy cập.</p>
</div>
<div class="ml-auto w-6 h-6 rounded-full border-2 border-outline-variant flex items-center justify-center peer-checked:border-primary peer-checked:bg-primary transition-colors">
<span class="material-symbols-outlined text-on-primary text-[1rem] opacity-0 peer-checked:opacity-100 transition-opacity">check</span>
</div>
</div>
</label>
<label class="relative flex-1 cursor-pointer group">
<input class="peer sr-only" name="security-level" type="radio" value="CONFIDENTIAL"/>
<div class="flex items-center p-4 bg-pure-surface rounded-xl shadow-sm peer-checked:ring-2 peer-checked:ring-danger-red peer-checked:bg-error-container/20 transition-all duration-300 hover:shadow-md">
<div class="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
<span class="material-symbols-outlined text-on-surface-variant peer-checked:text-danger-red">lock</span>
</div>
<div>
<h3 class="font-headline-md text-headline-md text-on-background">Bảo mật</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant">Chỉ hiệu trưởng và người được cấp quyền.</p>
</div>
<div class="ml-auto w-6 h-6 rounded-full border-2 border-outline-variant flex items-center justify-center peer-checked:border-danger-red peer-checked:bg-danger-red transition-colors">
<span class="material-symbols-outlined text-on-error text-[1rem] opacity-0 peer-checked:opacity-100 transition-opacity">check</span>
</div>
</div>
</label>
</div>
</div>
<!-- Section 3: Tài liệu đính kèm -->
<div class="md:col-span-2 flex items-center gap-4 mt-8 mb-4">
<div class="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-headline-md text-headline-md">3</div>
<h2 class="font-headline-lg text-headline-lg text-on-background">Tài liệu số hóa</h2>
<div class="flex-1 h-px bg-surface-variant ml-4"></div>
</div>
<!-- Drag & Drop Zone -->
<div class="md:col-span-2">
<div class="relative group w-full p-12 bg-surface-container-low rounded-[2rem] flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 hover:bg-surface-container overflow-hidden" id="drop-zone">
<!-- Nét đứt được làm bằng border để dễ custom -->
<div class="absolute inset-0 rounded-[2rem] border-2 border-dashed border-outline-variant/50 group-hover:border-primary/50 group-hover:bg-primary/5 transition-all duration-300"></div>
<div class="w-20 h-20 bg-pure-surface rounded-full shadow-lg shadow-primary/10 flex items-center justify-center mb-6 group-hover:-translate-y-2 transition-transform duration-500 ease-out z-10">
<span class="material-symbols-outlined text-[2.5rem] text-primary">cloud_upload</span>
</div>
<h3 class="font-headline-md text-headline-md text-on-background mb-2 z-10">Kéo thả tài liệu vào đây</h3>
<p class="font-body-base text-body-base text-on-surface-variant mb-6 z-10">hoặc click để duyệt file từ thiết bị</p>
<div class="flex items-center gap-4 z-10">
<span class="px-3 py-1 bg-pure-surface rounded-full font-mono-label text-mono-label text-secondary shadow-sm">.PDF</span>
<span class="px-3 py-1 bg-pure-surface rounded-full font-mono-label text-mono-label text-secondary shadow-sm">.DOCX</span>
<span class="px-3 py-1 bg-pure-surface rounded-full font-mono-label text-mono-label text-secondary shadow-sm">.JPG/PNG</span>
</div>
<input class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" id="file-upload" multiple="" type="file"/>
</div>
<!-- File List Preview (Hidden by default, shown via JS) -->
<div class="mt-6 flex flex-col gap-3 hidden" id="file-preview-list">
<!-- Template cho file item (sẽ render qua JS) -->
</div>
</div>
</div>
<!-- Action Footer -->
<div class="mt-12 pt-8 relative flex items-center justify-end gap-4 before:content-[''] before:absolute before:top-0 before:left-[-40px] before:right-[-40px] before:h-px before:bg-gradient-to-r before:from-transparent before:via-surface-variant before:to-transparent">
<button class="px-8 py-3.5 rounded-full font-headline-md text-headline-md text-on-surface-variant bg-transparent hover:bg-surface-container-high transition-colors focus:outline-none focus:ring-2 focus:ring-outline" type="button">
          Hủy bỏ
        </button>
<button class="relative overflow-hidden group px-8 py-3.5 rounded-full font-headline-md text-headline-md text-on-primary bg-primary shadow-lg shadow-primary/30 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary/30" type="submit">
<span class="relative z-10 flex items-center gap-2">
<span class="material-symbols-outlined text-[1.2rem]">save</span>
            Lưu hồ sơ
          </span>
<div class="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
</button>
</div>
</form>
</div>
<!-- Ambient Decorative Element Bottom -->
<div class="fixed bottom-0 right-0 w-[40vw] h-[409px] bg-gradient-to-tl from-primary-fixed-dim/10 to-transparent pointer-events-none -z-10 rounded-tl-full blur-3xl"></div>
</div>
<style>
  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }
</style>
<script>
  document.addEventListener('DOMContentLoaded', () => {
    // Set default date to today
    const dateInput = document.getElementById('creation-date');
    if (dateInput) {
      dateInput.valueAsDate = new Date();
    }

    // Drag and drop interaction
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-upload');
    const previewList = document.getElementById('file-preview-list');

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      dropZone.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
      e.preventDefault();
      e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
      dropZone.addEventListener(eventName, () => {
        dropZone.classList.add('border-primary/50', 'bg-primary/5');
      }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropZone.addEventListener(eventName, () => {
        dropZone.classList.remove('border-primary/50', 'bg-primary/5');
      }, false);
    });

    dropZone.addEventListener('drop', handleDrop, false);
    fileInput.addEventListener('change', function() { handleFiles(this.files); });

    function handleDrop(e) {
      const dt = e.dataTransfer;
      const files = dt.files;
      handleFiles(files);
    }

    function handleFiles(files) {
      if (files.length > 0) {
        previewList.classList.remove('hidden');
        
        // Render files (mockup)
        Array.from(files).forEach((file, index) => {
          // Simple size formatting
          const size = (file.size / 1024 / 1024).toFixed(2) + ' MB';
          
          const fileItem = document.createElement('div');
          fileItem.className = 'flex items-center p-4 bg-surface-container-low rounded-xl shadow-sm animate-[fadeIn_0.3s_ease-out] group';
          fileItem.style.animationDelay = `${index * 0.1}s`;
          fileItem.innerHTML = `
            <div class="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center mr-4">
              <span class="material-symbols-outlined text-primary">description</span>
            </div>
            <div class="flex-1 min-w-0">
              <p class="font-headline-md text-headline-md text-on-background truncate">${file.name}</p>
              <p class="font-mono-label text-mono-label text-on-surface-variant mt-1">${size}</p>
            </div>
            <div class="flex items-center gap-4 ml-4">
              <div class="w-32 h-1.5 bg-surface-container rounded-full overflow-hidden hidden sm:block">
                <div class="h-full bg-success-green w-full origin-left animate-[scaleX_1s_ease-out]"></div>
              </div>
              <button type="button" class="p-2 text-on-surface-variant hover:text-danger-red hover:bg-error-container/50 rounded-full transition-colors">
                <span class="material-symbols-outlined">delete</span>
              </button>
            </div>
          `;
          previewList.appendChild(fileItem);
        });
      }
    }

    // Custom animation for file progress
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes scaleX {
        from { transform: scaleX(0); }
        to { transform: scaleX(1); }
      }
    `;
    document.head.appendChild(style);

    // Form submission mockup
    const form = document.getElementById('create-profile-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const originalHtml = btn.innerHTML;
      
      btn.innerHTML = `
        <span class="material-symbols-outlined animate-spin text-[1.2rem]">sync</span>
        Đang xử lý...
      `;
      btn.classList.add('opacity-80', 'pointer-events-none');
      
      setTimeout(() => {
        btn.innerHTML = `
          <span class="material-symbols-outlined text-[1.2rem]">check_circle</span>
          Lưu thành công
        `;
        btn.classList.replace('bg-primary', 'bg-success-green');
        btn.classList.replace('shadow-primary/30', 'shadow-success-green/30');
        
        setTimeout(() => {
          btn.innerHTML = originalHtml;
          btn.classList.replace('bg-success-green', 'bg-primary');
          btn.classList.replace('shadow-success-green/30', 'shadow-primary/30');
          btn.classList.remove('opacity-80', 'pointer-events-none');
          // Reset form or redirect
        }, 2000);
      }, 1500);
    });
  });
</script></main></div></body></html>

<!-- Chi tiết Phiếu mượn - EduArchive -->
<html lang="vi"><head><meta charset="utf-8"/><meta content="width=device-width, initial-scale=1.0" name="viewport"/><style>@layer base{html,body{margin:0;padding:0;}body{overscroll-behavior:none;}main>:first-child{margin-top:0!important;}main>:last-child{margin-bottom:0!important;}}::-webkit-scrollbar{display:none;}</style><script src="https://cdn.tailwindcss.com"></script><script>tailwind.config={theme:{extend:{"colors":{"on-tertiary-fixed":"#360f00","on-secondary-fixed":"#1a1b22","primary-fixed-dim":"#b4c5ff","surface-dim":"#d9d9e5","outline-variant":"#c3c6d7","canvas-white":"#F9FAFB","on-background":"#191b23","surface-container-highest":"#e1e2ed","surface-container":"#ededf9","surface-container-high":"#e7e7f3","whisper-border":"rgba(226, 232, 240, 0.5)","surface-container-low":"#f3f3fe","primary-fixed":"#dbe1ff","on-tertiary":"#ffffff","tertiary-container":"#bc4800","surface-container-lowest":"#ffffff","primary":"#004ac6","on-primary":"#ffffff","charcoal-ink":"#18181B","surface-bright":"#faf8ff","on-surface":"#191b23","error-container":"#ffdad6","inverse-surface":"#2e3039","secondary":"#5d5e66","on-error-container":"#93000a","on-surface-variant":"#434655","secondary-fixed":"#e3e1ec","on-tertiary-container":"#ffede6","on-tertiary-fixed-variant":"#7d2d00","success-green":"#10B981","on-secondary-container":"#63646c","secondary-container":"#e3e1ec","tertiary-fixed":"#ffdbcd","surface-variant":"#e1e2ed","inverse-primary":"#b4c5ff","on-secondary-fixed-variant":"#46464e","on-primary-fixed-variant":"#003ea8","danger-red":"#EF4444","on-primary-fixed":"#00174b","surface-tint":"#0053db","surface":"#faf8ff","tertiary":"#943700","warning-orange":"#F59E0B","tertiary-fixed-dim":"#ffb596","background":"#faf8ff","pure-surface":"#FFFFFF","on-error":"#ffffff","secondary-fixed-dim":"#c6c5cf","outline":"#737686","on-primary-container":"#eeefff","primary-container":"#2563eb","inverse-on-surface":"#f0f0fb","on-secondary":"#ffffff","error":"#ba1a1a"},"borderRadius":{"DEFAULT":"0.25rem","lg":"0.5rem","xl":"0.75rem","full":"9999px"},"spacing":{"sidebar-width":"280px","gutter":"1.5rem","content-padding-desktop":"4rem","margin-mobile":"1rem"},"fontFamily":{"headline-lg":["Geist"],"mono-label":["JetBrains Mono"],"headline-md":["Geist"],"headline-xl":["Geist"],"body-base":["Geist"],"body-sm":["Geist"]},"fontSize":{"headline-lg":["1.5rem",{"lineHeight":"1.3","letterSpacing":"-0.025em","fontWeight":"700"}],"mono-label":["0.75rem",{"lineHeight":"1.2","fontWeight":"500"}],"headline-md":["1.25rem",{"lineHeight":"1.4","fontWeight":"600"}],"headline-xl":["2.25rem",{"lineHeight":"1.2","letterSpacing":"-0.025em","fontWeight":"700"}],"body-base":["1rem",{"lineHeight":"1.65","fontWeight":"400"}],"body-sm":["0.875rem",{"lineHeight":"1.6","fontWeight":"400"}]}}}}</script><link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap" rel="stylesheet"/></head><body class="bg-canvas-white font-body-base text-on-surface"><aside class="fixed left-0 top-0 h-full w-[280px] bg-charcoal-ink z-50 flex flex-col shadow-xl"><div class="p-8 mb-4 flex items-center gap-3"><img alt="School Logo" class="h-10 w-auto object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpMbZCuyFP9B7rvjyQ_38EbvjBtJc2soSJMu46eeRNdMe2k-t5qucw8ipWPe0-w7FRa2g0XwQMqf_cbKuvhkJxExfmSdxl7xsXABb0kkHGcOiu7PLCwlpLtYRBi33-E1Ccogx8efgthBKRRWgNFV-RVGbehqRkgv1bBPad9itS44dP5bYbX7TjE9k0_H8C1Pq_nabfCS1qOMfhHoGGfOPJ1tpkYpvlyR1IB4ykQYah5K5KldDTpNu1Msb6DGbgcuBelezRWuh-_Wc"/><span class="text-white font-headline-lg text-headline-md tracking-tight">EduArchive</span></div><nav class="flex-1 px-4 space-y-1" data-active-classes="bg-primary-container text-on-primary-container font-semibold rounded-xl"><a aria-current="page" class="flex items-center px-4 py-3 transition-all duration-200 group bg-primary-container text-on-primary-container font-semibold rounded-xl" data-path="dashboard" href="#"><span class="material-symbols-outlined mr-4 opacity-70 group-hover:opacity-100">dashboard</span>Dashboard</a><a class="flex items-center px-4 py-3 text-secondary-fixed hover:bg-white/5 hover:text-white rounded-xl transition-all duration-200 group" data-path="quan-ly-ho-so" href="#"><span class="material-symbols-outlined mr-4 opacity-70 group-hover:opacity-100">folder_open</span>Quản lý Hồ sơ</a><a class="flex items-center px-4 py-3 text-secondary-fixed hover:bg-white/5 hover:text-white rounded-xl transition-all duration-200 group" data-path="muon-tra" href="#"><span class="material-symbols-outlined mr-4 opacity-70 group-hover:opacity-100">assignment_return</span>Mượn trả</a><a class="flex items-center px-4 py-3 text-secondary-fixed hover:bg-white/5 hover:text-white rounded-xl transition-all duration-200 group" data-path="bao-cao" href="#"><span class="material-symbols-outlined mr-4 opacity-70 group-hover:opacity-100">analytics</span>Báo cáo</a><a class="flex items-center px-4 py-3 text-secondary-fixed hover:bg-white/5 hover:text-white rounded-xl transition-all duration-200 group" data-path="quan-tri-he-thong" href="#"><span class="material-symbols-outlined mr-4 opacity-70 group-hover:opacity-100">settings</span>Hệ thống</a></nav><div class="mt-auto p-4 mx-4 mb-8 bg-white/5 rounded-2xl border border-white/10"><div class="flex items-center gap-3 mb-4"><img alt="Profile" class="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPxZCkCqEdxnSzr3u1rq52Npp8s-aWlblCs32Kiexcg5xwl8aaHoiZvee7Auz2LFNy2QAroCujn6vfTuXHbQvZ3bmYKPsTtp8IQEOedyQE9pR9IHXEccLkgqHa9Bu2iiq8-XGVFpGpdvyxzFaXE-1VKqzwKW94IvunR4WM1nPaSEh5vLGyQ2wMNbfYBb21SNlrnKqx8kwBNoI-qLMF6nLW2zXWLoLhDXLj-26zfepg43IGSGSK7VX5stHuOUD6zY9Ow1HeC0Lb2QU"/><div class="overflow-hidden"><p class="text-white text-sm font-semibold truncate">Admin User</p><p class="text-secondary-fixed-dim text-xs truncate">Quản trị viên</p></div></div><button class="w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-danger-red hover:bg-danger-red/10 rounded-lg transition-colors"><span class="material-symbols-outlined text-sm">logout</span>Đăng xuất</button></div></aside><div class="pl-[280px] min-h-screen flex flex-col"><header class="sticky top-0 h-20 bg-pure-surface/80 backdrop-blur-xl z-40 border-b border-whisper-border px-10 flex items-center justify-between"><div class="flex items-center gap-6 flex-1 max-w-2xl"><div class="relative w-full"><span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span><input class="w-full pl-12 pr-4 py-2.5 bg-surface-container-low border-none rounded-full text-body-sm focus:ring-2 focus:ring-primary/20 focus:bg-pure-surface transition-all" placeholder="Tìm kiếm hồ sơ, học sinh..." type="text"/></div></div><div class="flex items-center gap-6"><button class="relative p-2 text-on-surface-variant hover:bg-surface-container rounded-full transition-colors"><span class="material-symbols-outlined">notifications</span><span class="absolute top-2 right-2 w-2 h-2 bg-danger-red rounded-full ring-2 ring-pure-surface"></span></button><button class="flex items-center gap-2 px-6 py-2.5 bg-primary text-on-primary rounded-full font-semibold shadow-lg shadow-primary/20 hover:bg-primary-container hover:scale-[1.02] transition-all"><span class="material-symbols-outlined text-lg">add_circle</span><span>Tạo mới Hồ sơ</span></button></div></header><main class="flex-1 p-content-padding-desktop"><div class="flex flex-col w-full h-full pb-8">
<div class="grid grid-cols-12 gap-gutter max-w-7xl mx-auto w-full">
<!-- Header Actions -->
<div class="col-span-12 flex justify-between items-end mb-4">
<div class="flex items-center gap-3 text-secondary hover:text-primary transition-colors cursor-pointer group w-max">
<span class="material-symbols-outlined text-xl group-hover:-translate-x-1 transition-transform">arrow_back</span>
<span class="font-body-sm text-body-sm tracking-wide uppercase">Quay lại danh sách</span>
</div>
<div class="flex items-center gap-3">
<button class="px-5 py-2.5 rounded-xl font-body-sm text-body-sm bg-surface-container-high text-on-surface hover:bg-surface-container-highest transition-colors flex items-center gap-2">
<span class="material-symbols-outlined text-lg">print</span>
                    In phiếu
                </button>
<button class="px-5 py-2.5 rounded-xl font-body-sm text-body-sm bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-md shadow-primary/20 flex items-center gap-2">
<span class="material-symbols-outlined text-lg">edit</span>
                    Cập nhật trạng thái
                </button>
</div>
</div>
<!-- Main Content Area -->
<div class="col-span-12 lg:col-span-8 flex flex-col gap-6">
<!-- Hero Card: Record Info -->
<div class="bg-pure-surface rounded-[2rem] p-8 shadow-sm relative overflow-hidden group">
<!-- Status Badge Absolute -->
<div class="absolute top-8 right-8 px-4 py-2 bg-error-container text-on-error-container font-mono-label text-mono-label rounded-full flex items-center gap-2 animate-[pulse_2s_ease-in-out_infinite]">
<span class="material-symbols-outlined text-sm" style="font-variation-settings: 'FILL' 1;">warning</span>
                    QUÁ HẠN 3 NGÀY
                </div>
<div class="flex items-start gap-6">
<div class="w-20 h-24 bg-surface-container rounded-xl flex items-center justify-center text-primary-fixed-dim shadow-inner relative overflow-hidden">
<span class="material-symbols-outlined text-4xl" style="font-variation-settings: 'FILL' 1;">folder_special</span>
<div class="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-primary/10 to-transparent"></div>
</div>
<div class="flex-1">
<p class="font-mono-label text-mono-label text-secondary mb-2 tracking-widest">MÃ PHIẾU: PM-2024-089</p>
<h1 class="font-headline-xl text-headline-xl text-on-surface mb-2 leading-tight">Hồ sơ thẩm định dự án Cải tạo cảnh quan sân trường cơ sở 1</h1>
<div class="flex items-center gap-4 mt-6 flex-wrap">
<div class="flex items-center gap-2 bg-surface px-3 py-1.5 rounded-lg">
<span class="material-symbols-outlined text-outline text-sm">barcode</span>
<span class="font-mono-label text-mono-label text-on-surface-variant">HS-2023-A014</span>
</div>
<div class="flex items-center gap-2 bg-surface px-3 py-1.5 rounded-lg">
<span class="material-symbols-outlined text-outline text-sm">category</span>
<span class="font-body-sm text-body-sm text-on-surface-variant">Hồ sơ dự án</span>
</div>
<div class="flex items-center gap-2 bg-surface px-3 py-1.5 rounded-lg">
<span class="material-symbols-outlined text-outline text-sm">inventory_2</span>
<span class="font-body-sm text-body-sm text-on-surface-variant">Kho 2, Tủ B, Kệ 04</span>
</div>
</div>
</div>
</div>
<!-- Decorative background elements -->
<div class="absolute -right-20 -bottom-20 w-64 h-64 bg-danger-red/5 rounded-full blur-3xl group-hover:bg-danger-red/10 transition-colors duration-1000"></div>
</div>
<!-- Borrower Info & Purpose Split -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
<!-- Borrower Card -->
<div class="bg-pure-surface rounded-3xl p-8 shadow-sm">
<div class="flex items-center gap-3 mb-6">
<span class="material-symbols-outlined text-primary bg-primary-fixed p-2 rounded-lg">person</span>
<h2 class="font-headline-md text-headline-md text-on-surface">Người mượn</h2>
</div>
<div class="flex items-center gap-4 mb-6">
<div class="w-16 h-16 rounded-full bg-surface-container overflow-hidden shadow-sm">
<img class="w-full h-full object-cover" data-alt="A professional headshot of an Asian male teacher in his 40s, wearing a crisp light blue shirt and tie, soft natural lighting, set against a blurred academic background, conveying trust and experience, highly detailed photography." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzkVxMHVpnwReTHOxYYMc05CHSSp-uvBdPd-oCQzBIutL-EwfSJKcBh_hKkN01yA9lfYSr8OW-YXHI6wkF2td02dYXiqlYUsVUbGAVulJ1mDYgV5D-07oVP2Kyt4m91WJoAGAOx4hqQm256GSEbFWZkO5u8RFZkQbWhgOYp_Rgfg0RESNvm_h8PNA404JPbcJKXzb0dunQTsktcUzdIFfNDE_t2tc3eMMv_fU84dpSkFf0DDQTzoxc2Bu6f1OJ7MONR-w-4DQekTw"/>
</div>
<div>
<h3 class="font-headline-md text-headline-md text-on-surface text-[1.125rem]">Nguyễn Văn Hoàng</h3>
<p class="font-body-sm text-body-sm text-secondary">GV. Toán Tin</p>
</div>
</div>
<div class="space-y-4">
<div class="flex justify-between items-center py-2 border-b border-surface-container">
<span class="font-body-sm text-body-sm text-secondary">Phòng ban</span>
<span class="font-body-base text-body-base text-on-surface font-medium">Tổ Tự nhiên</span>
</div>
<div class="flex justify-between items-center py-2 border-b border-surface-container">
<span class="font-body-sm text-body-sm text-secondary">Liên hệ</span>
<span class="font-mono-label text-mono-label text-on-surface font-medium">098x.xxx.789</span>
</div>
<div class="flex justify-between items-center py-2">
<span class="font-body-sm text-body-sm text-secondary">Số lần vi phạm</span>
<span class="font-body-base text-body-base text-on-surface font-medium">0 lần</span>
</div>
</div>
</div>
<!-- Purpose & Notes Card -->
<div class="bg-surface-container-low rounded-3xl p-8">
<div class="flex items-center gap-3 mb-6">
<span class="material-symbols-outlined text-tertiary bg-tertiary-fixed p-2 rounded-lg">edit_note</span>
<h2 class="font-headline-md text-headline-md text-on-surface">Mục đích & Ghi chú</h2>
</div>
<div class="space-y-6">
<div>
<h4 class="font-body-sm text-body-sm text-secondary uppercase tracking-wider mb-2">Mục đích mượn</h4>
<p class="font-body-base text-body-base text-on-surface leading-relaxed">
                                Tham khảo để lập kế hoạch dự án cải tạo cảnh quan năm học 2024-2025. Cần xem xét chi tiết bản vẽ và dự toán đính kèm.
                            </p>
</div>
<div>
<h4 class="font-body-sm text-body-sm text-secondary uppercase tracking-wider mb-2">Ghi chú thủ kho</h4>
<div class="bg-warning-orange/10 p-4 rounded-xl">
<p class="font-body-sm text-body-sm text-on-surface-variant italic">
                                    "Hồ sơ gồm 2 tập tài liệu chính và 1 cuộn bản vẽ khổ A0. Đã kiểm tra tình trạng nguyên vẹn trước khi bàn giao."
                                </p>
</div>
</div>
</div>
</div>
</div>
<!-- Quick Actions / Meta Data -->
<div class="bg-pure-surface rounded-3xl p-6 shadow-sm flex flex-wrap gap-4 items-center justify-between">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-success-green">verified_user</span>
<span class="font-body-sm text-body-sm text-on-surface-variant">Người duyệt: <strong class="text-on-surface">Trần Thị Bích (BGH)</strong></span>
</div>
<div class="h-4 w-[1px] bg-outline-variant hidden sm:block"></div>
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-secondary">update</span>
<span class="font-body-sm text-body-sm text-on-surface-variant">Cập nhật lần cuối: 12/05/2024 14:30</span>
</div>
</div>
</div>
<!-- Sidebar: Timeline -->
<div class="col-span-12 lg:col-span-4 h-full">
<div class="bg-pure-surface rounded-[2rem] p-8 shadow-sm h-full sticky top-24">
<div class="flex items-center gap-3 mb-8">
<span class="material-symbols-outlined text-on-surface">timeline</span>
<h2 class="font-headline-lg text-headline-lg text-on-surface">Tiến trình</h2>
</div>
<div class="relative pl-6 space-y-10 before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-6 before:w-0.5 before:bg-surface-container-high">
<!-- Step 1: Done -->
<div class="relative">
<div class="absolute -left-[30px] top-1 w-5 h-5 rounded-full bg-success-green ring-4 ring-pure-surface flex items-center justify-center">
<span class="material-symbols-outlined text-[12px] text-white">check</span>
</div>
<div>
<h3 class="font-headline-md text-headline-md text-on-surface text-[1.125rem]">Yêu cầu mượn</h3>
<p class="font-mono-label text-mono-label text-secondary mt-1">10/05/2024 - 08:30</p>
</div>
</div>
<!-- Step 2: Done -->
<div class="relative">
<div class="absolute -left-[30px] top-1 w-5 h-5 rounded-full bg-success-green ring-4 ring-pure-surface flex items-center justify-center">
<span class="material-symbols-outlined text-[12px] text-white">check</span>
</div>
<div>
<h3 class="font-headline-md text-headline-md text-on-surface text-[1.125rem]">Đã duyệt</h3>
<p class="font-mono-label text-mono-label text-secondary mt-1">11/05/2024 - 15:45</p>
</div>
</div>
<!-- Step 3: Done -->
<div class="relative">
<div class="absolute -left-[30px] top-1 w-5 h-5 rounded-full bg-success-green ring-4 ring-pure-surface flex items-center justify-center">
<span class="material-symbols-outlined text-[12px] text-white">check</span>
</div>
<div>
<h3 class="font-headline-md text-headline-md text-on-surface text-[1.125rem]">Đã nhận hồ sơ</h3>
<p class="font-mono-label text-mono-label text-secondary mt-1">12/05/2024 - 09:15</p>
</div>
</div>
<!-- Step 4: Current/Overdue -->
<div class="relative">
<div class="absolute -left-[32px] top-1 w-6 h-6 rounded-full bg-danger-red ring-4 ring-error-container flex items-center justify-center animate-[pulse_2s_ease-in-out_infinite]">
<div class="w-2.5 h-2.5 rounded-full bg-white"></div>
</div>
<div class="bg-error-container/30 -mt-2 -ml-2 p-4 rounded-xl">
<h3 class="font-headline-md text-headline-md text-danger-red text-[1.125rem]">Hạn trả (Quá hạn)</h3>
<p class="font-mono-label text-mono-label text-danger-red mt-1">Dự kiến: 19/05/2024</p>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-2">
                                Đã gửi email nhắc nhở tự động lúc 08:00 hôm nay.
                            </p>
<button class="mt-3 px-4 py-1.5 bg-danger-red/10 text-danger-red font-body-sm text-body-sm rounded-lg hover:bg-danger-red hover:text-white transition-colors w-full text-center">
                                Gửi lại thông báo
                            </button>
</div>
</div>
<!-- Step 5: Pending -->
<div class="relative opacity-40">
<div class="absolute -left-[28px] top-1 w-4 h-4 rounded-full bg-surface-container-highest ring-4 ring-pure-surface"></div>
<div>
<h3 class="font-headline-md text-headline-md text-on-surface text-[1.125rem]">Hoàn tất trả</h3>
<p class="font-mono-label text-mono-label text-secondary mt-1">Chưa thực hiện</p>
</div>
</div>
</div>
</div>
</div>
</div>
</div></main></div></body></html>

<!-- Quản lý Mượn trả - EduArchive -->
<html lang="vi"><head><meta charset="utf-8"/><meta content="width=device-width, initial-scale=1.0" name="viewport"/><style>@layer base{html,body{margin:0;padding:0;}body{overscroll-behavior:none;}main>:first-child{margin-top:0!important;}main>:last-child{margin-bottom:0!important;}}::-webkit-scrollbar{display:none;}</style><script src="https://cdn.tailwindcss.com"></script><script>tailwind.config={theme:{extend:{"colors":{"on-tertiary-fixed":"#360f00","on-secondary-fixed":"#1a1b22","primary-fixed-dim":"#b4c5ff","surface-dim":"#d9d9e5","outline-variant":"#c3c6d7","canvas-white":"#F9FAFB","on-background":"#191b23","surface-container-highest":"#e1e2ed","surface-container":"#ededf9","surface-container-high":"#e7e7f3","whisper-border":"rgba(226, 232, 240, 0.5)","surface-container-low":"#f3f3fe","primary-fixed":"#dbe1ff","on-tertiary":"#ffffff","tertiary-container":"#bc4800","surface-container-lowest":"#ffffff","primary":"#004ac6","on-primary":"#ffffff","charcoal-ink":"#18181B","surface-bright":"#faf8ff","on-surface":"#191b23","error-container":"#ffdad6","inverse-surface":"#2e3039","secondary":"#5d5e66","on-error-container":"#93000a","on-surface-variant":"#434655","secondary-fixed":"#e3e1ec","on-tertiary-container":"#ffede6","on-tertiary-fixed-variant":"#7d2d00","success-green":"#10B981","on-secondary-container":"#63646c","secondary-container":"#e3e1ec","tertiary-fixed":"#ffdbcd","surface-variant":"#e1e2ed","inverse-primary":"#b4c5ff","on-secondary-fixed-variant":"#46464e","on-primary-fixed-variant":"#003ea8","danger-red":"#EF4444","on-primary-fixed":"#00174b","surface-tint":"#0053db","surface":"#faf8ff","tertiary":"#943700","warning-orange":"#F59E0B","tertiary-fixed-dim":"#ffb596","background":"#faf8ff","pure-surface":"#FFFFFF","on-error":"#ffffff","secondary-fixed-dim":"#c6c5cf","outline":"#737686","on-primary-container":"#eeefff","primary-container":"#2563eb","inverse-on-surface":"#f0f0fb","on-secondary":"#ffffff","error":"#ba1a1a"},"borderRadius":{"DEFAULT":"0.25rem","lg":"0.5rem","xl":"0.75rem","full":"9999px"},"spacing":{"sidebar-width":"280px","gutter":"1.5rem","content-padding-desktop":"4rem","margin-mobile":"1rem"},"fontFamily":{"headline-lg":["Geist"],"mono-label":["JetBrains Mono"],"headline-md":["Geist"],"headline-xl":["Geist"],"body-base":["Geist"],"body-sm":["Geist"]},"fontSize":{"headline-lg":["1.5rem",{"lineHeight":"1.3","letterSpacing":"-0.025em","fontWeight":"700"}],"mono-label":["0.75rem",{"lineHeight":"1.2","fontWeight":"500"}],"headline-md":["1.25rem",{"lineHeight":"1.4","fontWeight":"600"}],"headline-xl":["2.25rem",{"lineHeight":"1.2","letterSpacing":"-0.025em","fontWeight":"700"}],"body-base":["1rem",{"lineHeight":"1.65","fontWeight":"400"}],"body-sm":["0.875rem",{"lineHeight":"1.6","fontWeight":"400"}]}}}}</script><link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap" rel="stylesheet"/></head><body class="bg-canvas-white font-body-base text-on-surface"><aside class="fixed left-0 top-0 h-full w-[280px] bg-charcoal-ink z-50 flex flex-col shadow-xl"><div class="p-8 mb-4 flex items-center gap-3"><img alt="School Logo" class="h-10 w-auto object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpMbZCuyFP9B7rvjyQ_38EbvjBtJc2soSJMu46eeRNdMe2k-t5qucw8ipWPe0-w7FRa2g0XwQMqf_cbKuvhkJxExfmSdxl7xsXABb0kkHGcOiu7PLCwlpLtYRBi33-E1Ccogx8efgthBKRRWgNFV-RVGbehqRkgv1bBPad9itS44dP5bYbX7TjE9k0_H8C1Pq_nabfCS1qOMfhHoGGfOPJ1tpkYpvlyR1IB4ykQYah5K5KldDTpNu1Msb6DGbgcuBelezRWuh-_Wc"/><span class="text-white font-headline-lg text-headline-md tracking-tight">EduArchive</span></div><nav class="flex-1 px-4 space-y-1" data-active-classes="bg-primary-container text-on-primary-container font-semibold rounded-xl"><a aria-current="page" class="flex items-center px-4 py-3 transition-all duration-200 group bg-primary-container text-on-primary-container font-semibold rounded-xl" data-path="dashboard" href="#"><span class="material-symbols-outlined mr-4 opacity-70 group-hover:opacity-100">dashboard</span>Dashboard</a><a class="flex items-center px-4 py-3 text-secondary-fixed hover:bg-white/5 hover:text-white rounded-xl transition-all duration-200 group" data-path="quan-ly-ho-so" href="#"><span class="material-symbols-outlined mr-4 opacity-70 group-hover:opacity-100">folder_open</span>Quản lý Hồ sơ</a><a class="flex items-center px-4 py-3 text-secondary-fixed hover:bg-white/5 hover:text-white rounded-xl transition-all duration-200 group" data-path="muon-tra" href="#"><span class="material-symbols-outlined mr-4 opacity-70 group-hover:opacity-100">assignment_return</span>Mượn trả</a><a class="flex items-center px-4 py-3 text-secondary-fixed hover:bg-white/5 hover:text-white rounded-xl transition-all duration-200 group" data-path="bao-cao" href="#"><span class="material-symbols-outlined mr-4 opacity-70 group-hover:opacity-100">analytics</span>Báo cáo</a><a class="flex items-center px-4 py-3 text-secondary-fixed hover:bg-white/5 hover:text-white rounded-xl transition-all duration-200 group" data-path="quan-tri-he-thong" href="#"><span class="material-symbols-outlined mr-4 opacity-70 group-hover:opacity-100">settings</span>Hệ thống</a></nav><div class="mt-auto p-4 mx-4 mb-8 bg-white/5 rounded-2xl border border-white/10"><div class="flex items-center gap-3 mb-4"><img alt="Profile" class="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPxZCkCqEdxnSzr3u1rq52Npp8s-aWlblCs32Kiexcg5xwl8aaHoiZvee7Auz2LFNy2QAroCujn6vfTuXHbQvZ3bmYKPsTtp8IQEOedyQE9pR9IHXEccLkgqHa9Bu2iiq8-XGVFpGpdvyxzFaXE-1VKqzwKW94IvunR4WM1nPaSEh5vLGyQ2wMNbfYBb21SNlrnKqx8kwBNoI-qLMF6nLW2zXWLoLhDXLj-26zfepg43IGSGSK7VX5stHuOUD6zY9Ow1HeC0Lb2QU"/><div class="overflow-hidden"><p class="text-white text-sm font-semibold truncate">Admin User</p><p class="text-secondary-fixed-dim text-xs truncate">Quản trị viên</p></div></div><button class="w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-danger-red hover:bg-danger-red/10 rounded-lg transition-colors"><span class="material-symbols-outlined text-sm">logout</span>Đăng xuất</button></div></aside><div class="pl-[280px] min-h-screen flex flex-col"><header class="sticky top-0 h-20 bg-pure-surface/80 backdrop-blur-xl z-40 border-b border-whisper-border px-10 flex items-center justify-between"><div class="flex items-center gap-6 flex-1 max-w-2xl"><div class="relative w-full"><span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span><input class="w-full pl-12 pr-4 py-2.5 bg-surface-container-low border-none rounded-full text-body-sm focus:ring-2 focus:ring-primary/20 focus:bg-pure-surface transition-all" placeholder="Tìm kiếm hồ sơ, học sinh..." type="text"/></div></div><div class="flex items-center gap-6"><button class="relative p-2 text-on-surface-variant hover:bg-surface-container rounded-full transition-colors"><span class="material-symbols-outlined">notifications</span><span class="absolute top-2 right-2 w-2 h-2 bg-danger-red rounded-full ring-2 ring-pure-surface"></span></button><button class="flex items-center gap-2 px-6 py-2.5 bg-primary text-on-primary rounded-full font-semibold shadow-lg shadow-primary/20 hover:bg-primary-container hover:scale-[1.02] transition-all"><span class="material-symbols-outlined text-lg">add_circle</span><span>Tạo mới Hồ sơ</span></button></div></header><main class="flex-1 p-content-padding-desktop"><div class="flex flex-col w-full h-full relative font-body-base">
<div class="flex items-center justify-between mb-10">
<div>
<h1 class="font-headline-xl text-headline-xl text-on-surface mb-2">Mượn trả Hồ sơ</h1>
<p class="font-body-base text-body-base text-on-surface-variant max-w-2xl">Quản lý và theo dõi quá trình mượn, trả hồ sơ lưu trữ của cán bộ và học sinh trong trường.</p>
</div>
<div class="flex gap-3">
<button class="flex items-center gap-2 px-5 py-2.5 bg-surface-container-highest text-on-surface font-headline-md text-body-sm rounded-lg hover:bg-surface-variant transition-colors group">
<span class="material-symbols-outlined text-xl text-on-surface-variant group-hover:text-primary transition-colors">history</span>
                Lịch sử
            </button>
<button class="flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary font-headline-md text-body-sm rounded-lg shadow-lg shadow-primary/20 hover:bg-primary-container hover:scale-[1.02] transition-all group">
<span class="material-symbols-outlined text-xl group-hover:rotate-90 transition-transform">add</span>
                Tạo yêu cầu mới
            </button>
</div>
</div>
<div class="flex gap-6 mb-8 w-full border-b border-whisper-border">
<button class="px-6 py-4 text-primary font-headline-md text-body-base relative group">
<span class="relative z-10 flex items-center gap-2">
                Chờ duyệt
                <span class="bg-primary-container text-on-primary-container px-2 py-0.5 rounded-full font-mono-label text-mono-label">12</span>
</span>
<div class="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-full"></div>
</button>
<button class="px-6 py-4 text-on-surface-variant font-headline-md text-body-base relative group hover:text-on-surface transition-colors">
<span class="relative z-10 flex items-center gap-2">
                Đang mượn
                <span class="bg-surface-container-highest text-on-surface px-2 py-0.5 rounded-full font-mono-label text-mono-label">45</span>
</span>
<div class="absolute bottom-0 left-0 w-full h-0.5 bg-transparent group-hover:bg-outline-variant rounded-t-full transition-colors"></div>
</button>
<button class="px-6 py-4 text-on-surface-variant font-headline-md text-body-base relative group hover:text-on-surface transition-colors">
<span class="relative z-10 flex items-center gap-2">
                Quá hạn
                <span class="bg-error-container text-on-error-container px-2 py-0.5 rounded-full font-mono-label text-mono-label">3</span>
</span>
<div class="absolute bottom-0 left-0 w-full h-0.5 bg-transparent group-hover:bg-outline-variant rounded-t-full transition-colors"></div>
</button>
</div>
<div class="bg-pure-surface rounded-2xl shadow-sm flex-1 flex flex-col overflow-hidden">
<div class="p-4 border-b border-whisper-border bg-surface-container-lowest flex items-center justify-between">
<div class="flex items-center gap-4">
<div class="relative">
<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant text-[20px]">search</span>
<input class="pl-10 pr-4 py-2 w-72 bg-surface-container-low border-none rounded-lg font-body-sm text-body-sm text-on-surface focus:ring-2 focus:ring-primary/30 transition-shadow" placeholder="Tìm theo người mượn, mã hồ sơ..." type="text"/>
</div>
<button class="p-2 text-on-surface-variant hover:bg-surface-container rounded-lg transition-colors flex items-center gap-2 font-body-sm text-body-sm">
<span class="material-symbols-outlined text-[20px]">filter_list</span>
                    Lọc
                </button>
</div>
<div class="flex items-center gap-2 text-on-surface-variant font-body-sm text-body-sm">
<span>Hiển thị</span>
<select class="bg-surface-container-low border-none rounded-lg py-1 px-2 focus:ring-primary focus:border-primary">
<option>10</option>
<option>25</option>
<option>50</option>
</select>
<span>dòng</span>
</div>
</div>
<div class="overflow-x-auto flex-1">
<table class="w-full text-left border-collapse min-w-[900px]">
<thead>
<tr class="bg-surface-container-lowest font-headline-md text-body-sm text-on-surface-variant border-b border-whisper-border uppercase tracking-wider">
<th class="px-6 py-4 whitespace-nowrap">Người mượn</th>
<th class="px-6 py-4 whitespace-nowrap">Hồ sơ yêu cầu</th>
<th class="px-6 py-4 whitespace-nowrap">Ngày YC</th>
<th class="px-6 py-4 whitespace-nowrap">Hẹn trả</th>
<th class="px-6 py-4 whitespace-nowrap">Trạng thái</th>
<th class="px-6 py-4 whitespace-nowrap text-right">Thao tác</th>
</tr>
</thead>
<tbody class="font-body-base text-body-sm text-on-surface bg-pure-surface">
<tr class="hover:bg-surface-container-lowest transition-colors border-b border-whisper-border group">
<td class="px-6 py-4">
<div class="flex items-center gap-3">
<img class="w-10 h-10 rounded-full object-cover" data-alt="A portrait of a male high school teacher wearing a light blue dress shirt and glasses. The lighting is soft and natural, typical of an indoor office environment. The style is a professional corporate headshot, conveying approachability and intellect. The color palette features neutral tones with a hint of professional blue." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAtCZkLGtE2r-Fjcr0iSTr-mctcP6xv6N6VNbaHqI7fz4BtFuZxNrJg3YM-RiETYhmwbc4ifuIWJ04rLMj-KASnulR1jmV61VY9YPMfSPX0zW-R2dImknv77EjCWO1EjFCv-qy4EYPKszDGI5ZpiCmZu46ua4qy36u-j98XdjrVmehdtpg9RX7lz0abn-5_UKsHbNAMTWIE2HgaBxdwhD-plFb2QYnfRz1wghfm1i4bg-mY96OA6bKnBahGZzawWNaX4XGES-OKYg"/>
<div>
<div class="font-headline-md text-on-surface">Nguyễn Văn An</div>
<div class="text-on-surface-variant font-body-sm text-mono-label">GV. Toán</div>
</div>
</div>
</td>
<td class="px-6 py-4">
<div class="font-headline-md text-primary">HS-2023-1102</div>
<div class="text-on-surface-variant truncate max-w-[200px]" title="Hồ sơ điểm thi giữa kỳ I khối 10">Hồ sơ điểm thi giữa kỳ I khối 10</div>
</td>
<td class="px-6 py-4 font-mono-label text-on-surface-variant">24/10/2023</td>
<td class="px-6 py-4 font-mono-label text-on-surface-variant">30/10/2023</td>
<td class="px-6 py-4">
<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-warning-orange/10 text-warning-orange font-headline-md text-mono-label">
<span class="w-1.5 h-1.5 rounded-full bg-warning-orange"></span>
                                Chờ duyệt
                            </span>
</td>
<td class="px-6 py-4 text-right">
<div class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
<button class="w-8 h-8 rounded-full bg-success-green/10 text-success-green flex items-center justify-center hover:bg-success-green hover:text-white transition-colors" title="Duyệt">
<span class="material-symbols-outlined text-[18px]">check</span>
</button>
<button class="w-8 h-8 rounded-full bg-error-container text-danger-red flex items-center justify-center hover:bg-danger-red hover:text-white transition-colors" title="Từ chối">
<span class="material-symbols-outlined text-[18px]">close</span>
</button>
</div>
</td>
</tr>
<tr class="hover:bg-surface-container-lowest transition-colors border-b border-whisper-border group">
<td class="px-6 py-4">
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded-full bg-tertiary-container text-on-tertiary-container flex items-center justify-center font-headline-md text-body-base">
                                    HL
                                </div>
<div>
<div class="font-headline-md text-on-surface">Trần Thị Hoa Lan</div>
<div class="text-on-surface-variant font-body-sm text-mono-label">HS. 12A1</div>
</div>
</div>
</td>
<td class="px-6 py-4">
<div class="font-headline-md text-primary">HS-2023-0855</div>
<div class="text-on-surface-variant truncate max-w-[200px]" title="Học bạ THPT (Bản sao)">Học bạ THPT (Bản sao)</div>
</td>
<td class="px-6 py-4 font-mono-label text-on-surface-variant">25/10/2023</td>
<td class="px-6 py-4 font-mono-label text-on-surface-variant">25/10/2023</td>
<td class="px-6 py-4">
<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-warning-orange/10 text-warning-orange font-headline-md text-mono-label">
<span class="w-1.5 h-1.5 rounded-full bg-warning-orange"></span>
                                Chờ duyệt
                            </span>
</td>
<td class="px-6 py-4 text-right">
<div class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
<button class="w-8 h-8 rounded-full bg-success-green/10 text-success-green flex items-center justify-center hover:bg-success-green hover:text-white transition-colors" title="Duyệt">
<span class="material-symbols-outlined text-[18px]">check</span>
</button>
<button class="w-8 h-8 rounded-full bg-error-container text-danger-red flex items-center justify-center hover:bg-danger-red hover:text-white transition-colors" title="Từ chối">
<span class="material-symbols-outlined text-[18px]">close</span>
</button>
</div>
</td>
</tr>
<tr class="hover:bg-surface-container-lowest transition-colors group">
<td class="px-6 py-4">
<div class="flex items-center gap-3">
<img class="w-10 h-10 rounded-full object-cover" data-alt="A portrait of a young female high school student wearing a traditional white Ao Dai. The setting is outdoors in a shaded courtyard with sunlight filtering through leaves. The style is candid and vibrant, capturing a moment of genuine joy. The colors emphasize the pure white of the dress against lush green foliage." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMJ5WphiaV4GxOqNaUbI8dLJtibXi7dGt6PDMgcJwxbdnug6-Fl7LnNQL20NLRYNci9F_rSuyMY248rjUc6GVRgm5VFTBVV3gwnkRFMmrxvJJTvrGpjYrpFamGUfBjgn9YQDEilfL7arT_0WridVbg3snOU3iJJec3qZBQnhG1jRGqCWpP6HQZjnuMJbrbSh5XpbVTi1_CEWgeIqOtoe1OrDqZPLq7r_b_8zKz-ocfxpE0ZHeVTOUbAQc0Q0kJuvDaCxYILVxwOEU"/>
<div>
<div class="font-headline-md text-on-surface">Lê Minh Tuấn</div>
<div class="text-on-surface-variant font-body-sm text-mono-label">Ban Giám Hiệu</div>
</div>
</div>
</td>
<td class="px-6 py-4">
<div class="font-headline-md text-primary">HS-2023-0105</div>
<div class="text-on-surface-variant truncate max-w-[200px]" title="Kế hoạch tuyển sinh năm học 2023-2024">Kế hoạch tuyển sinh năm học 2023-2024</div>
</td>
<td class="px-6 py-4 font-mono-label text-on-surface-variant">25/10/2023</td>
<td class="px-6 py-4 font-mono-label text-on-surface-variant">10/11/2023</td>
<td class="px-6 py-4">
<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-warning-orange/10 text-warning-orange font-headline-md text-mono-label">
<span class="w-1.5 h-1.5 rounded-full bg-warning-orange"></span>
                                Chờ duyệt
                            </span>
</td>
<td class="px-6 py-4 text-right">
<div class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
<button class="w-8 h-8 rounded-full bg-success-green/10 text-success-green flex items-center justify-center hover:bg-success-green hover:text-white transition-colors" title="Duyệt">
<span class="material-symbols-outlined text-[18px]">check</span>
</button>
<button class="w-8 h-8 rounded-full bg-error-container text-danger-red flex items-center justify-center hover:bg-danger-red hover:text-white transition-colors" title="Từ chối">
<span class="material-symbols-outlined text-[18px]">close</span>
</button>
</div>
</td>
</tr>
</tbody>
</table>
</div>
<div class="p-4 border-t border-whisper-border bg-surface-container-lowest flex items-center justify-between">
<span class="text-on-surface-variant font-body-sm text-body-sm">Hiển thị 1-3 trong số 12 yêu cầu</span>
<div class="flex items-center gap-1">
<button class="w-8 h-8 flex items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container disabled:opacity-50" disabled="">
<span class="material-symbols-outlined text-[20px]">chevron_left</span>
</button>
<button class="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-on-primary font-headline-md text-body-sm">1</button>
<button class="w-8 h-8 flex items-center justify-center rounded-lg text-on-surface hover:bg-surface-container font-body-sm text-body-sm">2</button>
<button class="w-8 h-8 flex items-center justify-center rounded-lg text-on-surface hover:bg-surface-container font-body-sm text-body-sm">3</button>
<span class="w-8 h-8 flex items-center justify-center text-on-surface-variant">...</span>
<button class="w-8 h-8 flex items-center justify-center rounded-lg text-on-surface hover:bg-surface-container font-body-sm text-body-sm">5</button>
<button class="w-8 h-8 flex items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container">
<span class="material-symbols-outlined text-[20px]">chevron_right</span>
</button>
</div>
</div>
</div>
</div></main></div></body></html>

<!-- Báo cáo Thống kê - EduArchive -->
<html lang="vi"><head><meta charset="utf-8"/><meta content="width=device-width, initial-scale=1.0" name="viewport"/><style>@layer base{html,body{margin:0;padding:0;}body{overscroll-behavior:none;}main>:first-child{margin-top:0!important;}main>:last-child{margin-bottom:0!important;}}::-webkit-scrollbar{display:none;}</style><script src="https://cdn.tailwindcss.com"></script><script>tailwind.config={theme:{extend:{"colors":{"on-tertiary-fixed":"#360f00","on-secondary-fixed":"#1a1b22","primary-fixed-dim":"#b4c5ff","surface-dim":"#d9d9e5","outline-variant":"#c3c6d7","canvas-white":"#F9FAFB","on-background":"#191b23","surface-container-highest":"#e1e2ed","surface-container":"#ededf9","surface-container-high":"#e7e7f3","whisper-border":"rgba(226, 232, 240, 0.5)","surface-container-low":"#f3f3fe","primary-fixed":"#dbe1ff","on-tertiary":"#ffffff","tertiary-container":"#bc4800","surface-container-lowest":"#ffffff","primary":"#004ac6","on-primary":"#ffffff","charcoal-ink":"#18181B","surface-bright":"#faf8ff","on-surface":"#191b23","error-container":"#ffdad6","inverse-surface":"#2e3039","secondary":"#5d5e66","on-error-container":"#93000a","on-surface-variant":"#434655","secondary-fixed":"#e3e1ec","on-tertiary-container":"#ffede6","on-tertiary-fixed-variant":"#7d2d00","success-green":"#10B981","on-secondary-container":"#63646c","secondary-container":"#e3e1ec","tertiary-fixed":"#ffdbcd","surface-variant":"#e1e2ed","inverse-primary":"#b4c5ff","on-secondary-fixed-variant":"#46464e","on-primary-fixed-variant":"#003ea8","danger-red":"#EF4444","on-primary-fixed":"#00174b","surface-tint":"#0053db","surface":"#faf8ff","tertiary":"#943700","warning-orange":"#F59E0B","tertiary-fixed-dim":"#ffb596","background":"#faf8ff","pure-surface":"#FFFFFF","on-error":"#ffffff","secondary-fixed-dim":"#c6c5cf","outline":"#737686","on-primary-container":"#eeefff","primary-container":"#2563eb","inverse-on-surface":"#f0f0fb","on-secondary":"#ffffff","error":"#ba1a1a"},"borderRadius":{"DEFAULT":"0.25rem","lg":"0.5rem","xl":"0.75rem","full":"9999px"},"spacing":{"sidebar-width":"280px","gutter":"1.5rem","content-padding-desktop":"4rem","margin-mobile":"1rem"},"fontFamily":{"headline-lg":["Geist"],"mono-label":["JetBrains Mono"],"headline-md":["Geist"],"headline-xl":["Geist"],"body-base":["Geist"],"body-sm":["Geist"]},"fontSize":{"headline-lg":["1.5rem",{"lineHeight":"1.3","letterSpacing":"-0.025em","fontWeight":"700"}],"mono-label":["0.75rem",{"lineHeight":"1.2","fontWeight":"500"}],"headline-md":["1.25rem",{"lineHeight":"1.4","fontWeight":"600"}],"headline-xl":["2.25rem",{"lineHeight":"1.2","letterSpacing":"-0.025em","fontWeight":"700"}],"body-base":["1rem",{"lineHeight":"1.65","fontWeight":"400"}],"body-sm":["0.875rem",{"lineHeight":"1.6","fontWeight":"400"}]}}}}</script><link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap" rel="stylesheet"/></head><body class="bg-canvas-white font-body-base text-on-surface"><aside class="fixed left-0 top-0 h-full w-[280px] bg-charcoal-ink z-50 flex flex-col shadow-xl"><div class="p-8 mb-4 flex items-center gap-3"><img alt="School Logo" class="h-10 w-auto object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpMbZCuyFP9B7rvjyQ_38EbvjBtJc2soSJMu46eeRNdMe2k-t5qucw8ipWPe0-w7FRa2g0XwQMqf_cbKuvhkJxExfmSdxl7xsXABb0kkHGcOiu7PLCwlpLtYRBi33-E1Ccogx8efgthBKRRWgNFV-RVGbehqRkgv1bBPad9itS44dP5bYbX7TjE9k0_H8C1Pq_nabfCS1qOMfhHoGGfOPJ1tpkYpvlyR1IB4ykQYah5K5KldDTpNu1Msb6DGbgcuBelezRWuh-_Wc"/><span class="text-white font-headline-lg text-headline-md tracking-tight">EduArchive</span></div><nav class="flex-1 px-4 space-y-1" data-active-classes="bg-primary-container text-on-primary-container font-semibold rounded-xl"><a aria-current="page" class="flex items-center px-4 py-3 transition-all duration-200 group bg-primary-container text-on-primary-container font-semibold rounded-xl" data-path="dashboard" href="#"><span class="material-symbols-outlined mr-4 opacity-70 group-hover:opacity-100">dashboard</span>Dashboard</a><a class="flex items-center px-4 py-3 text-secondary-fixed hover:bg-white/5 hover:text-white rounded-xl transition-all duration-200 group" data-path="quan-ly-ho-so" href="#"><span class="material-symbols-outlined mr-4 opacity-70 group-hover:opacity-100">folder_open</span>Quản lý Hồ sơ</a><a class="flex items-center px-4 py-3 text-secondary-fixed hover:bg-white/5 hover:text-white rounded-xl transition-all duration-200 group" data-path="muon-tra" href="#"><span class="material-symbols-outlined mr-4 opacity-70 group-hover:opacity-100">assignment_return</span>Mượn trả</a><a class="flex items-center px-4 py-3 text-secondary-fixed hover:bg-white/5 hover:text-white rounded-xl transition-all duration-200 group" data-path="bao-cao" href="#"><span class="material-symbols-outlined mr-4 opacity-70 group-hover:opacity-100">analytics</span>Báo cáo</a><a class="flex items-center px-4 py-3 text-secondary-fixed hover:bg-white/5 hover:text-white rounded-xl transition-all duration-200 group" data-path="quan-tri-he-thong" href="#"><span class="material-symbols-outlined mr-4 opacity-70 group-hover:opacity-100">settings</span>Hệ thống</a></nav><div class="mt-auto p-4 mx-4 mb-8 bg-white/5 rounded-2xl border border-white/10"><div class="flex items-center gap-3 mb-4"><img alt="Profile" class="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPxZCkCqEdxnSzr3u1rq52Npp8s-aWlblCs32Kiexcg5xwl8aaHoiZvee7Auz2LFNy2QAroCujn6vfTuXHbQvZ3bmYKPsTtp8IQEOedyQE9pR9IHXEccLkgqHa9Bu2iiq8-XGVFpGpdvyxzFaXE-1VKqzwKW94IvunR4WM1nPaSEh5vLGyQ2wMNbfYBb21SNlrnKqx8kwBNoI-qLMF6nLW2zXWLoLhDXLj-26zfepg43IGSGSK7VX5stHuOUD6zY9Ow1HeC0Lb2QU"/><div class="overflow-hidden"><p class="text-white text-sm font-semibold truncate">Admin User</p><p class="text-secondary-fixed-dim text-xs truncate">Quản trị viên</p></div></div><button class="w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-danger-red hover:bg-danger-red/10 rounded-lg transition-colors"><span class="material-symbols-outlined text-sm">logout</span>Đăng xuất</button></div></aside><div class="pl-[280px] min-h-screen flex flex-col"><header class="sticky top-0 h-20 bg-pure-surface/80 backdrop-blur-xl z-40 border-b border-whisper-border px-10 flex items-center justify-between"><div class="flex items-center gap-6 flex-1 max-w-2xl"><div class="relative w-full"><span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span><input class="w-full pl-12 pr-4 py-2.5 bg-surface-container-low border-none rounded-full text-body-sm focus:ring-2 focus:ring-primary/20 focus:bg-pure-surface transition-all" placeholder="Tìm kiếm hồ sơ, học sinh..." type="text"/></div></div><div class="flex items-center gap-6"><button class="relative p-2 text-on-surface-variant hover:bg-surface-container rounded-full transition-colors"><span class="material-symbols-outlined">notifications</span><span class="absolute top-2 right-2 w-2 h-2 bg-danger-red rounded-full ring-2 ring-pure-surface"></span></button><button class="flex items-center gap-2 px-6 py-2.5 bg-primary text-on-primary rounded-full font-semibold shadow-lg shadow-primary/20 hover:bg-primary-container hover:scale-[1.02] transition-all"><span class="material-symbols-outlined text-lg">add_circle</span><span>Tạo mới Hồ sơ</span></button></div></header><main class="flex-1 p-content-padding-desktop"><div class="flex flex-col w-full relative">
<div class="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
<div class="absolute bottom-0 left-0 w-[600px] h-[600px] bg-warning-orange/5 rounded-full blur-[100px] pointer-events-none translate-y-1/3 -translate-x-1/3"></div>
<div class="flex flex-col gap-gutter relative z-10">
<div class="flex items-end justify-between w-full">
<div class="flex flex-col">
<h1 class="font-headline-xl text-headline-xl text-on-surface">Báo cáo Tổng quan</h1>
<p class="font-body-base text-body-base text-on-surface-variant mt-2 max-w-xl">Thông tin chi tiết về tình trạng hồ sơ, mượn trả và cảnh báo tiêu hủy trong hệ thống EduArchive.</p>
</div>
<div class="flex items-center gap-4 bg-surface-container rounded-full p-2 pr-6 shadow-sm">
<div class="flex items-center gap-2 bg-pure-surface rounded-full py-1.5 px-4">
<span class="material-symbols-outlined text-outline">calendar_today</span>
<span class="font-body-sm text-body-sm text-on-surface font-medium">Tháng 10, 2023</span>
<span class="material-symbols-outlined text-outline cursor-pointer ml-2 text-sm">expand_more</span>
</div>
<div class="w-px h-6 bg-outline-variant"></div>
<div class="flex items-center gap-2 cursor-pointer">
<span class="font-body-sm text-body-sm text-on-surface-variant">Tất cả danh mục</span>
<span class="material-symbols-outlined text-outline text-sm">expand_more</span>
</div>
</div>
</div>
<div class="grid grid-cols-12 gap-gutter mt-4">
<div class="col-span-12 md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-gutter">
<div class="bg-pure-surface rounded-3xl p-6 shadow-sm flex flex-col justify-between group overflow-hidden relative">
<div class="absolute -right-8 -top-8 w-32 h-32 bg-primary/5 rounded-full transition-transform duration-500 group-hover:scale-150"></div>
<div>
<div class="flex items-center gap-3 mb-2">
<div class="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center">
<span class="material-symbols-outlined">folder</span>
</div>
<span class="font-mono-label text-mono-label text-on-surface-variant tracking-wider uppercase">Tổng Hồ Sơ</span>
</div>
<div class="flex items-end gap-3 mt-4">
<h2 class="font-headline-xl text-headline-xl text-on-surface">12,450</h2>
<span class="font-body-sm text-body-sm text-success-green flex items-center mb-1 bg-success-green/10 px-2 py-0.5 rounded-full">
<span class="material-symbols-outlined text-sm mr-1">arrow_upward</span> 12%
              </span>
</div>
</div>
<div class="mt-6 h-1 w-full bg-surface-container rounded-full overflow-hidden">
<div class="h-full bg-primary w-3/4 rounded-full"></div>
</div>
</div>
<div class="bg-primary text-on-primary rounded-3xl p-6 shadow-lg flex flex-col justify-between group relative overflow-hidden">
<div class="absolute -right-12 -bottom-12 w-40 h-40 bg-white/10 rounded-full transition-transform duration-500 group-hover:scale-150"></div>
<div class="relative z-10">
<div class="flex items-center gap-3 mb-2">
<div class="w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">sync</span>
</div>
<span class="font-mono-label text-mono-label text-primary-fixed-dim tracking-wider uppercase">Đang Mượn</span>
</div>
<div class="flex items-end gap-3 mt-4">
<h2 class="font-headline-xl text-headline-xl text-on-primary">842</h2>
<span class="font-body-sm text-body-sm text-white/80 flex items-center mb-1">
                 hồ sơ
              </span>
</div>
</div>
<div class="mt-6 flex justify-between items-center relative z-10">
<span class="font-body-sm text-body-sm text-primary-fixed-dim">Cần duyệt: 45</span>
<button class="bg-white text-primary text-xs font-semibold px-4 py-2 rounded-full hover:bg-primary-fixed transition-colors">Xem chi tiết</button>
</div>
</div>
<div class="bg-pure-surface rounded-3xl p-6 shadow-sm col-span-1 md:col-span-2 relative overflow-hidden group">
<div class="flex justify-between items-start mb-6">
<div>
<h3 class="font-headline-md text-headline-md text-on-surface">Thống kê theo Danh mục</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-1">Số lượng hồ sơ lưu trữ phân bổ theo phòng ban</p>
</div>
<button class="p-2 text-outline hover:bg-surface-container rounded-full transition-colors">
<span class="material-symbols-outlined">more_vert</span>
</button>
</div>
<div class="h-64 w-full relative">
<div class="absolute inset-0 flex items-end justify-between px-4 pb-6 pt-4 gap-4">
<div class="flex-1 flex flex-col items-center justify-end h-full gap-2 group/bar">
<div class="w-full bg-surface-container rounded-t-xl relative overflow-hidden h-[85%] group-hover/bar:bg-surface-variant transition-colors">
<div class="absolute bottom-0 left-0 w-full bg-primary rounded-t-xl" style="height: 100%; transition: height 1s cubic-bezier(0.4, 0, 0.2, 1);"></div>
<div class="absolute top-2 w-full text-center font-mono-label text-mono-label text-white opacity-0 group-hover/bar:opacity-100 transition-opacity">4.2k</div>
</div>
<span class="font-body-sm text-body-sm text-on-surface-variant text-center leading-tight">Hành<br/>chính</span>
</div>
<div class="flex-1 flex flex-col items-center justify-end h-full gap-2 group/bar">
<div class="w-full bg-surface-container rounded-t-xl relative overflow-hidden h-[60%] group-hover/bar:bg-surface-variant transition-colors">
<div class="absolute bottom-0 left-0 w-full bg-tertiary rounded-t-xl" style="height: 100%; transition: height 1s cubic-bezier(0.4, 0, 0.2, 1); transition-delay: 100ms;"></div>
<div class="absolute top-2 w-full text-center font-mono-label text-mono-label text-white opacity-0 group-hover/bar:opacity-100 transition-opacity">2.8k</div>
</div>
<span class="font-body-sm text-body-sm text-on-surface-variant text-center leading-tight">Nhân<br/>sự</span>
</div>
<div class="flex-1 flex flex-col items-center justify-end h-full gap-2 group/bar">
<div class="w-full bg-surface-container rounded-t-xl relative overflow-hidden h-[45%] group-hover/bar:bg-surface-variant transition-colors">
<div class="absolute bottom-0 left-0 w-full bg-success-green rounded-t-xl" style="height: 100%; transition: height 1s cubic-bezier(0.4, 0, 0.2, 1); transition-delay: 200ms;"></div>
<div class="absolute top-2 w-full text-center font-mono-label text-mono-label text-white opacity-0 group-hover/bar:opacity-100 transition-opacity">1.5k</div>
</div>
<span class="font-body-sm text-body-sm text-on-surface-variant text-center leading-tight">Tài<br/>chính</span>
</div>
<div class="flex-1 flex flex-col items-center justify-end h-full gap-2 group/bar">
<div class="w-full bg-surface-container rounded-t-xl relative overflow-hidden h-[70%] group-hover/bar:bg-surface-variant transition-colors">
<div class="absolute bottom-0 left-0 w-full bg-warning-orange rounded-t-xl" style="height: 100%; transition: height 1s cubic-bezier(0.4, 0, 0.2, 1); transition-delay: 300ms;"></div>
<div class="absolute top-2 w-full text-center font-mono-label text-mono-label text-white opacity-0 group-hover/bar:opacity-100 transition-opacity">3.1k</div>
</div>
<span class="font-body-sm text-body-sm text-on-surface-variant text-center leading-tight">Đào<br/>tạo</span>
</div>
<div class="flex-1 flex flex-col items-center justify-end h-full gap-2 group/bar">
<div class="w-full bg-surface-container rounded-t-xl relative overflow-hidden h-[25%] group-hover/bar:bg-surface-variant transition-colors">
<div class="absolute bottom-0 left-0 w-full bg-secondary rounded-t-xl" style="height: 100%; transition: height 1s cubic-bezier(0.4, 0, 0.2, 1); transition-delay: 400ms;"></div>
<div class="absolute top-2 w-full text-center font-mono-label text-mono-label text-white opacity-0 group-hover/bar:opacity-100 transition-opacity">0.8k</div>
</div>
<span class="font-body-sm text-body-sm text-on-surface-variant text-center leading-tight">Khác</span>
</div>
</div>
<div class="absolute left-0 top-0 h-full w-full pointer-events-none pb-12">
<div class="h-1/4 w-full border-b border-whisper-border/50"></div>
<div class="h-1/4 w-full border-b border-whisper-border/50"></div>
<div class="h-1/4 w-full border-b border-whisper-border/50"></div>
</div>
</div>
</div>
</div>
<div class="col-span-12 md:col-span-4 flex flex-col gap-gutter">
<div class="bg-pure-surface rounded-3xl p-6 shadow-sm flex-1">
<h3 class="font-headline-md text-headline-md text-on-surface mb-6">Tình trạng mượn trả</h3>
<div class="relative w-full aspect-square max-w-[240px] mx-auto flex items-center justify-center">
<svg class="w-full h-full -rotate-90 transform" viewbox="0 0 100 100">
<circle cx="50" cy="50" fill="transparent" r="40" stroke="var(--surface-container)" stroke-width="12"></circle>
<circle class="transition-all duration-1000 ease-out" cx="50" cy="50" fill="transparent" r="40" stroke="var(--success-green)" stroke-dasharray="251.2" stroke-dashoffset="62.8" stroke-width="12"></circle>
<circle class="transition-all duration-1000 ease-out delay-300" cx="50" cy="50" fill="transparent" r="40" stroke="var(--primary)" stroke-dasharray="251.2" stroke-dashoffset="150.7" stroke-dashoffset-start="251.2" stroke-width="12"></circle>
<circle class="transition-all duration-1000 ease-out delay-500" cx="50" cy="50" fill="transparent" r="40" stroke="var(--warning-orange)" stroke-dasharray="251.2" stroke-dashoffset="213.5" stroke-width="12"></circle>
</svg>
<div class="absolute inset-0 flex flex-col items-center justify-center text-center">
<span class="font-headline-lg text-headline-lg text-on-surface">942</span>
<span class="font-body-sm text-body-sm text-on-surface-variant">Giao dịch</span>
</div>
</div>
<div class="mt-8 flex flex-col gap-4">
<div class="flex items-center justify-between group">
<div class="flex items-center gap-3">
<div class="w-3 h-3 rounded-full bg-success-green ring-4 ring-success-green/20"></div>
<span class="font-body-sm text-body-sm text-on-surface">Trả đúng hạn</span>
</div>
<div class="flex items-baseline gap-2">
<span class="font-headline-md text-headline-md text-on-surface">65%</span>
<span class="font-mono-label text-mono-label text-on-surface-variant">612</span>
</div>
</div>
<div class="flex items-center justify-between group">
<div class="flex items-center gap-3">
<div class="w-3 h-3 rounded-full bg-primary ring-4 ring-primary/20"></div>
<span class="font-body-sm text-body-sm text-on-surface">Đang mượn</span>
</div>
<div class="flex items-baseline gap-2">
<span class="font-headline-md text-headline-md text-on-surface">25%</span>
<span class="font-mono-label text-mono-label text-on-surface-variant">235</span>
</div>
</div>
<div class="flex items-center justify-between group">
<div class="flex items-center gap-3">
<div class="w-3 h-3 rounded-full bg-warning-orange ring-4 ring-warning-orange/20"></div>
<span class="font-body-sm text-body-sm text-on-surface">Chờ duyệt</span>
</div>
<div class="flex items-baseline gap-2">
<span class="font-headline-md text-headline-md text-on-surface">10%</span>
<span class="font-mono-label text-mono-label text-on-surface-variant">95</span>
</div>
</div>
</div>
</div>
</div>
</div>
<div class="mt-8 bg-pure-surface rounded-3xl p-6 shadow-sm overflow-hidden relative">
<div class="absolute top-0 right-0 w-64 h-64 bg-danger-red/5 rounded-full blur-[60px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
<div class="flex items-center justify-between mb-6 relative z-10">
<div class="flex items-center gap-4">
<div class="w-12 h-12 rounded-xl bg-error-container text-on-error-container flex items-center justify-center">
<span class="material-symbols-outlined text-2xl" style="font-variation-settings: 'FILL' 1;">warning</span>
</div>
<div>
<h3 class="font-headline-md text-headline-md text-on-surface">Cảnh báo hồ sơ sắp tiêu hủy</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-1">Hồ sơ đã hết thời hạn bảo quản theo quy định</p>
</div>
</div>
<button class="flex items-center gap-2 px-4 py-2 bg-surface-container hover:bg-surface-container-high text-on-surface rounded-full transition-colors font-semibold text-sm">
<span>Xem tất cả</span>
<span class="material-symbols-outlined text-sm">arrow_forward</span>
</button>
</div>
<div class="w-full overflow-x-auto relative z-10">
<table class="w-full text-left border-collapse">
<thead>
<tr class="bg-surface-container-low">
<th class="py-4 px-6 font-mono-label text-mono-label text-on-surface-variant uppercase tracking-wider rounded-l-xl">Mã HS</th>
<th class="py-4 px-6 font-mono-label text-mono-label text-on-surface-variant uppercase tracking-wider">Tên hồ sơ</th>
<th class="py-4 px-6 font-mono-label text-mono-label text-on-surface-variant uppercase tracking-wider">Danh mục</th>
<th class="py-4 px-6 font-mono-label text-mono-label text-on-surface-variant uppercase tracking-wider">Ngày lập</th>
<th class="py-4 px-6 font-mono-label text-mono-label text-on-surface-variant uppercase tracking-wider text-right rounded-r-xl">Ngày tiêu hủy (DK)</th>
</tr>
</thead>
<tbody class="font-body-sm text-body-sm">
<tr class="group hover:bg-surface-container-lowest transition-colors border-b border-surface-container/50 last:border-0">
<td class="py-4 px-6 font-mono-label text-on-surface">HS-2013-042</td>
<td class="py-4 px-6 text-on-surface font-medium truncate max-w-[200px]">Báo cáo tài chính quý 1/2013</td>
<td class="py-4 px-6">
<span class="inline-flex items-center px-2.5 py-0.5 rounded-md bg-success-green/10 text-success-green text-xs font-medium">Tài chính</span>
</td>
<td class="py-4 px-6 text-on-surface-variant">15/04/2013</td>
<td class="py-4 px-6 text-right">
<span class="text-danger-red font-semibold bg-danger-red/10 px-3 py-1 rounded-full">15/11/2023</span>
</td>
</tr>
<tr class="group hover:bg-surface-container-lowest transition-colors border-b border-surface-container/50 last:border-0">
<td class="py-4 px-6 font-mono-label text-on-surface">HS-2018-115</td>
<td class="py-4 px-6 text-on-surface font-medium truncate max-w-[200px]">Kế hoạch tuyển sinh bổ sung</td>
<td class="py-4 px-6">
<span class="inline-flex items-center px-2.5 py-0.5 rounded-md bg-warning-orange/10 text-warning-orange text-xs font-medium">Đào tạo</span>
</td>
<td class="py-4 px-6 text-on-surface-variant">22/08/2018</td>
<td class="py-4 px-6 text-right">
<span class="text-danger-red font-semibold bg-danger-red/10 px-3 py-1 rounded-full">22/11/2023</span>
</td>
</tr>
<tr class="group hover:bg-surface-container-lowest transition-colors border-b border-surface-container/50 last:border-0">
<td class="py-4 px-6 font-mono-label text-on-surface">HS-2020-008</td>
<td class="py-4 px-6 text-on-surface font-medium truncate max-w-[200px]">Hồ sơ thuyên chuyển công tác</td>
<td class="py-4 px-6">
<span class="inline-flex items-center px-2.5 py-0.5 rounded-md bg-tertiary/10 text-tertiary text-xs font-medium">Nhân sự</span>
</td>
<td class="py-4 px-6 text-on-surface-variant">10/01/2020</td>
<td class="py-4 px-6 text-right">
<span class="text-on-surface font-semibold bg-surface-container-high px-3 py-1 rounded-full">10/12/2023</span>
</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
</div></main></div></body></html>