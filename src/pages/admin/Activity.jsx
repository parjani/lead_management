import {
  FiActivity,
  FiSearch,
  FiUser,
  FiRefreshCw,
  FiCheckCircle,
  FiMessageSquare,
} from "react-icons/fi";

function Activity() {
  const activities = [
    {
      id: 1,
      user: "Rahul Sharma",
      action: "Assigned lead to Priya Patel",
      lead: "Google Pvt Ltd",
      time: "2 mins ago",
      type: "Assignment",
    },
    {
      id: 2,
      user: "Priya Patel",
      action: "Updated lead status to Qualified",
      lead: "Amazon India",
      time: "10 mins ago",
      type: "Status",
    },
    {
      id: 3,
      user: "Amit Verma",
      action: "Added a note",
      lead: "Microsoft",
      time: "30 mins ago",
      type: "Note",
    },
    {
      id: 4,
      user: "Rahul Sharma",
      action: "Created a new lead",
      lead: "Adobe",
      time: "Today",
      type: "Lead",
    },
  ];

  return (
    <div className="space-y-8">

      {/* Header */}

      <div>

        <h1 className="text-3xl font-bold text-gray-800">
          Activity Log
        </h1>

        <p className="text-gray-500 mt-2">
          Monitor all actions performed across the CRM.
        </p>

      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-4 gap-6">

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">

          <FiActivity className="text-3xl text-blue-600 mb-3" />

          <p className="text-gray-500">
            Total Activities
          </p>

          <h2 className="text-3xl font-bold mt-2">
            245
          </h2>

        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">

          <FiRefreshCw className="text-3xl text-orange-500 mb-3" />

          <p className="text-gray-500">
            Status Changes
          </p>

          <h2 className="text-3xl font-bold mt-2">
            78
          </h2>

        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">

          <FiCheckCircle className="text-3xl text-green-600 mb-3" />

          <p className="text-gray-500">
            Assignments
          </p>

          <h2 className="text-3xl font-bold mt-2">
            54
          </h2>

        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">

          <FiMessageSquare className="text-3xl text-purple-600 mb-3" />

          <p className="text-gray-500">
            Notes Added
          </p>

          <h2 className="text-3xl font-bold mt-2">
            113
          </h2>

        </div>

      </div>

      {/* Search & Filters */}

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex flex-wrap gap-4">

        <div className="flex items-center flex-1 border border-gray-300 rounded-xl px-4">

          <FiSearch className="text-gray-500" />

          <input
            type="text"
            placeholder="Search activity..."
            className="w-full p-3 outline-none"
          />

        </div>

        <select className="border border-gray-300 rounded-xl px-4 py-3 outline-none">

          <option>All Users</option>

          <option>Rahul Sharma</option>

          <option>Priya Patel</option>

          <option>Amit Verma</option>

        </select>

        <select className="border border-gray-300 rounded-xl px-4 py-3 outline-none">

          <option>All Actions</option>

          <option>Lead</option>

          <option>Status</option>

          <option>Assignment</option>

          <option>Note</option>

        </select>

      </div>

      {/* Timeline */}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200">

        <div className="border-b border-gray-200 px-6 py-4">

          <h2 className="text-xl font-semibold">
            Recent Activities
          </h2>

        </div>

        <div className="p-6 space-y-6">

          {activities.map((activity) => (

            <div
              key={activity.id}
              className="flex gap-5"
            >

              <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">

                <FiUser />

              </div>

              <div className="flex-1 border-l-4 border-blue-600 pl-5 pb-6">

                <div className="flex justify-between items-center">

                  <h3 className="font-semibold text-gray-800">
                    {activity.user}
                  </h3>

                  <span className="text-sm text-gray-500">
                    {activity.time}
                  </span>

                </div>

                <p className="mt-2 text-gray-700">
                  {activity.action}
                </p>

                <span className="inline-block mt-3 rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
                  {activity.lead}
                </span>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default Activity;