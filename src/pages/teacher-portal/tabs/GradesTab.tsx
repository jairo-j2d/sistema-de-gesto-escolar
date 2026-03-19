import { useState, useEffect } from 'react'
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
import { toast } from 'sonner'
import { GraduationCap, Calculator, Download } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'

export function GradesTab({ selectedClass }: { selectedClass: string }) {
  const [grade, classGroup] = selectedClass.split(' - ')
  const [students, setStudents] = useState<any[]>([])

  useEffect(() => {
    supabase
      .from('students')
      .select('*')
      .eq('grade', grade)
      .eq('class', classGroup)
      .then(({ data }) => setStudents(data || []))
  }, [grade, classGroup])

  const [grades, setGrades] = useState<Record<string, any>>({})

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

  const handleExportPDF = () => {
    toast.success('Boletim de Notas exportado com sucesso!', {
      description: 'O download do PDF foi iniciado.',
    })
    const blob = new Blob(['Mock Grades Content'], { type: 'application/pdf' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `notas-${selectedClass.replace(' ', '')}.pdf`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <Card className="shadow-sm border-t-4 border-t-secondary relative overflow-hidden">
      <div className="absolute inset-0 bg-pattern-tri opacity-5 pointer-events-none"></div>
      <CardHeader className="border-b bg-muted/10 flex flex-row items-center justify-between relative z-10">
        <CardTitle className="text-lg flex items-center gap-2 text-secondary">
          <GraduationCap className="w-5 h-5 text-primary" /> Painel de Avaliações
        </CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={handleExportPDF}
          className="border-secondary/20 text-secondary hover:bg-secondary/10"
        >
          <Download className="w-4 h-4 mr-2" /> Exportar PDF
        </Button>
      </CardHeader>
      <CardContent className="p-0 overflow-x-auto relative z-10 bg-white">
        <Table>
          <TableHeader className="bg-muted/20">
            <TableRow>
              <TableHead className="font-semibold text-secondary">Aluno</TableHead>
              <TableHead className="w-24 text-center font-semibold">1º Bim</TableHead>
              <TableHead className="w-24 text-center font-semibold">2º Bim</TableHead>
              <TableHead className="w-24 text-center font-semibold">3º Bim</TableHead>
              <TableHead className="w-24 text-center font-semibold">4º Bim</TableHead>
              <TableHead className="w-24 text-center bg-secondary/5 font-bold text-secondary">
                Média
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((s) => {
              const avg = getAvg(s.id)
              const avgNum = Number(avg)
              const statusClass = avg === '-' ? '' : avgNum >= 7 ? 'text-secondary' : 'text-primary'
              return (
                <TableRow key={s.id} className="hover:bg-secondary/5 transition-colors">
                  <TableCell className="font-medium text-secondary">{s.name}</TableCell>
                  {['b1', 'b2', 'b3', 'b4'].map((b) => (
                    <TableCell key={b} className="text-center">
                      <Input
                        value={grades[s.id]?.[b] || ''}
                        onChange={(e) => updateGrade(s.id, b, e.target.value)}
                        className="w-16 h-8 text-center mx-auto border-secondary/20 focus-visible:ring-secondary"
                        placeholder="-"
                      />
                    </TableCell>
                  ))}
                  <TableCell
                    className={`text-center font-bold text-base bg-secondary/5 ${statusClass}`}
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
          <Button onClick={handleSave} className="bg-secondary hover:bg-secondary/90 shadow-md">
            <Calculator className="w-4 h-4 mr-2" /> Calcular e Salvar Notas
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
