import Head from "next/head";
import { Fragment } from "react";

interface Props {
  title?: string;
  heading: string;
}

export const DefaultLayout: React.FC<Props> = ({
  title,
  heading,
  children,
}) => {
  return (
    <Fragment>
      <Head>
        <title>{title || "readit"}</title>
      </Head>
      <main className="flex h-screen">
        <section
          className="w-1/12 h-full bg-cover bg-no-repeat"
          style={{ backgroundImage: "url(/assets/bg.png)" }}
        />
        <section className="flex-1 h-full p-6 flex items-center">
          <div className="w-full max-w-xs">
            <h3 className="font-medium text-lg mb-2">{heading}</h3>
            {children}
          </div>
        </section>
      </main>
    </Fragment>
  );
};
