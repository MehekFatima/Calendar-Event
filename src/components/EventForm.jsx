import React, { useContext, useState, useEffect } from 'react';
import { FaTimes, FaSave, FaTrashAlt } from 'react-icons/fa';
import { EventContext } from '../context/EventContext';
import styles from '../styles/EventForm.module.css';

const EventForm = ({ closeForm, selectedDate, eventToUpdate }) => {
  const { state, dispatch } = useContext(EventContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Work');
  const [errors, setErrors] = useState({});
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    if (eventToUpdate) {
      setTitle(eventToUpdate.title);
      setDescription(eventToUpdate.description);
      setCategory(eventToUpdate.category);
    }
  }, [eventToUpdate]);

  const validateForm = () => {
    const newErrors = {};
    if (!title) newErrors.title = 'Title is required';
    if (!description) newErrors.description = 'Description is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAdd = () => {
    if (validateForm()) {
      dispatch({
        type: 'ADD_EVENT',
        payload: {
          id: Date.now(),
          title,
          description,
          date: selectedDate.toISOString(),
          category
        }
      });
      closeForm();
    }
  };

  const handleUpdate = () => {
    if (eventToUpdate && validateForm()) {
      dispatch({
        type: 'UPDATE_EVENT',
        payload: { ...eventToUpdate, title, description, category }
      });
      closeForm();
    }
  };

  const handleDelete = () => {
    if (eventToUpdate) {
      dispatch({
        type: 'DELETE_EVENT',
        payload: eventToUpdate.id
      });
      closeForm();
    }
  };

  return (
    <div className={styles.eventForm}>
      <button className={styles.cancel} onClick={closeForm}>
        <FaTimes />
      </button>
      <form>
        <h2>{eventToUpdate ? 'Update Event' : 'Add Event'}</h2>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          {errors.title && <span className={styles.error}>{errors.title}</span>}
        </label>
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            readOnly={!!eventToUpdate} // Make read-only if updating
          />
          {errors.description && <span className={styles.error}>{errors.description}</span>}
        </label>
        {eventToUpdate && (
          <div className={styles.truncatedContent}>
            <p>
              {showFullDescription ? description : description.slice(0, 100) + '...'}
            </p>
            <button
              type="button"
              onClick={() => setShowFullDescription(!showFullDescription)}
            >
              {showFullDescription ? 'Show Less' : 'Show More'}
            </button>
          </div>
        )}
        <label>
          Category:
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <div className={styles.buttonGroup}>
          {!eventToUpdate ? (
            <button type="button" className={styles.addButton} onClick={handleAdd}>
              Add Event
            </button>
          ) : (
            <>
              <button type="button" className={styles.updateButton} onClick={handleUpdate}>
                <FaSave /> Update
              </button>
              <button type="button" className={styles.deleteButton} onClick={handleDelete}>
                <FaTrashAlt /> Delete
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default EventForm;
