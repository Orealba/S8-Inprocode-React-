import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';

interface Props {
  datos: Record<string, Usuario[]>;
}

const transformarDato = (datos: Record<string, Usuario[]>) => {
  console.log(datos);
  return Object.entries(datos).map(([deporte, usuarios]) => ({
    sport: deporte,
    value: usuarios.filter((usuario) => usuario.nombre !== null).length,
  }));
};

const colores = [
  '#FF0000', // Rojo
  '#0000FF', // Azul
  '#008000', // Verde
  '#FFFF00', // Amarillo
  '#800080', // Morado
  '#FFA500', // Naranja
  '#FFC0CB', // Rosa
  '#A52A2A', // Marrón
  '#808080', // Gris
  '#00FFFF', // Cian
];
interface Usuario {
  nombre: string;
  apellido: string;
  edad: number;
}
export const MigraficoPie = ({ datos }: Props) => {
  const data2 = transformarDato(datos);
  return (
    <>
      <div>
        <h1 className="m-8 font-['KGPictureYou'] text-3xl">Gráfico 2</h1>
      </div>
      <div style={{ width: '100%', height: 600 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              dataKey={'value'}
              data={data2}
              nameKey="sport"
              innerRadius={20}
              outerRadius={250}
              label={(entry) => entry.nombre}
              labelLine={true}
              fill="#82ca9d">
              {data2.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colores[index % colores.length]}></Cell>
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`${value} usuarios`]} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};
