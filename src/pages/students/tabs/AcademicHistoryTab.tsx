import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { supabase } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { Plus, FileText } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function AcademicHistoryTab({ studentId }: { studentId: string }) {
  const [records, setRecords] = useState<any[]>([])
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    year: '',
    school_name: '',
    grade: '',
    status: 'Aprovado',
  })
  const navigate = useNavigate()

  const fetchRecords = async () => {
    if (!studentId) return
    const { data } = await supabase
      .from('academic_records')
      .select('*')
      .eq('student_id', studentId)
      .order('year', { ascending: false })
    if (data) setRecords(data)
  }

  useEffect(() => {
    fetchRecords()
  }, [studentId])

  const handleSave = async () => {
    if (!formData.year || !formData.school_name)
      return toast.error('Preencha o Ano e a Instituição.')
    const { error } = await supabase
      .from('academic_records')
      .insert([{ ...formData, student_id: studentId }])
    if (error) toast.error('Erro ao salvar registro acadêmico.')
    else {
      toast.success('Ano letivo adicionado ao histórico!')
      setOpen(false)
      setFormData({ year: '', school_name: '', grade: '', status: 'Aprovado' })
      fetchRecords()
    }
  }

  return (
    <div className="p-6 space-y-6 animate-fade-in print:hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-secondary">Histórico Acadêmico</h3>
          <p className="text-sm text-muted-foreground">
            Registro de progressão anual para o Histórico Escolar.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            className="border-secondary text-secondary hover:bg-secondary/5 font-semibold"
            disabled={!studentId}
            onClick={() => navigate(`/alunos/${studentId}/historico`)}
          >
            <FileText className="w-4 h-4 mr-2" /> Gerar Documento Oficial (PDF)
          </Button>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                className="bg-primary hover:bg-primary/90 text-white shadow-md"
                disabled={!studentId}
              >
                <Plus className="w-4 h-4 mr-2" /> Adicionar Ano
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-secondary text-xl">Registro de Ano Letivo</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Ano Letivo</Label>
                    <Input
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      placeholder="Ex: 2024"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Série/Ano Escolar</Label>
                    <Input
                      value={formData.grade}
                      onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                      placeholder="Ex: 6º Ano"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Instituição de Ensino</Label>
                  <Input
                    value={formData.school_name}
                    onChange={(e) => setFormData({ ...formData, school_name: e.target.value })}
                    placeholder="Nome da Escola"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Situação Final</Label>
                  <Input
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    placeholder="Ex: Aprovado, Reprovado..."
                  />
                </div>
                <div className="pt-4 border-t flex justify-end">
                  <Button onClick={handleSave} className="bg-primary text-white shadow-sm px-8">
                    Salvar no Histórico
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow>
              <TableHead className="w-32 font-semibold">Ano Letivo</TableHead>
              <TableHead className="w-40 font-semibold">Série/Ano</TableHead>
              <TableHead className="font-semibold">Instituição de Ensino</TableHead>
              <TableHead className="w-40 font-semibold">Situação Final</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground py-12">
                  Nenhum registro acadêmico cadastrado.
                </TableCell>
              </TableRow>
            ) : (
              records.map((r) => (
                <TableRow key={r.id} className="hover:bg-slate-50 transition-colors">
                  <TableCell className="font-bold text-secondary text-base">{r.year}</TableCell>
                  <TableCell className="font-medium text-slate-700">{r.grade}</TableCell>
                  <TableCell className="text-slate-600">{r.school_name}</TableCell>
                  <TableCell className="font-bold text-green-600">{r.status}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
