import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ChartSection from '../components/ChartSection';
import QuickNavigationCard from '../components/QuickNavigationCard';
import { getStudents } from '../data/demoData';

const Dashboard = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [filteredSemester, setFilteredSemester] = useState(null);

  useEffect(() => {
    setStudents(getStudents());
  }, []);

  const calculateOverview = () => {
    const totalStudents = students.length;
    const totalGpa = students.reduce((sum, student) => sum + student.gpa, 0);
    const averageGpa = totalStudents > 0 ? (totalGpa / totalStudents).toFixed(2) : 0;
    const passCount = students.filter(student => student.gpa >= 5).length; // Assuming 5.0 is passing GPA
    const passPercentage = totalStudents > 0 ? ((passCount / totalStudents) * 100).toFixed(2) : 0;

    return { totalStudents, averageGpa, passPercentage };
  };

  const { totalStudents, averageGpa, passPercentage } = calculateOverview();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Total Students</h3>
          <p className="text-3xl font-bold text-blue-600">{totalStudents}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Average GPA</h3>
          <p className="text-3xl font-bold text-green-600">{averageGpa}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Pass Percentage</h3>
          <p className="text-3xl font-bold text-purple-600">{passPercentage}%</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <ChartSection students={students} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <QuickNavigationCard title="Manage Students" description="View and manage student information" link="/students" />
        <QuickNavigationCard title="View Results" description="Browse and analyze student results" link="/results" />
        <QuickNavigationCard title="Add Marks" description="Add or update student marks" link="/add-result" />
      </div>
    </div>
  );
};

export default Dashboard;
