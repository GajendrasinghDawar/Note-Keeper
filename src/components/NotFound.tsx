import { useNavigate } from "react-router";

export function NotFound() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen -m-20 font-poppins font-inter">
      <h1 className="text-5xl md:text-6xl font-bold text-red11 mb-4">Oops!</h1>
      <h2 className="text-3xl md:text-4xl font-bold text-crimson11  mb-6">
        Sorry, Route Not Found!
      </h2>
      <button
        onClick={handleGoHome}
        className="px-4 py-2 font-medium rounded-lg   hover:scale-105  text-crimson11 transition duration-200 ease-in-out transform underline "
      >
        Go back To Home
      </button>
    </div>
  );
}
