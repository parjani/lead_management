import { FiAlertTriangle } from "react-icons/fi";

function DeleteMember({
    isOpen,
    onClose,
    onConfirm,
    loading,
    memberName
}) {

    if (!isOpen) return null;


    return (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">


            <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">


                <div className="flex items-center gap-3 mb-5">

                    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">

                        <FiAlertTriangle 
                            className="text-red-600"
                            size={24}
                        />

                    </div>


                    <h2 className="text-xl font-bold text-gray-800">

                        Delete Member

                    </h2>


                </div>



                <p className="text-gray-600 mb-6">

                    Are you sure you want to delete{" "}

                    <span className="font-semibold">
                        {memberName}
                    </span>

                    ?

                    This action cannot be undone.

                </p>



                <div className="flex gap-4">


                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="flex-1 px-4 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold"
                    >

                        Cancel

                    </button>




                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className="flex-1 px-4 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold disabled:bg-red-300"
                    >

                        {
                            loading
                            ? "Deleting..."
                            : "Delete"
                        }

                    </button>


                </div>


            </div>


        </div>

    );

}

export default DeleteMember;