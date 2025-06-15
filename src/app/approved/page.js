'use client';

import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

export default function AdminDashboard() {
  const [marriages, setMarriages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/marriages?status=approved')
      .then(res => res.json())
      .then(data => {
        setMarriages(Array.isArray(data) ? data : data.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 text-gray-800">
      <Navbar />
      <section className="max-w-5xl mx-auto mt-12 p-8 bg-white rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold mb-8 text-blue-700 text-center"> Approved Marriages</h1>
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : marriages.length === 0 ? (
          <p className="text-center text-red-600">No approved marriages found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {marriages.map((m, i) => (
              <div
                key={m._id || i}
                className="bg-green-50 rounded-xl shadow p-6 flex flex-col justify-between border border-green-200"
              >
                <div>
                  <div className="mb-2">
                    <span className="font-semibold text-blue-700">Husband:</span> {m.husbandName}
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold text-blue-700">Wife:</span> {m.wifeName}
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold">Date:</span> {m.marriageDate}
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold">Location:</span> {m.location}
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold">Council:</span> {m.councilType} - {m.councilName}
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold">Status:</span>{' '}
                    <span className="text-green-600 font-bold">
                      Approved
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}