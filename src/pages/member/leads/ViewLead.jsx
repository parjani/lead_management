import { Link, useParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiMail,
  FiPhone,
  FiBriefcase,
  FiMessageSquare,
  FiCalendar,
  FiUser,
  FiClock,
} from "react-icons/fi";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import StatusBadge from "./StatusBadge";
import { getMemberLeadById } from "../../../api/memberApi";


function ViewMemberLead() {

  const { id } = useParams();

  const [lead, setLead] = useState(null);

  const [loading, setLoading] = useState(true);



  const fetchLead = async () => {

    try {

      setLoading(true);

      const response = await getMemberLeadById(id);

      setLead(response.data);


    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to fetch lead."
      );

    } finally {

      setLoading(false);

    }

  };



  useEffect(() => {

    fetchLead();

  }, []);



  if (loading) {

    return (

      <div className="bg-white rounded-2xl p-10 text-center text-gray-500">

        Loading lead...

      </div>

    );

  }



  if (!lead) {

    return (

      <div className="bg-white rounded-2xl p-10 text-center text-gray-500">

        Lead not found.

      </div>

    );

  }



  return (

    <div className="space-y-6">


      {/* Back */}

      <Link
        to="/member/leads"
        className="inline-flex items-center gap-2 text-blue-600 hover:underline font-medium"
      >

        <FiArrowLeft />

        Back to My Leads

      </Link>





      {/* Header */}

      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">


        <div className="flex justify-between items-start">


          <div>

            <h1 className="text-3xl font-bold">

              {lead.name}

            </h1>


            <p className="mt-2 text-blue-100">

              {lead.company || "No Company"}

            </p>


          </div>



          <StatusBadge status={lead.status}/>


        </div>


      </div>





      {/* Lead Information */}


      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">


        <div className="border-b px-6 py-5">


          <h2 className="text-xl font-semibold">

            Lead Information

          </h2>


        </div>



        <div className="grid md:grid-cols-2 gap-6 p-6">



          <InfoCard
            icon={<FiUser />}
            label="Name"
            value={lead.name}
          />



          <InfoCard
            icon={<FiBriefcase />}
            label="Company"
            value={lead.company || "-"}
          />



          <InfoCard
            icon={<FiMail />}
            label="Email"
            value={lead.email || "-"}
          />



          <InfoCard
            icon={<FiPhone />}
            label="Phone"
            value={lead.phone || "-"}
          />



          <InfoCard
            icon={<FiUser />}
            label="Assigned To"
            value={lead.assignedTo?.name || "-"}
          />



          <InfoCard
            icon={<FiCalendar />}
            label="Created Date"
            value={
              new Date(
                lead.createdAt
              ).toLocaleDateString()
            }
          />


        </div>


      </div>





      {/* Message */}


      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">


        <div className="flex items-center gap-3 mb-4">


          <FiMessageSquare className="text-blue-600 text-xl"/>


          <h2 className="text-xl font-semibold">

            Message

          </h2>


        </div>



        <p className="text-gray-600 leading-relaxed">

          {lead.message || "No message available."}

        </p>


      </div>





      {/* Notes */}


      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">


        <div className="border-b px-6 py-5 flex items-center gap-3">


          <FiMessageSquare className="text-purple-600 text-xl"/>


          <h2 className="text-xl font-semibold">

            Notes ({lead.notes?.length || 0})

          </h2>


        </div>



        <div className="p-6">


        {

          lead.notes?.length > 0 ? (


            <div className="space-y-5">


              {
                lead.notes.map((note)=> (

                  <div
                    key={note._id}
                    className="relative border-l-4 border-purple-500 pl-5"
                  >


                    <div className="bg-purple-50 rounded-xl p-4">


                      <p className="text-gray-700">

                        {note.text}

                      </p>



                      <div className="flex items-center gap-5 mt-3 text-sm text-gray-500">


                        <span className="flex items-center gap-1">

                          <FiClock />

                          {
                            new Date(
                              note.createdAt
                            ).toLocaleString()
                          }

                        </span>


                      </div>


                    </div>


                  </div>


                ))
              }


            </div>


          ) : (


            <p className="text-gray-500 text-center py-5">

              No notes added yet.

            </p>


          )

        }


        </div>


      </div>





    </div>

  );

}




function InfoCard({
  icon,
  label,
  value
}) {


  return (

    <div className="flex items-center gap-4">


      <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">

        {icon}

      </div>



      <div>


        <p className="text-sm text-gray-500">

          {label}

        </p>


        <p className="font-medium text-gray-800">

          {value}

        </p>


      </div>


    </div>

  );

}


export default ViewMemberLead;