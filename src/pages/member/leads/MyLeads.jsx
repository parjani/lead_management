import { FiSearch, FiFilter } from "react-icons/fi";
import MemberLeadTable from "./MemberLeadTable.jsx";

function MyLeads() {

  const leads = [
    {
      id: 1,
      name: "John Doe",
      company: "Google",
      phone: "9876543210",
      status: "New",
    },
    {
      id: 2,
      name: "David Smith",
      company: "Amazon",
      phone: "9123456780",
      status: "Qualified",
    },
    {
      id: 3,
      name: "Emma Watson",
      company: "Microsoft",
      phone: "9988776655",
      status: "Won",
    },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}

      <div>

        <h1 className="text-3xl font-bold">
          My Leads
        </h1>

        <p className="text-gray-500 mt-2">
          Manage the leads assigned to you.
        </p>

      </div>

      {/* Search */}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 flex flex-wrap gap-4">

        <div className="flex items-center flex-1 border border-gray-300 rounded-xl px-4">

          <FiSearch className="text-gray-500" />

          <input
            type="text"
            placeholder="Search lead..."
            className="w-full p-3 outline-none"
          />

        </div>

        <div className="flex items-center gap-2 border border-gray-300 rounded-xl px-4">

          <FiFilter />

          <select className="outline-none py-3 bg-transparent">

            <option>All Status</option>
            <option>New</option>
            <option>Contacted</option>
            <option>Qualified</option>
            <option>Won</option>
            <option>Lost</option>

          </select>

        </div>

      </div>

      {/* Table */}

      <MemberLeadTable leads={leads} />

    </div>
  );
}

export default MyLeads;