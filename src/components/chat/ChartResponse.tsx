import { Bar, BarChart, XAxis, YAxis, Tooltip } from 'recharts'
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart'

const data = [
  { name: '6º Ano', alunos: 45 },
  { name: '7º Ano', alunos: 52 },
  { name: '8º Ano', alunos: 38 },
  { name: '9º Ano', alunos: 41 },
]

export function ChartResponse() {
  return (
    <div className="w-full h-48 mt-2 p-4 bg-background rounded-lg border shadow-sm">
      <ChartContainer
        config={{ alunos: { color: 'hsl(var(--primary))', label: 'Alunos' } }}
        className="h-full w-full"
      >
        <BarChart data={data}>
          <XAxis dataKey="name" fontSize={11} tickLine={false} axisLine={false} />
          <Tooltip content={<ChartTooltipContent />} />
          <Bar dataKey="alunos" fill="var(--color-alunos)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ChartContainer>
    </div>
  )
}
