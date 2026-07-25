import {
  FiEdit2,
  FiLock,
  FiMail,
  FiPhone,
  FiBriefcase,
  FiUser,
  FiCalendar,
  FiClock,
  FiUsers,
  FiTarget,
  FiTrendingUp,
  FiActivity,
} from "react-icons/fi";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getProfile,
  updateProfile
} from "../../../api/profileApi";
import { useNavigate } from "react-router-dom";


function Profile() {

  const [profile, setProfile] = useState(null);

  const [edit, setEdit] = useState(false);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchProfile = async () => {

    try {

      const response = await getProfile();

      setProfile(response.user);

    }
    catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to load profile"
      );

    }

  };

  const handleUpdate = async () => {

    try {

      setLoading(true);

      const response = await updateProfile({
        name: profile.name,
        email: profile.email,
        phone: profile.phone,
      });


      toast.success(response.message);

      setEdit(false);

      fetchProfile();


    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to update profile"
      );

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchProfile();

  }, []);

  if (!profile) {

    return (
      <div className="bg-white p-10 rounded-xl text-center">
        Loading profile...
      </div>
    )

  }

  return (

    <div className="space-y-8">

      {/* Header */}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">

        <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6">

          <div className="flex items-center gap-6">

            <div className="w-20 h-20 rounded-full bg-blue-600 text-white text-3xl font-bold flex items-center justify-center shadow">
              {profile.name.charAt(0)}
            </div>

            <div>

              <h1 className="text-2xl font-bold text-gray-800">
                {profile.name}
              </h1>

              <p className="text-gray-500 mt-2">
                {profile.role}
              </p>

              <span className="inline-block mt-4 px-4 py-1 rounded-full bg-green-100 text-green-700 font-medium">
                {profile.status}
              </span>

            </div>

          </div>

          <div className="flex gap-3">

            <button
              onClick={() => {

                if (edit) {

                  handleUpdate();

                }
                else {

                  setEdit(true);

                }

              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl flex items-center gap-2"
            >

              <FiEdit2 />

              {
                loading
                  ?
                  "Saving..."
                  :
                  edit
                    ?
                    "Save Profile"
                    :
                    "Edit Profile"
              }

            </button>

            {/* <button className="border border-gray-300 hover:bg-gray-100 px-5 py-3 rounded-xl flex items-center gap-2 transition cursor-pointer"
              onClick={() => navigate("/admin/change-password")}>
              <FiLock />
              Change Password
            </button> */}

          </div>

        </div>

      </div>

      {/* Statistics */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex items-center gap-4">

          <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">

            <FiUsers className="text-blue-600 text-2xl" />

          </div>

          <div>

            <p className="text-sm text-gray-500">
              Assigned Leads
            </p>

            <h2 className="text-2xl font-bold">
              {profile.assignedLeads || 0}
            </h2>

          </div>

        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex items-center gap-4">

          <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">

            <FiTarget className="text-blue-600 text-2xl" />

          </div>

          <div>

            <p className="text-sm text-gray-500">
              Created Leads
            </p>

            <h2 className="text-2xl font-bold">
              {profile.createdLeads || 0}
            </h2>

          </div>

        </div>


        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex items-center gap-4">

          <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">

            <FiActivity className="text-blue-600 text-2xl" />

          </div>

          <div>

            <p className="text-sm text-gray-500">
              Activities
            </p>

            <h2 className="text-2xl font-bold">
              {profile.totalActivities || 0}
            </h2>

          </div>

        </div>

      </div>

      {/* Information */}

      <div className="grid grid-cols-1 gap-6">

        {/* Personal */}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200">

          <div className="border-b border-gray-200 px-6 py-4">

            <h2 className="text-xl font-semibold">
              Personal Information
            </h2>

          </div>

          <div className="p-6 space-y-6">

            <div className="flex items-center gap-4">

              <FiUser className="text-blue-600 text-xl" />

              <div className="flex-1">

                <p className="text-sm text-gray-500">
                  Full Name
                </p>

                {
                  edit ?

                    <input
                      value={profile.name}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          name: e.target.value
                        })
                      }
                      className="border rounded px-3 py-2"
                    />

                    :

                    <p>{profile.name}</p>

                }

              </div>

            </div>

            <div className="flex items-center gap-4">

              <FiMail className="text-green-600 text-xl" />

              <div>

                <p className="text-sm text-gray-500">
                  Email
                </p>

                {
                  edit ?

                    <input
                      value={profile.email}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          email: e.target.value
                        })
                      }
                      className="border rounded px-3 py-2"
                    />

                    :

                    <p>{profile.email}</p>

                }

              </div>

            </div>

            <div className="flex items-center gap-4">

              <FiPhone className="text-orange-500 text-xl" />

              <div>

                <p className="text-sm text-gray-500">
                  Phone
                </p>

                {
                  edit ?

                    <input
                      value={profile.phone}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          phone: e.target.value
                        })
                      }
                      className="border rounded px-3 py-2"
                    />

                    :

                    <p>{profile.phone}</p>

                }

              </div>

            </div>



          </div>

        </div>





      </div>



    </div>
  );
}

export default Profile;