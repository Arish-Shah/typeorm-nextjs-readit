import { FormEventHandler, useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/client";

import { DefaultLayout } from "@/layouts/DefaultLayout";
import { InputField } from "./components/InputField";
import { SignInButton } from "./components/SignInButton";
import { Alert } from "./components/Alert";

export const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const error = router.query.error;

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    await signIn("email", { email, callbackUrl: "/" });
    setLoading(false);
  };

  return (
    <DefaultLayout title="readit: Authentication" heading="Authentication">
      {error && <Alert text="Something went wrong." />}
      <form onSubmit={handleSubmit}>
        <InputField
          value={email}
          onChange={setEmail}
          id="email"
          label="Email"
        />
        <SignInButton isLoading={loading} />
      </form>
    </DefaultLayout>
  );
};
