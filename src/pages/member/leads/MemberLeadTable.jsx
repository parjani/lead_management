import { FiEye, FiEdit2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";

function MemberLeadTable({ leads }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

      <table className="w-full">

        {/* Table Header */}

        <thead className="bg-blue-600 text-white">

          <tr>

            <th className="px-6 py-4 text-left font-semibold">
              Lead Name
            </th>

            <th className="px-6 py-4 text-left font-semibold">
              Company
            </th>

            <th className="px-6 py-4 text-left font-semibold">
              Phone
            </th>

            <th className="px-6 py-4 text-left font-semibold">
              Status
            </th>

            <th className="px-6 py-4 text-center font-semibold">
              Actions
            </th>

          </tr>

        </thead>

        {/* Table Body */}

        <tbody>

          {leads.map((lead) => (

            <tr
              key={lead.id}
              className="border-b border-gray-200 hover:bg-blue-50 transition"
            >

              <td className="px-6 py-5 font-semibold text-gray-800">
                {lead.name}
              </td>

              <td className="px-6 py-5 text-gray-600">
                {lead.company}
              </td>

              <td className="px-6 py-5 text-gray-600">
                {lead.phone}
              </td>

              <td className="px-6 py-5">
                <StatusBadge status={lead.status} />
              </td>

              <td className="px-6 py-5">

                <div className="flex justify-center gap-3">

                  {/* View */}

                  <Link
                    to={`/member/leads/${lead.id}`}
                    className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition flex items-center justify-center"
                    title="View Lead"
                  >
                    <FiEye size={18} />
                  </Link>

                  {/* Update */}

                  <Link
                    to={`/member/leads/update/${lead.id}`}
                    className="w-10 h-10 rounded-lg bg-green-100 text-green-600 hover:bg-green-600 hover:text-white transition flex items-center justify-center"
                    title="Update Status"
                  >
                    <FiEdit2 size={18} />
                  </Link>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

      {/* Empty State */}

      {leads.length === 0 && (

        <div className="py-14 text-center">

          <h3 className="text-xl font-semibold text-gray-700">
            No Assigned Leads
          </h3>

          <p className="text-gray-500 mt-2">
            Leads assigned to you will appear here.
          </p>

        </div>

      )}

    </div>
  );
}

export default MemberLeadTable;