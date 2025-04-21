
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-nexo-darker">
      <div className="text-center max-w-md px-4">
        <h1 className="text-9xl font-bold text-nexo-blue mb-4">404</h1>
        <p className="text-2xl text-white mb-6">Page Not Found</p>
        <p className="text-gray-300 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="nexo-button">
          Return to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
