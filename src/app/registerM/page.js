'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';

export default function RegisterNoPayment() {
  const [formData, setFormData] = useState({
    husbandName: '',
    husbandIdCard: null,
    wifeName: '',
    wifeIdCard: null,
    marriageDate: '',
    location: '',
    couplePhoto: null,
    councilType: 'residence',
    councilName: '',
    witnesses: [
      { name: '', idCard: null },
      { name: '', idCard: null },
    ],
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files[0],
    }));
  };

  const handleWitnessChange = (index, e) => {
    const { name, value, files } = e.target;
    setFormData(prev => {
      const newWitnesses = [...prev.witnesses];
      if (name === 'idCard') {
        newWitnesses[index][name] = files[0];
      } else {
        newWitnesses[index][name] = value;
      }
      return { ...prev, witnesses: newWitnesses };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('husbandName', formData.husbandName);
    data.append('wifeName', formData.wifeName);
    data.append('marriageDate', formData.marriageDate);
    data.append('location', formData.location);
    data.append('councilType', formData.councilType.toLowerCase());
    data.append('councilName', formData.councilName);

    if (formData.husbandIdCard) data.append('husbandIdCard', formData.husbandIdCard);
    if (formData.wifeIdCard) data.append('wifeIdCard', formData.wifeIdCard);
    if (formData.couplePhoto) data.append('couplePhoto', formData.couplePhoto);

    const witnessNames = formData.witnesses.map(w => ({ name: w.name }));
    data.append('witnesses', JSON.stringify(witnessNames));
    formData.witnesses.forEach((witness) => {
      if (witness.idCard) data.append('witnessIdCards', witness.idCard);
    });

    try {
      const res = await fetch('http://localhost:5000/api/marriages/register', {
        method: 'POST',
        body: data,
      });

      if (!res.ok) {
        const errData = await res.json();
        alert('Error: ' + (errData.error || 'Failed to register marriage'));
        return;
      }

      const result = await res.json();
      alert('Marriage registered successfully!');
      // Optionally reset form here
    } catch (error) {
      alert('Network error: ' + error.message);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 text-gray-800">
      <Navbar />
      <section className="max-w-3xl mx-auto mt-12 p-8 bg-white rounded-2xl shadow-lg">
        <h1 className="text-3xl font-extrabold mb-8 text-blue-700 text-center">Register Customary Marriage (No Payment)</h1>
        <form onSubmit={handleSubmit} className="space-y-7" encType="multipart/form-data">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="husbandName" className="block font-semibold mb-1 text-blue-700">Husband's Full Name</label>
              <input
                type="text"
                id="husbandName"
                name="husbandName"
                value={formData.husbandName}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div>
              <label htmlFor="husbandIdCard" className="block font-semibold mb-1 text-blue-700">Husband's ID Card</label>
              <input
                type="file"
                id="husbandIdCard"
                name="husbandIdCard"
                onChange={handleFileChange}
                accept="image/*,application/pdf"
                required
                className="w-full border border-gray-300 px-3 py-2 rounded bg-white"
              />
            </div>
            <div>
              <label htmlFor="wifeName" className="block font-semibold mb-1 text-blue-700">Wife's Full Name</label>
              <input
                type="text"
                id="wifeName"
                name="wifeName"
                value={formData.wifeName}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div>
              <label htmlFor="wifeIdCard" className="block font-semibold mb-1 text-blue-700">Wife's ID Card</label>
              <input
                type="file"
                id="wifeIdCard"
                name="wifeIdCard"
                onChange={handleFileChange}
                accept="image/*,application/pdf"
                required
                className="w-full border border-gray-300 px-3 py-2 rounded bg-white"
              />
            </div>
            <div>
              <label htmlFor="marriageDate" className="block font-semibold mb-1 text-blue-700">Date of Marriage</label>
              <input
                type="date"
                id="marriageDate"
                name="marriageDate"
                value={formData.marriageDate}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div>
              <label htmlFor="location" className="block font-semibold mb-1 text-blue-700">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div>
              <label htmlFor="councilType" className="block font-semibold mb-1 text-blue-700">Council Type</label>
              <select
                id="councilType"
                name="councilType"
                value={formData.councilType}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 rounded bg-white focus:ring-2 focus:ring-blue-200"
              >
                <option value="residence">Residence</option>
                <option value="birth">Birth</option>
              </select>
            </div>
            <div>
              <label htmlFor="councilName" className="block font-semibold mb-1 text-blue-700">Council Name</label>
              <input
                type="text"
                id="councilName"
                name="councilName"
                value={formData.councilName}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-blue-200"
                placeholder="Enter council name"
              />
            </div>
            <div>
              <label htmlFor="couplePhoto" className="block font-semibold mb-1 text-blue-700">Couple Photo</label>
              <input
                type="file"
                id="couplePhoto"
                name="couplePhoto"
                onChange={handleFileChange}
                accept="image/*"
                required
                className="w-full border border-gray-300 px-3 py-2 rounded bg-white"
              />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4 text-blue-600">Witnesses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {formData.witnesses.map((witness, index) => (
                <div key={index} className="mb-4 border border-blue-200 bg-blue-50 p-4 rounded-xl shadow-sm">
                  <label className="block font-medium mb-1 text-blue-700" htmlFor={`witnessName${index}`}>
                    Witness {index + 1} Name
                  </label>
                  <input
                    type="text"
                    id={`witnessName${index}`}
                    name="name"
                    value={witness.name}
                    onChange={(e) => handleWitnessChange(index, e)}
                    required
                    className="w-full border border-gray-300 px-3 py-2 rounded mb-3 focus:ring-2 focus:ring-blue-200"
                  />
                  <label className="block font-medium mb-1 text-blue-700" htmlFor={`witnessIdCard${index}`}>
                    Witness {index + 1} ID Card
                  </label>
                  <input
                    type="file"
                    id={`witnessIdCard${index}`}
                    name="idCard"
                    onChange={(e) => handleWitnessChange(index, e)}
                    accept="image/*,application/pdf"
                    required
                    className="w-full border border-gray-300 px-3 py-2 rounded bg-white"
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold text-lg hover:bg-blue-700 transition"
          >
            Submit Registration
          </button>
        </form>
      </section>
    </main>
  );
}