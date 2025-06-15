'use client';

import Navbar from '../components/Navbar';

export default function About() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 text-gray-800">
      <Navbar />
      <section className="max-w-2xl mx-auto mt-16 p-8 bg-white rounded-2xl shadow-lg">
        <h1 className="text-3xl font-extrabold mb-4 text-blue-700 text-center">About LegalBond</h1>
        <p className="mb-4 text-lg text-gray-700 text-center">
          LegalBond is a platform designed to simplify the registration and management of customary and civil marriages in Cameroon.
        </p>
        <ul className="list-disc pl-6 mb-4 text-gray-700">
          <li>Register customary marriages and transcribe them to civil status.</li>
          <li>Raise and view objections to marriage registrations.</li>
          <li>Promote transparency and legal compliance in marriage processes.</li>
        </ul>
        <p className="text-gray-600 text-center">
          This project is inspired by Cameroon’s Law No 2024/016, which allows direct transcription of customary marriages to civil status, ensuring every marriage is legally recognized and protected.
        </p>
      </section>
    </main>
  );
}