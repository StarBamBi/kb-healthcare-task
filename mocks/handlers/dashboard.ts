import { http, HttpResponse } from "msw";

export const dashboardHandlers = [
  http.get("/api/dashboard", ({ request }) => {
    const authHeader = request.headers.get("authorization");

    // 인증 실패
    if (!authHeader) {
      return HttpResponse.json(
        { errorMessage: "인증이 필요합니다." },
        { status: 401 }
      );
    }

    // 성공
    return HttpResponse.json(
      {
        numOfTask: 12,
        numOfRestTask: 5,
        numOfDoneTask: 7,
      },
      { status: 200 }
    );
  }),
];
