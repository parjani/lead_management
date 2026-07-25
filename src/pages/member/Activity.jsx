import {
  FiActivity,
  FiSearch,
  FiFilter,
  FiClock,
  FiCheckCircle,
  FiMessageSquare,
  FiTrendingUp,
} from "react-icons/fi";

function MemberActivity() {

  const activities = [
    {
      id: 1,
      action: "Updated lead status to Qualified",
      lead: "Google Pvt Ltd",
      time: "Today • 10:20 AM",
      type: "Status Update",
    },
    {
      id: 2,
      action: "Added a follow-up note",
      lead: "Amazon India",
      time: "Yesterday • 4:15 PM",
      type: "Note",
    },
    {
      id: 3,
      action: "Marked lead as Won",
      lead: "Microsoft",
      time: "2 Days Ago",
      type: "Lead Won",
    },
    {
      id: 4,
      action: "Updated lead status to Contacted",
      lead: "Adobe",
      time: "4 Days Ago",
      type: "Status Update",
    },
  ];

  return (
    <div className="space-y-8">

      {/* Header */}

      <div>

        <h1 className="text-3xl font-bold text-gray-800">
          My Activity
        </h1>

        <p className="text-gray-500 mt-2">
          View your recent updates, notes, and lead activities.
        </p>

      </div>

      {/* Summary Cards */}

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

          <FiActivity className="text-3xl text-blue-600 mb-4" />

          <p className="text-gray-500">
            Total Activities
          </p>

          <h2 className="text-3xl font-bold mt-2">
            48
          </h2>

        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

          <FiCheckCircle className="text-3xl text-green-600 mb-4" />

          <p className="text-gray-500">
            Status Updates
          </p>

          <h2 className="text-3xl font-bold mt-2">
            21
          </h2>

        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

          <FiMessageSquare className="text-3xl text-purple-600 mb-4" />

          <p className="text-gray-500">
            Notes Added
          </p>

          <h2 className="text-3xl font-bold mt-2">
            27
          </h2>

        </div>

      </div>

      {/* Search & Filter */}

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex flex-wrap gap-4">

        <div className="flex items-center flex-1 border border-gray-300 rounded-xl px-4">

          <FiSearch className="text-gray-500" />

          <input
            type="text"
            placeholder="Search activity..."
            className="w-full p-3 outline-none"
          />

        </div>

        <div className="flex items-center gap-2 border border-gray-300 rounded-xl px-4">

          <FiFilter />

          <select className="outline-none py-3 bg-transparent">

            <option>All Activities</option>
            <option>Status Update</option>
            <option>Note</option>
            <option>Lead Won</option>

          </select>

        </div>

      </div>

      {/* Activity Timeline */}

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">

        <div className="border-b border-gray-200 px-6 py-5">

          <h2 className="text-xl font-semibold">
            Recent Activity
          </h2>

        </div>

        <div className="p-6 space-y-6">

          {activities.map((activity) => (

            <div
              key={activity.id}
              className="flex gap-5"
            >

              <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">

                <FiTrendingUp />

              </div>

              <div className="flex-1 border-l-4 border-blue-600 pl-5 pb-5">

                <div className="flex justify-between items-center">

                  <h3 className="font-semibold text-gray-800">

                    {activity.action}

                  </h3>

                  <span className="flex items-center gap-1 text-sm text-gray-500">

                    <FiClock size={14} />

                    {activity.time}

                  </span>

                </div>

                <p className="text-gray-600 mt-2">
                  Lead:
                  <span className="font-medium ml-2">
                    {activity.lead}
                  </span>
                </p>

                <span className="inline-block mt-3 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">

                  {activity.type}

                </span>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default MemberActivity;