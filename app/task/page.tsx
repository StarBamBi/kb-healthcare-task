import TaskList from "@/features/task/task-list/ui/TaskList";

export default function TaskPage() {
  return (
    <section>
      <h1 className="mb-4 text-xl font-semibold">할 일 목록</h1>
      <TaskList />
    </section>
  );
}
