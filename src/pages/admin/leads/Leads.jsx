import { FiPlus, FiSearch } from "react-icons/fi";
import LeadTable from "./LeadTable.jsx";

function Leads() {

    const leads = [
        {
            id: 1,
            name: "John Doe",
            company: "Google",
            phone: "9876543210",
            status: "New",
            assignedTo: "Rahul",
        },
        {
            id: 2,
            name: "David",
            company: "Amazon",
            phone: "9123456780",
            status: "Qualified",
            assignedTo: "Priya",
        },
        {
            id: 3,
            name: "Smith",
            company: "Microsoft",
            phone: "9988776655",
            status: "Won",
            assignedTo: "Amit",
        },
    ];

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

                <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl flex items-center gap-2 cursor-pointer">

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
                            placeholder="Search by name, company or phone..."
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-12 pr-4 text-gray-700 placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                        />

                    </div>

                    {/* Status Filter */}

                    <div className="relative w-full lg:w-52">

                        <select
                            className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 py-3 px-4 pr-10 text-gray-700 outline-none transition-all duration-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 cursor-pointer"
                        >
                            <option>All Status</option>
                            <option>New</option>
                            <option>Contacted</option>
                            <option>Qualified</option>
                            <option>Proposal</option>
                            <option>Won</option>
                            <option>Lost</option>
                        </select>

                        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                            ▼
                        </span>

                    </div>

                    {/* Assigned Filter */}

                    <div className="relative w-full lg:w-52">

                        <select
                            className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 py-3 px-4 pr-10 text-gray-700 outline-none transition-all duration-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 cursor-pointer"
                        >
                            <option>All Members</option>
                            <option>Rahul</option>
                            <option>Priya</option>
                            <option>Amit</option>
                        </select>

                        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                            ▼
                        </span>

                    </div>

                </div>

            </div>

            <LeadTable leads={leads} />

        </div>
    );
}

export default Leads;