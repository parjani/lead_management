import { Link } from "react-router-dom";
import { FiArrowLeft, FiSave } from "react-icons/fi";

function UpdateMemberLead() {

  return (
    <div className="max-w-4xl mx-auto space-y-6">

      <Link
        to="/member/leads"
        className="inline-flex items-center gap-2 text-blue-600 hover:underline"
      >
        <FiArrowLeft />
        Back to My Leads
      </Link>

      <div>

        <h1 className="text-3xl font-bold">
          Update Lead
        </h1>

        <p className="text-gray-500 mt-2">
          Update lead status and add notes.
        </p>

      </div>

      <div className="bg-white rounded-2xl border shadow-sm">

        <div className="border-b px-6 py-5">

          <h2 className="text-xl font-semibold">
            Lead Update
          </h2>

        </div>

        <div className="p-6 space-y-6">

          <div>

            <label className="block mb-2 font-medium">
              Lead Status
            </label>

            <select className="w-full border rounded-xl px-4 py-3">

              <option>New</option>
              <option>Contacted</option>
              <option>Qualified</option>
              <option>Proposal Sent</option>
              <option>Won</option>
              <option>Lost</option>

            </select>

          </div>

          <div>

            <label className="block mb-2 font-medium">
              Add Note
            </label>

            <textarea
              rows="6"
              placeholder="Write follow-up details..."
              className="w-full border rounded-xl px-4 py-3 resize-none"
            />

          </div>

        </div>

      </div>

      <div className="flex justify-end gap-4">

        <Link
          to="/member/leads"
          className="px-6 py-3 border rounded-xl hover:bg-gray-100"
        >
          Cancel
        </Link>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center gap-2">

          <FiSave />

          Save Changes

        </button>

      </div>

    </div>
  );
}

export default UpdateMemberLead;