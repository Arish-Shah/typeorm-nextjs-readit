interface Props {
  text: string;
}

export const Alert: React.FC<Props> = ({ text }) => {
  return (
    <div className="bg-red-50 text-xs font-medium text-red-500 border border-red-300 rounded p-2">
      {text}
    </div>
  );
};
