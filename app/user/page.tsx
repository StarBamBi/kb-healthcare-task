"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserQuery } from "@/entities/user/api/useUserQuery";

export default function UserPage() {
  const router = useRouter();
  const { data, isLoading, isError, error } = useUserQuery();

  useEffect(() => {
    if (!isError) return;

    const status = (error as any)?.response?.status;
    if (status === 401) {
      router.replace("/sign-in?redirect=/user");
    }
  }, [isError, error, router]);

  if (isLoading) {
    return <p>로딩 중...</p>;
  }

  if (isError) {
    return null;
  }

  return (
    <section className="space-y-4">
      <h1 className="text-xl font-semibold">회원정보</h1>

      <div className="rounded border p-4">
        <p className="mb-2">
          <span className="font-medium">이름</span>: {data?.name}
        </p>
        <p>
          <span className="font-medium">메모</span>: {data?.memo}
        </p>
      </div>
    </section>
  );
}
