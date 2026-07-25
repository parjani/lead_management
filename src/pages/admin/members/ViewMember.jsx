import {
    FiArrowLeft,
    FiEdit2,
    FiMail,
    FiPhone,
    FiUser,
    FiCalendar,
    FiClock,
    FiShield,
} from "react-icons/fi";

import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { getMemberById } from "../../../api/memberApi";


function ViewMember() {

    const { id } = useParams();

    const navigate = useNavigate();


    const [member, setMember] = useState(null);
    const [leads, setLeads] = useState([]);
    const [leadCount, setLeadCount] = useState(0);

    const [loading, setLoading] = useState(true);



    const fetchMember = async () => {

        try {

            setLoading(true);


            const response = await getMemberById(id);


            setMember(response.data.member);
            setLeads(response.data.leads);
            setLeadCount(response.data.leadCount);


        } catch (error) {


            toast.error(
                error.response?.data?.message ||
                "Failed to fetch member."
            );


        } finally {

            setLoading(false);

        }

    };



    useEffect(() => {

        fetchMember();

    }, []);




    if (loading) {

        return (

            <div className="bg-white rounded-2xl p-10 text-center text-gray-500">

                Loading member...

            </div>

        );

    }




    if (!member) {

        return (

            <div className="bg-white rounded-2xl p-10 text-center text-gray-500">

                Member not found.

            </div>

        );

    }



    return (

        <div className="space-y-8">


            {/* Header */}

            <div className="flex justify-between items-center">


                <div>


                    <Link
                        to="/admin/members"
                        className="inline-flex items-center gap-2 text-blue-600 font-medium hover:underline"
                    >

                        <FiArrowLeft />

                        Back to Members

                    </Link>



                    <h1 className="mt-4 text-4xl font-bold text-gray-800">

                        {member.name}

                    </h1>



                    <div className="flex gap-3 mt-4">


                        <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full">

                            {member.role}

                        </span>



                        <span
                            className={`px-4 py-1 rounded-full ${member.status === "active"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                                }`}
                        >

                            {member.status}

                        </span>


                    </div>


                </div>




                <button

                    onClick={() => navigate(`/admin/members/edit/${member._id}`)}

                    className="px-5 py-3 rounded-xl bg-green-600 text-white flex items-center gap-2 hover:bg-green-700"

                >

                    <FiEdit2 />

                    Edit Member

                </button>


            </div>






            {/* Information Cards */}


            <div className="grid lg:grid-cols-2 gap-6">



                {/* Personal Information */}


                <div className="bg-white rounded-2xl shadow-sm border p-6">


                    <h2 className="text-xl font-semibold mb-6">

                        Personal Information

                    </h2>



                    <div className="space-y-5">



                        <div className="flex gap-4 items-center">

                            <FiUser className="text-blue-600" />

                            <div>

                                <p className="text-sm text-gray-500">
                                    Name
                                </p>

                                <p>
                                    {member.name}
                                </p>

                            </div>

                        </div>





                        <div className="flex gap-4 items-center">

                            <FiMail className="text-purple-600" />

                            <div>

                                <p className="text-sm text-gray-500">
                                    Email
                                </p>

                                <p>
                                    {member.email}
                                </p>

                            </div>

                        </div>





                        <div className="flex gap-4 items-center">

                            <FiPhone className="text-green-600" />

                            <div>

                                <p className="text-sm text-gray-500">
                                    Phone
                                </p>

                                <p>
                                    {member.phone}
                                </p>

                            </div>

                        </div>



                    </div>


                </div>





                {/* Account Details */}


                <div className="bg-white rounded-2xl shadow-sm border p-6">


                    <h2 className="text-xl font-semibold mb-6">

                        Account Details

                    </h2>



                    <div className="space-y-5">


                        <div className="flex gap-4 items-center">

                            <FiShield className="text-orange-500" />

                            <div>

                                <p className="text-sm text-gray-500">
                                    Role
                                </p>

                                <p className="capitalize">
                                    {member.role}
                                </p>

                            </div>

                        </div>





                        <div className="flex gap-4 items-center">

                            <FiCalendar className="text-blue-500" />

                            <div>

                                <p className="text-sm text-gray-500">
                                    Created On
                                </p>

                                <p>
                                    {new Date(member.createdAt).toLocaleDateString()}
                                </p>

                            </div>

                        </div>





                        <div className="flex gap-4 items-center">

                            <FiClock className="text-indigo-500" />

                            <div>

                                <p className="text-sm text-gray-500">
                                    Last Updated
                                </p>

                                <p>
                                    {new Date(member.updatedAt).toLocaleDateString()}
                                </p>

                            </div>

                        </div>



                    </div>


                </div>



            </div>

            <div className="bg-white rounded-2xl shadow-sm border p-6">

                <h2 className="text-xl font-semibold mb-6">
                    Assigned Leads ({leadCount})
                </h2>

                {leads.length > 0 ? (

                    <div className="space-y-4">

                        {leads.map((lead) => (

                            <div className="p-4 border border-gray-300 rounded-xl bg-sky-50">

                                <h3 className="font-semibold">
                                    {lead.name}
                                </h3>

                                <p className="text-sm text-gray-500">
                                    {lead.email}
                                </p>

                                <p className="text-sm text-gray-500">
                                    {lead.phone}
                                </p>

                                {/* Notes */}
                                <div className="mt-4 space-y-4">
                                    <h4 className="font-semibold text-gray-800">Notes</h4>

                                    {lead.notes.length > 0 ? (
                                        lead.notes.map((note) => (
                                            <div
                                                key={note._id}
                                                className="border-l-4 border-blue-500 pl-4 py-2 bg-gray-50 rounded-r-xl"
                                            >
                                                <p className="text-gray-800">{note.text}</p>

                                                <p className="text-xs text-gray-500 mt-2">
                                                    {new Date(note.createdAt).toLocaleString()}
                                                </p>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-500 italic">No notes available.</p>
                                    )}
                                </div>

                            </div>

                        ))}

                    </div>

                ) : (

                    <p className="text-gray-500">
                        No leads assigned.
                    </p>

                )}

            </div>






        </div>

    );

}


export default ViewMember;