// Home.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Create from './Create';
import CalendarView from './CalendarView';
import { toast } from 'react-toastify';
import {
  BsFillCheckCircleFill,
  BsCircleFill,
  BsFillTrashFill,
  BsPencilFill
} from 'react-icons/bs';

export default function Home({ userEmail, setUser }) {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('All');
  const [showCalendar, setShowCalendar] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editTask, setEditTask] = useState('');
  const [editDue, setEditDue] = useState('');

  const fetchTodos = () => {
    axios
      .get(`http://localhost:3001/get?user=${userEmail}`)
      .then(res => setTodos(res.data))
      .catch(() => toast.error('Failed to fetch tasks'));
  };

  useEffect(fetchTodos, [userEmail]);

  const handleToggle = (id) => {
    axios.put(`http://localhost:3001/toggle/${id}`)
      .then(fetchTodos)
      .catch(() => toast.error('Toggle failed'));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/delete/${id}`)
      .then(fetchTodos)
      .catch(() => toast.error('Delete failed'));
  };

  const startEdit = (todo) => {
    setEditId(todo._id);
    setEditTask(todo.task);
    setEditDue(todo.dueDate?.slice(0, 10) || '');
  };

  const saveEdit = (id) => {
    axios.put(`http://localhost:3001/edit/${id}`, { task: editTask, dueDate: editDue })
      .then(() => {
        setEditId(null);
        setEditTask('');
        setEditDue('');
        fetchTodos();
      })
      .catch(() => toast.error('Edit failed'));
  };

  const signOut = () => {
    localStorage.removeItem('todo_user');
    setUser(null);
  };

  const doneCount = todos.filter(t => t.done).length;
  const percent = todos.length ? Math.round((doneCount / todos.length) * 100) : 0;

  const todayStr = new Date().toISOString().slice(0,10);
  const filteredTodos = todos.filter(todo => {
    if (filter === 'Today') return todo.dueDate?.slice(0,10) === todayStr;
    if (filter === 'Overdue') return todo.dueDate?.slice(0,10) < todayStr && !todo.done;
    return true;
  });

  return (
    <div className="container">
      <header className="topbar">
        
        <div>
          <span>{userEmail}</span>
          <button className="logout-btn" onClick={signOut}>Logout</button>
        </div>
      </header>

      <div className="header">
        <h1 className="main-title">Todo App</h1>
        

        <div className="progress-container">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${percent}%` }}></div>
          </div>
          <p className="progress-text">{percent}% Completed</p>
        </div>

        <div className="filter-buttons">
          {['All','Today','Overdue'].map(opt => (
            <button
              key={opt}
              className={`filter-btn ${filter === opt ? 'selected' : ''}`}
              onClick={() => { setFilter(opt); setShowCalendar(false); }}
            >
              {opt}
            </button>
          ))}
          <button
            className={`filter-btn ${showCalendar ? 'selected' : ''}`}
            onClick={() => setShowCalendar(v => !v)}
          >
            Calendar
          </button>
        </div>
      </div>

      <Create createdBy={userEmail} onCreated={fetchTodos} />

      {!showCalendar ? (
        <div className="task-list">
          {filteredTodos.length === 0 ? (
            <p className="no-tasks">No tasks found</p>
          ) : (
            filteredTodos.map(todo => (
              <div key={todo._id} className="task">
                <div className="checkbox" onClick={() => handleToggle(todo._id)}>
                  {todo.done ? (
                    <BsFillCheckCircleFill color="#3b82f6" />
                  ) : (
                    <BsCircleFill color="#cbd5e1" />
                  )}
                  {editId === todo._id ? (
                    <>
                      <input value={editTask} onChange={e => setEditTask(e.target.value)} />
                      <input type="date" value={editDue} onChange={e => setEditDue(e.target.value)} />
                      <button onClick={() => saveEdit(todo._id)}>Save</button>
                      <button onClick={() => setEditId(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <p className={todo.done ? 'line_through' : ''}>{todo.task}</p>
                      <span className="task-cat">{todo.category}</span>
                      {todo.dueDate && (
                        <span className="task-date" style={{ fontSize: '0.9rem', color: '#a5b4fc', padding: '0 0.5rem' }}>
                          {todo.dueDate.slice(0,10)}
                        </span>
                      )}
                    </>
                  )}
                </div>
                <span className="icon" onClick={() => handleDelete(todo._id)}><BsFillTrashFill /></span>
                {editId !== todo._id && (
                  <span className="icon" onClick={() => startEdit(todo)}><BsPencilFill /></span>
                )}
              </div>
            ))
          )}
        </div>
      ) : (
        <CalendarView todos={todos} />
      )}

      {percent === 100 && todos.length > 0 && (
        <div className="celebration">
          🎉 All tasks completed! Great job! 🎉
        </div>
      )}
    </div>
  );
}