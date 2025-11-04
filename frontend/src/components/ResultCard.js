import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const ResultCard = ({ student }) => {
  const resultCardRef = useRef();

  if (!student) {
    return <div className="p-4 bg-white rounded-lg shadow-md text-center">No result found.</div>;
  }

  const handleDownloadPdf = () => {
    html2canvas(resultCardRef.current).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      pdf.save(`${student.usn}_result.pdf`);
    });
  };

  return (
    <div ref={resultCardRef} className="card max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Student Result</h2>
      <div className="mb-4">
        <p><strong>Name:</strong> {student.name}</p>
        <p><strong>USN:</strong> {student.usn}</p>
        <p><strong>Department:</strong> {student.department}</p>
        <p><strong>Semester:</strong> {student.semester}</p>
      </div>

      <h3 className="text-xl font-semibold mb-2">Subject-wise Marks</h3>
      <table className="table">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left">Subject</th>
            <th className="py-2 px-4 border-b text-left">Marks</th>
          </tr>
        </thead>
        <tbody>
          {student.results.map((res, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b">{res.subject}</td>
              <td className="py-2 px-4 border-b">{res.marks}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="text-lg font-bold mt-4 text-right">GPA: {student.gpa}</p>
      <div className="mt-6 text-center">
        <button
          onClick={handleDownloadPdf}
          className="btn btn-primary"
        >
          Download as PDF
        </button>
      </div>
    </div>
  );
};

export default ResultCard;
