import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
import { EventoModal } from './EventoModal';
import { EventosService } from './EventosService';
import './Css/Calendar.css';

const localizer = dayjsLocalizer(dayjs);

interface Evento {
  id: string;
  titulo: string;
  fecha_inicio: Date;
  fecha_fin: Date;
}

export const MiCalendario = () => {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modalAccionesAbierto, setModalAccionesAbierto] = useState(false);
  const [eventoSeleccionado, setEventoSeleccionado] = useState<Partial<Evento>>(
    {},
  );
  const [modoEdicion, setModoEdicion] = useState(false);

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
      await EventosService.crearEvento(nuevoEvento as Evento);
      await cargarEventos();
      setModalAbierto(false);
    } catch (error) {
      console.error('Error al crear evento:', error);
    }
  };

  const handleModificarEvento = async (eventoModificado: Partial<Evento>) => {
    try {
      console.log('Modificando evento:', eventoModificado);

      const eventoCompleto = {
        ...eventoModificado,
        id: eventoSeleccionado.id,
      } as Evento;

      await EventosService.actualizarEvento(eventoCompleto);
      await cargarEventos();
      setModalAbierto(false);
      setModoEdicion(false);
    } catch (error) {
      console.error('Error al modificar evento:', error);
    }
  };

  const EventComponent = ({ event }: any) => {
    const tooltip = `Título: ${event.titulo}
Inicio: ${dayjs(event.fecha_inicio).format('DD/MM/YYYY HH:mm')}
Fin: ${dayjs(event.fecha_fin).format('DD/MM/YYYY HH:mm')}`;

    return (
      <div
        title={tooltip}
        style={{ height: '100%' }}>
        {event.titulo}
      </div>
    );
  };

  useEffect(() => {
    cargarEventos();
  }, []);

  return (
    <>
      <div className="p-4 relative">
        <div className="flex justify-center mb-5 h-[700px] w-[85%] mx-auto">
          <Calendar
            localizer={localizer}
            events={eventos}
            startAccessor="fecha_inicio"
            endAccessor="fecha_fin"
            titleAccessor="titulo"
            className="custom-calendar w-full"
            defaultView="month"
            views={['month']}
            components={{
              event: EventComponent,
            }}
            dayPropGetter={(date) => ({
              style: {
                backgroundColor: dayjs(date).isSame(dayjs(), 'day')
                  ? 'rgba(255, 192, 203, 0.15)'
                  : undefined,
              },
            })}
            onSelectEvent={(evento) => {
              setEventoSeleccionado(evento as Evento);
              setModalAccionesAbierto(true);
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

        {/* Botón flotante para agregar evento */}
        <button
          onClick={() => {
            setEventoSeleccionado({
              fecha_inicio: new Date(),
              fecha_fin: new Date(),
            });
            setModalAbierto(true);
          }}
          className="fixed bottom-6 right-6 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 ease-in-out z-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>

        {modalAccionesAbierto && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
            <div className="bg-black p-6 rounded-lg w-96 text-white border border-gray-600 shadow-xl">
              <h2 className="text-xl mb-4 font-bold text-center">
                ¿Qué deseas hacer con este evento?
              </h2>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => {
                    setModalAccionesAbierto(false);
                    setModoEdicion(true);
                    setModalAbierto(true);
                  }}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                  Modificar
                </button>
                <button
                  onClick={async () => {
                    if (
                      window.confirm(
                        '¿Estás seguro de que deseas eliminar este evento?',
                      )
                    ) {
                      await EventosService.eliminarEvento(
                        (eventoSeleccionado as Evento).id,
                      );
                      await cargarEventos();
                    }
                    setModalAccionesAbierto(false);
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                  Eliminar
                </button>
                <button
                  onClick={() => setModalAccionesAbierto(false)}
                  className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        <EventoModal
          isOpen={modalAbierto}
          onClose={() => {
            setModalAbierto(false);
            setModoEdicion(false);
          }}
          onSubmit={modoEdicion ? handleModificarEvento : handleCrearEvento}
          eventoInicial={eventoSeleccionado}
          modoEdicion={modoEdicion}
        />
      </div>
    </>
  );
};
