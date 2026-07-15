"use client";

import React, { useState } from "react";
import { useAuth } from "@/components/auth-context";
import { Eye, EyeOff, Lock, User, FileText, AlertCircle, ArrowRight } from "lucide-react";

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
      setErrorMsg("Vui lòng điền đầy đủ tên đăng nhập và mật khẩu");
      return;
    }

    setErrorMsg(null);
    setIsSubmitting(true);

    try {
      await login(username, password);
    } catch (err: any) {
      setErrorMsg(err.message || "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center relative overflow-hidden bg-canvas-white px-4">
      {/* Decorative Blur Blobs */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-[40%] -right-[20%] w-[80%] h-[80%] rounded-full bg-primary-fixed opacity-30 mix-blend-multiply blur-3xl animate-[pulse_8s_ease-in-out_infinite]"></div>
        <div className="absolute -bottom-[30%] -left-[10%] w-[60%] h-[60%] rounded-full bg-tertiary-fixed opacity-20 mix-blend-multiply blur-3xl animate-[pulse_10s_ease-in-out_infinite_reverse]"></div>
      </div>

      <div className="relative z-10 w-full max-w-md bg-pure-surface rounded-[2rem] shadow-xl p-8 md:p-10 flex flex-col items-center border border-whisper-border">
        {/* Brand Icon */}
        <div className="w-20 h-20 mb-6 rounded-full bg-surface-container flex items-center justify-center p-4 text-primary">
          <FileText className="w-10 h-10" />
        </div>
        
        <h1 className="font-headline-xl text-2xl font-bold text-on-surface mb-2 text-center">Đăng nhập</h1>
        <p className="font-body-base text-sm text-on-surface-variant mb-8 text-center">Hệ thống quản lý hồ sơ EduArchive</p>

        {errorMsg && (
          <div className="w-full mb-5 p-3.5 bg-error-container text-on-error-container rounded-xl flex items-start gap-2.5 text-xs font-medium border border-red-200">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-danger-red" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
          {/* Username Input */}
          <div className="flex flex-col gap-2">
            <label className="font-mono-label text-[10px] text-secondary uppercase tracking-wider font-semibold" htmlFor="username">
              Tên đăng nhập
            </label>
            <div className="relative w-full">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant w-5 h-5" />
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isSubmitting}
                className="w-full bg-surface-container-low pl-12 pr-4 py-3 rounded-xl font-body-base text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:bg-pure-surface transition-all border border-transparent placeholder:text-outline-variant"
                placeholder="Nhập tên đăng nhập"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-2">
            <label className="font-mono-label text-[10px] text-secondary uppercase tracking-wider font-semibold" htmlFor="password">
              Mật khẩu
            </label>
            <div className="relative w-full">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant w-5 h-5" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isSubmitting}
                className="w-full bg-surface-container-low pl-12 pr-12 py-3 rounded-xl font-body-base text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:bg-pure-surface transition-all border border-transparent placeholder:text-outline-variant"
                placeholder="Nhập mật khẩu"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isSubmitting}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-outline-variant hover:text-on-surface transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between mt-1">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={isSubmitting}
                className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary accent-primary"
              />
              <span className="font-body-sm text-xs text-on-surface-variant group-hover:text-on-surface transition-colors">
                Ghi nhớ đăng nhập
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 mt-4 bg-primary text-on-primary font-semibold text-sm rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-container hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 relative overflow-hidden group disabled:opacity-75 disabled:scale-100"
          >
            <span className="relative z-10">{isSubmitting ? "Đang xử lý..." : "Đăng nhập"}</span>
            {!isSubmitting && <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />}
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
          </button>
          
          <a href="#" className="font-body-sm text-xs text-primary text-center hover:underline hover:text-primary-container transition-colors mt-2">
            Quên mật khẩu?
          </a>
        </form>
      </div>
    </main>
  );
}
