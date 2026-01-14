// widgets/lnb/LNB.tsx
"use client";

import { useRouter, usePathname } from "next/navigation";
import { LayoutDashboard, CheckSquare } from "lucide-react";

export default function LNB() {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <aside className="w-48 border-r p-4">
      <nav className="flex flex-col gap-2">
        <button
          onClick={() => router.push("/")}
          className={`flex items-center gap-2 rounded px-3 py-2 text-sm cursor-pointer ${
            isActive("/") ? "bg-primary text-white" : "hover:bg-gray-100"
          }`}
        >
          <LayoutDashboard size={16} />
          대시보드
        </button>

        <button
          onClick={() => router.push("/task")}
          className={`flex items-center gap-2 rounded px-3 py-2 text-sm cursor-pointer ${
            isActive("/task") ? "bg-primary text-white" : "hover:bg-gray-100"
          }`}
        >
          <CheckSquare size={16} />할 일
        </button>
      </nav>
    </aside>
  );
}
