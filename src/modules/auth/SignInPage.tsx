import { FormEventHandler, useState } from "react";
import { signIn } from "next-auth/client";
import { useRouter } from "next/router";

import { AuthLayout } from "@/layouts/AuthLayout";
import { Input } from "@/common/components/Input";
import { Button } from "@/common/components/Button";
import { Alert } from "@/common/components/Alert";

export const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    setLoading(true);
    signIn("email", { email, callbackUrl: "/" });
  };

  return (
    <AuthLayout title="readit / sign in" size="xs">
      <h3 className="text-2xl font-bold mb-4">
        Sign in to <span className="text-blue-700">readit</span>
      </h3>
      {router.query.error && <Alert>Error Occured</Alert>}
      <form onSubmit={handleSubmit}>
        <Input
          placeholder="email@example.com"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
          required
        />
        <Button type="submit" block isLoading={loading}>
          {loading ? "Signing in..." : "Sign in with Email"}
        </Button>
      </form>
    </AuthLayout>
  );
};
