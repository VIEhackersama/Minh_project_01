"use client";

import React from "react";
import { ShieldAlert, X } from "lucide-react";

interface AccessDeniedModalProps {
  message: string | null;
  onClose: () => void;
}

export function AccessDeniedModal({ message, onClose }: AccessDeniedModalProps) {
  if (!message) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-pure-surface rounded-[2rem] border border-amber-500/20 max-w-md w-full p-6 shadow-2xl flex flex-col items-center gap-4 text-center">
        <div className="w-14 h-14 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="space-y-1">
          <h3 className="text-base font-bold text-on-surface">
            Quyền Truy Cập Bị Từ Chối (403 Forbidden)
          </h3>
          <p className="text-xs text-secondary leading-relaxed px-2">
            {message}
          </p>
        </div>

        <div className="w-full pt-2">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs rounded-xl transition-colors shadow-sm"
          >
            Đã hiểu / Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
