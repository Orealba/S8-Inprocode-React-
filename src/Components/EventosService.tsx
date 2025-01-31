import dayjs from 'dayjs';

interface Evento {
  id?: string;
  titulo: string;
  fecha_inicio: Date;
  fecha_fin: Date;
}

export const EventosService = {
  cargarEventos: async () => {
    const respuesta = await fetch('http://127.0.0.1:8080/evento_deporte');
    const data = await respuesta.json();
    return data.map((evento: any) => ({
      ...evento,
      fecha_inicio: dayjs(evento.fecha_inicio).toDate(),
      fecha_fin: dayjs(evento.fecha_fin).toDate(),
    }));
  },

  crearEvento: async (evento: Evento) => {
    const eventoParaAPI = {
      titulo: evento.titulo,
      fecha_inicio: dayjs(evento.fecha_inicio).format('YYYY-MM-DD HH:mm:ss'),
      fecha_fin: dayjs(evento.fecha_fin).format('YYYY-MM-DD HH:mm:ss'),
    };

    const respuesta = await fetch('http://127.0.0.1:8080/evento_deporte', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventoParaAPI),
    });

    if (!respuesta.ok) {
      const error = await respuesta.text();
      throw new Error(`Error al crear evento: ${error}`);
    }

    return await respuesta.json();
  },

  eliminarEvento: async (id: string) => {
    return await fetch(`http://127.0.0.1:8080/evento_deporte/${id}`, {
      method: 'DELETE',
    });
  },

  actualizarEvento: async (evento: Evento) => {
    console.log('Actualizando evento:', evento);
    const eventoParaAPI = {
      titulo: evento.titulo,
      fecha_inicio: dayjs(evento.fecha_inicio).format('YYYY-MM-DD HH:mm:ss'),
      fecha_fin: dayjs(evento.fecha_fin).format('YYYY-MM-DD HH:mm:ss'),
    };

    const respuesta = await fetch(
      `http://127.0.0.1:8080/evento_deporte/${evento.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventoParaAPI),
      },
    );

    if (!respuesta.ok) {
      const error = await respuesta.text();
      throw new Error(`Error al actualizar evento: ${error}`);
    }

    return await respuesta.json();
  },
};
