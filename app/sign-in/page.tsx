import SignInForm from "@/features/auth/sign-in/ui/SignInForm";

export default function SignInPage() {
  return (
    <section className="mx-auto mt-20 max-w-sm">
      <h1 className="mb-6 text-xl font-semibold">로그인</h1>
      <SignInForm />
    </section>
  );
}
