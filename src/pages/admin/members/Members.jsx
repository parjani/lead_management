import { FiPlus, FiSearch } from "react-icons/fi";
import MemberTable from "./MemberTable.jsx";

function Members() {

    const members = [
        {
            id: 1,
            name: "Rahul Sharma",
            email: "rahul@gmail.com",
            phone: "9876543210",
            role: "Admin",
            assignedLeads: 18,
            status: "Active",
        },
        {
            id: 2,
            name: "Priya Patel",
            email: "priya@gmail.com",
            phone: "9988776655",
            role: "Member",
            assignedLeads: 12,
            status: "Active",
        },
        {
            id: 3,
            name: "Amit Verma",
            email: "amit@gmail.com",
            phone: "9123456780",
            role: "Member",
            assignedLeads: 7,
            status: "Inactive",
        },
    ];

    return (
        <div className="space-y-6">

            {/* Header */}

            <div className="flex justify-between items-center">

                <div>

                    <h1 className="text-3xl font-bold">
                        Members
                    </h1>

                    <p className="text-gray-500">
                        Manage all your members
                    </p>

                </div>

                <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl flex items-center gap-2 cursor-pointer">

                    <FiPlus />

                    Add Member

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



                </div>

            </div>

            <MemberTable members={members} />

        </div>
    );
}

export default Members;