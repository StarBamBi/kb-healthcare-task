import { http, HttpResponse } from "msw";

const PAGE_SIZE = 10;

export const taskHandlers = [
  /* ---------------- 할 일 목록 ---------------- */
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

    // 무한 스크롤 에러 시나리오
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

  /* ---------------- 할 일 상세 ---------------- */
  http.get("/api/task/:id", ({ params, request }) => {
    const authHeader = request.headers.get("authorization");

    if (!authHeader) {
      return HttpResponse.json(
        { errorMessage: "인증이 필요합니다." },
        { status: 401 }
      );
    }

    const { id } = params;

    if (id === "404") {
      return HttpResponse.json(
        { errorMessage: "존재하지 않는 할 일입니다." },
        { status: 404 }
      );
    }

    return HttpResponse.json(
      {
        title: `할 일 ${id}`,
        memo: `할 일 ${id}의 상세 내용입니다.`,
        registerDatetime: "2024-01-01 10:00:00",
      },
      { status: 200 }
    );
  }),

  /* ---------------- 할 일 삭제 ---------------- */
  http.delete("/api/task/:id", ({ request }) => {
    const authHeader = request.headers.get("authorization");

    if (!authHeader) {
      return HttpResponse.json(
        { errorMessage: "인증이 필요합니다." },
        { status: 401 }
      );
    }

    return new HttpResponse(null, { status: 200 });
  }),
];
