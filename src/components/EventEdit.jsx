import React, { useState } from 'react';
import { useContext } from 'react';
import { EventContext } from '../context/EventContext';
import styles from '../styles/EventEdit.module.css';

const EventEdit = ({ event, closeEdit }) => {
  const { dispatch } = useContext(EventContext);
  const [title, setTitle] = useState(event.title);
  const [date, setDate] = useState(new Date(event.date));
  const [category, setCategory] = useState(event.category);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch({
      type: 'EDIT_EVENT',
      payload: { ...event, title, date, category }
    });
    closeEdit();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.eventEdit}>
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <input
        type="date"
        value={date.toISOString().substr(0, 10)}
        onChange={e => setDate(new Date(e.target.value))}
        required
      />
      <select value={category} onChange={e => setCategory(e.target.value)}>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Other">Other</option>
      </select>
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EventEdit;
