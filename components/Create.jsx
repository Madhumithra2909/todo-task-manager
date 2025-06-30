import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function Create({ createdBy, onCreated }) {
  const [task, setTask] = useState('');
  const [category, setCategory] = useState('Personal');
  const [dueDate, setDueDate] = useState('');
  const [sharedWithEmail, setSharedWithEmail] = useState('');

  const handleSubmit = async () => {
    if (!task.trim()) return toast.error("Task is required");
    if (!createdBy) return toast.error("Login required");

    try {
      await axios.post("http://localhost:3001/add", {
        task,
        category,
        dueDate,
        createdBy,
        sharedWith: sharedWithEmail ? [sharedWithEmail] : [],
      });

      toast.success("Task added");
      setTask('');
      setCategory('Personal');
      setDueDate('');
      setSharedWithEmail('');
      onCreated && onCreated();
    } catch (error) {
      toast.error("Failed to add task");
    }
  };

  return (
    <div className="create_form">
      <input
        type="text"
        placeholder="Enter Task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Personal">Personal</option>
        <option value="Work">Work</option>
        <option value="Others">Others</option>
      </select>

      {/* Date input with visible calendar icon */}
      <div className="date-picker-wrapper">
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
   
      </div>

      <input
        type="email"
        placeholder="Share with (email)"
        value={sharedWithEmail}
        onChange={(e) => setSharedWithEmail(e.target.value)}
      />

      <button onClick={handleSubmit}>+</button>
    </div>
  );
}

export default Create;
