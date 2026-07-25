import { Link, useNavigate } from "react-router-dom";
  
function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-sm">

      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        <h1 className="text-2xl font-bold text-blue-600">
          LeadFlow
        </h1>

        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer" onClick={() => navigate('/login')}>
          Login
        </button>

      </div>

    </nav>
  );
}

export default Navbar;