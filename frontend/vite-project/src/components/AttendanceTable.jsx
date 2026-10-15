import { useEffect, useState } from "react";
import { Download } from "lucide-react";

const API_URL = "http://localhost:5000/api";

function AttendanceTable() {
const [students, setStudents] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

useEffect(() => {
const fetchAttendance = async () => {
try {
setLoading(true);
setError("");


    const [studentsResponse, attendanceResponse] = await Promise.all([
      fetch(`${API_URL}/students`),
      fetch(`${API_URL}/attendance`),
    ]);

    if (!studentsResponse.ok || !attendanceResponse.ok) {
      throw new Error("Backend se data fetch nahi ho paya.");
    }

    const studentsResult = await studentsResponse.json();
    const attendanceResult = await attendanceResponse.json();

    const allStudents = Array.isArray(studentsResult.data)
      ? studentsResult.data
      : [];

    const allAttendance = Array.isArray(attendanceResult.data)
      ? attendanceResult.data
      : [];

    const today = new Date().toISOString().slice(0, 10);

    const formattedStudents = allStudents.map((student, index) => {
      const studentId = student?._id ?? student?.id ?? `student-${index}`;

      const record = allAttendance.find((attendance) => {
        const attendanceStudentId =
          typeof attendance.student === "object"
            ? attendance.student?._id ?? attendance.student?.id
            : attendance.student;

        const attendanceDate = attendance.date
          ? String(attendance.date).slice(0, 10)
          : "";

        return (
          String(attendanceStudentId) === String(studentId) &&
          attendanceDate === today
        );
      });

      return {
        id: studentId,
        name:
          typeof student?.name === "string" && student.name.trim()
            ? student.name.trim()
            : "Unknown Student",
        rollNo: student?.rollNo ?? "--",
        classroom: student?.classroom ?? "--",
        time: record?.checkIn
          ? String(record.checkIn)
          : "--",
        status: record?.status || "Not Marked",
      };
    });

    setStudents(formattedStudents);
  } catch (err) {
    console.error("Attendance fetch error:", err);
    setError(
      "Attendance data load nahi hua. Backend server aur API check karo."
    );
  } finally {
    setLoading(false);
  }
};

fetchAttendance();


}, []);

const exportCSV = () => {
const headers = [
"Name",
"Roll Number",
"Classroom",
"Time",
"Status",
];


const rows = students.map((student) => [
  student.name,
  student.rollNo,
  student.classroom,
  student.time,
  student.status,
]);

const csvContent = [headers, ...rows]
  .map((row) =>
    row
      .map((value) => `"${String(value ?? "").replace(/"/g, '""')}"`)
      .join(",")
  )
  .join("\r\n");

const blob = new Blob(["\uFEFF" + csvContent], {
  type: "text/csv;charset=utf-8;",
});

const url = URL.createObjectURL(blob);
const link = document.createElement("a");

link.href = url;
link.download = "attendance-report.csv";

document.body.appendChild(link);
link.click();
link.remove();

URL.revokeObjectURL(url);


};

return ( <section className="card" id="attendance"> <div className="card-header"> <div> <h2>Student Attendance</h2> <p>Today's attendance records</p> </div>


    <button
      type="button"
      className="primary-button"
      onClick={exportCSV}
      disabled={loading || students.length === 0}
    >
      <Download size={16} />
      Export CSV
    </button>
  </div>

  <div className="table-wrapper">
    {loading ? (
      <p>Loading attendance...</p>
    ) : error ? (
      <p role="alert">{error}</p>
    ) : students.length === 0 ? (
      <p>No students found.</p>
    ) : (
      <table className="attendance-table">
        <thead>
          <tr>
            <th>Student</th>
            <th>Roll Number</th>
            <th>Classroom</th>
            <th>Check-in</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => {
            const initials = student.name
              .split(/\s+/)
              .filter(Boolean)
              .map((word) => word[0])
              .join("")
              .toUpperCase();

            return (
              <tr key={student.id}>
                <td>
                  <div className="student-info">
                    <div className="student-avatar">
                      {initials}
                    </div>

                    <div>
                      <h4>{student.name}</h4>
                      <p>Student</p>
                    </div>
                  </div>
                </td>

                <td>{student.rollNo}</td>
                <td>{student.classroom}</td>
                <td>{student.time}</td>

                <td>
                  <span
                    className={`status-badge ${student.status
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                  >
                    {student.status}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    )}
  </div>
</section>


);
}

export default AttendanceTable;
