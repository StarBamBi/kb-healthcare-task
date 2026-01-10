"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { signInValidation } from "../model/signInSchema";
import { useSignInMutation } from "../api/useSignInMutation";
import { tokenStorage } from "@/shared/lib/token";

interface FormValues {
  email: string;
  password: string;
}

export default function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") ?? "/";

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: "onChange",
  });

  const { mutate, isPending } = useSignInMutation();

  const onSubmit = (data: FormValues) => {
    mutate(data, {
      onSuccess: ({ accessToken, refreshToken }) => {
        tokenStorage.setTokens(accessToken, refreshToken);
        router.replace(redirectTo);
      },
      onError: (error: any) => {
        alert(error.response?.data?.errorMessage);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div>
        <label>이메일</label>
        <input
          {...register("email", signInValidation.email)}
          className="w-full border p-2"
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label>비밀번호</label>
        <input
          type="password"
          {...register("password", signInValidation.password)}
          className="w-full border p-2"
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={!isValid || isPending}
        className={`h-10 rounded text-white ${
          isValid ? "bg-primary" : "bg-disabled"
        }`}
      >
        로그인
      </button>
    </form>
  );
}
