import { FiSearch } from "react-icons/fi";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import MemberLeadTable from "./MemberLeadTable";
import { getAllMemberLeads } from "../../../api/memberApi";

function MyLeads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const fetchLeads = async () => {
    try {
      setLoading(true);

      const response = await getAllMemberLeads();
      
      // Handles response structure whether response.data is an array or object containing { leads: [...] }
      const fetchedData = response.data?.leads || response.data || [];
      setLeads(fetchedData);

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch assigned leads."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // Filter leads dynamically on client side
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name?.toLowerCase().includes(search.toLowerCase()) ||
      lead.company?.toLowerCase().includes(search.toLowerCase()) ||
      lead.phone?.includes(search);

    const matchesStatus =
      status === "All" || lead.status === status;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">My Leads</h1>
          <p className="text-gray-500">
            Manage leads assigned directly to you
          </p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
        <div className="flex flex-col lg:flex-row gap-4 items-center">

          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <FiSearch
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, company or phone..."
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-12 pr-4 text-gray-700 placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            />
          </div>

          {/* Status Filter Dropdown */}
          <div className="relative w-full lg:w-52">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 px-4 text-gray-700 outline-none appearance-none cursor-pointer transition-all duration-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            >
              <option value="All">All Status</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Proposal Sent">Proposal Sent</option>
              <option value="Won">Won</option>
              <option value="Lost">Lost</option>
            </select>

            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-xs">
              ▼
            </span>
          </div>

        </div>
      </div>

      {/* Content Section */}
      {loading ? (
        <div className="bg-white rounded-2xl p-10 text-center text-gray-500">
          Loading assigned leads...
        </div>
      ) : (
        <MemberLeadTable
          leads={filteredLeads}
          onStatusUpdate={fetchLeads}
          isMember={true}
        />
      )}

    </div>
  );
}

export default MyLeads;