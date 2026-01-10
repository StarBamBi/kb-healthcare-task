"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { tokenStorage } from "@/shared/lib/token";

export default function GNB() {
  const router = useRouter();
  const isLoggedIn = Boolean(tokenStorage.getAccessToken());

  const handleAuthClick = () => {
    if (isLoggedIn) {
      router.push("/user");
    } else {
      router.push("/sign-in");
    }
  };

  return (
    <header className="flex h-14 items-center justify-between border-b px-6">
      <h1 className="text-sm font-semibold">KB Healthcare</h1>

      <button
        onClick={handleAuthClick}
        className="rounded px-3 py-1 text-sm hover:bg-gray-100"
      >
        {isLoggedIn ? "회원정보" : "로그인"}
      </button>
    </header>
  );
}
