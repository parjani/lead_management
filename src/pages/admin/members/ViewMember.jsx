import {
  FiArrowLeft,
  FiEdit2,
  FiTrash2,
  FiMail,
  FiPhone,
  FiBriefcase,
  FiCalendar,
  FiUsers,
  FiCheckCircle,
  FiTrendingUp,
} from "react-icons/fi";
import { Link } from "react-router-dom";

function ViewMember() {
  const member = {
    id: "EMP-1023",
    name: "Rahul Sharma",
    email: "rahul@gmail.com",
    phone: "+91 9876543210",
    role: "Admin",
    department: "Sales",
    status: "Active",
    joined: "15 Jan 2026",

    assignedLeads: 28,
    qualified: 16,
    won: 9,

    recentLeads: [
      "Google Pvt Ltd",
      "Amazon India",
      "Microsoft",
      "Adobe",
    ],

    activities: [
      {
        title: "Assigned lead 'Google Pvt Ltd'",
        date: "Today • 10:30 AM",
      },
      {
        title: "Updated lead status to Qualified",
        date: "Yesterday • 04:15 PM",
      },
      {
        title: "Created new lead",
        date: "18 Jul 2026",
      },
    ],
  };

  return (
    <div className="space-y-8">

      {/* Back */}

      <Link
        to="/admin/members"
        className="inline-flex items-center gap-2 text-blue-600 font-medium hover:underline"
      >
        <FiArrowLeft />
        Back to Members
      </Link>

      {/* Header */}

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

          <div className="flex items-center gap-6">

            <div className="w-24 h-24 rounded-full bg-blue-600 text-white text-4xl font-bold flex items-center justify-center shadow-lg">
              {member.name.charAt(0)}
            </div>

            <div>

              <h1 className="text-3xl font-bold text-gray-800">
                {member.name}
              </h1>

              <p className="text-gray-500 mt-1">
                {member.department}
              </p>

              <div className="flex gap-3 mt-4">

                <span className="px-4 py-1 rounded-full bg-purple-100 text-purple-700 font-medium">
                  {member.role}
                </span>

                <span className="px-4 py-1 rounded-full bg-green-100 text-green-700 font-medium">
                  {member.status}
                </span>

              </div>

            </div>

          </div>

          <div className="flex gap-3">

            <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl flex items-center gap-2 cursor-pointer">

              <FiEdit2 />

              Edit

            </button>

            <button className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl flex items-center gap-2 cursor-pointer">

              <FiTrash2 />

              Delete

            </button>

          </div>

        </div>

      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

          <FiUsers className="text-blue-600 text-3xl mb-4" />

          <h3 className="text-gray-500">
            Assigned Leads
          </h3>

          <p className="text-3xl font-bold mt-2">
            {member.assignedLeads}
          </p>

        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

          <FiTrendingUp className="text-orange-500 text-3xl mb-4" />

          <h3 className="text-gray-500">
            Qualified Leads
          </h3>

          <p className="text-3xl font-bold mt-2">
            {member.qualified}
          </p>

        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

          <FiCheckCircle className="text-green-600 text-3xl mb-4" />

          <h3 className="text-gray-500">
            Won Deals
          </h3>

          <p className="text-3xl font-bold mt-2">
            {member.won}
          </p>

        </div>

      </div>

      {/* Information */}

      <div className="grid lg:grid-cols-2 gap-6">

        {/* Personal Information */}

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">

          <div className="border-b border-gray-200 px-6 py-4">

            <h2 className="text-xl font-semibold">
              Personal Information
            </h2>

          </div>

          <div className="p-6 space-y-6">

            <div className="flex items-center gap-4">

              <FiMail className="text-blue-600 text-xl" />

              <div>

                <p className="text-sm text-gray-500">
                  Email
                </p>

                <p>{member.email}</p>

              </div>

            </div>

            <div className="flex items-center gap-4">

              <FiPhone className="text-green-600 text-xl" />

              <div>

                <p className="text-sm text-gray-500">
                  Phone
                </p>

                <p>{member.phone}</p>

              </div>

            </div>

            <div className="flex items-center gap-4">

              <FiBriefcase className="text-purple-600 text-xl" />

              <div>

                <p className="text-sm text-gray-500">
                  Department
                </p>

                <p>{member.department}</p>

              </div>

            </div>

            <div className="flex items-center gap-4">

              <FiCalendar className="text-orange-500 text-xl" />

              <div>

                <p className="text-sm text-gray-500">
                  Joined On
                </p>

                <p>{member.joined}</p>

              </div>

            </div>

          </div>

        </div>

        {/* Assigned Leads */}

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">

          <div className="border-b border-gray-200 px-6 py-4">

            <h2 className="text-xl font-semibold">
              Recently Assigned Leads
            </h2>

          </div>

          <div className="p-6 space-y-4">

            {member.recentLeads.map((lead, index) => (

              <div
                key={index}
                className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3"
              >

                <span>{lead}</span>

                <span className="text-sm text-blue-600 font-medium">
                  Open
                </span>

              </div>

            ))}

          </div>

        </div>

      </div>

      {/* Activity */}

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">

        <div className="border-b border-gray-200 px-6 py-4">

          <h2 className="text-xl font-semibold">
            Recent Activity
          </h2>

        </div>

        <div className="p-6 space-y-6">

          {member.activities.map((activity, index) => (

            <div
              key={index}
              className="border-l-4 border-blue-600 pl-5"
            >

              <p className="font-medium">
                {activity.title}
              </p>

              <p className="text-sm text-gray-500 mt-1">
                {activity.date}
              </p>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default ViewMember;