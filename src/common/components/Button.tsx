import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  block?: boolean;
  isLoading?: boolean;
}

export const Button: React.FC<Props> = ({
  block,
  isLoading,
  children,
  ...props
}) => {
  return (
    <button
      {...props}
      className={`${
        block ? "w-full" : ""
      } bg-blue-700 text-white font-medium py-2 px-8 rounded-md transition focus:ring disabled:bg-blue-500 disabled:cursor-not-allowed`}
      disabled={isLoading}
    >
      {children}
    </button>
  );
};
