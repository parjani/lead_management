import Navbar from "../components/Navbar.jsx";
import LeadForm from "../components/LeadForm.jsx";
import Footer from "../components/Footer.jsx";

function LeadCapture() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 flex flex-col">

      <Navbar />

      <main className="flex-1 flex items-center justify-center px-6 py-16">

        <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Section */}

          <div>

            <p className="text-blue-600 font-semibold mb-3 underline decoration-blue-600 decoration-1 underline-offset-4">
              Lead &nbsp;Management &nbsp;Platform
            </p>

            <h1 className="text-5xl font-extrabold text-gray-800 leading-tight">
              Grow Your Business
              <br />
              With Better Leads
            </h1>

            <p className="mt-6 text-lg text-gray-600 leading-8">
              Capture potential customers effortlessly and let your sales team
              manage every lead efficiently.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-6">

              <div className="bg-white rounded-xl shadow p-5">
                <h2 className="text-3xl font-bold text-blue-600">24/7</h2>
                <p className="text-gray-500">
                  Lead Collection
                </p>
              </div>

              <div className="bg-white rounded-xl shadow p-5">
                <h2 className="text-3xl font-bold text-purple-600">100%</h2>
                <p className="text-gray-500">
                  Secure Data
                </p>
              </div>

            </div>

          </div>

          {/* Right */}

          <LeadForm />

        </div>

      </main>

      <Footer />

    </div>
  );
}

export default LeadCapture;