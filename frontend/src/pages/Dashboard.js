import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardFilters from '../components/DashboardFilters';
import ChartSection from '../components/ChartSection';
import { getStudents, getSemesters } from '../data/demoData';

const Dashboard = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [filteredSemester, setFilteredSemester] = useState(null);

  useEffect(() => {
    setStudents(getStudents());
    setSemesters(getSemesters());
  }, []);

  const handleFilterChange = (semesterId) => {
    setFilteredSemester(semesterId);
  };

  const getFilteredStudents = () => {
    if (!filteredSemester) {
      return students;
    }
    return students.filter(student => student.semester === filteredSemester);
  };

  const calculateOverview = () => {
    const currentStudents = getFilteredStudents();
    const totalStudents = currentStudents.length;
    const totalGpa = currentStudents.reduce((sum, student) => sum + student.gpa, 0);
    const averageGpa = totalStudents > 0 ? (totalGpa / totalStudents).toFixed(2) : 0;
    const passCount = currentStudents.filter(student => student.gpa >= 5).length; // Assuming 5.0 is passing GPA
    const passPercentage = totalStudents > 0 ? ((passCount / totalStudents) * 100).toFixed(2) : 0;

    return { totalStudents, averageGpa, passPercentage };
  };

  const { totalStudents, averageGpa, passPercentage } = calculateOverview();

  return (
    <div className="container mx-auto p-4">
      <div className="card">
        <h1 className="text-3xl font-bold mb-6 text-center">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="dashboard-overview-card">
            <h3>Total Students</h3>
            <p>{totalStudents}</p>
          </div>
          <div className="dashboard-overview-card">
            <h3>Average GPA</h3>
            <p>{averageGpa}</p>
          </div>
          <div className="dashboard-overview-card">
            <h3>Pass Percentage</h3>
            <p>{passPercentage}%</p>
          </div>
        </div>

        <ChartSection students={students} semesters={semesters} />
      </div>

      <div className="card mt-6">
        <DashboardFilters onFilterChange={handleFilterChange} semesters={semesters} />
        <div className="table-container">
          <h2 className="text-2xl font-bold mb-4">Student Results</h2>
          <table className="table">
            <thead>
              <tr>
                <th>USN</th>
                <th>Name</th>
                <th>Department</th>
                <th>GPA</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {getFilteredStudents().map((student) => (
                <tr key={student.usn}>
                  <td>{student.usn}</td>
                  <td>{student.name}</td>
                  <td>{student.department}</td>
                  <td>{student.gpa}</td>
                  <td>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${student.gpa >= 5 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {student.gpa >= 5 ? 'Pass' : 'Fail'}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => navigate(`/add-result?usn=${student.usn}`)}
                      className="btn btn-primary"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-end space-x-4 mt-6">
        <button
          onClick={() => navigate('/add-result')}
          className="btn btn-success"
        >
          Add Result
        </button>
        <button
          onClick={() => navigate('/add-semester')}
          className="btn btn-primary"
        >
          Add Semester
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
