import React, { useState } from 'react';
import axios from 'axios';
import StudentList from './components/StudentList';
import AddStudent from './components/AddStudent';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:8080/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
  };

  return (
    <div className="App">
      <h1>Student Management</h1>
      <AddStudent
        editingStudent={editingStudent}
        setEditingStudent={setEditingStudent}
        fetchStudents={fetchStudents}
      />
      <StudentList
        students={students}
        onEdit={handleEdit}
        fetchStudents={fetchStudents}
      />
    </div>
  );
}

export default App;
