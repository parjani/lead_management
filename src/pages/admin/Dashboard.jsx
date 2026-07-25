import {
  FiUsers,
  FiUserPlus,
  FiTrendingUp,
  FiAward,
} from "react-icons/fi";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getDashboardStats } from "../../api/dashboardApi";


function Dashboard() {


  const [stats,setStats] = useState({
    totalLeads:0,
    newLeads:0,
    qualifiedLeads:0,
    wonDeals:0
  });


  const [loading,setLoading] = useState(true);



  const fetchStats = async()=>{

    try{

      const response = await getDashboardStats();

      setStats(response.data);


    }catch(error){

      toast.error(
        error.response?.data?.message ||
        "Failed to load dashboard."
      );

    }finally{

      setLoading(false);

    }

  };



  useEffect(()=>{

    fetchStats();

  },[]);



  const cards = [

    {
      title:"Total Leads",
      value:stats.totalLeads,
      icon:<FiUsers/>,
      color:"bg-blue-500"
    },


    {
      title:"New Leads",
      value:stats.newLeads,
      icon:<FiUserPlus/>,
      color:"bg-green-500"
    },


    {
      title:"Qualified",
      value:stats.qualifiedLeads,
      icon:<FiTrendingUp/>,
      color:"bg-orange-500"
    },


    {
      title:"Won Deals",
      value:stats.wonDeals,
      icon:<FiAward/>,
      color:"bg-purple-500"
    },

  ];




  return (

    <div className="space-y-8">


      <div>

        <h1 className="text-3xl font-bold text-gray-800">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Welcome back! Here's your sales overview.
        </p>

      </div>




      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">


        {
          cards.map((card)=>(


            <div
              key={card.title}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition"
            >


              <div className="flex justify-between items-center">


                <div>


                  <p className="text-gray-500">
                    {card.title}
                  </p>


                  <h2 className="text-4xl font-bold mt-3">

                    {
                      loading
                      ?
                      "..."
                      :
                      card.value
                    }

                  </h2>


                </div>



                <div
                  className={`${card.color} text-white p-4 rounded-xl text-2xl`}
                >

                  {card.icon}

                </div>


              </div>


            </div>


          ))

        }


      </div>


    </div>

  );

}


export default Dashboard;