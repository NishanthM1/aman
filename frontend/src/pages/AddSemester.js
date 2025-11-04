import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addSemester } from '../data/demoData';

const AddSemester = () => {
  const navigate = useNavigate();
  const [semesterName, setSemesterName] = useState('');
  const [subjects, setSubjects] = useState([{ code: '', name: '' }]);

  const handleSubjectChange = (index, field, value) => {
    const newSubjects = [...subjects];
    newSubjects[index][field] = value;
    setSubjects(newSubjects);
  };

  const addSubjectField = () => {
    setSubjects([...subjects, { code: '', name: '' }]);
  };

  const removeSubjectField = (index) => {
    const newSubjects = subjects.filter((_, i) => i !== index);
    setSubjects(newSubjects);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSemester = {
      id: Date.now(), // Simple unique ID
      name: semesterName,
      subjects: subjects,
    };
    addSemester(newSemester);
    navigate('/dashboard');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Add New Semester</h1>
      <form onSubmit={handleSubmit} className="card max-w-xl mx-auto space-y-4">
        <div>
          <label htmlFor="semesterName" className="block text-sm font-medium text-gray-700">Semester Name</label>
          <input
            type="text"
            id="semesterName"
            className="form-input"
            value={semesterName}
            onChange={(e) => setSemesterName(e.target.value)}
            placeholder="e.g., Semester 3"
            required
          />
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-3">Subjects for this Semester</h3>
        {subjects.map((sub, index) => (
          <div key={index} className="flex space-x-4 mb-2">
            <input
              type="text"
              placeholder="Subject Code (e.g., CS301)"
              className="form-input w-1/3"
              value={sub.code}
              onChange={(e) => handleSubjectChange(index, 'code', e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Subject Name (e.g., Data Structures)"
              className="form-input flex-1"
              value={sub.name}
              onChange={(e) => handleSubjectChange(index, 'name', e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => removeSubjectField(index)}
              className="btn btn-danger"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addSubjectField}
          className="btn btn-primary"
        >
          Add Subject
        </button>

        <button
          type="submit"
          className="w-full flex justify-center btn btn-primary"
        >
          Add Semester
        </button>
      </form>
    </div>
  );
};

export default AddSemester;
