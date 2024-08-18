import React, { useState } from 'react';
import { useCalendarContext } from '../context/CalendarContext';
import Event from './Event';
import EventDetailsModal from '../pages/EventDetailsModal';
import styles from '../styles/Calendar.module.css';

const Calendar = () => {
  const { state, dispatch } = useCalendarContext();
  const [selectedEvent, setSelectedEvent] = useState(null);
  
  const filteredEvents = state.filter === 'All' ? state.events : state.events.filter(event => event.category === state.filter);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  const handleEdit = () => {
    // Handle the edit logic here
    dispatch({ type: 'SET_EVENT_TO_EDIT', payload: selectedEvent });
    closeModal();
  };

  const handleDelete = () => {
    if (selectedEvent) {
      dispatch({ type: 'DELETE_EVENT', payload: selectedEvent.id });
      closeModal();
    }
  };

  return (
    <div className={styles.calendarContainer}>
      {filteredEvents.map(event => (
        <div
          key={event.id}
          className={styles.calendarDay}
          onClick={() => handleEventClick(event)}
        >
          <Event event={event} className={`${styles.event} ${styles[`event${event.category}`]}`} />
        </div>
      ))}

      {selectedEvent && (
        <EventDetailsModal
          event={selectedEvent}
          closeModal={closeModal}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Calendar;
