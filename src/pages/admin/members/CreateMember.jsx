import MemberForm from "./MemberForm.jsx";

function CreateMember() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Create Member
        </h1>

        <p className="text-gray-500 mt-2">
          Add a new member to your sales team.
        </p>
      </div>

      <MemberForm mode="create" />
    </div>
  );
}

export default CreateMember;