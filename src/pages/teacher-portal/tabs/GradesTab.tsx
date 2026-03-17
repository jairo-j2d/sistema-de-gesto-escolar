import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { MOCK_STUDENTS } from '@/data/mock'
import { toast } from 'sonner'
import { GraduationCap, Calculator } from 'lucide-react'

export function GradesTab({ selectedClass }: { selectedClass: string }) {
  const [grade, classGroup] = selectedClass.split(' - ')
  const students = MOCK_STUDENTS.filter((s) => s.grade === grade && s.classGroup === classGroup)

  // Initialize mock grades
  const [grades, setGrades] = useState<Record<string, any>>({
    '1659': { b1: '8.0', b2: '7.5', b3: '', b4: '' },
    '1660': { b1: '6.0', b2: '6.5', b3: '7.0', b4: '' },
    '1661': { b1: '9.0', b2: '8.5', b3: '9.5', b4: '' },
  })

  const updateGrade = (id: string, period: string, val: string) => {
    setGrades((p) => ({
      ...p,
      [id]: { ...(p[id] || {}), [period]: val },
    }))
  }

  const getAvg = (id: string) => {
    const g = grades[id] || {}
    const sum =
      (Number(g.b1) || 0) + (Number(g.b2) || 0) + (Number(g.b3) || 0) + (Number(g.b4) || 0)
    let count = 0
    if (g.b1) count++
    if (g.b2) count++
    if (g.b3) count++
    if (g.b4) count++
    if (count === 0) return '-'
    return (sum / count).toFixed(1)
  }

  const handleSave = () => toast.success('Notas atualizadas e calculadas com sucesso!')

  return (
    <Card className="shadow-sm">
      <CardHeader className="border-b bg-muted/10">
        <CardTitle className="text-lg flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-primary" /> Painel de Avaliações
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 overflow-x-auto">
        <Table>
          <TableHeader className="bg-muted/20">
            <TableRow>
              <TableHead>Aluno</TableHead>
              <TableHead className="w-24 text-center">1º Bim</TableHead>
              <TableHead className="w-24 text-center">2º Bim</TableHead>
              <TableHead className="w-24 text-center">3º Bim</TableHead>
              <TableHead className="w-24 text-center">4º Bim</TableHead>
              <TableHead className="w-24 text-center bg-primary/5 font-bold">Média</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((s) => {
              const avg = getAvg(s.id)
              const avgNum = Number(avg)
              const statusClass = avg === '-' ? '' : avgNum >= 7 ? 'text-green-600' : 'text-red-600'
              return (
                <TableRow key={s.id} className="hover:bg-muted/10">
                  <TableCell className="font-medium text-secondary">{s.name}</TableCell>
                  {['b1', 'b2', 'b3', 'b4'].map((b) => (
                    <TableCell key={b} className="text-center">
                      <Input
                        value={grades[s.id]?.[b] || ''}
                        onChange={(e) => updateGrade(s.id, b, e.target.value)}
                        className="w-16 h-8 text-center mx-auto"
                        placeholder="-"
                      />
                    </TableCell>
                  ))}
                  <TableCell
                    className={`text-center font-bold text-base bg-primary/5 ${statusClass}`}
                  >
                    {avg}
                  </TableCell>
                </TableRow>
              )
            })}
            {students.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                  Nenhum aluno encontrado para esta turma.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="p-4 bg-muted/10 border-t flex justify-end">
          <Button onClick={handleSave} className="bg-primary shadow-md">
            <Calculator className="w-4 h-4 mr-2" /> Calcular e Salvar Notas
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
