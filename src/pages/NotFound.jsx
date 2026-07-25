import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold text-blue-600">404</h1>
      <p className="mt-3 text-gray-600">Page Not Found</p>

      <Link
        to="/"
        className="mt-6 rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
      >
        Go Home
      </Link>
    </div>
  );
}

export default NotFound;