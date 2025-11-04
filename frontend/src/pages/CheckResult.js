import React, { useState } from 'react';
import ResultForm from '../components/ResultForm';
import ResultCard from '../components/ResultCard';
import { findResult } from '../data/demoData';

const CheckResult = () => {
  const [studentResult, setStudentResult] = useState(null);
  const [message, setMessage] = useState('');

  const handleSearch = ({ email, semester, usn }) => {
    const foundStudent = findResult({ email, semester, usn });
    if (foundStudent) {
      setStudentResult(foundStudent);
      setMessage('');
    } else {
      setStudentResult(null);
      setMessage('No record found for the provided details.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <ResultForm onSearch={handleSearch} />
      {message && <p className="text-center text-red-500 mt-4">{message}</p>}
      {studentResult && <ResultCard student={studentResult} />}
    </div>
  );
};

export default CheckResult;
