import React, { useContext } from 'react';
import { EventContext } from '../context/EventContext';
import styles from '../styles/Filter.module.css';

const EventFilter = () => {
  const { state, dispatch } = useContext(EventContext);

  const handleFilterChange = (e) => {
    dispatch({ type: 'SET_FILTER', filter: e.target.value });
  };

  return (
    <div className={styles.filterContainer}>
      <label htmlFor="filter">Filter by Category:</label>
      <select id="filter" value={state.filter} onChange={handleFilterChange} className={styles.select}>
        <option value="All">All</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Other">Other</option>
      </select>
    </div>
  );
};

export default EventFilter;
