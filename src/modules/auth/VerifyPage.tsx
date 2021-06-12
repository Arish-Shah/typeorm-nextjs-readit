import { AuthLayout } from "@/layouts/AuthLayout";

export const VerifyPage = () => {
  return (
    <AuthLayout title="readit / verify request" size="lg">
      <div className="text-center">
        <h1 className="font-medium text-3xl mb-6">Check your Email</h1>
        <p>A sign in link has been sent to your email address.</p>
      </div>
    </AuthLayout>
  );
};
