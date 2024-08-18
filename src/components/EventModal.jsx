import React from 'react';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';
import styles from '../styles/EventModal.module.css';

const EventModal = ({ isOpen, onRequestClose, event }) => {
  if (!event) return null;

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className={styles.modal} overlayClassName={styles.overlay}>
      <button className={styles.closeButton} onClick={onRequestClose}>
        <FaTimes />
      </button>
      <div className={styles.eventDetails}>
        <h2>{event.title}</h2>
        <p>{event.description}</p>
        <p><strong>Date:</strong> {new Date(event.date).toDateString()}</p>
        <p><strong>Category:</strong> {event.category}</p>
      </div>
    </Modal>
  );
};

export default EventModal;
