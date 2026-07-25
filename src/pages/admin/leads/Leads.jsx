import { FiPlus, FiSearch } from "react-icons/fi";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import LeadTable from "./LeadTable";
import { getAllLeads } from "../../../api/leadApi";
import { useNavigate } from "react-router-dom";

function Leads() {

    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("All");
    const [assignedTo, setAssignedTo] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;
    const fetchLeads = async () => {

        try {

            setLoading(true);

            const response = await getAllLeads();

            setLeads(response.data);

        } catch (error) {

            toast.error(
                error.response?.data?.message || "Failed to fetch leads."
            );

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchLeads();

    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [search, status, assignedTo]);

    const filteredLeads = leads.filter((lead) => {

        const matchesSearch =
            lead.name.toLowerCase().includes(search.toLowerCase()) ||
            lead.company?.toLowerCase().includes(search.toLowerCase()) ||
            lead.phone.includes(search);

        const matchesStatus =
            status === "All" || lead.status === status;

        const matchesMember =
            assignedTo === "All" ||
            lead.assignedTo?._id === assignedTo;

        return (
            matchesSearch &&
            matchesStatus &&
            matchesMember
        );

    });

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

    const currentLeads = filteredLeads.slice(
        indexOfFirstRecord,
        indexOfLastRecord
    );

    const totalPages = Math.ceil(
        filteredLeads.length / recordsPerPage
    );
    return (
        <div className="space-y-6">

            {/* Header */}

            <div className="flex justify-between items-center">

                <div>

                    <h1 className="text-3xl font-bold">
                        Leads
                    </h1>

                    <p className="text-gray-500">
                        Manage all your sales leads
                    </p>

                </div>

                <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl flex items-center gap-2 cursor-pointer"
                    onClick={() => navigate("/admin/leads/create")}>

                    <FiPlus />

                    Add Lead

                </button>

            </div>

            {/* Search & Filter */}

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">

                <div className="flex flex-col lg:flex-row gap-4 items-center">

                    {/* Search */}

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

                    {/* Status Filter */}

                    <div className="relative w-full lg:w-52">

                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="..."
                        >
                            <option value="All">All Status</option>
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Qualified">Qualified</option>
                            <option value="Proposal Sent">Proposal Sent</option>
                            <option value="Won">Won</option>
                            <option value="Lost">Lost</option>
                        </select>

                        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                            ▼
                        </span>

                    </div>


                </div>

            </div>

            {
                loading ? (

                    <div className="bg-white rounded-2xl p-10 text-center text-gray-500">
                        Loading leads...
                    </div>

                ) : (

                    <>

                        <LeadTable
                            leads={currentLeads}
                            onDeleteSuccess={fetchLeads}
                        />

                        <div className="flex justify-between items-center mt-6">

                            <p className="text-sm text-gray-600">
                                Showing {filteredLeads.length === 0 ? 0 : indexOfFirstRecord + 1}
                                {" "}to{" "}
                                {Math.min(indexOfLastRecord, filteredLeads.length)}
                                {" "}of{" "}
                                {filteredLeads.length} leads
                            </p>

                            <div className="flex gap-2">

                                <button
                                    onClick={() => setCurrentPage((prev) => prev - 1)}
                                    disabled={currentPage === 1}
                                    className={`px-4 py-2 rounded border transition-colors ${currentPage === 1
                                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                            : "bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
                                        }`}
                                >
                                    Previous
                                </button>

                                <span className="px-4 py-2">
                                    {currentPage} / {totalPages || 1}
                                </span>

                                <button
                                    onClick={() => setCurrentPage((prev) => prev + 1)}
                                    disabled={currentPage === totalPages || totalPages === 0}
                                    className={`px-4 py-2 rounded border transition-colors ${currentPage === totalPages || totalPages === 0
                                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                            : "bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
                                        }`}
                                >
                                    Next
                                </button>

                            </div>

                        </div>
                    </>




                )
            }

        </div>
    );
}

export default Leads;