import { Link } from "react-router-dom";
import { FiArrowLeft, FiSave, FiUpload } from "react-icons/fi";

function EditProfile() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">

      {/* Back */}

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
          Edit Profile
        </h1>

        <p className="text-gray-500 mt-2">
          Update your personal information.
        </p>

      </div>

      {/* Personal Information */}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200">

        <div className="border-b border-gray-200 px-6 py-5">

          <h2 className="text-xl font-semibold">
            Personal Information
          </h2>

        </div>

        <div className="grid md:grid-cols-2 gap-6 p-6">

          <div>

            <label className="block text-sm font-medium mb-2">
              Full Name
            </label>

            <input
              type="text"
              defaultValue="Rahul Sharma"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />

          </div>

          <div>

            <label className="block text-sm font-medium mb-2">
              Email
            </label>

            <input
              type="email"
              defaultValue="rahul@gmail.com"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />

          </div>

          <div>

            <label className="block text-sm font-medium mb-2">
              Phone Number
            </label>

            <input
              type="text"
              defaultValue="+91 9876543210"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />

          </div>

          <div>

            <label className="block text-sm font-medium mb-2">
              Department
            </label>

            <input
              type="text"
              defaultValue="Sales"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 bg-gray-100"
              disabled
            />

          </div>

        </div>

      </div>

      {/* Profile Picture */}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200">

        <div className="border-b border-gray-200 px-6 py-5">

          <h2 className="text-xl font-semibold">
            Profile Picture
          </h2>

        </div>

        <div className="p-6 flex flex-col md:flex-row items-center gap-6">

          <div className="w-24 h-24 rounded-full bg-blue-600 text-white flex items-center justify-center text-4xl font-bold">
            R
          </div>

          <div>

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl flex items-center gap-2 cursor-pointer">

              <FiUpload />

              Upload New Photo

            </button>

            <p className="text-sm text-gray-500 mt-3">
              JPG, PNG or WEBP. Maximum file size 2 MB.
            </p>

          </div>

        </div>

      </div>

      {/* Account Information */}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200">

        <div className="border-b border-gray-200 px-6 py-5">

          <h2 className="text-xl font-semibold">
            Account Information
          </h2>

        </div>

        <div className="grid md:grid-cols-2 gap-6 p-6">

          <div>

            <label className="block text-sm font-medium mb-2">
              Username
            </label>

            <input
              type="text"
              value="rahul_member"
              disabled
              className="w-full rounded-xl border border-gray-300 px-4 py-3 bg-gray-100 cursor-not-allowed"
            />

          </div>

          <div>

            <label className="block text-sm font-medium mb-2">
              Role
            </label>

            <input
              type="text"
              value="Sales Member"
              disabled
              className="w-full rounded-xl border border-gray-300 px-4 py-3 bg-gray-100 cursor-not-allowed"
            />

          </div>

        </div>

      </div>

      {/* Buttons */}

      <div className="flex justify-end gap-4">

        <Link
          to="/member/profile"
          className="px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
        >
          Cancel
        </Link>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 cursor-pointer">

          <FiSave />

          Save Changes

        </button>

      </div>

    </div>
  );
}

export default EditProfile;