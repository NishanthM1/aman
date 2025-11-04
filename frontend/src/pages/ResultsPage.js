import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStudents } from '../data/demoData';

const ResultsPage = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSemester, setFilterSemester] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setStudents(getStudents());
  }, []);

  const semesters = [...new Set(students.map(student => student.semester))].sort((a, b) => a - b);

  const filteredResults = students.filter(student => {
    const matchesSearchTerm = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              student.usn.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSemester = filterSemester === '' || student.semester === parseInt(filterSemester);
    return matchesSearchTerm && matchesSemester;
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">All Results</h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search by student name or USN..."
            className="p-2 border border-gray-300 rounded-md w-full md:w-1/3 mb-4 md:mb-0"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="p-2 border border-gray-300 rounded-md w-full md:w-1/4"
            value={filterSemester}
            onChange={(e) => setFilterSemester(e.target.value)}
          >
            <option value="">All Semesters</option>
            {semesters.map(sem => (
              <option key={sem} value={sem}>{`Semester ${sem}`}</option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left">USN</th>
                <th className="py-2 px-4 border-b text-left">Name</th>
                <th className="py-2 px-4 border-b text-left">Department</th>
                <th className="py-2 px-4 border-b text-left">Semester</th>
                <th className="py-2 px-4 border-b text-left">GPA</th>
                <th className="py-2 px-4 border-b text-left">Status</th>
                <th className="py-2 px-4 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredResults.map(student => (
                <tr key={student.usn} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{student.usn}</td>
                  <td className="py-2 px-4 border-b">{student.name}</td>
                  <td className="py-2 px-4 border-b">{student.department}</td>
                  <td className="py-2 px-4 border-b">{student.semester}</td>
                  <td className="py-2 px-4 border-b">
                    <span className={`font-semibold ${student.gpa >= 5 ? 'text-green-600' : 'text-red-600'}`}>
                      {student.gpa}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${student.gpa >= 5 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {student.gpa >= 5 ? 'Pass' : 'Fail'}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => navigate(`/results/${student.usn}`)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm"
                    >
                      View Result
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
