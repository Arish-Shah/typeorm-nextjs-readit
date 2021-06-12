import { Fragment } from "react";
import Head from "next/head";

interface Props {
  title?: string;
  size: "xs" | "sm" | "md" | "lg";
}

export const AuthLayout: React.FC<Props> = ({ title, size, children }) => {
  return (
    <Fragment>
      <Head>
        <title>{title || "readit"}</title>
      </Head>
      <main className={`max-w-${size} mx-auto h-screen flex items-center p-3`}>
        <div className="w-full">{children}</div>
      </main>
    </Fragment>
  );
};
