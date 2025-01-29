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
  '#FF1493', // Rosa Profundo
  '#4B0082', // Índigo
  '#32CD32', // Verde Lima
  '#FF4500', // Naranja Rojizo
  '#9400D3', // Violeta Oscuro
  '#00FF7F', // Verde Primavera
  '#1E90FF', // Azul Dodger
  '#FF8C00', // Naranja Oscuro
  '#8B4513', // Marrón Silla
  '#4682B4', // Azul Acero
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
