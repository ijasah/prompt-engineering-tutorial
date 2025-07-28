// src/components/TokenChart.tsx
"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList, Rectangle } from 'recharts';

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

const renderCustomizedLabel = (props: any) => {
    const { x, y, width, height, value } = props;
    const radius = 4;
    const percentage = `${(value * 100).toFixed(1)}%`;
  
    // Check if the label fits inside the bar
    const labelFits = width > 50; 
  
    return (
      <g>
        <text 
            x={labelFits ? x + width - 10 : x + width + 5} 
            y={y + height / 2} 
            fill={labelFits ? 'hsl(var(--primary-foreground))' : 'hsl(var(--foreground))'}
            textAnchor={labelFits ? "end" : "start"} 
            dominantBaseline="middle"
            className="text-xs font-semibold"
        >
          {percentage}
        </text>
      </g>
    );
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
                    right: 40, // Adjust right margin for labels outside bars
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
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                />
                <Tooltip
                    cursor={false}
                    content={<CustomTooltip />}
                />
                <Bar dataKey="probability" radius={[0, 4, 4, 0]}>
                    <LabelList dataKey="probability" content={renderCustomizedLabel} />
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill || 'hsl(var(--primary))'} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    </div>
  );
};
