import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEventContext } from '../context/EventContext';
import styles from '../styles/EventDetailPage.module.css';
import { FaTimes } from 'react-icons/fa';

const EventDetailPage = () => {
  const { id } = useParams();
  const { state, dispatch } = useEventContext();
  const navigate = useNavigate();

  const event = state.events.find(event => event.id === parseInt(id));
  
  const [isEditing, setIsEditing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState(event?.title || '');
  const [description, setDescription] = useState(event?.description || '');

  if (!event) {
    return <div>Event not found</div>;
  }

  const handleDelete = () => {
    dispatch({ type: 'DELETE_EVENT', payload: event.id });
    navigate('/');
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    dispatch({
      type: 'UPDATE_EVENT',
      payload: { ...event, title, description }
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTitle(event.title);
    setDescription(event.description);
  };

  return (
    <div className={styles.eventDetail}>
      <h2>{isEditing ? 'Edit Event' : event.title}</h2>
      <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
      
      {isEditing ? (
        <>
          <div className={styles.editField}>
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className={styles.editField}>
            <label>Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className={styles.actions}>
            <button onClick={handleSave} className={styles.saveButton}>Save</button>
            <button onClick={handleCancel} className={styles.cancelButton}>Cancel</button>
          </div>
        </>
      ) : (
        <>
          <p>
            <strong>Description:</strong> 
            {event.description.length > 50 ? (
              <>
                {event.description.slice(0, 50)}...
                <button 
                  className={styles.showMoreButton} 
                  onClick={() => setIsExpanded(true)}
                >
                  Show More
                </button>
              </>
            ) : (
              event.description
            )}
          </p>
          <p><strong>Category:</strong> {event.category}</p>
          <div className={styles.actions}>
            <button onClick={handleEdit} className={styles.editButton}>Edit</button>
            <button onClick={handleDelete} className={styles.deleteButton}>Delete</button>
          </div>
        </>
      )}

      {isExpanded && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <button 
              className={styles.closeButton} 
              onClick={() => setIsExpanded(false)}
            >
              <FaTimes />
            </button>
            <h3>Full Description</h3>
            <div className={styles.scrollableContent}>
              {event.description}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetailPage;
