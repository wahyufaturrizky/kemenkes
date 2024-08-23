'use client'

import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter,
  ResponsiveContainer,
} from 'recharts';

const data = [
  {
    name: 'Januari',
    uv: 590,
    pv: 800,
    amt: 1400,
    cnt: 490,
  },
  {
    name: 'Februari',
    uv: 868,
    pv: 967,
    amt: 1506,
    cnt: 590,
  },
  {
    name: 'Maret',
    uv: 1397,
    pv: 1098,
    amt: 989,
    cnt: 350,
  },
  {
    name: 'April',
    uv: 1480,
    pv: 1200,
    amt: 1228,
    cnt: 480,
  },
  {
    name: 'Mei',
    uv: 1520,
    pv: 1108,
    amt: 1100,
    cnt: 460,
  },
  {
    name: 'Juni',
    uv: 1400,
    pv: 680,
    amt: 1700,
    cnt: 380,
  },
  {
    name: 'Juli',
    uv: 1400,
    pv: 680,
    amt: 1700,
    cnt: 380,
  },
  {
    name: 'Agustus',
    uv: 1400,
    pv: 680,
    amt: 1700,
    cnt: 380,
  },
  {
    name: 'September',
    uv: 1400,
    pv: 680,
    amt: 1700,
    cnt: 380,
  },
  {
    name: 'Oktober',
    uv: 1400,
    pv: 680,
    amt: 1700,
    cnt: 380,
  },
  {
    name: 'November',
    uv: 1400,
    pv: 680,
    amt: 1700,
    cnt: 380,
  },
  {
    name: 'Desember',
    uv: 1400,
    pv: 680,
    amt: 1700,
    cnt: 380,
  },
];

interface GraphComposedProps {
  layout?: 'horizontal' | 'vertical'
}

const GraphComposed: React.FC<GraphComposedProps> = ({
  layout = 'horizontal'
}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        layout={layout}
        width={500}
        height={400}
        data={data}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 40,
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        {layout === "horizontal" ?
          <>
            <XAxis dataKey="name" scale="band" />
            <YAxis />
          </>
          :
          <>
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" scale="band" />
          </>
        }
        <Tooltip />
        <Legend />
        {layout === "horizontal" ?
          <>
            <Bar dataKey="pv" barSize={20} fill="#413ea0" />
            <Line type="monotone" dataKey="uv" stroke="#ff7300" />
            <Line type="monotone" dataKey="cnt" stroke="red" />
          </>
          :
          <>
            <Bar dataKey="pv" barSize={20} fill="#413ea0" />
          </>
        }
      </ComposedChart>
    </ResponsiveContainer>
  );
}

export default GraphComposed