import { authHandlers } from "./auth";
import { dashboardHandlers } from "./dashboard";
import { taskHandlers } from "./task";

export const handlers = [
  ...authHandlers,
  ...dashboardHandlers,
  ...taskHandlers,
];
