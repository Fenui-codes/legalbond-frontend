'use client';

import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useRouter } from 'next/navigation';

export default function Objection() {
  const [marriages, setMarriages] = useState([]);
  const [marriageId, setMarriageId] = useState('');
  const [form, setForm] = useState({
    objectorName: '',
    reason: '',
    why: '',
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  // Fetch only pending marriages for the dropdown
  useEffect(() => {
    fetch('http://localhost:5000/api/marriages?status=pending')
      .then(res => res.json())
      .then(data => {
        const arr = Array.isArray(data) ? data : data.data || [];
        setMarriages(arr);
        if (arr.length > 0) setMarriageId(arr[0]._id);
      });
  }, []);

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError('');
    setSuccess('');
  };

  const handleMarriageChange = (e) => {
    setMarriageId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!form.objectorName || !form.reason || !form.why || !marriageId) {
      setError('All fields are required.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`http://localhost:5000/api/marriages/${marriageId}/objection`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          objectorName: form.objectorName,
          reason: form.reason,
          objectorContact: form.why,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to submit objection.');
      } else {
        setSuccess('Objection submitted successfully!');
        setForm({ objectorName: '', reason: '', why: '' });
        // Redirect to viewobjection after a short delay
        setTimeout(() => {
          router.push('/viewobjection');
        }, 1200);
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
    setSubmitting(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 text-gray-800">
      <Navbar />
      <section className="max-w-md mx-auto mt-16 p-8 bg-white rounded-2xl shadow-lg">
        <h1 className="text-3xl font-extrabold mb-8 text-blue-700 text-center">Raise Objection</h1>
        {marriages.length === 0 ? (
          <div className="text-center text-red-600 font-semibold">
            No pending marriages available for objection.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <div className="bg-red-100 text-red-700 px-4 py-2 rounded">{error}</div>}
            {success && <div className="bg-green-100 text-green-700 px-4 py-2 rounded">{success}</div>}
            <div>
              <label htmlFor="marriageId" className="block font-semibold mb-1 text-blue-700">Select Marriage</label>
              <select
                id="marriageId"
                name="marriageId"
                value={marriageId}
                onChange={handleMarriageChange}
                required
                className="w-full border border-gray-300 px-3 py-2 rounded bg-white focus:ring-2 focus:ring-blue-200"
              >
                {marriages.map(m => (
                  <option key={m._id} value={m._id}>
                    {m.husbandName} & {m.wifeName} ({m.marriageDate})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="objectorName" className="block font-semibold mb-1 text-blue-700">Your Name</label>
              <input
                type="text"
                id="objectorName"
                name="objectorName"
                value={form.objectorName}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div>
              <label htmlFor="reason" className="block font-semibold mb-1 text-blue-700">Reason for Objection</label>
              <input
                type="text"
                id="reason"
                name="reason"
                value={form.reason}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-blue-200"
                placeholder="E.g. Not eligible, already married, etc."
              />
            </div>
            <div>
              <label htmlFor="why" className="block font-semibold mb-1 text-blue-700">Why?</label>
              <textarea
                id="why"
                name="why"
                value={form.why}
                onChange={handleChange}
                required
                rows={4}
                className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-blue-200"
                placeholder="Explain your objection in detail"
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold text-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              {submitting ? 'Submitting...' : 'Submit Objection'}
            </button>
          </form>
        )}
      </section>
    </main>
  );
}