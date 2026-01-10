import DashboardSummary from "@/widgets/dashboard/DashboardSummary";

export default function DashboardPage() {
  return (
    <main className="mx-auto mt-10 max-w-3xl px-4">
      <h1 className="mb-6 text-xl font-semibold">대시보드</h1>
      <DashboardSummary />
    </main>
  );
}
