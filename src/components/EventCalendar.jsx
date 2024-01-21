import React, { useState } from "react";
import {
  eachDayOfInterval,
  endOfMonth,
  format,
  startOfDay,
  startOfMonth,
  getDay,
  isToday,
} from "date-fns";
import { clsx } from "clsx";

const Weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const EventCalendar = () => {
  const currentDate = new Date();
  const firstDay = startOfMonth(currentDate);
  const lastDay = endOfMonth(currentDate);

  const daysinMonth = eachDayOfInterval({
    start: firstDay,
    end: lastDay,
  });

  const startingDayIndex = getDay(firstDay);

  const [events, setEvents] = useState([
    { date: "2024-01-10", name: "Event 1" },
    { date: "2024-01-15", name: "Event 2" },
    // Add more events as needed
  ]);

  const eventsByDate = events.reduce((acc, event) => {
    const eventDate = startOfDay(new Date(event.date));
    acc[eventDate.toISOString()] = event.name;
    return acc;
  }, {});

  const handleEventClick = (day) => {
    const dateKey = startOfDay(day).toISOString();
    const existingEvent = events.find((event) => event.date === dateKey);
    if (existingEvent) {
      const deleteEvent = window.confirm(`Do you want to delete "${existingEvent.name}"?`);
      if (deleteEvent) {
        setEvents(events.filter((event) => event.date !== dateKey));
      }
    } else {
      const eventName = prompt("Enter event name:");
      if (eventName) {
        setEvents([...events, { date: dateKey, name: eventName }]);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <h2 className="text-center ">{format(currentDate, "MMMM yyyy")}</h2>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {Weekdays.map((day) => (
          <div key={day} className="text-center font-bold">
            {day}
          </div>
        ))}
        {Array.from({ length: startingDayIndex }).map((_, index) => (
          <div
            key={`empty-${index}`}
            className="text-center border rounded-md p-2"
          />
        ))}
        {daysinMonth.map((day, index) => (
          <div
            key={index}
            className={clsx("text-center border bg-[#edf4fe] rounded-md p-2", {
              "bg-[#0369a0]": isToday(day),
              "text-white": isToday(day),
            })}
            onClick={() => handleEventClick(day)}
          >
            {format(day, "d")}
            {eventsByDate[day.toISOString()] && (
              <div className="text-xs mt-1">
                {eventsByDate[day.toISOString()]}
                <span
                  className="ml-1 cursor-pointer text-red-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEventClick(day);
                  }}
                >
                  &#10007;
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCalendar;
