import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import dayjs from 'dayjs';

const localizer = dayjsLocalizer(dayjs);

export const MiCalendario = () => {
  const events = [
    {
      title: 'Partido de Baloncesto',
      start: new Date(2025, 0, 29, 10, 0),
      end: new Date(2025, 0, 29, 12, 0),
    },
  ];

  return (
    <>
      <div>
        <h1 className="m-8 font-['KGPictureYou'] text-3xl">
          Calendario eventos deportivos
        </h1>
        <div className="flex justify-center mb-5 h-[25rem] w-[100%]">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor={'start'}
            endAccessor={'end'}
          />
        </div>
      </div>
    </>
  );
};
