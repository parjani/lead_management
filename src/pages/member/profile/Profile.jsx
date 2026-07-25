import {
  FiMail,
  FiPhone,
  FiUser,
  FiCalendar,
  FiShield,
  FiCheckCircle,
} from "react-icons/fi";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getProfile } from "../../../api/profileApi";

function Profile() {

  const [profile, setProfile] = useState(null);

  const fetchProfile = async () => {

    try {

      const response = await getProfile();

      setProfile(response.user);

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to load profile."
      );

    }

  };

  useEffect(() => {

    fetchProfile();

  }, []);

  if (!profile) {

    return (

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-10 text-center text-gray-500">

        Loading profile...

      </div>

    );

  }

  return (

    <div className="space-y-8">

      {/* Header */}

      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8">

        <div className="flex flex-col lg:flex-row items-center lg:items-center gap-6">

          <div className="w-28 h-28 rounded-full bg-blue-600 text-white flex items-center justify-center text-5xl font-bold shadow-lg">

            {profile.name.charAt(0).toUpperCase()}

          </div>

          <div className="flex-1">

            <h1 className="text-3xl font-bold text-gray-800">

              {profile.name}

            </h1>

            <p className="text-gray-500 mt-2 capitalize">

              {profile.role}

            </p>

            <span
              className={`inline-block mt-4 px-4 py-2 rounded-full text-sm font-semibold ${
                profile.status === "active"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >

              {profile.status}

            </span>

          </div>

        </div>

      </div>

      {/* Information */}

      <div className="grid lg:grid-cols-2 gap-6">

        {/* Personal */}

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">

          <div className="border-b border-gray-200 px-6 py-4">

            <h2 className="text-xl font-semibold">

              Personal Information

            </h2>

          </div>

          <div className="p-6 space-y-6">

            <div className="flex items-center gap-4">

              <FiUser className="text-blue-600 text-xl" />

              <div>

                <p className="text-sm text-gray-500">

                  Full Name

                </p>

                <p className="font-medium">

                  {profile.name}

                </p>

              </div>

            </div>

            <div className="flex items-center gap-4">

              <FiMail className="text-green-600 text-xl" />

              <div>

                <p className="text-sm text-gray-500">

                  Email

                </p>

                <p className="font-medium">

                  {profile.email}

                </p>

              </div>

            </div>

            <div className="flex items-center gap-4">

              <FiPhone className="text-orange-500 text-xl" />

              <div>

                <p className="text-sm text-gray-500">

                  Phone

                </p>

                <p className="font-medium">

                  {profile.phone}

                </p>

              </div>

            </div>

          </div>

        </div>

        {/* Account */}

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">

          <div className="border-b border-gray-200 px-6 py-4">

            <h2 className="text-xl font-semibold">

              Account Information

            </h2>

          </div>

          <div className="p-6 space-y-6">

            <div className="flex items-center gap-4">

              <FiShield className="text-purple-600 text-xl" />

              <div>

                <p className="text-sm text-gray-500">

                  Role

                </p>

                <p className="font-medium capitalize">

                  {profile.role}

                </p>

              </div>

            </div>

            <div className="flex items-center gap-4">

              <FiCalendar className="text-blue-600 text-xl" />

              <div>

                <p className="text-sm text-gray-500">

                  Joined On

                </p>

                <p className="font-medium">

                  {new Date(profile.createdAt).toLocaleDateString()}

                </p>

              </div>

            </div>

            <div className="flex items-center gap-4">

              <FiCheckCircle className="text-green-600 text-xl" />

              <div>

                <p className="text-sm text-gray-500">

                  Account Status

                </p>

                <p className="font-medium capitalize">

                  {profile.status}

                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Info Card */}

      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">

        <h2 className="text-lg font-semibold text-blue-700 mb-2">

          Profile Information

        </h2>

        <p className="text-gray-700">

          This profile is managed by the administrator. If you need to update
          your personal information or account details, please contact your
          administrator.

        </p>

      </div>

    </div>

  );

}

export default Profile;