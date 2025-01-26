import { Tooltip } from 'flowbite-react';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

const data2 = [
  { age: 25, sport: 'Fútbol' },
  { age: 22, sport: 'Vóleibol' },
  { age: 30, sport: 'Baloncesto' },
  { age: 28, sport: 'Tenis' },
  { age: 19, sport: 'Natación' },
  { age: 27, sport: 'Atletismo' },
  { age: 24, sport: 'Ciclismo' },
  { age: 21, sport: 'Gimnasia' },
  { age: 29, sport: 'Béisbol' },
  { age: 26, sport: 'Rugby' },
];
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

export const MigraficoPie = () => {
  return (
    <>
      <div>
        <h1 className="m-8 ">Gráfico 2</h1>
      </div>
      <div style={{ width: '100%', height: 500 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              dataKey={'age'}
              data={data2}
              innerRadius={60}
              outerRadius={85}
              fill="#82ca9d">
              {data2.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colores[index % colores.length]}></Cell>
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};
