import { useState } from "react";
import { toast } from "react-toastify";
import { createPublicLead } from "../api/leadApi";

function LeadForm() {

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
        source: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const response = await createPublicLead(form);

            toast.success(
                response.message || "Lead submitted successfully."
            );

            setForm({
                name: "",
                email: "",
                phone: "",
                company: "",
                source: ""
            });

        }
        catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to submit lead."
            );

        }
        finally {

            setLoading(false);

        }

    };

    return (

        <div className="bg-white shadow-2xl rounded-3xl p-10">

            <h2 className="text-3xl font-bold mb-2 text-gray-800">
                Get Started
            </h2>

            <p className="text-gray-500 mb-8">
                Fill out the form and we'll contact you soon.
            </p>

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >

                <input
                    type="text"
                    name="name"
                    value={form.name}
                    placeholder="Full Name"
                    onChange={handleChange}
                    required
                    className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                    type="email"
                    name="email"
                    value={form.email}
                    placeholder="Email Address"
                    onChange={handleChange}
                    required
                    className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                    type="text"
                    name="phone"
                    value={form.phone}
                    placeholder="Phone Number"
                    onChange={handleChange}
                    required
                    className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                    type="text"
                    name="company"
                    value={form.company}
                    placeholder="Company"
                    onChange={handleChange}
                    required
                    className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />

                <div className="relative">

                    <select
                        name="source"
                        value={form.source}
                        onChange={handleChange}
                        required
                        className="w-full appearance-none rounded-xl border border-gray-300 bg-white px-4 py-3 pr-12 text-gray-700 shadow-sm transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none cursor-pointer"
                    >

                        <option value="">
                            Select Lead Source
                        </option>

                        <option value="Website">
                            Website
                        </option>

                        <option value="Google">
                            Google
                        </option>

                        <option value="LinkedIn">
                            LinkedIn
                        </option>

                        <option value="Facebook">
                            Facebook
                        </option>

                        <option value="Instagram">
                            Instagram
                        </option>

                        <option value="Referral">
                            Referral
                        </option>

                        <option value="Other">
                            Other
                        </option>

                    </select>

                    <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">

                        <svg
                            className="h-5 w-5 text-gray-500"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >

                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                            />

                        </svg>

                    </div>

                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition text-white font-semibold rounded-xl px-4 py-3"
                >
                    {
                        loading
                            ? "Submitting..."
                            : "Submit Lead"
                    }
                </button>

            </form>

        </div>

    );

}

export default LeadForm;