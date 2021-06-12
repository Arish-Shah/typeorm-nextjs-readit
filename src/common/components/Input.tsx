import { InputHTMLAttributes, useEffect, useRef } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input: React.FC<Props> = ({ label, ...props }) => {
  const inputRef = useRef<HTMLInputElement>();

  useEffect(() => {
    if (props.autoFocus && inputRef?.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="my-2">
      <label htmlFor={props.id} className="block mb-1 text-sm font-medium">
        {label}
      </label>
      <input
        {...props}
        ref={inputRef}
        className="outline-none w-full border-2 border-gray-300 rounded-md p-1 focus:border-blue-700 transition"
      />
    </div>
  );
};
