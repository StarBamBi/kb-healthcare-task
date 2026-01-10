import { http, HttpResponse } from "msw";

const PAGE_SIZE = 10;

export const taskHandlers = [
  http.get("/api/task", ({ request }) => {
    const authHeader = request.headers.get("authorization");

    if (!authHeader) {
      return HttpResponse.json(
        { errorMessage: "인증이 필요합니다." },
        { status: 401 }
      );
    }

    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page") ?? 1);

    if (page === 5) {
      return HttpResponse.json(
        { errorMessage: "잘못된 요청입니다." },
        { status: 400 }
      );
    }

    const tasks = Array.from({ length: PAGE_SIZE }).map((_, idx) => ({
      id: `${page}-${idx}`,
      title: `할 일 ${page}-${idx}`,
      memo: `할 일 메모 ${page}-${idx}`,
      status: idx % 2 === 0 ? "TODO" : "DONE",
    }));

    return HttpResponse.json(tasks, { status: 200 });
  }),
];
