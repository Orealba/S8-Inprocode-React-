import { useState } from 'react';
import dayjs from 'dayjs';

interface EventoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (evento: Partial<Evento>) => void;
  eventoInicial: Partial<Evento>;
}

interface Evento {
  id?: string;
  titulo: string;
  fecha_inicio: Date;
  fecha_fin: Date;
}

export const EventoModal = ({
  isOpen,
  onClose,
  onSubmit,
  eventoInicial,
}: EventoModalProps) => {
  const [evento, setEvento] = useState<Partial<Evento>>(eventoInicial);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (evento.titulo && evento.fecha_inicio && evento.fecha_fin) {
      console.log('Enviando evento:', evento);
      onSubmit(evento);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-black p-6 rounded-lg w-96 text-white border border-gray-600 shadow-xl">
        <h2 className="text-xl mb-4 font-bold">Crear Nuevo Evento</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Título:</label>
            <input
              type="text"
              className="w-full p-2 border rounded text-black bg-white"
              value={evento.titulo || ''}
              onChange={(e) => setEvento({ ...evento, titulo: e.target.value })}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-semibold">
              Fecha y hora de inicio:
            </label>
            <input
              type="datetime-local"
              className="w-full p-2 border rounded text-black bg-white"
              value={
                evento.fecha_inicio
                  ? dayjs(evento.fecha_inicio).format('YYYY-MM-DDTHH:mm')
                  : ''
              }
              onChange={(e) =>
                setEvento({ ...evento, fecha_inicio: new Date(e.target.value) })
              }
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-semibold">
              Fecha y hora de fin:
            </label>
            <input
              type="datetime-local"
              className="w-full p-2 border rounded text-black bg-white"
              value={
                evento.fecha_fin
                  ? dayjs(evento.fecha_fin).format('YYYY-MM-DDTHH:mm')
                  : ''
              }
              onChange={(e) =>
                setEvento({ ...evento, fecha_fin: new Date(e.target.value) })
              }
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
