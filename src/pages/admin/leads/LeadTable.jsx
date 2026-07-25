import { FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";
import StatusBadge from "./StatusBadge";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import DeleteLeadModal from "./DeleteLead";
import { toast } from "react-toastify";
import { deleteLead } from "../../../api/leadApi";

function LeadTable({ leads, onDeleteSuccess  }) {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleDelete = async () => {

    try {

      setDeleteLoading(true);

      const response = await deleteLead(selectedLead._id);

      toast.success(response.message);

      onDeleteSuccess();

    } catch (error) {
      console.log(error)

      toast.error(
        error.response?.data?.message ||
        "Failed to delete lead."
      );

    } finally {

      setDeleteLoading(false);

      setShowDeleteModal(false);

    }

  };

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-lg border border-gray-200">

      <table className="min-w-full">

        {/* Table Header */}

        <thead className="bg-blue-600 text-white">

          <tr>

            <th className="px-6 py-4 text-left font-semibold">Lead</th>

            <th className="px-6 py-4 text-left font-semibold">Company</th>

            <th className="px-6 py-4 text-left font-semibold">Phone</th>

            <th className="px-6 py-4 text-left font-semibold">Status</th>

            <th className="px-6 py-4 text-left font-semibold">Assigned To</th>

            <th className="px-6 py-4 text-center font-semibold">Actions</th>

          </tr>

        </thead>

        {/* Table Body */}

        <tbody>

  {leads.length > 0 ? (

    leads.map((lead) => (

      <tr
        key={lead._id}
        className="border-b border-gray-100 hover:bg-blue-50 transition duration-200"
      >

        {/* Lead */}

        <td className="px-6 py-4">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
              {lead.name.charAt(0)}
            </div>

            <div>

              <p className="font-semibold text-gray-800">
                {lead.name}
              </p>

              <p className="text-sm text-gray-500">
                Lead #{lead._id.slice(-6).toUpperCase()}
              </p>

            </div>

          </div>

        </td>

        {/* Company */}

        <td className="px-6 py-4 text-gray-700">
          {lead.company || "-"}
        </td>

        {/* Phone */}

        <td className="px-6 py-4 text-gray-700">
          {lead.phone}
        </td>

        {/* Status */}

        <td className="px-6 py-4">
          <StatusBadge status={lead.status} />
        </td>

        {/* Assigned */}

        <td className="px-6 py-4">
          <span className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium">
            {lead.assignedTo?.name || "Unassigned"}
          </span>
        </td>

        {/* Actions */}

        <td className="px-6 py-4">

          <div className="flex justify-center gap-3">

            <button
              className="w-9 h-9 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition cursor-pointer"
              title="View"
              onClick={() => navigate(`/admin/leads/${lead._id}`)}
            >
              <FiEye className="mx-auto" />
            </button>

            <button
              className="w-9 h-9 rounded-lg bg-green-100 text-green-600 hover:bg-green-600 hover:text-white transition cursor-pointer"
              title="Edit"
              onClick={() => navigate(`/admin/leads/edit/${lead._id}`)}
            >
              <FiEdit2 className="mx-auto" />
            </button>

            <button
              className="w-9 h-9 rounded-lg bg-red-100 text-red-600 hover:bg-red-600 hover:text-white transition cursor-pointer"
              title="Delete"
              onClick={() => {
                setSelectedLead(lead);
                setShowDeleteModal(true);
              }}
            >
              <FiTrash2 className="mx-auto" />
            </button>

          </div>

        </td>

      </tr>

    ))

  ) : (

    <tr>

      <td
        colSpan={6}
        className="py-12 text-center text-gray-500"
      >

        <div className="flex flex-col items-center gap-2">

          <FiTrash2 className="text-4xl text-gray-300" />

          <p className="text-lg font-medium">
            No leads found
          </p>

          <p className="text-sm text-gray-400">
            There are no leads available.
          </p>

        </div>

      </td>

    </tr>

  )}

</tbody>

      </table>
      <DeleteLeadModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        loading={deleteLoading}
        leadName={selectedLead?.name}
      />
    </div>
  );
}

export default LeadTable;