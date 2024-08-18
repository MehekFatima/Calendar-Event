// src/components/CalendarComponent.js
import React, { useState, useContext } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { EventContext } from '../context/EventContext';
import EventModal from './EventModal';

const CalendarComponent = () => {
  const { events, setSelectedEvent } = useContext(EventContext);
  const [date, setDate] = useState(new Date());
  const [modalOpen, setModalOpen] = useState(false);

  const onDateClick = (date) => {
    setSelectedEvent(events.find(event => new Date(event.date).toDateString() === date.toDateString()));
    setModalOpen(true);
  };

  const renderEventsForDate = (date) => {
    const dayEvents = events.filter(event => new Date(event.date).toDateString() === date.toDateString());
    return dayEvents.map(event => (
      <div key={event.id} className="event" onClick={() => onDateClick(date)}>
        {event.title}
      </div>
    ));
  };

  return (
    <div>
      <Calendar
        value={date}
        onClickDay={onDateClick}
        tileContent={({ date }) => renderEventsForDate(date)}
      />
      {modalOpen && <EventModal isOpen={modalOpen} onRequestClose={() => setModalOpen(false)} />}
    </div>
  );
};

export default CalendarComponent;
