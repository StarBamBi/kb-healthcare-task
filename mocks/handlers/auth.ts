import { http, HttpResponse } from "msw";

export const authHandlers = [
  http.post("/api/sign-in", async ({ request }) => {
    const body = await request.json();

    const { email, password } = body as {
      email: string;
      password: string;
    };

    // 실패 케이스
    if (email !== "test@test.com" || password !== "password123") {
      return HttpResponse.json(
        {
          errorMessage: "이메일 또는 비밀번호가 올바르지 않습니다.",
        },
        { status: 400 }
      );
    }

    // 성공 케이스
    return HttpResponse.json(
      {
        accessToken: "mock-access-token",
        refreshToken: "mock-refresh-token",
      },
      { status: 200 }
    );
  }),
];
