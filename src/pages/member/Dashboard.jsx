import {
  FiUsers,
  FiTrendingUp,
  FiTarget,
  FiCalendar,
  FiArrowRight,
} from "react-icons/fi";

function MemberDashboard() {

  const assignedLeads = [
    {
      company: "Google Pvt Ltd",
      status: "New",
    },
    {
      company: "Amazon India",
      status: "Qualified",
    },
    {
      company: "Adobe",
      status: "Contacted",
    },
  ];

  const tasks = [
    "Call Google Pvt Ltd at 2:00 PM",
    "Follow up with Amazon India",
    "Send proposal to Adobe",
  ];

  const activities = [
    "Updated Google lead to Qualified",
    "Added note to Amazon lead",
    "Marked Microsoft lead as Won",
  ];

  return (
    <div className="space-y-8">

      {/* Welcome */}

      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">

        <h1 className="text-3xl font-bold">
          Good Morning, Rahul 👋
        </h1>

        <p className="mt-2 text-blue-100">
          Here's a summary of your assigned leads today.
        </p>

      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">

          <FiUsers className="text-3xl text-blue-600 mb-4" />

          <p className="text-gray-500">
            Assigned Leads
          </p>

          <h2 className="text-3xl font-bold mt-2">
            18
          </h2>

        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">

          <FiTrendingUp className="text-3xl text-orange-500 mb-4" />

          <p className="text-gray-500">
            In Progress
          </p>

          <h2 className="text-3xl font-bold mt-2">
            8
          </h2>

        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">

          <FiTarget className="text-3xl text-green-600 mb-4" />

          <p className="text-gray-500">
            Won Leads
          </p>

          <h2 className="text-3xl font-bold mt-2">
            5
          </h2>

        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">

          <FiCalendar className="text-3xl text-purple-600 mb-4" />

          <p className="text-gray-500">
            Today's Follow-ups
          </p>

          <h2 className="text-3xl font-bold mt-2">
            4
          </h2>

        </div>

      </div>

      {/* Two Columns */}

      <div className="grid lg:grid-cols-2 gap-6">

        {/* Assigned Leads */}

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">

          <div className="flex justify-between items-center border-b border-gray-200 p-5">

            <h2 className="text-xl font-semibold">
              Recent Assigned Leads
            </h2>

            <button className="text-blue-600 flex items-center gap-1 text-sm hover:underline cursor-pointer">

              View All

              <FiArrowRight />

            </button>

          </div>

          <div className="p-5 space-y-4">

            {assignedLeads.map((lead, index) => (

              <div
                key={index}
                className="flex justify-between items-center border rounded-xl p-4 hover:bg-gray-50"
              >

                <div>

                  <h3 className="font-semibold">
                    {lead.company}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {lead.status}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Today's Tasks */}

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">

          <div className="border-b border-gray-200 p-5">

            <h2 className="text-xl font-semibold">
              Today's Tasks
            </h2>

          </div>

          <div className="p-5 space-y-4">

            {tasks.map((task, index) => (

              <div
                key={index}
                className="rounded-xl bg-blue-50 border border-blue-100 p-4"
              >
                {task}
              </div>

            ))}

          </div>

        </div>

      </div>

      {/* Activity */}

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">

        <div className="border-b border-gray-200 p-5">

          <h2 className="text-xl font-semibold">
            Recent Activity
          </h2>

        </div>

        <div className="p-5 space-y-5">

          {activities.map((activity, index) => (

            <div
              key={index}
              className="border-l-4 border-blue-600 pl-5"
            >
              {activity}
            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default MemberDashboard;