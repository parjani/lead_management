import { Link } from "react-router-dom";
import { FiArrowLeft, FiLock, FiSave, FiShield } from "react-icons/fi";

function ChangePassword() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">

      {/* Back Button */}

      <Link
        to="/member/profile"
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
      >
        <FiArrowLeft />
        Back to Profile
      </Link>

      {/* Heading */}

      <div>

        <h1 className="text-3xl font-bold text-gray-800">
          Change Password
        </h1>

        <p className="text-gray-500 mt-2">
          Keep your account secure by updating your password regularly.
        </p>

      </div>

      {/* Password Form */}

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">

        <div className="border-b border-gray-200 px-6 py-5">

          <h2 className="text-xl font-semibold flex items-center gap-2">

            <FiLock />

            Password Information

          </h2>

        </div>

        <div className="p-6 space-y-6">

          <div>

            <label className="block text-sm font-medium mb-2">
              Current Password
            </label>

            <input
              type="password"
              placeholder="Enter current password"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
            />

          </div>

          <div>

            <label className="block text-sm font-medium mb-2">
              New Password
            </label>

            <input
              type="password"
              placeholder="Enter new password"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
            />

          </div>

          <div>

            <label className="block text-sm font-medium mb-2">
              Confirm New Password
            </label>

            <input
              type="password"
              placeholder="Confirm your new password"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
            />

          </div>

        </div>

      </div>

      {/* Password Guidelines */}

      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">

        <div className="flex items-center gap-3 mb-4">

          <FiShield className="text-2xl text-blue-600" />

          <h2 className="text-lg font-semibold text-blue-700">
            Password Guidelines
          </h2>

        </div>

        <ul className="space-y-2 text-sm text-gray-700">

          <li>✔ Minimum 8 characters</li>

          <li>✔ At least one uppercase letter</li>

          <li>✔ At least one lowercase letter</li>

          <li>✔ At least one number</li>

          <li>✔ At least one special character</li>

        </ul>

      </div>

      {/* Security Tips */}

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

        <h2 className="text-lg font-semibold mb-4">
          Security Tips
        </h2>

        <ul className="space-y-3 text-sm text-gray-600">

          <li>• Never share your password with anyone.</li>

          <li>• Avoid using personal information in your password.</li>

          <li>• Use a unique password for this application.</li>

          <li>• Update your password every few months.</li>

        </ul>

      </div>

      {/* Buttons */}

      <div className="flex justify-end gap-4">

        <Link
          to="/member/profile"
          className="px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
        >
          Cancel
        </Link>

        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition cursor-pointer"
        >

          <FiSave />

          Update Password

        </button>

      </div>

    </div>
  );
}

export default ChangePassword;