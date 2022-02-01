import { monthConverter } from '../../lib/monthConverter';
import Link from 'next/link';
export const EventCard = ({ event, url }) => {
  const dateArray = event.Date.split('-');
  return (
    <div
      key={event.id}
      className="border rounded-lg p-2 my-3 bg-white filter shadow-lg hover:scale-110 transition-all duration-300"
    >
      <Link href={`/events/${url}`}>
        <a>
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-semibold text-pink-700 w-40 whitespace-nowrap overflow-ellipsis overflow-hidden">
                {event.Title}
              </h2>
              <p className="w-40 whitespace-nowrap overflow-ellipsis overflow-hidden">
                {event.Content}
              </p>
            </div>
            <div className="flex flex-col items-center rounded-md border">
              <div className="text-tiny bg-red-500 px-2 text-white font-bold rounded-t-sm+">
                {monthConverter(dateArray[1])}
              </div>
              <div className="">{dateArray[2]}</div>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};
