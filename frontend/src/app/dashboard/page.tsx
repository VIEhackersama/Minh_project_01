"use client";

import React from "react";
import { useAuth } from "@/components/auth-context";
import { 
  FolderOpen, 
  RefreshCw, 
  Users, 
  AlertTriangle, 
  History, 
  Zap, 
  UserPlus, 
  QrCode, 
  PlusCircle, 
  ArrowRight,
  HardDrive
} from "lucide-react";
import Link from "next/link";

export default function DashboardHome() {
  const { user } = useAuth();

  const stats = [
    {
      title: "Total Records",
      value: "1,248",
      icon: FolderOpen,
      color: "bg-primary text-on-primary shadow-primary/20",
      accent: "bg-primary/10",
      trend: "+12% from last month",
      trendColor: "text-success-green"
    },
    {
      title: "Active Loans",
      value: "85",
      icon: RefreshCw, // swap_horiz -> RefreshCw
      color: "bg-warning-orange text-white shadow-warning-orange/20",
      accent: "bg-warning-orange/10",
      trend: "+5 this week",
      trendColor: "text-success-green"
    },
    {
      title: "Users Online",
      value: "12",
      icon: Users,
      color: "bg-success-green text-white shadow-success-green/20",
      accent: "bg-success-green/10",
      trend: "Currently active",
      trendColor: "text-on-surface-variant"
    },
    {
      title: "Overdue Alerts",
      value: "7",
      icon: AlertTriangle,
      color: "bg-danger-red text-white shadow-danger-red/20",
      accent: "bg-danger-red/10",
      trend: "Requires immediate action",
      trendColor: "text-danger-red",
      isError: true
    }
  ];

  const activities = [
    {
      avatar: "VN",
      name: "Văn thư Nguyễn",
      action: "vừa tải lên tài liệu mới",
      detail: "Báo cáo tổng kết học kỳ 1 (PDF)",
      time: "10 phút trước",
      bg: "bg-primary-fixed text-on-primary-fixed-variant"
    },
    {
      avatar: "GT",
      name: "Giáo viên Trần",
      action: "yêu cầu mượn hồ sơ",
      detail: "Hồ sơ học sinh khối 10 - Năm học 2023-2024",
      time: "45 phút trước",
      bg: "bg-tertiary-fixed text-on-tertiary-fixed",
      status: "Chờ duyệt",
      statusStyle: "bg-warning-orange/20 text-warning-orange"
    },
    {
      avatar: "SYS",
      name: "Hệ thống",
      action: "hoàn thành sao lưu định kỳ",
      detail: "Đã nén và lưu trữ thành công toàn bộ dữ liệu.",
      time: "2 giờ trước",
      bg: "bg-secondary-fixed text-on-secondary-container",
      isSystem: true
    }
  ];

  return (
    <div className="flex flex-col w-full gap-8 animate-fade-in">
      {/* Welcome banner */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight text-on-surface">Xin chào, {user?.hoTen || "Quản trị viên"}!</h1>
        <p className="text-sm text-secondary">Chào mừng bạn quay trở lại với trang quản trị lưu trữ hồ sơ trường học EduArchive.</p>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div 
              key={i} 
              className={`relative overflow-hidden rounded-2xl p-6 shadow-sm border border-whisper-border group transition-all duration-300 hover:shadow-md ${
                stat.isError ? "bg-error-container/40" : "bg-pure-surface"
              }`}
            >
              <div 
                className={`absolute -right-6 -top-6 w-24 h-24 rounded-full blur-xl transition-colors duration-500 ${
                  stat.isError ? "bg-danger-red/10" : stat.accent
                } group-hover:opacity-100 opacity-60`} 
              />
              <div className="flex justify-between items-start mb-4 relative z-10">
                <div>
                  <p className="font-mono text-[10px] text-on-surface-variant font-bold uppercase tracking-wider mb-1">
                    {stat.title}
                  </p>
                  <h2 className="text-2xl font-black tracking-tight text-on-surface">
                    {stat.value}
                  </h2>
                </div>
                <div className={`p-2.5 rounded-xl shadow-sm ${stat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className={`flex items-center gap-1.5 font-medium text-xs relative z-10 ${stat.trendColor}`}>
                <span className="text-[10px]">•</span>
                <span>{stat.trend}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Grid Content Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Activities Section (2 Cols) */}
        <div className="lg:col-span-2 bg-pure-surface rounded-3xl p-6 md:p-8 shadow-sm border border-whisper-border relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
          
          <h3 className="text-lg font-bold text-on-surface mb-6 flex items-center gap-3">
            <History className="w-5 h-5 text-primary" />
            Hoạt Động Gần Đây
          </h3>

          <div className="space-y-6 relative z-10">
            {activities.map((act, i) => (
              <div key={i} className="flex gap-4">
                <div className="relative">
                  <div className={`w-12 h-12 rounded-full font-bold flex items-center justify-center text-sm shadow-sm shrink-0 ${act.bg}`}>
                    {act.avatar}
                  </div>
                  {!act.isSystem && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-success-green rounded-full ring-2 ring-pure-surface"></div>
                  )}
                </div>
                
                <div className="flex-grow bg-surface-container-low/40 border border-whisper-border rounded-2xl p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5">
                  <p className="text-sm text-on-surface">
                    <span className="font-semibold text-primary">{act.name}</span> {act.action}
                  </p>
                  <p className="font-mono text-xs text-on-surface-variant mt-1.5">{act.detail}</p>
                  
                  {act.status && (
                    <div className="mt-3">
                      <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full ${act.statusStyle}`}>
                        {act.status}
                      </span>
                    </div>
                  )}
                  
                  <p className="text-[10px] text-outline mt-2 text-right">{act.time}</p>
                </div>
              </div>
            ))}
          </div>

          <button className="mt-6 text-primary font-bold text-xs hover:underline w-full text-center">
            Xem Tất Cả Hoạt Động
          </button>
        </div>

        {/* Quick Actions & Storage Section (1 Col) */}
        <div className="flex flex-col gap-8">
          
          {/* Quick Actions (Dark Card) */}
          <div className="bg-charcoal-ink text-canvas-white rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden group border border-slate-800">
            <div className="absolute -right-12 -top-12 w-40 h-40 bg-primary-fixed/20 rounded-full blur-2xl group-hover:bg-primary-fixed/30 transition-all duration-750"></div>
            
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-3 relative z-10">
              <Zap className="w-5 h-5 text-primary-fixed-dim" />
              Thao Tác Nhanh
            </h3>

            <div className="space-y-4 relative z-10">
              {user?.role === "ADMIN" && (
                <Link
                  href="/dashboard/users"
                  className="w-full bg-white/5 hover:bg-white/10 text-white text-xs font-semibold py-4 px-5 rounded-2xl flex items-center justify-between transition-colors border border-white/5 group/btn"
                >
                  <span className="flex items-center gap-3">
                    <UserPlus className="w-4 h-4 text-primary-fixed-dim" />
                    Quản lý người dùng
                  </span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all" />
                </Link>
              )}

              <Link
                href="/dashboard/records?print=qr"
                className="w-full bg-white/5 hover:bg-white/10 text-white text-xs font-semibold py-4 px-5 rounded-2xl flex items-center justify-between transition-colors border border-white/5 group/btn"
              >
                <span className="flex items-center gap-3">
                  <QrCode className="w-4 h-4 text-primary-fixed-dim" />
                  In mã QR hồ sơ
                </span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all" />
              </Link>

              <Link
                href="/dashboard/records?create=true"
                className="w-full bg-primary hover:bg-primary-container text-on-primary text-xs font-semibold py-4 px-5 rounded-2xl flex items-center justify-between transition-colors shadow-lg shadow-primary/20 group/btn mt-2"
              >
                <span className="flex items-center gap-3">
                  <PlusCircle className="w-4 h-4" />
                  Tạo hồ sơ mới
                </span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all" />
              </Link>
            </div>
          </div>

          {/* Storage Usage Progress */}
          <div className="bg-pure-surface border border-whisper-border rounded-3xl p-6 shadow-sm flex-1 flex flex-col justify-between overflow-hidden relative">
            <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-secondary/5 rounded-full blur-xl pointer-events-none"></div>
            
            <div>
              <h4 className="text-base font-bold text-on-surface mb-2 flex items-center gap-2">
                <HardDrive className="w-4.5 h-4.5 text-primary" />
                Dung Lượng Số Hóa
              </h4>
              <p className="text-xs text-secondary leading-relaxed">Bộ nhớ chứa các file tài liệu số hóa trên đám mây lưu trữ MinIO đang ở mức tối ưu.</p>
            </div>

            <div className="mt-6 relative z-10">
              <div className="flex justify-between font-mono text-[10px] text-on-surface-variant font-bold mb-2">
                <span>42.8 GB Đã Dùng</span>
                <span>100 GB Tổng Cộng</span>
              </div>
              <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden border border-slate-200">
                <div className="h-full bg-primary w-[42%] rounded-full shadow-[0_0_10px_rgba(0,74,198,0.3)]"></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
