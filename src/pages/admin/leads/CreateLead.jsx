import LeadForm from "../../../components/LeadForm.jsx";

function CreateLead() {
  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Create New Lead
        </h1>

        <p className="text-gray-500 mt-1">
          Add a new lead to your sales pipeline.
        </p>
      </div>
        <div className="mx-2 my-5">
      <LeadForm mode="create" />
      </div>

    </div>
  );
}

export default CreateLead;