import { useRouteError, useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError() as { statusText?: string; message?: string };
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center bg-yellow2 min-h-screenp-6 font-playwrite">
      <h1 className="text-3xl md:text-4xl font-bold text-red11 mb-4">Oops!</h1>
      <p className="text-lg md:text-xl text-slate11 mb-6">
        Sorry, an unexpected error has occurred.
      </p>
      <p className="text-sm md:text-base text-slate11 mb-6">
        <i>{error.statusText || error.message}</i>
      </p>
      <button
        onClick={handleGoHome}
        className="px-4 py-2 bg-crimson5 text-crimson11 font-semibold rounded-lg shadow-md hover:bg-crimson6 focus:outline-none focus:ring-2 focus:ring-crimson4/75 transition duration-300 ease-in-out transform"
      >
        Go back To Home
      </button>
    </div>
  );
}
