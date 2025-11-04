let students = [
  {
    usn: "1DS23CS045",
    name: "Aditi Sharma",
    email: "aditi@gmail.com",
    department: "CSE",
    semester: 3,
    results: [
      { subject: "DBMS", marks: 85 },
      { subject: "DSA", marks: 78 },
      { subject: "Maths", marks: 92 },
    ],
    gpa: 8.5,
  },
  {
    usn: "1DS23EC012",
    name: "Rahul Mehta",
    email: "rahul@gmail.com",
    department: "ECE",
    semester: 3,
    results: [
      { subject: "Digital Circuits", marks: 88 },
      { subject: "Signals", marks: 80 },
    ],
    gpa: 8.2,
  },
  {
    usn: "1DS23ME001",
    name: "Priya Singh",
    email: "priya@gmail.com",
    department: "MECH",
    semester: 1,
    results: [
      { subject: "Physics", marks: 75 },
      { subject: "Chemistry", marks: 68 },
    ],
    gpa: 7.1,
  },
  {
    usn: "1DS23CS002",
    name: "Amit Kumar",
    email: "amit@gmail.com",
    department: "CSE",
    semester: 3,
    results: [
      { subject: "DBMS", marks: 70 },
      { subject: "DSA", marks: 85 },
      { subject: "Maths", marks: 78 },
    ],
    gpa: 7.7,
  },
];

let semesters = [
  { id: 1, name: "Semester 1", subjects: [{ code: "PH101", name: "Physics" }, { code: "CH101", name: "Chemistry" }] },
  { id: 2, name: "Semester 2", subjects: [{ code: "MA201", name: "Maths II" }, { code: "EE201", name: "Basic Electrical" }] },
  { id: 3, name: "Semester 3", subjects: [{ code: "CS301", name: "DBMS" }, { code: "CS302", name: "DSA" }, { code: "MA301", name: "Maths" }] },
];

// Load data from localStorage if available
const loadData = () => {
  const storedStudents = localStorage.getItem('students');
  const storedSemesters = localStorage.getItem('semesters');
  if (storedStudents) {
    students = JSON.parse(storedStudents);
  }
  if (storedSemesters) {
    semesters = JSON.parse(storedSemesters);
  }
};

// Save data to localStorage
const saveData = () => {
  localStorage.setItem('students', JSON.stringify(students));
  localStorage.setItem('semesters', JSON.stringify(semesters));
};

// Initial load
loadData();

export const getStudents = () => students;

export const getSemesters = () => semesters;

export const findResult = ({ email, semester, usn }) => {
  return students.find(
    (student) =>
      student.email === email &&
      student.semester === semester &&
      student.usn.toLowerCase() === usn.toLowerCase()
  );
};

export const addStudentResult = (newStudent) => {
  students.push(newStudent);
  saveData();
};

export const getStudentByUsn = (usn) => {
  return students.find(student => student.usn.toLowerCase() === usn.toLowerCase());
};

export const updateStudentResult = (updatedStudent) => {
  students = students.map(student =>
    student.usn.toLowerCase() === updatedStudent.usn.toLowerCase() ? updatedStudent : student
  );
  saveData();
};

export const addSemester = (newSemester) => {
  semesters.push(newSemester);
  saveData();
};

export const getSemesterById = (id) => {
  return semesters.find(sem => sem.id === id);
};
