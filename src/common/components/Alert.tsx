interface Props {}

export const Alert: React.FC<Props> = ({ children }) => {
  return (
    <div className="bg-red-100 border border-red-400 text-red-600 rounded-md p-2 text-sm">
      {children}
    </div>
  );
};
