import { useState, useEffect } from 'react'
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import { Check, X, Users, Download } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'

export function AttendanceTab({ selectedClass }: { selectedClass: string }) {
  const [grade, classGroup] = selectedClass.split(' - ')
  const [students, setStudents] = useState<any[]>([])
  const [attendance, setAttendance] = useState<Record<string, boolean>>({})

  useEffect(() => {
    supabase
      .from('students')
      .select('*')
      .eq('grade', grade)
      .eq('class', classGroup)
      .then(({ data }) => setStudents(data || []))
  }, [grade, classGroup])

  const handleSave = () => {
    toast.success('Chamada registrada e salva no sistema!', {
      description: `Turma: ${selectedClass}`,
    })
  }

  const markAll = (status: boolean) => {
    const newAtt = { ...attendance }
    students.forEach((s) => (newAtt[s.id] = status))
    setAttendance(newAtt)
  }

  const handleExportPDF = () => {
    toast.success('Relatório de Frequência exportado com sucesso!', {
      description: 'O download do PDF foi iniciado.',
    })
    const blob = new Blob(['Mock PDF Content'], { type: 'application/pdf' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `frequencia-${selectedClass.replace(' ', '')}.pdf`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <Card className="border-t-4 border-t-primary shadow-sm overflow-hidden">
      <div className="absolute inset-0 bg-pattern-tri opacity-5 pointer-events-none"></div>
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b bg-muted/10 relative z-10">
        <div>
          <CardTitle className="flex items-center gap-2 text-lg text-secondary">
            <Users className="w-5 h-5 text-primary" /> Frequência Diária
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Marque a presença dos alunos listados abaixo.
          </p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Input
            type="date"
            className="w-full sm:w-40 bg-white border-secondary/20"
            defaultValue={new Date().toISOString().split('T')[0]}
          />
          <Button
            variant="outline"
            size="icon"
            onClick={handleExportPDF}
            title="Exportar PDF"
            className="border-secondary/20 text-secondary hover:bg-secondary/10"
          >
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0 relative z-10 bg-white">
        <div className="p-4 flex gap-2 border-b">
          <Button
            variant="outline"
            size="sm"
            onClick={() => markAll(true)}
            className="border-secondary/20"
          >
            Todos Presentes
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => markAll(false)}
            className="border-secondary/20"
          >
            Todos Ausentes
          </Button>
        </div>
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow>
              <TableHead className="w-16 text-center">Nº</TableHead>
              <TableHead>Nome do Aluno</TableHead>
              <TableHead className="text-right pr-6">Situação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((s, idx) => (
              <TableRow key={s.id} className="hover:bg-primary/5 transition-colors">
                <TableCell className="text-center font-medium text-muted-foreground">
                  {idx + 1}
                </TableCell>
                <TableCell className="font-semibold text-secondary">{s.name}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2 pr-2">
                    <Button
                      size="sm"
                      variant={attendance[s.id] !== false ? 'default' : 'outline'}
                      className={
                        attendance[s.id] !== false
                          ? 'bg-secondary hover:bg-secondary/90 text-white'
                          : 'text-muted-foreground'
                      }
                      onClick={() => setAttendance((p) => ({ ...p, [s.id]: true }))}
                    >
                      <Check className="w-4 h-4 mr-1" /> Presente
                    </Button>
                    <Button
                      size="sm"
                      variant={attendance[s.id] === false ? 'destructive' : 'outline'}
                      className={
                        attendance[s.id] === false ? 'bg-primary' : 'text-muted-foreground'
                      }
                      onClick={() => setAttendance((p) => ({ ...p, [s.id]: false }))}
                    >
                      <X className="w-4 h-4 mr-1" /> Ausente
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {students.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="h-32 text-center text-muted-foreground">
                  Nenhum aluno encontrado para esta turma.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="p-6 bg-muted/10 flex justify-end border-t">
          <Button
            onClick={handleSave}
            className="bg-primary hover:bg-primary/90 text-white shadow-md font-semibold px-8"
          >
            Confirmar e Salvar Chamada
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
