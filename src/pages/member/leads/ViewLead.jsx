import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import StatusBadge from "./StatusBadge.jsx";

function ViewMemberLead() {

  const lead = {
    name: "John Doe",
    company: "Google",
    email: "john@gmail.com",
    phone: "9876543210",
    source: "Website",
    status: "Qualified",
    assignedTo: "Rahul Sharma",
    notes: [
      "Customer interested in Enterprise plan.",
      "Requested product demo.",
    ],
    activities: [
      "Lead assigned to Rahul",
      "Status updated to Qualified",
      "Demo scheduled",
    ],
  };

  return (
    <div className="space-y-6">

      <Link
        to="/member/leads"
        className="inline-flex items-center gap-2 text-blue-600 hover:underline"
      >
        <FiArrowLeft />
        Back to My Leads
      </Link>

      <div className="bg-white rounded-2xl border shadow-sm">

        <div className="border-b px-6 py-5">

          <h1 className="text-2xl font-bold">
            Lead Details
          </h1>

        </div>

        <div className="grid md:grid-cols-2 gap-6 p-6">

          <div>
            <p className="text-gray-500">Name</p>
            <h3>{lead.name}</h3>
          </div>

          <div>
            <p className="text-gray-500">Company</p>
            <h3>{lead.company}</h3>
          </div>

          <div>
            <p className="text-gray-500">Email</p>
            <h3>{lead.email}</h3>
          </div>

          <div>
            <p className="text-gray-500">Phone</p>
            <h3>{lead.phone}</h3>
          </div>

          <div>
            <p className="text-gray-500">Lead Source</p>
            <h3>{lead.source}</h3>
          </div>

          <div>
            <p className="text-gray-500">Status</p>
            <StatusBadge status={lead.status}/>
          </div>

        </div>

      </div>

      <div className="grid lg:grid-cols-2 gap-6">

        <div className="bg-white rounded-2xl border shadow-sm p-6">

          <h2 className="font-semibold mb-4">
            Notes
          </h2>

          {lead.notes.map((note,index)=>(
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-4 mb-3"
            >
              {note}
            </div>
          ))}

        </div>

        <div className="bg-white rounded-2xl border shadow-sm p-6">

          <h2 className="font-semibold mb-4">
            Activity
          </h2>

          {lead.activities.map((activity,index)=>(
            <div
              key={index}
              className="border-l-4 border-blue-600 pl-4 mb-4"
            >
              {activity}
            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

export default ViewMemberLead;