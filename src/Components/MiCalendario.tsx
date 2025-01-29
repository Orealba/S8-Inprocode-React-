import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
import { EventoModal } from './EventoModal';
import { EventosService } from './EventosService';

const localizer = dayjsLocalizer(dayjs);

// Definimos la interfaz para nuestros eventos
interface Evento {
  id: string;
  titulo: string;
  fecha_inicio: Date;
  fecha_fin: Date;
}

export const MiCalendario = () => {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [eventoSeleccionado, setEventoSeleccionado] = useState<Partial<Evento>>(
    {},
  );

  const cargarEventos = async () => {
    try {
      const eventosData = await EventosService.cargarEventos();
      setEventos(eventosData);
    } catch (error) {
      console.error('Error al cargar eventos:', error);
    }
  };

  const handleCrearEvento = async (nuevoEvento: Partial<Evento>) => {
    try {
      console.log('Creando evento:', nuevoEvento); // Para debugging
      await EventosService.crearEvento(nuevoEvento as Evento);
      await cargarEventos(); // Recargar eventos después de crear
      setModalAbierto(false);
    } catch (error) {
      console.error('Error al crear evento:', error);
    }
  };

  useEffect(() => {
    cargarEventos();
  }, []);

  return (
    <>
      <div>
        <h1 className="m-8 font-['KGPictureYou'] text-3xl">
          Calendario eventos deportivos
        </h1>
        <div className="flex justify-center mb-5 h-[25rem] w-[100%]">
          <Calendar
            localizer={localizer}
            events={eventos}
            startAccessor="fecha_inicio"
            endAccessor="fecha_fin"
            titleAccessor="titulo"
            className="custom-calendar"
            dayPropGetter={(date) => ({
              style: {
                backgroundColor: dayjs(date).isSame(dayjs(), 'day')
                  ? 'rgba(255, 192, 203, 0.15)'
                  : undefined,
              },
            })}
            onSelectEvent={(evento) => {
              if (window.confirm('¿Deseas eliminar este evento?')) {
                EventosService
                  .eliminarEvento((evento as Evento).id)
                  .then(() => cargarEventos());
              }
            }}
            selectable
            onSelectSlot={(slotInfo) => {
              setEventoSeleccionado({
                fecha_inicio: slotInfo.start,
                fecha_fin: slotInfo.end,
              });
              setModalAbierto(true);
            }}
          />
        </div>

        <EventoModal
          isOpen={modalAbierto}
          onClose={() => setModalAbierto(false)}
          onSubmit={handleCrearEvento}
          eventoInicial={eventoSeleccionado}
        />
      </div>
    </>
  );
};
