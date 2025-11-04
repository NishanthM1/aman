import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartSection = ({ students, semesters }) => {
  const getChartData = () => {
    const semesterGpa = {};
    const semesterCount = {};

    students.forEach(student => {
      if (semesterGpa[student.semester]) {
        semesterGpa[student.semester] += student.gpa;
        semesterCount[student.semester] += 1;
      } else {
        semesterGpa[student.semester] = student.gpa;
        semesterCount[student.semester] = 1;
      }
    });

    const labels = semesters.map(sem => sem.name);
    const data = semesters.map(sem => {
      const semesterId = sem.id;
      if (semesterGpa[semesterId]) {
        return (semesterGpa[semesterId] / semesterCount[semesterId]).toFixed(2);
      }
      return 0;
    });

    return {
      labels,
      datasets: [
        {
          label: 'Average GPA per Semester',
          data,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Average GPA Analysis',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 10,
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-4">Semester Performance</h2>
      <Bar data={getChartData()} options={options} />
    </div>
  );
};

export default ChartSection;
