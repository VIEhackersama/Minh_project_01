import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/providers";
import { AuthProvider } from "@/components/auth-context";


export const metadata: Metadata = {
  title: "EduArchive — Quản lý Hồ sơ Giáo dục",
  description: "Hệ thống số hóa, quản lý, mượn trả và kiểm kê hồ sơ học sinh, giáo viên. An toàn và bảo mật.",
  openGraph: {
    title: "EduArchive — Quản lý Hồ sơ Giáo dục",
    description: "Hệ thống số hóa, quản lý, mượn trả và kiểm kê hồ sơ học sinh, giáo viên.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col bg-canvas-white text-on-surface font-sans">
        <a href="#main-content" className="skip-to-content">Chuyển đến nội dung chính</a>
        <Providers>
          <AuthProvider>
            {children}
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
