import { useState } from 'react'
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
import { MOCK_STUDENTS } from '@/data/mock'
import { toast } from 'sonner'
import { Check, X, Users } from 'lucide-react'

export function AttendanceTab({ selectedClass }: { selectedClass: string }) {
  const [grade, classGroup] = selectedClass.split(' - ')
  const students = MOCK_STUDENTS.filter((s) => s.grade === grade && s.classGroup === classGroup)
  const [attendance, setAttendance] = useState<Record<string, boolean>>({})

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

  return (
    <Card className="border-t-4 border-t-primary shadow-sm">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b bg-muted/10">
        <div>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Users className="w-5 h-5 text-primary" /> Frequência Diária
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Marque a presença dos alunos listados abaixo.
          </p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Input
            type="date"
            className="w-full sm:w-40 bg-white"
            defaultValue={new Date().toISOString().split('T')[0]}
          />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="p-4 flex gap-2 border-b bg-white">
          <Button variant="outline" size="sm" onClick={() => markAll(true)}>
            Todos Presentes
          </Button>
          <Button variant="outline" size="sm" onClick={() => markAll(false)}>
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
              <TableRow key={s.id} className="hover:bg-muted/20">
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
                          ? 'bg-green-600 hover:bg-green-700 text-white'
                          : 'text-muted-foreground'
                      }
                      onClick={() => setAttendance((p) => ({ ...p, [s.id]: true }))}
                    >
                      <Check className="w-4 h-4 mr-1" /> Presente
                    </Button>
                    <Button
                      size="sm"
                      variant={attendance[s.id] === false ? 'destructive' : 'outline'}
                      className={attendance[s.id] === false ? '' : 'text-muted-foreground'}
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
            className="bg-primary text-white shadow-md font-semibold px-8"
          >
            Confirmar e Salvar Chamada
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
