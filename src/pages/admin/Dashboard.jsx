import {
  FiUsers,
  FiUserPlus,
  FiTrendingUp,
  FiAward,
} from "react-icons/fi";

function Dashboard() {

  const cards = [
    {
      title: "Total Leads",
      value: 128,
      icon: <FiUsers />,
      color: "bg-blue-500",
    },
    {
      title: "New Leads",
      value: 32,
      icon: <FiUserPlus />,
      color: "bg-green-500",
    },
    {
      title: "Qualified",
      value: 21,
      icon: <FiTrendingUp />,
      color: "bg-orange-500",
    },
    {
      title: "Won Deals",
      value: 14,
      icon: <FiAward />,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="space-y-8">

      {/* Welcome */}

      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Welcome back! Here's your sales overview.
        </p>
      </div>

      {/* Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {cards.map((card) => (

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
                  {card.value}
                </h2>

              </div>

              <div
                className={`${card.color} text-white p-4 rounded-xl text-2xl`}
              >
                {card.icon}
              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Dashboard;