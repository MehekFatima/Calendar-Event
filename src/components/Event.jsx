import React from 'react';
import styles from '../styles/Event.module.css';
import { FaEdit, FaTrash, FaTimes } from 'react-icons/fa'; // Ensure react-icons is installed

const Event = ({ event, openModal, onUpdate, onDelete }) => {
  // Dynamically apply category-based style
  const categoryClass = styles[`event${event.category}`] || '';

  return (
    <div className={`${styles.event} ${categoryClass}`} onClick={() => openModal(event)}>
      <div>
        <h4>{event.title}</h4>
        <p>{event.description.length > 50 ? `${event.description.slice(0, 50)}...` : event.description}</p>
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.updateButton} onClick={(e) => { e.stopPropagation(); onUpdate(event); }}>
          <FaEdit />
        </button>
        <button className={styles.deleteButton} onClick={(e) => { e.stopPropagation(); onDelete(event); }}>
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default Event;
