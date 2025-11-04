import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSemesters, addStudentResult, getStudentByUsn, updateStudentResult } from '../data/demoData';

const AddResult = () => {
  const navigate = useNavigate();
  const [semesters, setSemesters] = useState([]);
  const [studentName, setStudentName] = useState('');
  const [email, setEmail] = useState('');
  const [usn, setUsn] = useState('');
  const [department, setDepartment] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [subjects, setSubjects] = useState([{ subject: '', marks: '' }]);
  const [gpa, setGpa] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setSemesters(getSemesters());
    // Check if we are editing an existing result
    const params = new URLSearchParams(window.location.search);
    const editUsn = params.get('usn');
    if (editUsn) {
      const studentToEdit = getStudentByUsn(editUsn);
      if (studentToEdit) {
        setStudentName(studentToEdit.name);
        setEmail(studentToEdit.email);
        setUsn(studentToEdit.usn);
        setDepartment(studentToEdit.department);
        setSelectedSemester(studentToEdit.semester.toString());
        setSubjects(studentToEdit.results);
        setGpa(studentToEdit.gpa);
        setIsEditing(true);
      }
    }
  }, []);

  useEffect(() => {
    calculateGpa();
  }, [subjects]);

  const handleSubjectChange = (index, field, value) => {
    const newSubjects = [...subjects];
    newSubjects[index][field] = value;
    setSubjects(newSubjects);
  };

  const addSubjectField = () => {
    setSubjects([...subjects, { subject: '', marks: '' }]);
  };

  const removeSubjectField = (index) => {
    const newSubjects = subjects.filter((_, i) => i !== index);
    setSubjects(newSubjects);
  };

  const calculateGpa = () => {
    const totalMarks = subjects.reduce((sum, sub) => sum + (parseInt(sub.marks) || 0), 0);
    const averageMarks = subjects.length > 0 ? totalMarks / subjects.length : 0;
    setGpa(parseFloat((averageMarks / 10).toFixed(2))); // Assuming GPA is marks/10
  };

  const formatUsn = (value) => {
    // Example format: 1DS23CS045
    const cleaned = value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    let formatted = '';
    if (cleaned.length > 0) {
      formatted += cleaned.substring(0, 3);
    }
    if (cleaned.length > 3) {
      formatted += cleaned.substring(3, 5);
    }
    if (cleaned.length > 5) {
      formatted += cleaned.substring(5, 7);
    }
    if (cleaned.length > 7) {
      formatted += cleaned.substring(7, 10);
    }
    return formatted;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newStudent = {
      usn: usn,
      name: studentName,
      email: email,
      department: department,
      semester: parseInt(selectedSemester),
      results: subjects.map(s => ({ subject: s.subject, marks: parseInt(s.marks) })),
      gpa: gpa,
    };

    if (isEditing) {
      updateStudentResult(newStudent);
    } else {
      addStudentResult(newStudent);
    }
    navigate('/dashboard');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">{isEditing ? 'Edit Student Result' : 'Add New Student Result'}</h1>
      <form onSubmit={handleSubmit} className="card max-w-2xl mx-auto space-y-4">
        <div>
          <label htmlFor="studentName" className="block text-sm font-medium text-gray-700">Student Name</label>
          <input
            type="text"
            id="studentName"
            className="form-input"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            required
          />
        </div>
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
          <label htmlFor="usn" className="block text-sm font-medium text-gray-700">USN</label>
          <input
            type="text"
            id="usn"
            className="form-input"
            value={usn}
            onChange={(e) => setUsn(formatUsn(e.target.value))}
            required
            disabled={isEditing}
          />
        </div>
        <div>
          <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department</label>
          <input
            type="text"
            id="department"
            className="form-input"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="semester" className="block text-sm font-medium text-gray-700">Semester</label>
          <select
            id="semester"
            className="form-input"
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            required
          >
            <option value="">Select Semester</option>
            {semesters.map((sem) => (
              <option key={sem.id} value={sem.id}>{sem.name}</option>
            ))}
          </select>
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-3">Subjects and Marks</h3>
        {subjects.map((sub, index) => (
          <div key={index} className="flex space-x-4 mb-2">
            <input
              type="text"
              placeholder="Subject Name"
              className="form-input flex-1"
              value={sub.subject}
              onChange={(e) => handleSubjectChange(index, 'subject', e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Marks"
              className="form-input w-24"
              value={sub.marks}
              onChange={(e) => handleSubjectChange(index, 'marks', e.target.value)}
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

        <div className="text-right text-lg font-bold mt-4">
          Calculated GPA: {gpa}
        </div>

        <button
          type="submit"
          className="w-full flex justify-center btn btn-primary"
        >
          {isEditing ? 'Update Result' : 'Save Result'}
        </button>
      </form>
    </div>
  );
};

export default AddResult;
