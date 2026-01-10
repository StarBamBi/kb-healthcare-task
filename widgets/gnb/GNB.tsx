"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { tokenStorage } from "@/shared/lib/token";

export default function GNB() {
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setIsLoggedIn(Boolean(tokenStorage.getAccessToken()));
  }, []);

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
        className="text-sm font-bold text-yellow-500 cursor-pointer"
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
            회원정보
          </button>
        )}

        <button
          onClick={handleAuthClick}
          className="rounded px-3 py-1 text-sm hover:bg-gray-100 cursor-pointer"
        >
          {isLoggedIn ? "로그아웃" : "로그인"}
        </button>
      </div>
    </header>
  );
}
