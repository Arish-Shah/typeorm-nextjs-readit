interface Props {
  isLoading?: boolean;
}

export const SignInButton: React.FC<Props> = ({ isLoading }) => {
  return (
    <div className="py-1">
      <input
        type="submit"
        className="
          cursor-pointer 
          w-full 
          bg-blue-600 
          hover:bg-blue-500 
          active:bg-blue-700 
          text-white 
          rounded 
          font-medium 
          py-2 
          disabled:cursor-not-allowed 
          disabled:bg-blue-500"
        value={isLoading ? "Signing in..." : "Sign in with Email"}
        disabled={isLoading}
      />
    </div>
  );
};
