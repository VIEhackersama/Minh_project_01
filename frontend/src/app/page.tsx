"use client";

import { useAuth } from "@/components/auth-context";
import { FileText } from "lucide-react";

export default function Home() {
  const { isLoading } = useAuth();

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-100 font-sans">
      <div className="flex flex-col items-center gap-6">
        <div className="bg-indigo-600/20 text-indigo-400 p-4 rounded-2xl border border-indigo-500/20 animate-pulse">
          <FileText className="w-12 h-12" />
        </div>
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-black tracking-wider text-white">EduArchive</h1>
          <p className="text-slate-400 text-sm font-medium">Đang tải phiên làm việc...</p>
        </div>
        <div className="w-16 h-1 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-indigo-500 rounded-full w-1/2 animate-[loading_1.5s_infinite_ease-in-out]" />
        </div>
      </div>
      
      <style jsx global>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
}
