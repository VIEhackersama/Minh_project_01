"use client";

import React, { useState } from "react";
import { useAuth } from "@/components/auth-context";
import { Eye, EyeSlash, Lock, User, Files, Warning, ArrowRight } from "@phosphor-icons/react";

export default function LoginPage() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setErrorMsg("Vui lòng điền đầy đủ tên đăng nhập và mật khẩu.");
      return;
    }

    setErrorMsg(null);
    setIsSubmitting(true);

    try {
      await login(username, password);
    } catch (err: any) {
      setErrorMsg(err.message || "Đăng nhập thất bại. Kiểm tra lại thông tin tài khoản.");
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-canvas-white px-4 py-12">
      {/* Subtle top gradient accent */}
      <div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
      />

      <div className="w-full max-w-sm">
        {/* Brand mark */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 mb-4 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
            <Files size={22} weight="duotone" className="text-primary" />
          </div>
          <h1 className="text-[22px] font-bold tracking-tight text-on-surface">EduArchive</h1>
          <p className="text-[13px] text-secondary mt-1">Hệ thống quản lý hồ sơ trường học</p>
        </div>

        {/* Form card */}
        <div className="bg-pure-surface rounded-2xl border border-whisper-border shadow-sm p-7">
          <h2 className="text-[15px] font-bold text-on-surface mb-5">Đăng nhập</h2>

          {errorMsg && (
            <div className="mb-5 px-3.5 py-3 bg-error-container rounded-xl flex items-start gap-2.5 text-[12px] font-medium text-on-error-container border border-red-200/60">
              <Warning size={15} weight="fill" className="text-danger-red shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Username */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-semibold text-on-surface-variant" htmlFor="username">
                Tên đăng nhập
              </label>
              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-outline"
                  size={15}
                />
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isSubmitting}
                  autoComplete="username"
                  className="w-full bg-surface-container-low pl-9 pr-4 py-2.5 rounded-xl text-[13px] text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/25 focus:bg-pure-surface focus:border-primary/30 transition-all border border-transparent placeholder:text-outline"
                  placeholder="Nhập tên đăng nhập"
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-semibold text-on-surface-variant" htmlFor="password">
                Mật khẩu
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-outline"
                  size={15}
                />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isSubmitting}
                  autoComplete="current-password"
                  className="w-full bg-surface-container-low pl-9 pr-10 py-2.5 rounded-xl text-[13px] text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/25 focus:bg-pure-surface focus:border-primary/30 transition-all border border-transparent placeholder:text-outline"
                  placeholder="Nhập mật khẩu"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isSubmitting}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors"
                  aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                >
                  {showPassword ? <EyeSlash size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={isSubmitting}
                className="w-3.5 h-3.5 rounded border-outline-variant text-primary focus:ring-primary accent-primary"
              />
              <span className="text-[12px] text-on-surface-variant">Ghi nhớ đăng nhập</span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-1 py-2.5 bg-primary text-on-primary font-semibold text-[13px] rounded-xl shadow-sm shadow-primary/20 hover:bg-primary-container active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:scale-100"
            >
              {isSubmitting ? "Đang xử lý..." : "Đăng nhập"}
              {!isSubmitting && <ArrowRight size={15} weight="bold" className="group-hover:translate-x-0.5 transition-transform" />}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-[11px] text-outline mt-5">
          EduArchive — Hệ thống quản lý hồ sơ giáo dục
        </p>
      </div>
    </main>
  );
}
