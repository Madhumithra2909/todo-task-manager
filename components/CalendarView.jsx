import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function CalendarView({ todos }) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const formatDate = (date) =>
    date.toISOString().split('T')[0]; // "YYYY-MM-DD"

  const filtered = todos.filter(todo =>
    todo.dueDate?.startsWith(formatDate(selectedDate))
  );

  return (
    <div style={{ marginTop: '2rem', width: '100%' }}>
      <h3 style={{ textAlign: 'center', color: '#c7d2fe' }}>📅 Calendar View</h3>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Calendar onChange={setSelectedDate} value={selectedDate} />
      </div>
      <div className="task-list" style={{ marginTop: '1rem' }}>
        {filtered.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#94a3b8' }}>No tasks for this date</p>
        ) : (
          filtered.map(todo => (
            <div key={todo._id} className="task">
              <div className="checkbox">
                <p>{todo.task}</p>
                <span style={{ fontSize: '0.9em', color: '#a5b4fc', marginLeft: 8 }}>
                  {todo.category}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CalendarView;
