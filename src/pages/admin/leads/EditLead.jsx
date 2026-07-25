import LeadForm from "../../../components/LeadForm.jsx";

function EditLead() {
  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Edit Lead
        </h1>

        <p className="text-gray-500 mt-1">
          Update the lead information.
        </p>
      </div>

      <LeadForm mode="edit" />

    </div>
  );
}

export default EditLead;