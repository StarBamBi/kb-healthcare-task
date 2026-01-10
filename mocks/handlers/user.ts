import { http, HttpResponse } from "msw";

export const userHandlers = [
  http.get("/api/user", ({ request }) => {
    const authHeader = request.headers.get("authorization");

    if (!authHeader) {
      return HttpResponse.json(
        { errorMessage: "인증이 필요합니다." },
        { status: 401 }
      );
    }

    return HttpResponse.json(
      {
        name: "김태준",
        memo: "KB헬스케어 프론트엔드 개발자입니다.",
      },
      { status: 200 }
    );
  }),
];
