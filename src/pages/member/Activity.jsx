import { useEffect, useState } from "react";
import {
  FiActivity,
  FiCheckCircle,
  FiMessageSquare,
  FiRefreshCw,
  FiSearch,
  FiUser,
} from "react-icons/fi";
import { toast } from "react-toastify";

import {
  getMemberActivities,
  getMemberActivityStats,
} from "../../api/activity";

function Activity() {

  const [activities, setActivities] = useState([]);
  const [stats, setStats] = useState({
    totalActivities: 0,
    statusChanges: 0,
    assignments: 0,
    notesAdded: 0,
  });

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");

  const fetchActivities = async () => {

    try {

      setLoading(true);

      const [activityResponse, statsResponse] = await Promise.all([
        getMemberActivities(),
        getMemberActivityStats(),
      ]);

      setActivities(activityResponse.data);

      setStats(statsResponse.data);

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to fetch activities."
      );

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchActivities();

  }, []);

  const filteredActivities = activities.filter((activity) => {

    const matchesSearch =
      activity.action
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      activity.lead?.name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      activity.lead?.company
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const matchesType =
      type === "All" ||
      activity.type === type;

    return matchesSearch && matchesType;

  });

  return (

    <div className="space-y-8">

      {/* Header */}

      <div>

        <h1 className="text-3xl font-bold text-gray-800">
          My Activity
        </h1>

        <p className="text-gray-500 mt-2">
          Track all activities performed by you.
        </p>

      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

          <FiActivity className="text-3xl text-blue-600 mb-3" />

          <p className="text-gray-500">
            Total Activities
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {stats.totalActivities}
          </h2>

        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

          <FiRefreshCw className="text-3xl text-orange-500 mb-3" />

          <p className="text-gray-500">
            Status Changes
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {stats.statusChanges}
          </h2>

        </div>

        {/* <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

          <FiCheckCircle className="text-3xl text-green-600 mb-3" />

          <p className="text-gray-500">
            Assignments
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {stats.assignments}
          </h2>

        </div> */}

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

          <FiMessageSquare className="text-3xl text-purple-600 mb-3" />

          <p className="text-gray-500">
            Notes
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {stats.notesAdded}
          </h2>

        </div>

      </div>

      {/* Search */}

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">

        <div className="flex flex-col lg:flex-row gap-4">

          <div className="relative flex-1">

            <FiSearch
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search activity..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />

          </div>

          <select
            value={type}
            onChange={(e) =>
              setType(e.target.value)
            }
            className="rounded-xl border border-gray-300 px-4 py-3 outline-none"
          >

            <option value="All">
              All Types
            </option>

            <option value="Lead">
              Lead
            </option>

            <option value="Status">
              Status
            </option>

            <option value="Assignment">
              Assignment
            </option>

            <option value="Note">
              Note
            </option>

          </select>

        </div>

      </div>

      {/* Timeline */}

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">

        <div className="border-b border-gray-200 px-6 py-4">

          <h2 className="text-xl font-semibold">
            Recent Activities
          </h2>

        </div>

        <div className="p-6 space-y-6">

          {
            loading ? (

              <p className="text-center text-gray-500">
                Loading activities...
              </p>

            ) : filteredActivities.length === 0 ? (

              <p className="text-center text-gray-500">
                No activities found.
              </p>

            ) : (

              filteredActivities.map((activity) => (

                <div
                  key={activity._id}
                  className="flex gap-5"
                >

                  <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">

                    <FiUser />

                  </div>

                  <div className="flex-1 border-l-4 border-blue-600 pl-5 pb-6">

                    <div className="flex justify-between">

                      <h3 className="font-semibold text-gray-800">

                        {activity.user?.name}

                      </h3>

                      <span className="text-sm text-gray-500">

                        {new Date(
                          activity.createdAt
                        ).toLocaleString()}

                      </span>

                    </div>

                    <p className="mt-2 text-gray-700">

                      {activity.action}

                    </p>

                    {
                      activity.lead && (

                        <span className="inline-block mt-3 rounded-full bg-gray-100 px-3 py-1 text-sm">

                          {activity.lead.name}

                          {
                            activity.lead.company &&
                            ` • ${activity.lead.company}`
                          }

                        </span>

                      )
                    }

                    <div className="mt-3">

                      <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">

                        {activity.type}

                      </span>

                    </div>

                  </div>

                </div>

              ))

            )
          }

        </div>

      </div>

    </div>

  );

}

export default Activity;