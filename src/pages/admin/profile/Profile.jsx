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

function Profile() {
  const profile = {
    name: "Rahul Sharma",
    email: "rahul@gmail.com",
    phone: "+91 9876543210",
    role: "Administrator",
    department: "Sales",
    username: "rahul_admin",
    joined: "15 Jan 2026",
    lastLogin: "Today, 10:20 AM",
    status: "Active",

    assignedLeads: 28,
    createdLeads: 112,
    wonDeals: 37,
    totalActivities: 524,
  };

  const recentActivities = [
    {
      title: "Assigned lead to Priya Patel",
      time: "2 hours ago",
    },
    {
      title: "Created new lead 'Google Pvt Ltd'",
      time: "Yesterday",
    },
    {
      title: "Updated lead status to Won",
      time: "2 days ago",
    },
  ];

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">

        <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6">

          <div className="flex items-center gap-6">

            <div className="w-24 h-24 rounded-full bg-blue-600 text-white text-4xl font-bold flex items-center justify-center shadow-lg">
              {profile.name.charAt(0)}
            </div>

            <div>

              <h1 className="text-3xl font-bold text-gray-800">
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

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl flex items-center gap-2 transition cursor-pointer">
              <FiEdit2 />
              Edit Profile
            </button>

            <button className="border border-gray-300 hover:bg-gray-100 px-5 py-3 rounded-xl flex items-center gap-2 transition cursor-pointer">
              <FiLock />
              Change Password
            </button>

          </div>

        </div>

      </div>

      {/* Statistics */}

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

          <FiUsers className="text-blue-600 text-3xl mb-4" />

          <p className="text-gray-500">
            Assigned Leads
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {profile.assignedLeads}
          </h2>

        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

          <FiTarget className="text-orange-500 text-3xl mb-4" />

          <p className="text-gray-500">
            Created Leads
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {profile.createdLeads}
          </h2>

        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

          <FiTrendingUp className="text-green-600 text-3xl mb-4" />

          <p className="text-gray-500">
            Won Deals
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {profile.wonDeals}
          </h2>

        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

          <FiActivity className="text-purple-600 text-3xl mb-4" />

          <p className="text-gray-500">
            Activities
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {profile.totalActivities}
          </h2>

        </div>

      </div>

      {/* Information */}

      <div className="grid lg:grid-cols-2 gap-6">

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

              <div>

                <p className="text-sm text-gray-500">
                  Full Name
                </p>

                <p>{profile.name}</p>

              </div>

            </div>

            <div className="flex items-center gap-4">

              <FiMail className="text-green-600 text-xl" />

              <div>

                <p className="text-sm text-gray-500">
                  Email
                </p>

                <p>{profile.email}</p>

              </div>

            </div>

            <div className="flex items-center gap-4">

              <FiPhone className="text-orange-500 text-xl" />

              <div>

                <p className="text-sm text-gray-500">
                  Phone
                </p>

                <p>{profile.phone}</p>

              </div>

            </div>

            <div className="flex items-center gap-4">

              <FiBriefcase className="text-purple-600 text-xl" />

              <div>

                <p className="text-sm text-gray-500">
                  Department
                </p>

                <p>{profile.department}</p>

              </div>

            </div>

          </div>

        </div>

        {/* Account */}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200">

          <div className="border-b border-gray-200 px-6 py-4">

            <h2 className="text-xl font-semibold">
              Account Information
            </h2>

          </div>

          <div className="p-6 space-y-6">

            <div>

              <p className="text-sm text-gray-500">
                Username
              </p>

              <p className="font-medium">
                {profile.username}
              </p>

            </div>

            <div className="flex items-center gap-4">

              <FiCalendar className="text-blue-600 text-xl" />

              <div>

                <p className="text-sm text-gray-500">
                  Joined On
                </p>

                <p>{profile.joined}</p>

              </div>

            </div>

            <div className="flex items-center gap-4">

              <FiClock className="text-green-600 text-xl" />

              <div>

                <p className="text-sm text-gray-500">
                  Last Login
                </p>

                <p>{profile.lastLogin}</p>

              </div>

            </div>

            <div>

              <p className="text-sm text-gray-500">
                Account Status
              </p>

              <span className="inline-block mt-2 px-4 py-1 rounded-full bg-green-100 text-green-700 font-medium">
                {profile.status}
              </span>

            </div>

          </div>

        </div>

      </div>

      {/* Recent Activity */}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200">

        <div className="border-b border-gray-200 px-6 py-4">

          <h2 className="text-xl font-semibold">
            Recent Activity
          </h2>

        </div>

        <div className="p-6 space-y-5">

          {recentActivities.map((activity, index) => (

            <div
              key={index}
              className="border-l-4 border-blue-600 pl-5"
            >

              <h3 className="font-medium">
                {activity.title}
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                {activity.time}
              </p>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default Profile;