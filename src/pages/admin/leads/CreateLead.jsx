import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createLead } from "../../../api/leadApi";
import { getAllMembers } from "../../../api/memberApi";

function CreateLead() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    source: "",
    message: "",
    status: "New",
    assignedTo: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits.";
    }

    if (!formData.source) {
      newErrors.source = "Please select a source.";
    }
    if (!formData.assignedTo) {
      newErrors.assignedTo = "Please select assigned member.";
    }
    if (!formData.message) {
      newErrors.message = "Please enter message.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      const response = await createLead(formData);

      toast.success(response.message);

      navigate("/admin/leads");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to create lead."
      );

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await getAllMembers();
      setMembers(response.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch members."
      );
    }
  };


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

      <div className="bg-white shadow-sm rounded-2xl p-8 border border-gray-200">

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >

          <div>
            <label className="block mb-2 font-medium">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            />

            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Phone
            </label>

            <input
              type="tel"
              name="phone"
              pattern="[0-9]{10}"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Company
            </label>

            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Enter company name"
              className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Lead Source
            </label>

            <select
              name="source"
              value={formData.source}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">Select Source</option>
              <option value="Website">Website</option>
              <option value="Google">Google</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="Facebook">Facebook</option>
              <option value="Instagram">Instagram</option>
              <option value="Referral">Referral</option>
              <option value="Other">Other</option>
            </select>
            {errors.source && (
              <p className="text-red-500 text-sm mt-1">
                {errors.source}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Assign To
            </label>

            <select
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">Select Member</option>

              {members.map((member) => (
                <option
                  key={member._id}
                  value={member._id}
                >
                  {member.name}
                </option>
              ))}
              

            </select>
            {errors.assignedTo && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.assignedTo}
                </p>
              )}
          </div>

          <div className="md:col-span-2">
            <label className="block mb-2 font-medium">
              Message
            </label>

            <textarea
              rows={5}
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Additional information..."
              className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.message}
              </p>
            )}
          </div>

          <div className="md:col-span-2 flex justify-end gap-4">

            <button
              type="button"
              onClick={() => navigate("/admin/leads")}
              className="px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-60 cursor-pointer"
            >
              {loading ? "Creating..." : "Create Lead"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default CreateLead;