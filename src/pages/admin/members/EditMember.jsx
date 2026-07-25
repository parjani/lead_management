import MemberForm from "./MemberForm.jsx";

function EditMember() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Edit Member
        </h1>

        <p className="text-gray-500 mt-2">
          Update member details and permissions.
        </p>
      </div>

      <MemberForm mode="edit" />
    </div>
  );
}

export default EditMember;