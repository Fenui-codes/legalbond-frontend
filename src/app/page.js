import Navbar from './components/Navbar';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-800 flex flex-col">
      <Navbar />

      <section className="max-w-4xl mx-auto text-center mt-12 p-8">
        <h1 className="text-4xl font-bold mb-4 text-blue-600">
          Customary Marriage Registration
        </h1>
        <p className="text-lg mb-6">
          Welcome to the official platform for registering customary marriages in Cameroon.
        </p>
        <div className="flex justify-center space-x-4">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700">
            
          </button>
          <button className="bg-gray-200 px-6 py-2 rounded-xl hover:bg-gray-300">
            
          </button>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white mt-16 py-12 shadow-md">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold mb-8 text-blue-600">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <h3 className="text-xl font-bold mb-2">Step 1: Register</h3>
              <p>
                Submit the details of the couple and witnesses, along with required documents.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Step 2: Objection Period</h3>
              <p>
                The registration is held open for 30 days to allow objections if any.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Step 3: Official Publication</h3>
              <p>
                If no objections are raised, the customary marriage is officially recognized and published.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="max-w-5xl mx-auto mt-16 px-6 text-center">
        <h2 className="text-3xl font-semibold mb-8 text-blue-600">Benefits of Registration</h2>
        <ul className="list-disc list-inside text-left max-w-xl mx-auto space-y-2">
          <li>Legal recognition of your customary marriage.</li>
          <li>Protection of rights for spouses and children.</li>
          <li>Access to inheritance and property rights.</li>
          <li>Helps avoid future disputes and misunderstandings.</li>
        </ul>
      </section>

      {/* FAQs */}
      <section className="bg-white mt-16 py-12 shadow-md">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-semibold mb-8 text-blue-600 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6 max-w-3xl mx-auto">
            <div>
              <h3 className="font-bold">What documents do I need to register?</h3>
              <p>You need IDs of the spouses and witnesses, photos, and proof of customary marriage ceremony.</p>
            </div>
            <div>
              <h3 className="font-bold">How long does registration take?</h3>
              <p>The objection period lasts 30 days. After that, your marriage is officially published.</p>
            </div>
            <div>
              <h3 className="font-bold">Can I register an existing customary marriage?</h3>
              <p>Yes, the platform allows retroactive registration for customary marriages performed before.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-600 text-white mt-auto py-6 text-center">
        &copy; {new Date().getFullYear()} Customary Marriage Registration. All rights reserved.
      </footer>
    </main>
  );
}
