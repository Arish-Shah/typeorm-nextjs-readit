import { Button } from "@/common/components/Button";
import { AuthLayout } from "@/layouts/AuthLayout";
import { signOut } from "next-auth/client";

export const SignOutPage = () => {
  const handleSignOut = () => signOut({ callbackUrl: "/" });

  return (
    <AuthLayout title="readit / sign out" size="lg">
      <div className="text-center">
        <h1 className="font-medium text-3xl mb-6">
          Are you sure you want to sign out?
        </h1>
        <Button onClick={handleSignOut}>Sign out</Button>
      </div>
    </AuthLayout>
  );
};
