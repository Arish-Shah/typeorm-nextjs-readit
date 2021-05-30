import { useEffect, useRef } from "react";

interface Props {
  id: string;
  label: string;
  value: string;
  onChange: (e) => void;
}

export const InputField: React.FC<Props> = ({ id, label, value, onChange }) => {
  const inputRef = useRef<HTMLInputElement>();

  useEffect(() => {
    if (inputRef?.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="py-2">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        type="text"
        className="
          border 
          border-gray-300 
          rounded 
          mt-1 
          p-2 
          w-full 
          bg-gray-50 
          focus:border-gray-400 
          focus:bg-white 
          hover:border-gray-400 
          hover:bg-white 
          active:border-blue-500 
          outline-none 
          transition"
        placeholder="email@example.com"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        ref={inputRef}
      />
    </div>
  );
};
