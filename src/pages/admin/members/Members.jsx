import { FiPlus, FiSearch } from "react-icons/fi";
import MemberTable from "./MemberTable.jsx";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAllMembers } from "../../../api/memberApi.js";
import { useNavigate } from "react-router-dom";


function Members() {

    const [members, setMembers] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);

    const recordsPerPage = 10;

    const fetchMembers = async () => {

        try {

            setLoading(true);

            const response = await getAllMembers();

            setMembers(response.data);


        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to fetch members."
            );

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        fetchMembers();

    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [search]);

    // Search Filter

    const filteredMembers = members.filter((member) => {

        return (

            member.name
                .toLowerCase()
                .includes(search.toLowerCase())

            ||

            member.email
                .toLowerCase()
                .includes(search.toLowerCase())

            ||

            member.phone
                .includes(search)

        );

    });

    const indexOfLastRecord = currentPage * recordsPerPage;

    const indexOfFirstRecord =
        indexOfLastRecord - recordsPerPage;

    const currentMembers = filteredMembers.slice(
        indexOfFirstRecord,
        indexOfLastRecord
    );

    const totalPages = Math.ceil(
        filteredMembers.length / recordsPerPage
    );

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


                <button
                    onClick={() => navigate("/admin/members/create")}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl flex items-center gap-2 cursor-pointer"
                >

                    <FiPlus />

                    Add Member

                </button>


            </div>



            {/* Search */}


            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">


                <div className="relative w-full">


                    <FiSearch
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        size={18}
                    />


                    <input

                        type="text"

                        value={search}

                        onChange={(e) => setSearch(e.target.value)}

                        placeholder="Search by name, email or phone..."

                        className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-12 pr-4 text-gray-700 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"

                    />


                </div>


            </div>



            {
                loading ? (

                    <div className="bg-white rounded-2xl p-10 text-center text-gray-500">

                        Loading members...

                    </div>


                ) : filteredMembers.length === 0 ? (


                    <div className="bg-white rounded-2xl p-10 text-center text-gray-500">

                        No members found.

                    </div>


                ) : (
                    <>
                        <MemberTable
                            members={currentMembers}
                            onDeleteSuccess={fetchMembers}
                        />

                        <div className="flex justify-between items-center mt-6">

                            <p className="text-sm text-gray-600">
                                Showing {filteredMembers.length === 0 ? 0 : indexOfFirstRecord + 1}
                                {" "}to{" "}
                                {Math.min(indexOfLastRecord, filteredMembers.length)}
                                {" "}of{" "}
                                {filteredMembers.length} members
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


export default Members;