/*'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';

export default function Login() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!form.email || !form.password) {
      setError('Both fields are required.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Login failed.');
      } else {
        setSuccess('Login successful!');
        // Optionally: save token, redirect, etc.
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 text-gray-800">
      <Navbar />
      <section className="max-w-md mx-auto mt-16 p-8 bg-white rounded-2xl shadow-lg">
        <h1 className="text-3xl font-extrabold mb-8 text-blue-700 text-center">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <div className="bg-red-100 text-red-700 px-4 py-2 rounded">{error}</div>}
          {success && <div className="bg-green-100 text-green-700 px-4 py-2 rounded">{success}</div>}
          <div>
            <label htmlFor="email" className="block font-semibold mb-1 text-blue-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-blue-200"
            />
          </div>
          <div>
            <label htmlFor="password" className="block font-semibold mb-1 text-blue-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-blue-200"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold text-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </section>
    </main>
  );
}
*/
