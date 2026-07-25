import { Link } from "react-router-dom";
import { FiArrowLeft, FiLock, FiSave, FiShield, FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from "react";
import { toast } from "react-toastify";
import { changePassword } from "../../../api/profileApi";

function ChangePassword() {

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });


  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });


  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };



  const togglePassword = (field) => {

    setShowPassword({
      ...showPassword,
      [field]: !showPassword[field]
    });

  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("ewew");
    

    if (form.newPassword !== form.confirmPassword) {

      return toast.error(
        "New password and confirm password do not match."
      );

    }


    try {

      setLoading(true);


      const response = await changePassword({

        currentPassword: form.currentPassword,

        newPassword: form.newPassword

      });


      toast.success(response.message);


      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });


    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to change password."
      );

    } finally {

      setLoading(false);

    }

  };
  return (
    <div className="max-w-4xl mx-auto space-y-6">

      {/* Back */}

      <Link
        to="/admin/profile"
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
          Update your account password to keep your account secure.
        </p>

      </div>

      {/* Form */}

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">

        <div className="border-b border-gray-200 px-6 py-5">

          <h2 className="text-xl font-semibold flex items-center gap-2">

            <FiLock />

            Password Details

          </h2>

        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-6"
        >

          {/* Current Password */}

          <div>

            <label className="block text-sm font-medium mb-2">
              Current Password
            </label>

            <div className="relative">

              <input
                type={showPassword.current ? "text" : "password"}
                name="currentPassword"
                value={form.currentPassword}
                onChange={handleChange}
                placeholder="Enter current password"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-12 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />


              <button
                type="button"
                onClick={() => togglePassword("current")}
                className="absolute right-4 top-3.5 text-gray-500"
              >

                {
                  showPassword.current
                    ?
                    <FiEyeOff />
                    :
                    <FiEye />
                }

              </button>

            </div>

          </div>

          {/* New Password */}

          <div>

            <label className="block text-sm font-medium mb-2">
              New Password
            </label>

            <div className="relative">

              <input
                type={showPassword.new ? "text" : "password"}
                name="newPassword"
                value={form.newPassword}
                onChange={handleChange}
                placeholder="Enter new password"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-12 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />


              <button
                type="button"
                onClick={() => togglePassword("new")}
                className="absolute right-4 top-3.5 text-gray-500"
              >

                {
                  showPassword.new
                    ?
                    <FiEyeOff />
                    :
                    <FiEye />
                }

              </button>

            </div>

          </div>

          {/* Confirm */}

          <div>

            <label className="block text-sm font-medium mb-2">
              Confirm New Password
            </label>

            <div className="relative">

              <input
                type={showPassword.confirm ? "text" : "password"}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-12 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />


              <button
                type="button"
                onClick={() => togglePassword("confirm")}
                className="absolute right-4 top-3.5 text-gray-500"
              >

                {
                  showPassword.confirm
                    ?
                    <FiEyeOff />
                    :
                    <FiEye />
                }

              </button>

            </div>

          </div>

        </form>

      </div>

      {/* Password Requirements */}

      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">

        <div className="flex items-center gap-3 mb-4">

          <FiShield className="text-blue-600 text-2xl" />

          <h2 className="text-lg font-semibold text-blue-800">
            Password Requirements
          </h2>

        </div>

        <ul className="space-y-2 text-gray-700 text-sm">

          <li>✔ Minimum 8 characters</li>

          <li>✔ At least one uppercase letter (A-Z)</li>

          <li>✔ At least one lowercase letter (a-z)</li>

          <li>✔ At least one number (0-9)</li>

          <li>✔ At least one special character (@, #, $, etc.)</li>

        </ul>

      </div>

      {/* Security Tips */}

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

        <h2 className="text-lg font-semibold mb-3">
          Security Tips
        </h2>

        <ul className="space-y-2 text-gray-600 text-sm">

          <li>• Never share your password with anyone.</li>

          <li>• Avoid using the same password across multiple websites.</li>

          <li>• Change your password regularly.</li>

          <li>• Use a strong and unique password.</li>

        </ul>

      </div>

      {/* Buttons */}

      <div className="flex justify-end gap-4">

        <Link
          to="/admin/profile"
          className="px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
        >
          Cancel
        </Link>

        <button
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition cursor-pointer"
        >

          <FiSave />

          {
            loading
              ?
              "Updating..."
              :
              "Update Password"
          }

        </button>

      </div>

    </div >
  );
}

export default ChangePassword;