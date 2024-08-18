import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { EventProvider } from './context/EventContext';
import CalendarPage from './pages/CalendarPage';
import EventDetailPage from './pages/EventDetailPage'; // Import the new page

function App() {
  return (
    <Router>
      <EventProvider>
        <Routes>
          <Route path="/" element={<CalendarPage />} />
          <Route path="/event/:id" element={<EventDetailPage/>} /> {/* Add this route */}
        </Routes>
      </EventProvider>
    </Router>
  );
}

export default App;
