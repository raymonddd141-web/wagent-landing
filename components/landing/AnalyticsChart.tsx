'use client'

import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Area, AreaChart } from 'recharts'

const data = [
  { month: 'Jan', revenue: 18400 },
  { month: 'Feb', revenue: 21200 },
  { month: 'Mar', revenue: 19800 },
  { month: 'Apr', revenue: 26500 },
  { month: 'May', revenue: 28900 },
  { month: 'Jun', revenue: 24700 },
  { month: 'Jul', revenue: 31200 },
  { month: 'Aug', revenue: 29800 },
  { month: 'Sep', revenue: 34100 },
  { month: 'Oct', revenue: 32400 },
  { month: 'Nov', revenue: 38600 },
  { month: 'Dec', revenue: 41200 },
]

export default function AnalyticsChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={data} margin={{ top: 10, right: 5, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id="chartGold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity={0.5} />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(245,245,240,0.05)" vertical={false} />
        <XAxis
          dataKey="month"
          tick={{ fill: 'rgba(245,245,240,0.4)', fontSize: 10, fontFamily: 'var(--font-mono)' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis hide />
        <Tooltip
          contentStyle={{
            background: '#0D0D0D',
            border: '1px solid rgba(212,175,55,0.3)',
            borderRadius: 8,
            fontSize: 12,
            fontFamily: 'var(--font-mono)',
          }}
          labelStyle={{ color: '#D4AF37' }}
          itemStyle={{ color: '#F5F5F0' }}
          formatter={(v: number) => [`GHS ${v.toLocaleString()}`, 'Revenue']}
        />
        <Area type="monotone" dataKey="revenue" stroke="#D4AF37" strokeWidth={2} fill="url(#chartGold)" />
      </AreaChart>
    </ResponsiveContainer>
  )
}
