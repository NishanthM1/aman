import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getStudentByUsn } from '../data/demoData';

const ViewResultPage = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const foundStudent = getStudentByUsn(studentId);
    if (foundStudent) {
      setStudent(foundStudent);
    } else {
      // Handle case where student is not found, e.g., redirect to results page
      navigate('/results');
    }
  }, [studentId, navigate]);

  if (!student) {
    return <div className="text-center text-gray-600">Loading student data...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Student Result Details</h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-lg"><span className="font-semibold">Name:</span> {student.name}</p>
            <p className="text-lg"><span className="font-semibold">USN:</span> {student.usn}</p>
            <p className="text-lg"><span className="font-semibold">Department:</span> {student.department}</p>
          </div>
          <div>
            <p className="text-lg"><span className="font-semibold">Semester:</span> {student.semester}</p>
            <p className="text-lg"><span className="font-semibold">Email:</span> {student.email}</p>
            <p className="text-lg"><span className="font-semibold">Overall GPA:</span>
              <span className={`ml-2 font-bold ${student.gpa >= 5 ? 'text-green-600' : 'text-red-600'}`}>
                {student.gpa}
              </span>
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-4">Subject-wise Marks</h2>
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left">Subject</th>
                <th className="py-2 px-4 border-b text-left">Marks</th>
              </tr>
            </thead>
            <tbody>
              {student.results.map((res, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{res.subject}</td>
                  <td className="py-2 px-4 border-b">{res.marks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => navigate('/results')}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Back to Results
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewResultPage;
