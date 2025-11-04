import React, { useState } from 'react';

const DashboardFilters = ({ onFilterChange, semesters }) => {
  const [selectedSemester, setSelectedSemester] = useState('');

  const handleApplyFilter = () => {
    onFilterChange(parseInt(selectedSemester));
  };

  return (
    <div className="card mb-6">
      <h3 className="text-xl font-semibold mb-3">Filter Dashboard</h3>
      <div className="flex items-center space-x-4">
        <div>
          <label htmlFor="semester-filter" className="block text-sm font-medium text-gray-700">Select Semester</label>
          <select
            id="semester-filter"
            className="form-input"
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
          >
            <option value="">All Semesters</option>
            {semesters.map((sem) => (
              <option key={sem.id} value={sem.id}>{sem.name}</option>
            ))}
          </select>
        </div>
        <button
          onClick={handleApplyFilter}
          className="mt-5 inline-flex items-center btn btn-primary"
        >
          Apply Filter
        </button>
      </div>
    </div>
  );
};

export default DashboardFilters;
