import { getUser } from "../utils/token";

function UserHeader() {

  const user = getUser();

  const userName = user?.name || "Guest User";
  const userRole = user?.role || "Member";

  // Get initials (e.g. "Admin User" => "AU")
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <header className="h-20 bg-white border-b border-gray-200 px-8 flex items-center justify-between">

      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          Welcome Back!
        </h2>
      </div>

      <button className="flex items-center gap-3 hover:bg-gray-100 rounded-xl px-3 py-2 transition cursor-pointer">

        {/* Avatar */}
        <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-lg shadow-sm">
          {getInitials(userName)}
        </div>

        <div className="hidden md:block text-left">
          <h4 className="font-semibold">{userName}</h4>

          <p className="text-sm text-gray-500 capitalize">
            {userRole}
          </p>
        </div>

      </button>

    </header>
  );
}

export default UserHeader;