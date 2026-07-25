import { Link } from "react-router-dom";
import { FiArrowLeft, FiSave } from "react-icons/fi";

function MemberForm({ mode = "create" }) {
  const isEdit = mode === "edit";

  return (
    <div className="space-y-6">

      {/* Back */}

      <Link
        to="/admin/members"
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
      >
        <FiArrowLeft />
        Back to Members
      </Link>

      {/* Personal Information */}

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">

        <div className="border-b border-gray-200 px-6 py-5">

          <h2 className="text-xl font-semibold">
            Personal Information
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Basic details of the team member.
          </p>

        </div>

        <div className="grid md:grid-cols-2 gap-6 p-6">

          <div>

            <label className="block text-sm font-medium mb-2">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Rahul Sharma"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />

          </div>

          <div>

            <label className="block text-sm font-medium mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="rahul@gmail.com"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />

          </div>

          <div>

            <label className="block text-sm font-medium mb-2">
              Phone
            </label>

            <input
              type="tel"
              placeholder="+91 9876543210"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />

          </div>

          <div>

            <label className="block text-sm font-medium mb-2">
              Department
            </label>

            <input
              type="text"
              placeholder="Sales"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />

          </div>

        </div>

      </div>

      {/* Account Information */}

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">

        <div className="border-b border-gray-200 px-6 py-5">

          <h2 className="text-xl font-semibold">
            Account Information
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Configure login access and permissions.
          </p>

        </div>

        <div className="grid md:grid-cols-2 gap-6 p-6">

          <div>

            <label className="block text-sm font-medium mb-2">
              Role
            </label>

            <select className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100">

              <option>Member</option>
              <option>Admin</option>

            </select>

          </div>

          <div>

            <label className="block text-sm font-medium mb-2">
              Status
            </label>

            <select className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100">

              <option>Active</option>
              <option>Inactive</option>

            </select>

          </div>

          <div>

            <label className="block text-sm font-medium mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />

          </div>

          <div>

            <label className="block text-sm font-medium mb-2">
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm password"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />

          </div>

        </div>

      </div>

      {/* Permissions */}

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">

        <div className="border-b border-gray-200 px-6 py-5">

          <h2 className="text-xl font-semibold">
            Permissions Preview
          </h2>

        </div>

        <div className="p-6">

          <div className="grid md:grid-cols-2 gap-4">

            <div className="rounded-xl bg-blue-50 border border-blue-100 p-4">

              <h3 className="font-semibold mb-3">
                Admin Permissions
              </h3>

              <ul className="space-y-2 text-sm text-gray-600">

                <li>✔ View all leads</li>
                <li>✔ Create members</li>
                <li>✔ Assign leads</li>
                <li>✔ Delete leads</li>
                <li>✔ View activity</li>

              </ul>

            </div>

            <div className="rounded-xl bg-green-50 border border-green-100 p-4">

              <h3 className="font-semibold mb-3">
                Member Permissions
              </h3>

              <ul className="space-y-2 text-sm text-gray-600">

                <li>✔ View assigned leads</li>
                <li>✔ Update lead status</li>
                <li>✔ Add notes</li>
                <li>✔ View activity</li>
                <li>✖ Delete leads</li>

              </ul>

            </div>

          </div>

        </div>

      </div>

      {/* Footer */}

      <div className="flex justify-end gap-4">

        <Link
          to="/admin/members"
          className="px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
        >
          Cancel
        </Link>

        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition cursor-pointer"
        >
          <FiSave />

          {isEdit ? "Save Changes" : "Create Member"}

        </button>

      </div>

    </div>
  );
}

export default MemberForm;