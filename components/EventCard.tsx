import { monthConverter } from 'lib/monthConverter';
import Link from 'next/link';

interface Props {
  event: {
    date: string;
    id: string;
    title: string;
    body: string;
  };
  slug: string;
}
export const EventCard: React.FC<Props> = ({ event, slug }) => {
  const dateArray = event.date.split('T')[0].split('-');
  return (
    <div
      key={event.id}
      className="border rounded-lg p-2 bg-white filter shadow-lg md:hover:scale-110 transition-all duration-300"
    >
      <Link href={`/events/${slug}`}>
        <a>
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-semibold font-nanumPen text-3xl text-pink-700 w-56 whitespace-nowrap overflow-ellipsis overflow-hidden">
                {event.title}
              </h2>
              <p className="w-40 whitespace-nowrap overflow-ellipsis overflow-hidden">
                {event.body}
              </p>
            </div>
            <div className="flex flex-col items-center rounded-md border">
              <div className="text-tiny bg-red-500 px-2 text-white font-bold rounded-t-sm+">
                {monthConverter(dateArray[1])}
              </div>
              <div>{dateArray[2]}</div>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};
