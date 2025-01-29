import { MiCalendario } from '../Components/MiCalendario';

export const Calendario = () => {
  return (
    <div className="text-white">
      <h1 className="m-8 font-['KGPictureYou'] text-3xl ">
        Calendario eventos deportivos
      </h1>

      <MiCalendario></MiCalendario>
      <h3 className="flex justify-center text-white m-3 ">
        Agrega un evento clickeando en el día o con el botón de +
      </h3>
    </div>
  );
};
