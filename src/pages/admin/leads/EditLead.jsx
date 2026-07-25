import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import {
  addNote,
  getLeadById,
  updateLead,
} from "../../../api/leadApi";
import { getAllMembers } from "../../../api/memberApi";

function EditLead() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [pageLoading, setPageLoading] = useState(true);

  const [note, setNote] = useState("");
  const [lead, setLead] = useState(null);
  const [errors, setErrors] = useState({});
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

  const [members, setMembers] = useState([]);
  useEffect(() => {

    fetchLead();

  }, []);

  const fetchLead = async () => {

    try {

      const response = await getLeadById(id);

      const lead = response.data;

      setFormData({
        name: lead.name || "",
        email: lead.email || "",
        phone: lead.phone || "",
        company: lead.company || "",
        source: lead.source || "",
        message: lead.message || "",
        status: lead.status || "New",
        assignedTo: lead.assignedTo?._id || "",
      });

      setLead(lead);

    } catch (error) {

      toast.error(
        error.response?.data?.message || "Failed to fetch lead."
      );

    } finally {

      setPageLoading(false);

    }

  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits.";
    }

    if (!formData.status) {
      newErrors.status = "Please select a status.";
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

  const fetchMembers = async () => {
    try {
      const response = await getAllMembers();

      setMembers(response.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to fetch members."
      );
    }
  };

  useEffect(() => {
    fetchLead();
    fetchMembers();
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {

      setLoading(true);

      const response = await updateLead(id, formData);

      toast.success(response.message);

      navigate("/admin/leads");

    } catch (error) {

      toast.error(
        error.response?.data?.message || "Failed to update lead."
      );

    } finally {

      setLoading(false);

    }

  };

  const handleAddNote = async () => {
    if (!note.trim()) {
      return toast.error("Please enter a note.");
    }

    try {
      const response = await addNote(id, {
        text: note,
      });

      toast.success(response.message);

      setNote("");

      fetchLead();

    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
        "Failed to add note."
      );

    }
  };

  if (pageLoading) {

    return (
      <div className="bg-white rounded-2xl p-10 text-center">
        Loading lead...
      </div>
    );

  }

  return (

    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">
          Edit Lead
        </h1>

        <p className="text-gray-500">
          Update lead information.
        </p>

      </div>

      <div className="bg-white rounded-2xl shadow-sm border p-8">

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
              className="w-full border rounded-xl px-4 py-3"
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
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
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
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Source
            </label>

            <select
              name="source"
              value={formData.source}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            >
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
              Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            >
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Proposal Sent">Proposal Sent</option>
              <option value="Won">Won</option>
              <option value="Lost">Lost</option>
            </select>
            {errors.status && (
              <p className="text-red-500 text-sm mt-1">
                {errors.status}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block mb-2 font-medium">
              Assign To
            </label>

            <select
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
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
              className="w-full border rounded-xl px-4 py-3 resize-none"
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.message}
              </p>
            )}
          </div>

          {/* ================= Notes Section ================= */}

          <div className="mt-2 pt-2">

            <h2 className="text-2xl font-semibold mb-5">
              Notes
            </h2>

            <div className="space-y-4">

              <textarea
                rows={4}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Write a note..."
                className="w-full border rounded-xl px-4 py-3 resize-none"
              />

              <button
                type="button"
                onClick={handleAddNote}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl"
              >
                Add Note
              </button>

            </div>

            <div className="mt-8 space-y-4">

              {lead?.notes?.length > 0 ? (

                lead.notes.map((item) => (

                  <div
                    key={item._id}
                    className="border rounded-xl p-4 bg-gray-50"
                  >

                    <p className="text-gray-800">
                      {item.text}
                    </p>

                    <p className="text-sm text-gray-500 mt-2">
                      {/* By {item.addedBy?.name || "Unknown"} •{" "} */}
                      {new Date(item.createdAt).toLocaleString()}
                    </p>

                  </div>

                ))

              ) : (

                <p className="text-gray-500">
                  No notes added yet.
                </p>

              )}

            </div>

          </div>

          <div className="md:col-span-2 flex justify-end gap-4">

            <button
              type="button"
              onClick={() => navigate("/admin/leads")}
              className="px-6 py-3 border rounded-xl hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
            >
              {loading ? "Updating..." : "Update Lead"}
            </button>

          </div>

        </form>

      </div>

    </div>

  );

}

export default EditLead;