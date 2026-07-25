import { FiBell, FiSearch, FiChevronDown } from "react-icons/fi";

function UserHeader() {
  return (
    <header className="h-20 bg-white border-b border-gray-200 px-8 flex items-center justify-between">

      {/* Left */}

      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          Welcome Back!
        </h2>

      </div>

      {/* Right */}

      <div className="flex items-center gap-6">

        

        {/* User */}

        <button className="flex items-center gap-3 hover:bg-gray-100 rounded-xl px-3 py-2 transition cursor-pointer">

          <img
            src="https://i.pravatar.cc/100"
            alt="profile"
            className="w-11 h-11 rounded-full object-cover"
          />

          <div className="hidden md:block text-left">

            <h4 className="font-semibold">
              Admin User
            </h4>

            <p className="text-sm text-gray-500">
              Administrator
            </p>

          </div>


        </button>

      </div>

    </header>
  );
}

export default UserHeader;