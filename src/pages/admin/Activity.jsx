import {
    FiActivity,
    FiSearch,
    FiUser,
    FiRefreshCw,
    FiCheckCircle,
    FiMessageSquare,
} from "react-icons/fi";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAllActivities } from "../../api/activity";



function Activity() {


    const [activities, setActivities] = useState([]);

    const [loading, setLoading] = useState(true);


    const [search, setSearch] = useState("");

    const [userFilter, setUserFilter] = useState("All Users");

    const [actionFilter, setActionFilter] = useState("All Actions");



    const fetchActivities = async () => {

        try {

            setLoading(true);


            const response = await getAllActivities();


            setActivities(response.data);


        } catch(error) {


            toast.error(
                error.response?.data?.message ||
                "Failed to fetch activities."
            );


        } finally {

            setLoading(false);

        }

    };



    useEffect(()=>{

        fetchActivities();

    },[]);




    const filteredActivities = activities.filter((activity)=>{


        const matchesSearch =

            activity.action
                ?.toLowerCase()
                .includes(search.toLowerCase())

            ||

            activity.user?.name
                ?.toLowerCase()
                .includes(search.toLowerCase())

            ||

            activity.lead?.company
                ?.toLowerCase()
                .includes(search.toLowerCase());



        const matchesUser =

            userFilter === "All Users"

            ||

            activity.user?.name === userFilter;




        const matchesAction =

            actionFilter === "All Actions"

            ||

            activity.type === actionFilter;




        return (
            matchesSearch &&
            matchesUser &&
            matchesAction
        );


    });




    const totalActivities = activities.length;


    const statusChanges = activities.filter(
        item => item.type === "Status"
    ).length;


    const assignments = activities.filter(
        item => item.type === "Assignment"
    ).length;


    const notes = activities.filter(
        item => item.type === "Note"
    ).length;





    const users = [
        "All Users",
        ...new Set(
            activities.map(
                item => item.user?.name
            ).filter(Boolean)
        )
    ];



    return (

        <div className="space-y-8">


            {/* Header */}

            <div>

                <h1 className="text-3xl font-bold text-gray-800">
                    Activity Log
                </h1>


                <p className="text-gray-500 mt-2">
                    Monitor all actions performed across the CRM.
                </p>


            </div>





            {/* Stats */}


            <div className="grid md:grid-cols-4 gap-6">


                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">

                    <FiActivity className="text-3xl text-blue-600 mb-3" />

                    <p className="text-gray-500">
                        Total Activities
                    </p>


                    <h2 className="text-3xl font-bold mt-2">
                        {totalActivities}
                    </h2>

                </div>




                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">

                    <FiRefreshCw className="text-3xl text-orange-500 mb-3" />

                    <p className="text-gray-500">
                        Status Changes
                    </p>


                    <h2 className="text-3xl font-bold mt-2">
                        {statusChanges}
                    </h2>

                </div>




                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">


                    <FiCheckCircle className="text-3xl text-green-600 mb-3" />


                    <p className="text-gray-500">
                        Assignments
                    </p>


                    <h2 className="text-3xl font-bold mt-2">
                        {assignments}
                    </h2>


                </div>





                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">


                    <FiMessageSquare className="text-3xl text-purple-600 mb-3" />


                    <p className="text-gray-500">
                        Notes Added
                    </p>


                    <h2 className="text-3xl font-bold mt-2">
                        {notes}
                    </h2>


                </div>


            </div>





            {/* Search and Filters */}


            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex flex-wrap gap-4">


                <div className="flex items-center flex-1 border border-gray-300 rounded-xl px-4">


                    <FiSearch className="text-gray-500" />


                    <input

                        type="text"

                        value={search}

                        onChange={(e)=>setSearch(e.target.value)}

                        placeholder="Search activity..."

                        className="w-full p-3 outline-none"

                    />


                </div>




                {/* <select

                    value={userFilter}

                    onChange={(e)=>setUserFilter(e.target.value)}

                    className="border border-gray-300 rounded-xl px-4 py-3 outline-none"

                >

                    {
                        users.map((user)=>(
                            <option key={user}>
                                {user}
                            </option>
                        ))
                    }


                </select>





                <select

                    value={actionFilter}

                    onChange={(e)=>setActionFilter(e.target.value)}

                    className="border border-gray-300 rounded-xl px-4 py-3 outline-none"

                >

                    <option>
                        All Actions
                    </option>

                    <option value="Lead">
                        Lead
                    </option>

                    <option value="Status">
                        Status
                    </option>


                    <option value="Assignment">
                        Assignment
                    </option>


                    <option value="Note">
                        Note
                    </option>


                </select> */}


            </div>





            {/* Timeline */}



            {
                loading ? (

                    <div className="bg-white rounded-2xl p-10 text-center text-gray-500">

                        Loading activities...

                    </div>


                ) : (


                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200">


                        <div className="border-b border-gray-200 px-6 py-4">


                            <h2 className="text-xl font-semibold">

                                Recent Activities

                            </h2>


                        </div>





                        <div className="p-6 space-y-6">


                            {
                                filteredActivities.length === 0 ? (

                                    <div className="text-center text-gray-500 py-10">

                                        No activities found.

                                    </div>


                                ) : (


                                    filteredActivities.map((activity)=>(


                                        <div
                                            key={activity._id}
                                            className="flex gap-5"
                                        >


                                            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">

                                                <FiUser />

                                            </div>



                                            <div className="flex-1 border-l-4 border-blue-600 pl-5 pb-6">


                                                <div className="flex justify-between">


                                                    <h3 className="font-semibold text-gray-800">

                                                        {activity.user?.name}

                                                    </h3>


                                                    <span className="text-sm text-gray-500">

                                                        {
                                                            new Date(
                                                                activity.createdAt
                                                            ).toLocaleString()
                                                        }

                                                    </span>


                                                </div>



                                                <p className="mt-2 text-gray-700">

                                                    {activity.action}

                                                </p>



                                                <span className="inline-block mt-3 rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">

                                                    {
                                                        activity.lead?.company ||
                                                        activity.lead?.name ||
                                                        "No Lead"
                                                    }

                                                </span>



                                            </div>


                                        </div>


                                    ))

                                )
                            }


                        </div>


                    </div>


                )
            }


        </div>

    );

}


export default Activity;