export interface Task {
  id: string;
  title: string;
  memo: string;
  status: "TODO" | "DONE";
}
