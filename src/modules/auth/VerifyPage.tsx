import Link from "next/link";

import { DefaultLayout } from "@/layouts/DefaultLayout";

export const VerifyPage = () => {
  return (
    <DefaultLayout title="readit: Verify Request" heading="Check your Email">
      <p className="mb-4">
        A sign in link has been sent to your email address.
      </p>
      <Link href="/">
        <a className="text-sm text-blue-700 hover:underline">Go to Homepage</a>
      </Link>
    </DefaultLayout>
  );
};
