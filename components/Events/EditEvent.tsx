import { useState } from 'react';
import Link from 'next/link';
import { monthConverter } from '../../lib/monthConverter';
import { EventCard } from './EventCard';

export const EditEvent = ({ events }) => {
  const [editEventWidget, setEditEventWidgetState] = useState(1);

  if (editEventWidget === 0)
    return (
      <div className="my-5 w-full p-5 max-w-lg">
        {events.map((event) => {
          return (
            <EventCard key={event.id} event={event} url={`edit/${event.id}`} />
          );
        })}
        <button
          onClick={() => setEditEventWidgetState(1)}
          className="border rounded-lg px-4 bg-gray-200"
        >
          Cancel
        </button>
      </div>
    );

  return (
    <div>
      <button
        className="border bg-blue-400 w-48 rounded-lg"
        onClick={() => {
          setEditEventWidgetState(0);
        }}
      >
        Edit an Event
      </button>
    </div>
  );
};
