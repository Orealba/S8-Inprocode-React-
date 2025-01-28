import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface Props {
  datos: Record<string, Usuario[]>;
}

export const MigraficoBarras = ({ datos }: Props) => {
  const datosTransformados = Object.entries(datos).map(
    ([deporte, usuarios]) => {
      const usuariosValidos = usuarios.filter(
        (usuario) => usuario.edad !== null,
      );
      const promedio =
        usuariosValidos.length > 0
          ? usuariosValidos.reduce((sum, user) => sum + user.edad, 0) /
            usuariosValidos.length
          : 0;
      return {
        nombre: deporte,
        promedioEdad: Math.round(promedio), // Redondeamos el promedio
      };
    },
  );

  return (
    <div>
      <div>
        <h1 className="m-8 font-['KGPictureYou'] text-3xl ">
          Promedio edades por deporte
        </h1>
      </div>

      <div style={{ width: '100%', height: 400 }}>
        <ResponsiveContainer>
          <BarChart
            data={datosTransformados}
            margin={{ top: 30, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nombre" />
            <YAxis
              label={{
                value: 'Edad Promedio',
                angle: -90,
                position: 'insideLeft',
              }}
              domain={[0, 'auto']}
            />
            <Tooltip formatter={(value) => [`${value} años`]} />
            <Legend />
            <Bar
              dataKey="promedioEdad"
              fill="#8884d8"
              name="Promedio de Edad"
              label={{ position: 'top' }}
              radius={[5, 5, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
