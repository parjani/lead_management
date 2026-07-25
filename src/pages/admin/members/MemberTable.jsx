import {
  FiEye,
  FiEdit2,
  FiTrash2,
  FiShield,
  FiUser,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function MemberTable({ members }) {
  const navigate = useNavigate();

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-lg border border-gray-200">

      <table className="min-w-full">

        {/* Header */}

        <thead className="bg-blue-600 text-white">

          <tr>

            <th className="px-6 py-4 text-left font-semibold">
              Member
            </th>

            <th className="px-6 py-4 text-left font-semibold">
              Phone
            </th>

            <th className="px-6 py-4 text-left font-semibold">
              Role
            </th>

            <th className="px-6 py-4 text-left font-semibold">
              Assigned Leads
            </th>

            <th className="px-6 py-4 text-left font-semibold">
              Status
            </th>

            <th className="px-6 py-4 text-center font-semibold">
              Actions
            </th>

          </tr>

        </thead>

        {/* Body */}

        <tbody>

          {members.map((member) => (

            <tr
              key={member.id}
              className="border-b border-gray-100 hover:bg-blue-50 transition"
            >

              {/* Member */}

              <td className="px-6 py-5">

                <div className="flex items-center gap-4">

                  <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center">

                    {member.name.charAt(0)}

                  </div>

                  <div>

                    <h3 className="font-semibold text-gray-800">

                      {member.name}

                    </h3>

                    <p className="text-sm text-gray-500">

                      {member.email}

                    </p>

                  </div>

                </div>

              </td>

              {/* Phone */}

              <td className="px-6 py-5 text-gray-700">

                {member.phone}

              </td>

              {/* Role */}

              <td className="px-6 py-5">

                {member.role === "Admin" ? (

                  <span className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-700">

                    <FiShield size={14} />

                    Admin

                  </span>

                ) : (

                  <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">

                    <FiUser size={14} />

                    Member

                  </span>

                )}

              </td>

              {/* Leads */}

              <td className="px-6 py-5">

                <span className="rounded-full bg-gray-100 px-3 py-1 font-semibold">

                  {member.assignedLeads}

                </span>

              </td>

              {/* Status */}

              <td className="px-6 py-5">

                {member.status === "Active" ? (

                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">

                    Active

                  </span>

                ) : (

                  <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700">

                    Inactive

                  </span>

                )}

              </td>

              {/* Actions */}

              <td className="px-6 py-5">

                <div className="flex justify-center gap-3">

                  <button
                    onClick={() =>
                      navigate(`/admin/members/${member.id}`)
                    }
                    className="w-9 h-9 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition cursor-pointer"
                  >
                    <FiEye className="mx-auto" />
                  </button>

                  <button
                    onClick={() =>
                      navigate(`/admin/members/edit/${member.id}`)
                    }
                    className="w-9 h-9 rounded-lg bg-green-100 text-green-600 hover:bg-green-600 hover:text-white transition cursor-pointer"
                  >
                    <FiEdit2 className="mx-auto" />
                  </button>

                  <button
                    className="w-9 h-9 rounded-lg bg-red-100 text-red-600 hover:bg-red-600 hover:text-white transition cursor-pointer"
                  >
                    <FiTrash2 className="mx-auto" />
                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default MemberTable;