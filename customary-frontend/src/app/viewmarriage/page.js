'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';

export default function ViewMarriage() {
  const [marriages, setMarriages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState({});
  const [likedMarriages, setLikedMarriages] = useState({});

  // Helper to check if 30 days have passed since marriageDate
  const isObjected = (marriage) => {
    if (!marriage.marriageDate) return false;
    const marriageDate = new Date(marriage.marriageDate);
    const now = new Date();
    const diffDays = Math.floor((now - marriageDate) / (1000 * 60 * 60 * 24));
    return marriage.objections && marriage.objections.length > 0 && diffDays >= 30;
  };

  useEffect(() => {
    fetch('http://localhost:5000/api/marriages')
      .then(res => res.json())
      .then(data => {
        const arr = Array.isArray(data) ? data : data.data || [];
        setMarriages(arr);
        // Initialize likes for each marriage from backend
        const initialLikes = {};
        arr.forEach(m => {
          initialLikes[m._id] = m.likes || 0;
        });
        setLikes(initialLikes);

        // Load liked marriages from localStorage
        setLikedMarriages(JSON.parse(localStorage.getItem('likedMarriages') || '{}'));

        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleLike = async (id) => {
    const liked = JSON.parse(localStorage.getItem('likedMarriages') || '{}');
    if (liked[id]) {
      alert('You have already liked this marriage.');
      return;
    }
    try {
      const res = await fetch(`http://localhost:5000/api/marriages/${id}/like`, {
        method: 'POST',
      });
      const data = await res.json();
      if (res.ok && typeof data.likes === 'number') {
        setLikes(prev => ({
          ...prev,
          [id]: data.likes
        }));
        liked[id] = true;
        localStorage.setItem('likedMarriages', JSON.stringify(liked));
        setLikedMarriages(liked);
      } else {
        alert(data.error || 'Failed to like. Please try again.');
      }
    } catch (error) {
      alert('Failed to like. Please try again.');
    }
  };

  // Helper to get status
  const getStatus = (marriage) => {
    if (isObjected(marriage)) return 'objected';
    if (marriage.status === 'approved') return 'approved';
    return 'pending';
  };

  // Helper to get status color
  const getStatusClass = (status) => {
    if (status === 'pending') return 'text-yellow-600 font-bold';
    if (status === 'approved') return 'text-green-600 font-bold';
    if (status === 'objected') return 'text-red-600 font-bold';
    return 'text-gray-600 font-bold';
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      <Navbar />
      <section className="max-w-4xl mx-auto mt-12 p-8 bg-white rounded shadow">
        <h1 className="text-3xl font-bold mb-6 text-blue-600">Registered Marriages</h1>
        {loading ? (
          <p>Loading...</p>
        ) : marriages.length === 0 ? (
          <p>No marriages found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {marriages.map((m, i) => {
              const status = getStatus(m);
              return (
                <div
                  key={m._id || i}
                  className="bg-gray-100 rounded-xl shadow p-6 flex flex-col justify-between"
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
                      <span className={getStatusClass(status)}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-4 mt-4">
                    <Link
                      href={`/objection?marriageId=${m._id}`}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition flex items-center space-x-2"
                    >
                      {/* Objection Icon (flag) */}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 fill-current" viewBox="0 0 20 20">
                        <path d="M3 3v14a1 1 0 102 0v-4h7.382a1 1 0 00.894-1.447l-1.447-2.894 1.447-2.894A1 1 0 0012.382 5H5V3a1 1 0 10-2 0z"/>
                      </svg>
                      Object
                    </Link>
                    <button
                      onClick={() => handleLike(m._id || i)}
                      disabled={!!likedMarriages[m._id || i]}
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition flex items-center space-x-2 disabled:opacity-50"
                    >
                      {/* Thumbs Up Icon */}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 fill-current" viewBox="0 0 20 20">
                        <path d="M2 10c0 1.1.9 2 2 2h3v5a1 1 0 001 1h6.28a2 2 0 001.98-1.73l1.2-7A2 2 0 0016.5 7H12V5a3 3 0 00-6 0v5H4a2 2 0 00-2 2z"/>
                      </svg>
                      <span>{likes[m._id || i] || 0}</span>
                      Like
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}