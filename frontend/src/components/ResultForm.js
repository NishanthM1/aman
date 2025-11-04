import React, { useState } from 'react';

const ResultForm = ({ onSearch }) => {
  const [email, setEmail] = useState('');
  const [semester, setSemester] = useState('');
  const [usn, setUsn] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ email, semester: parseInt(semester), usn });
  };

  return (
    <div className="card max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Check Your Result</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="semester" className="block text-sm font-medium text-gray-700">Semester</label>
          <select
            id="semester"
            className="form-input"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            required
          >
            <option value="">Select Semester</option>
            <option value="1">Semester 1</option>
            <option value="2">Semester 2</option>
            <option value="3">Semester 3</option>
            <option value="4">Semester 4</option>
            <option value="5">Semester 5</option>
            <option value="6">Semester 6</option>
            <option value="7">Semester 7</option>
            <option value="8">Semester 8</option>
          </select>
        </div>
        <div>
          <label htmlFor="usn" className="block text-sm font-medium text-gray-700">USN</label>
          <input
            type="text"
            id="usn"
            className="form-input"
            value={usn}
            onChange={(e) => setUsn(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full flex justify-center btn btn-primary"
        >
          View Result
        </button>
      </form>
    </div>
  );
};

export default ResultForm;
