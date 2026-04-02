import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddStudent = ({ onAdd, onUpdate, editingStudent, setEditingStudent, fetchStudents }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState('');

  useEffect(() => {
    if (editingStudent) {
      setName(editingStudent.name);
      setEmail(editingStudent.email);
      setCourse(editingStudent.course);
    } else {
      setName('');
      setEmail('');
      setCourse('');
    }
  }, [editingStudent]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const student = { name, email, course };
    try {
      if (editingStudent) {
        await axios.put(`http://localhost:8080/students/${editingStudent.id}`, student);
      } else {
        await axios.post('http://localhost:8080/students', student);
      }
      fetchStudents();
      setEditingStudent(null);
      setName('');
      setEmail('');
      setCourse('');
    } catch (error) {
      console.error('Error saving student:', error);
    }
  };

  return (
    <div>
      <h2>{editingStudent ? 'Update Student' : 'Add Student'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Course:</label>
          <input type="text" value={course} onChange={(e) => setCourse(e.target.value)} required />
        </div>
        <button type="submit">{editingStudent ? 'Update' : 'Add'}</button>
        {editingStudent && <button type="button" onClick={() => setEditingStudent(null)}>Cancel</button>}
      </form>
    </div>
  );
};

export default AddStudent;