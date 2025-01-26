import { MigraficoBarras } from '../Components/MigraficoBarras';
import { MigraficoPie } from '../Components/MigraficoPie';

export const Grafico = () => {
  return (
    <>
      <div className=" text-white">
        <MigraficoBarras />
        <MigraficoPie />
      </div>
      ;
    </>
  );
};
