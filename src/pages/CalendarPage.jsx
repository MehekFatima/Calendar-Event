import React, { useState, useContext } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import EventForm from '../components/EventForm';
import { EventContext } from '../context/EventContext';
import styles from '../styles/CalendarPage.module.css'; // Import the CSS module

const CalendarPage = () => {
  const { state } = useContext(EventContext);
  const [date, setDate] = useState(new Date());
  const [isFormOpen, setFormOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleDateChange = newDate => {
    setDate(newDate);
    setSelectedEvent(null); // Clear selected event
    setFormOpen(true); // Open form for adding a new event
  };

  const handleEventClick = event => {
    setDate(new Date(event.date));
    setSelectedEvent(event); // Set selected event
    setFormOpen(true); // Open form for editing the selected event
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    setSelectedEvent(null); // Clear selected event when closing the form
  };

  return (
    <div className={styles.calendarPage}>
      <div className={styles.calendarContainer}>
        <Calendar
          onChange={handleDateChange}
          value={date}
          tileContent={({ date, view }) => {
            if (view === 'month') {
              const eventsForTile = state.events.filter(event => new Date(event.date).toDateString() === date.toDateString());
              return (
                <div className={styles.tileContent}>
                  {eventsForTile.map(event => (
                    <div
                      key={event.id}
                      className={`${styles.event} ${styles[`event${event.category}`]}`}
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent calendar click event
                        handleEventClick(event);
                      }}
                    >
                      {event.title}
                    </div>
                  ))}
                </div>
              );
            }
            return null;
          }}
        />
      </div>
      {isFormOpen && (
        <EventForm
          closeForm={handleCloseForm}
          selectedDate={date}
          eventToUpdate={selectedEvent}
        />
      )}
    </div>
  );
};

export default CalendarPage;
