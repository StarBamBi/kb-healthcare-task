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
    router.push(isLoggedIn ? "/user" : "/sign-in");
  };

  return (
    <header className="flex h-14 items-center justify-between border-b px-6">
      <h1 className="text-sm font-bold text-yellow-500">KB Healthcare</h1>

      <button
        onClick={handleAuthClick}
        className="rounded px-3 py-1 text-sm hover:bg-gray-100"
      >
        {isLoggedIn ? "회원정보" : "로그인"}
      </button>
    </header>
  );
}
