import { useRouteError } from "react-router-dom"

export default function ErrorPage() {
  const error = useRouteError()

  return (
    <div
      className="flex flex-col items-center justify-center bg-yellow-yellow2 min-h-screenp-6 font-playwrite"
    >
      <h1 className="text-3xl md:text-4xl font-bold text-red-red11 mb-4">
        Oops!
      </h1>
      <p className="text-lg md:text-xl text-gray-gray11 mb-6">
        Sorry, an unexpected error has occurred.
      </p>
      <p className="text-sm md:text-base text-gray-gray11 mb-6">
        <i>{error.statusText || error.message}</i>
      </p>
      <button
        onClick={handleGoHome}
        className="px-4 py-2 bg-iris-iris5 text-iris-iris11 font-semibold rounded-lg shadow-md hover:bg-iris-iris6 focus:outline-none focus:ring-2 focus:ring-iris-iris4 focus:ring-opacity-75 transition duration-300 ease-in-out transform"
      >
        Go back To Home
      </button>
    </div>
  )
}
