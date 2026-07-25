import {
  FiArrowLeft,
  FiEdit2,
  FiTrash2,
  FiMail,
  FiPhone,
  FiBriefcase,
  FiUser,
  FiCalendar,
  FiClock,
  FiFileText,
} from "react-icons/fi";

import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import StatusBadge from "./StatusBadge";
import {
  getLeadById,
  deleteLead,
} from "../../../api/leadApi";
import DeleteLeadModal from "./DeleteLead.jsx";


function ViewLead() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [lead, setLead] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);


  useEffect(() => {

    fetchLead();

  }, []);

  const fetchLead = async () => {

    try {

      const response = await getLeadById(id);

      setLead(response.data);

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to fetch lead."
      );

      navigate("/admin/leads");

    } finally {

      setLoading(false);

    }

  };

  const handleDelete = async () => {

    try {

      setDeleteLoading(true);

      const response = await deleteLead(id);

      toast.success(response.message);

      navigate("/admin/leads");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to delete lead."
      );

    } finally {

      setDeleteLoading(false);

      setShowDeleteModal(false);

    }

  };

  if (loading) {
    return (
      <div className="text-center py-20 text-lg">
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex justify-between items-start">

        <div>

          <Link
            to="/admin/leads"
            className="inline-flex items-center gap-2 text-blue-600 hover:underline"
          >
            <FiArrowLeft />
            Back to Leads
          </Link>

          <h1 className="mt-4 text-4xl font-bold">
            {lead.name}
          </h1>

          <div className="flex gap-3 mt-4 flex-wrap">

            <span className="text-gray-500">
              Lead ID : {lead._id}
            </span>

            <StatusBadge status={lead.status} />

            <span className="bg-gray-100 px-3 py-1 rounded-full">

              Assigned :
              {" "}
              {lead.assignedTo?.name || "Not Assigned"}

            </span>

          </div>

        </div>

        <div className="flex gap-3">

          <button
            onClick={() =>
              navigate(`/admin/leads/edit/${lead._id}`)
            }
            className="px-5 py-3 rounded-xl bg-green-600 text-white flex items-center gap-2 hover:bg-green-700"
          >
            <FiEdit2 />
            Edit
          </button>

          <button
            onClick={() => setShowDeleteModal(true)}
            className="px-5 py-3 rounded-xl bg-red-600 text-white flex items-center gap-2 hover:bg-red-700"
          >
            <FiTrash2 />
            Delete
          </button>

        </div>

      </div>

      {/* Information */}

      <div className="grid lg:grid-cols-2 gap-6">

        <div className="bg-white rounded-2xl border p-6">

          <h2 className="text-xl font-semibold mb-6">
            Basic Information
          </h2>

          <div className="space-y-5">

            <div className="flex gap-4">
              <FiMail className="text-blue-600 mt-1" />
              <div>
                <p className="text-sm text-gray-500">
                  Email
                </p>
                <p>{lead.email}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <FiPhone className="text-green-600 mt-1" />
              <div>
                <p className="text-sm text-gray-500">
                  Phone
                </p>
                <p>{lead.phone}</p>
              </div>
            </div>

          </div>

        </div>

        <div className="bg-white rounded-2xl border p-6">

          <h2 className="text-xl font-semibold mb-6">
            Lead Details
          </h2>

          <div className="space-y-5">

            <div className="flex gap-4">
              <FiBriefcase className="text-purple-600 mt-1" />
              <div>
                <p className="text-sm text-gray-500">
                  Company
                </p>
                <p>{lead.company || "-"}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <FiUser className="text-orange-600 mt-1" />
              <div>
                <p className="text-sm text-gray-500">
                  Source
                </p>
                <p>{lead.source}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <FiCalendar className="text-blue-600 mt-1" />
              <div>
                <p className="text-sm text-gray-500">
                  Created
                </p>
                <p>
                  {new Date(
                    lead.createdAt
                  ).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <FiClock className="text-indigo-600 mt-1" />
              <div>
                <p className="text-sm text-gray-500">
                  Updated
                </p>
                <p>
                  {new Date(
                    lead.updatedAt
                  ).toLocaleString()}
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Message */}

      <div className="bg-white rounded-2xl border p-6">

        <h2 className="text-xl font-semibold flex items-center gap-2 mb-5">

          <FiFileText />

          Message

        </h2>

        <p className="text-gray-700">
          {lead.message || "No message available."}
        </p>

      </div>

      {/* Notes */}

      <div className="bg-white rounded-2xl border p-6">

        <h2 className="text-xl font-semibold mb-5">
          Notes
        </h2>

        {lead.notes.length === 0 ? (

          <p className="text-gray-500">
            No notes available.
          </p>

        ) : (

          <div className="space-y-4">

            {lead.notes.map((note) => (

              <div
                key={note._id}
                className="bg-blue-50 border border-blue-100 rounded-xl p-4"
              >

                <p>{note.text}</p>

                <p className="text-xs text-gray-500 mt-2">
                  {new Date(
                    note.createdAt
                  ).toLocaleString()}
                </p>

              </div>

            ))}

          </div>

        )}

      </div>
      <DeleteLeadModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        loading={deleteLoading}
        leadName={lead.name}
      />
    </div>
  );

}

export default ViewLead;