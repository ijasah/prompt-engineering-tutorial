// src/components/TokenChart.tsx
"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export type TokenData = {
  name: string;
  probability: number;
  fill?: string;
};

interface TokenChartProps {
  data: TokenData[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-popover text-popover-foreground border rounded-md p-2 shadow-lg">
        <p className="font-bold">{`${label}`}</p>
        <p className="text-sm">{`Probability: ${(payload[0].value * 100).toFixed(1)}%`}</p>
      </div>
    );
  }

  return null;
};

export const TokenChart = ({ data }: TokenChartProps) => {
  return (
    <div className="w-full h-[350px] text-xs">
        <ResponsiveContainer>
            <BarChart
                data={data}
                layout="vertical"
                margin={{
                    top: 5,
                    right: 20,
                    left: 20,
                    bottom: 5,
                }}
            >
                <XAxis type="number" domain={[0, 'dataMax + 0.05']} hide />
                <YAxis
                    dataKey="name"
                    type="category"
                    width={80}
                    tickLine={false}
                    axisLine={false}
                    interval={0}
                />
                <Tooltip
                    cursor={{ fill: 'hsla(var(--muted), 0.5)' }}
                    content={<CustomTooltip />}
                />
                <Bar dataKey="probability" radius={[0, 4, 4, 0]}>
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill || 'hsl(var(--primary))'} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    </div>
  );
};
