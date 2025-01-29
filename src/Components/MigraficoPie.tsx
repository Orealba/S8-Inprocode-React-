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
  
  return Object.entries(datos).map(([deporte, usuarios]) => ({
    sport: deporte,
    value: usuarios.filter((usuario) => usuario.nombre !== null).length,
  }));
};

const colores = [
  '#FF0000', 
  '#0000FF', 
  '#008000', 
  '#FFFF00', 
  '#800080', 
  '#FFA500',
  '#FFC0CB', 
  '#A52A2A', 
  '#808080', 
  '#00FFFF', 
  '#FF1493',
  '#4B0082', 
  '#32CD32', 
  '#FF4500', 
  '#9400D3', 
  '#00FF7F', 
  '#1E90FF', 
  '#FF8C00',
  '#8B4513',
  '#4682B4', 
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
        <h1 className="m-8 font-['KGPictureYou'] text-3xl ">
          Usuarios que practican un deporte
        </h1>
      </div>
      <div
        style={{ width: '100%', height: 500 }}
        className="mt-8">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data2}
              dataKey="value"
              nameKey="sport"
              cx="50%"
              cy="50%"
              innerRadius={30}
              outerRadius={window.innerWidth < 768 ? 120 : 200}
              label={false}
              labelLine={false}>
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
