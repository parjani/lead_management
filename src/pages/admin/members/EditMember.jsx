import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  getMemberById,
  updateMember
} from "../../../api/memberApi";


function EditMember() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [fetchLoading, setFetchLoading] = useState(true);
  const [errors, setErrors] = useState({});


  const [form, setForm] = useState({

    name: "",
    email: "",
    phone: "",
    password: "",
    status: "active"

  });



  const fetchMember = async () => {
    try {
      setFetchLoading(true);

      const response = await getMemberById(id);

      const member = response.data.member;

      setForm({
        name: member.name || "",
        email: member.email || "",
        phone: member.phone || "",
        password: "",
        status: member.status || "active",
      });

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to fetch member."
      );
    } finally {
      setFetchLoading(false);
    }
  };



  useEffect(() => {

    fetchMember();

  }, []);

  const validateForm = () => {
  const newErrors = {};

  if (!form.name.trim()) {
    newErrors.name = "Name is required.";
  }

  if (!form.email.trim()) {
    newErrors.email = "Email is required.";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)
  ) {
    newErrors.email = "Enter a valid email.";
  }

  if (!form.phone.trim()) {
    newErrors.phone = "Phone number is required.";
  } else if (!/^[0-9]{10}$/.test(form.phone)) {
    newErrors.phone = "Phone number must be 10 digits.";
  }

  // Password is optional while editing
  if (form.password && form.password.length < 6) {
    newErrors.password =
      "Password must be at least 6 characters.";
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};


  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };




  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      const response = await updateMember(id, form);

      toast.success(response.message);

      navigate("/admin/members");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to update member."
      );

    } finally {

      setLoading(false);

    }
  };



  if (fetchLoading) {

    return (

      <div className="bg-white rounded-2xl p-10 text-center text-gray-500">

        Loading member...

      </div>

    );

  }




  return (

    <div className="space-y-6">


      <div>

        <h1 className="text-3xl font-bold text-gray-800">

          Edit Member

        </h1>


        <p className="text-gray-500 mt-1">

          Update member information.

        </p>


      </div>



      <div className="bg-white shadow-2xl rounded-3xl p-10">


        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >



          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className={`w-full border rounded-xl px-4 py-3 outline-none ${errors.name ? "mb-0" : ""
              }`}
          />

          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {errors.name}
            </p>
          )}




          <input

            type="email"

            name="email"

            value={form.email}

            onChange={handleChange}

            placeholder="Email Address"

            className={`w-full border rounded-xl px-4 py-3 outline-none ${errors.email ? "mb-0" : ""
              }`}

          />

          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email}
            </p>
          )}




          <input

            type="text"

            name="phone"

            value={form.phone}

            onChange={handleChange}

            placeholder="Phone Number"

            className={`w-full border rounded-xl px-4 py-3 outline-none ${errors.phone ? "mb-0" : ""
              }`}

          />

              {errors.phone && (
            <p className="text-red-500 text-sm mt-1">
              {errors.phone}
            </p>
          )}



          <div className="flex items-center border rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500">

            <input

              type={showPassword ? "text" : "password"}

              name="password"

              value={form.password}

              onChange={handleChange}

              placeholder="New Password (optional)"

             className={`w-full outline-none ${errors.password ? "mb-0" : ""}`}

            />

            {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password}
            </p>
          )}


            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-500 hover:text-gray-700"
            >

              {
                showPassword
                  ? <FaEyeSlash />
                  : <FaEye />
              }

            </button>

          </div>




          <select

            name="status"

            value={form.status}

            onChange={handleChange}

            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"

          >

            <option value="active">
              Active
            </option>


            <option value="inactive">
              Inactive
            </option>


          </select>




          <div className="flex gap-4">


            <button

              type="submit"

              disabled={loading}

              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 transition text-white font-semibold rounded-xl px-4 py-3"

            >

              {
                loading
                  ? "Updating..."
                  : "Update Member"
              }


            </button>



            <button

              type="button"

              onClick={() => navigate("/admin/members")}

              className="flex-1 bg-gray-200 hover:bg-gray-300 transition text-gray-700 font-semibold rounded-xl px-4 py-3"

            >

              Cancel


            </button>


          </div>


        </form>


      </div>


    </div>

  );

}


export default EditMember;