"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { tokenStorage } from "@/shared/lib/token";
import {
  LayoutDashboard,
  CheckSquare,
  LogIn,
  User,
  LogOut,
} from "lucide-react";

export default function GNB() {
  const router = useRouter();
  const pathname = usePathname();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setIsLoggedIn(Boolean(tokenStorage.getAccessToken()));
  }, [pathname]);

  if (!isMounted) {
    return (
      <header className="flex h-14 items-center justify-between border-b px-6">
        <h1 className="text-sm font-semibold">KB Healthcare</h1>
        <div className="h-6 w-16" />
      </header>
    );
  }

  const handleAuthClick = () => {
    if (isLoggedIn) {
      // 로그아웃
      tokenStorage.clear();
      setIsLoggedIn(false);
      router.push("/sign-in");
    } else {
      router.push("/sign-in");
    }
  };

  return (
    <header className="flex h-14 items-center justify-between border-b px-6">
      <h1
        className="text-sm font-bold text-primary cursor-pointer"
        onClick={() => router.push("/")}
      >
        KB Healthcare
      </h1>

      <div className="flex gap-2">
        {isLoggedIn && (
          <button
            onClick={() => router.push("/user")}
            className="rounded px-3 py-1 text-sm hover:bg-gray-100 cursor-pointer"
          >
            <User size={16} className="inline-block mr-1" />
            회원정보
          </button>
        )}

        <button
          onClick={handleAuthClick}
          className="flex items-center gap-1 text-sm cursor-pointer hover:text-primary"
        >
          {isLoggedIn ? (
            <>
              <LogOut size={16} />
              로그아웃
            </>
          ) : (
            <>
              <LogIn size={16} />
              로그인
            </>
          )}
        </button>
      </div>
    </header>
  );
}
