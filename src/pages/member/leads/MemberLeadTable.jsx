import { FiInbox } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

import { updateLeadStatus } from "../../../api/memberApi";


function MemberLeadTable({
  leads,
  onStatusUpdate
}) {

  const navigate = useNavigate();

  const [showStatusModal, setShowStatusModal] = useState(false);

  const [statusData, setStatusData] = useState(null);


  const confirmStatusChange = async () => {

    try {

      const response = await updateLeadStatus(
        statusData.id,
        {
          status: statusData.newStatus
        }
      );


      toast.success(
        response.message ||
        "Status updated successfully"
      );


      onStatusUpdate();


    } catch (error) {


      toast.error(
        error.response?.data?.message ||
        "Failed to update status"
      );


    } finally {


      setShowStatusModal(false);

      setStatusData(null);


    }

  };



  return (

    <div className="overflow-hidden rounded-2xl bg-white shadow-lg border border-gray-200">


      <table className="min-w-full">


        {/* Header */}

        <thead className="bg-blue-600 text-white">

          <tr>

            <th className="px-6 py-4 text-left font-semibold">
              Lead
            </th>

            <th className="px-6 py-4 text-left font-semibold">
              Company
            </th>

            <th className="px-6 py-4 text-left font-semibold">
              Phone
            </th>

            <th className="px-6 py-4 text-left font-semibold">
              Status
            </th>

            <th className="px-6 py-4 text-center font-semibold">
              Action
            </th>

          </tr>

        </thead>



        {/* Body */}

        <tbody>


          {
            leads.length > 0 ? (


              leads.map((lead)=>(


                <tr
                  key={lead._id}
                  className="border-b border-gray-100 hover:bg-blue-50 transition"
                >


                  {/* Lead */}

                  <td className="px-6 py-4">


                    <div className="flex items-center gap-3">


                      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">

                        {lead.name?.charAt(0)}

                      </div>



                      <div>


                        <p className="font-semibold text-gray-800">

                          {lead.name}

                        </p>


                        <p className="text-sm text-gray-500">

                          Lead #{lead._id.slice(-6).toUpperCase()}

                        </p>


                      </div>


                    </div>


                  </td>




                  {/* Company */}

                  <td className="px-6 py-4 text-gray-700">

                    {lead.company || "-"}

                  </td>




                  {/* Phone */}

                  <td className="px-6 py-4 text-gray-700">

                    {lead.phone}

                  </td>




                  {/* Status */}

                  <td className="px-6 py-4">


                    <select

                      value={lead.status}

                      onChange={(e)=>{


                        setStatusData({

                          id: lead._id,

                          oldStatus: lead.status,

                          newStatus: e.target.value

                        });


                        setShowStatusModal(true);


                      }}

                      className="border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"

                    >


                      <option value="New">
                        New
                      </option>


                      <option value="Contacted">
                        Contacted
                      </option>


                      <option value="Qualified">
                        Qualified
                      </option>


                      <option value="Proposal Sent">
                        Proposal Sent
                      </option>


                      <option value="Won">
                        Won
                      </option>


                      <option value="Lost">
                        Lost
                      </option>


                    </select>


                  </td>





                  {/* Action */}

                  <td className="px-6 py-4 text-center">


                    <button

                      onClick={() =>
                        navigate(`/member/leads/${lead._id}`)
                      }

                      className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition"

                    >

                      View

                    </button>


                  </td>



                </tr>


              ))



            ) : (


              <tr>


                <td
                  colSpan="5"
                  className="py-12 text-center text-gray-500"
                >


                  <div className="flex flex-col items-center gap-2">


                    <FiInbox className="text-4xl text-gray-300"/>


                    <p className="text-lg font-medium">

                      No leads found

                    </p>


                    <p className="text-sm text-gray-400">

                      No assigned leads available.

                    </p>


                  </div>


                </td>


              </tr>


            )
          }


        </tbody>


      </table>




      {/* Status Confirmation Modal */}


      {
        showStatusModal && (


          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">


            <div className="bg-white rounded-2xl p-6 w-96 shadow-xl">


              <h2 className="text-xl font-bold text-gray-800">

                Change Lead Status

              </h2>



              <p className="text-gray-600 mt-3">


                Are you sure you want to change status from{" "}


                <span className="font-semibold">

                  {statusData?.oldStatus}

                </span>


                {" "}to{" "}


                <span className="font-semibold text-blue-600">

                  {statusData?.newStatus}

                </span>

                ?


              </p>




              <div className="flex justify-end gap-3 mt-6">


                <button

                  onClick={()=>{

                    setShowStatusModal(false);

                    setStatusData(null);

                  }}

                  className="px-4 py-2 rounded-lg border hover:bg-gray-100"

                >

                  Cancel

                </button>




                <button

                  onClick={confirmStatusChange}

                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"

                >

                  Confirm

                </button>



              </div>


            </div>


          </div>


        )
      }



    </div>

  );

}


export default MemberLeadTable;