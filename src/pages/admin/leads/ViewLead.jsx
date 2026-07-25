import {
  FiArrowLeft,
  FiEdit2,
  FiTrash2,
  FiMail,
  FiPhone,
  FiMapPin,
  FiBriefcase,
  FiUser,
  FiCalendar,
  FiClock,
  FiFileText,
} from "react-icons/fi";

import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge.jsx";

function ViewLead() {
  const lead = {
    id: "LD-1023",
    name: "John Doe",
    email: "john@gmail.com",
    phone: "9876543210",
    company: "Google",
    source: "Website",
    address: "Pune, Maharashtra",
    assignedTo: "Rahul Sharma",
    status: "Qualified",
    createdAt: "15 Jul 2026",
    updatedAt: "20 Jul 2026",
  };

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <Link
            to="/admin/leads"
            className="inline-flex items-center gap-2 text-blue-600 font-medium hover:underline"
          >
            <FiArrowLeft />
            Back to Leads
          </Link>

          <h1 className="mt-4 text-4xl font-bold text-gray-800">
            {lead.name}
          </h1>

          <div className="flex items-center gap-4 mt-4 flex-wrap">

            <span className="text-gray-500">
              Lead ID : {lead.id}
            </span>

            <StatusBadge status={lead.status} />

            <span className="bg-gray-100 px-3 py-1 rounded-full">
              Assigned : {lead.assignedTo}
            </span>

          </div>

        </div>

        <div className="flex gap-3">

          <button className="px-5 py-3 rounded-xl bg-green-600 text-white flex items-center gap-2 hover:bg-green-700">
            <FiEdit2 />
            Edit
          </button>

          <button className="px-5 py-3 rounded-xl bg-red-600 text-white flex items-center gap-2 hover:bg-red-700">
            <FiTrash2 />
            Delete
          </button>

        </div>

      </div>

      {/* Information */}

      <div className="grid lg:grid-cols-2 gap-6">

        {/* Basic Info */}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">

          <h2 className="text-xl font-semibold mb-6">
            Basic Information
          </h2>

          <div className="space-y-5">

            <div className="flex items-center gap-4">
              <FiMail className="text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p>{lead.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <FiPhone className="text-green-600" />
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p>{lead.phone}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <FiMapPin className="text-red-600" />
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p>{lead.address}</p>
              </div>
            </div>

          </div>

        </div>

        {/* Lead Details */}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">

          <h2 className="text-xl font-semibold mb-6">
            Lead Details
          </h2>

          <div className="space-y-5">

            <div className="flex items-center gap-4">
              <FiBriefcase className="text-purple-600" />
              <div>
                <p className="text-sm text-gray-500">Company</p>
                <p>{lead.company}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <FiUser className="text-orange-500" />
              <div>
                <p className="text-sm text-gray-500">Lead Source</p>
                <p>{lead.source}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <FiCalendar className="text-blue-500" />
              <div>
                <p className="text-sm text-gray-500">Created On</p>
                <p>{lead.createdAt}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <FiClock className="text-indigo-500" />
              <div>
                <p className="text-sm text-gray-500">Last Updated</p>
                <p>{lead.updatedAt}</p>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Notes */}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">

        <h2 className="text-xl font-semibold flex items-center gap-2 mb-6">
          <FiFileText />
          Notes
        </h2>

        <div className="space-y-4">

          <div className="rounded-xl bg-blue-50 border border-blue-100 p-4">
            Customer requested pricing details.
          </div>

          <div className="rounded-xl bg-green-50 border border-green-100 p-4">
            Product demo scheduled for next Tuesday.
          </div>

        </div>

      </div>

      {/* Timeline */}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">

        <h2 className="text-xl font-semibold mb-6">
          Activity Timeline
        </h2>

        <div className="space-y-5">

          <div className="border-l-4 border-blue-600 pl-5">
            <p className="font-medium">Lead Created</p>
            <p className="text-sm text-gray-500">
              15 Jul 2026 • 09:30 AM
            </p>
          </div>

          <div className="border-l-4 border-green-600 pl-5">
            <p className="font-medium">
              Assigned to Rahul Sharma
            </p>
            <p className="text-sm text-gray-500">
              15 Jul 2026 • 11:00 AM
            </p>
          </div>

          <div className="border-l-4 border-purple-600 pl-5">
            <p className="font-medium">
              Status changed to Qualified
            </p>
            <p className="text-sm text-gray-500">
              18 Jul 2026 • 04:20 PM
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default ViewLead;