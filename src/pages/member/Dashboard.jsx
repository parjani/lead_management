import {
  FiUsers,
  FiTrendingUp,
  FiTarget,
  FiCalendar,
  FiArrowRight,
} from "react-icons/fi";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getMemberDashboard } from "../../api/dashboardApi";
import { useNavigate } from "react-router-dom";


function MemberDashboard() {


  const [dashboard, setDashboard] = useState(null);

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()


  const fetchDashboard = async () => {

    try {

      setLoading(true);


      const response = await getMemberDashboard();


      setDashboard(response.data);


    } catch (error) {


      toast.error(
        error.response?.data?.message ||
        "Failed to fetch dashboard."
      );


    } finally {

      setLoading(false);

    }

  };



  useEffect(() => {

    fetchDashboard();

  }, []);



  if (loading) {

    return (

      <div className="bg-white rounded-2xl p-10 text-center text-gray-500">

        Loading dashboard...

      </div>

    );

  }



  if (!dashboard) {

    return (

      <div className="bg-white rounded-2xl p-10 text-center text-gray-500">

        No dashboard data found.

      </div>

    );

  }



  return (

    <div className="space-y-8">



      {/* Welcome */}


      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">


        <h1 className="text-3xl font-bold">

          Good Morning, {dashboard.member?.name || "Member"} 👋

        </h1>


        <p className="mt-2 text-blue-100">

          Here's a summary of your assigned leads today.

        </p>


      </div>






      {/* Stats */}



      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">


        <StatCard
          icon={<FiUsers />}
          title="Assigned Leads"
          value={dashboard.stats?.assignedLeads || 0}
          color="text-blue-600"
        />


        <StatCard
          icon={<FiTrendingUp />}
          title="In Progress"
          value={dashboard.stats?.inProgress || 0}
          color="text-orange-500"
        />


        <StatCard
          icon={<FiTarget />}
          title="Won Leads"
          value={dashboard.stats?.wonLeads || 0}
          color="text-green-600"
        />


        {/* <StatCard
          icon={<FiCalendar />}
          title="Today's Follow-ups"
          value={dashboard.stats?.todayFollowups || 0}
          color="text-purple-600"
        /> */}


      </div>








      {/* Two Columns */}


      <div className="grid lg:grid-cols-2 gap-6">



        {/* Recent Leads */}



        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">


          <div className="flex justify-between items-center border-b border-gray-200 p-5">


            <h2 className="text-xl font-semibold">

              Recent Assigned Leads

            </h2>



            <button className="text-blue-600 flex items-center gap-1 text-sm hover:underline"
            onClick={() => navigate("/member/leads")}
            >

              View All

              <FiArrowRight />

            </button>


          </div>




          <div className="p-5 space-y-4">


            {
              dashboard.recentLeads?.length > 0 ?

              dashboard.recentLeads.map((lead)=>(


                <div
                  key={lead._id}
                  className="flex justify-between items-center border rounded-xl p-4 hover:bg-gray-50"
                >


                  <div>


                    <h3 className="font-semibold">

                      {lead.company || lead.name}

                    </h3>


                    <p className="text-sm text-gray-500">

                      {lead.status}

                    </p>


                  </div>



                  <span
                    className={`px-3 py-1 rounded-full text-sm
                    ${
                      lead.status === "Won"
                      ? "bg-green-100 text-green-700"
                      :
                      lead.status === "Lost"
                      ? "bg-red-100 text-red-700"
                      :
                      "bg-blue-100 text-blue-700"
                    }`}
                  >

                    {lead.status}

                  </span>



                </div>


              ))

              :

              <p className="text-gray-500">

                No recent leads.

              </p>

            }


          </div>


        </div>

      </div>








    </div>

  );

}




function StatCard({
  icon,
  title,
  value,
  color
}) {


  return (

    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">


      <div className={`text-3xl mb-4 ${color}`}>

        {icon}

      </div>


      <p className="text-gray-500">

        {title}

      </p>


      <h2 className="text-3xl font-bold mt-2">

        {value}

      </h2>


    </div>

  );

}



export default MemberDashboard;