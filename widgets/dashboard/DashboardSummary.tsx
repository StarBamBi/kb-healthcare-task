"use client";

import { useDashboardQuery } from "@/entities/dashboard/api/useDashboardQuery";

export default function DashboardSummary() {
  const { data, isLoading, isError } = useDashboardQuery();

  if (isLoading) {
    return <p>로딩 중...</p>;
  }

  if (isError || !data) {
    return <p>대시보드 정보를 불러오지 못했습니다.</p>;
  }

  const { numOfTask, numOfRestTask, numOfDoneTask } = data;

  return (
    <div className="grid grid-cols-3 gap-4">
      <DashboardCard title="전체 할 일" value={numOfTask} />
      <DashboardCard title="해야 할 일" value={numOfRestTask} />
      <DashboardCard title="완료한 일" value={numOfDoneTask} />
    </div>
  );
}

function DashboardCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="rounded border p-4 text-center">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
    </div>
  );
}
