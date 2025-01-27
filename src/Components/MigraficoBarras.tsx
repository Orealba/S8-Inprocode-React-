import { Tooltip } from 'flowbite-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';

const data = [
  { name: 'Carlos', age: 25, peso: '12' },
  { name: 'Ana', age: 22, peso: '34' },
  { name: 'Luis', age: 30, peso: '67' },
  { name: 'María', age: 28, peso: '75' },
  { name: 'Pedro', age: 19, peso: '43' },
  { name: 'Elena', age: 27, peso: '55' },
  { name: 'Jorge', age: 24, peso: '65' },
  { name: 'Lucía', age: 21, peso: '43' },
  { name: 'Sofía', age: 29, peso: '54' },
  { name: 'Miguel', age: 26, peso: '45' },
];

export const MigraficoBarras = () => {
  return (
    <>
      <div>
        <h1 className="m-8 font-['KGPictureYou'] text-3xl">Gráfico 1</h1>
      </div>
      <div className="flex justify-center">
        <ResponsiveContainer
          width={'50%'}
          aspect={2}>
          <BarChart
            data={data}
            width={500}
            height={300}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}>
            <CartesianGrid strokeDasharray={'4 1 2'} />
            <XAxis dataKey={'name'} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey={'peso'}
              fill={'#6b48ff'}
            />
            <Bar
              dataKey={'age'}
              fill={'#1ee3cf'}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};
