// App.jsx

import React, { useState } from 'react';
import EventCalendar from './components/EventCalendar';
import WeeklyView from './components/WeeklyView';
import {addDays, subDays} from "date-fns"
import DailyView from './components/DailyView';


function App() {
 
  const [events, setEvents] = useState([
    { date: "2024-01-10", category: "academic", events: ["Event 1"] },
    { date: "2024-01-15", category: "sports", events: ["Event 2"] },
    // Add more events as needed
  ]);

  const [viewType, setViewType] = useState('monthly'); // Default view is monthly

  const handleChangeView = (view) => {
    setViewType(view);
  };

  return (

    <div className='text-center ' >
     <div className="flex items-center justify-center space-x-4">
        <img src="https://www.nitj.ac.in/public/assets/images/logo_250.png" alt="NITJ Logo" className='h-12 w-12' />
        <div>
          <h1 className="text-xl font-bold">Dr B R Ambedkar National Institute of Technology Jalandhar</h1>
        </div>
      </div>
    <h1 className='p-2 font-semibold' >Academic Calendar</h1>
    <div className="mb-4 justify-center mx-auto">
      <label className='p-2 justify-center'>
        Choose View:
        <select value={viewType} onChange={(e) => handleChangeView(e.target.value)}>
          <option value="monthly">Monthly</option>
          <option value="weekly">Weekly</option>
          <option value="daily">Daywise</option>
        </select>
      </label>
    </div>

    {viewType === 'monthly' ? (
      <EventCalendar events={events} setEvents={setEvents} />
    ) : viewType === 'weekly' ? (
      <WeeklyView currentDate={new Date()} events={events} setEvents={setEvents} />
    ) : (
      <DailyView currentDate={new Date()} events={events} setEvents={setEvents} />
    )}

  <h5>Click On Any Date To Add Event</h5>

  </div>
  );
}

export default App;

//College Color Theme
// Color Theme 
//Blue-#0369a0
//White-#ffffff
//very light blue-#edf4fe
//light blue-#bfdbfe
//Black-#040321