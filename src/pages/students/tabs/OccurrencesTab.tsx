import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { supabase } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { Plus, Calendar } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export function OccurrencesTab({ studentId }: { studentId: string }) {
  const [occurrences, setOccurrences] = useState<any[]>([])
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    date: '',
    title: '',
    category: 'Disciplinar',
    description: '',
  })

  const fetchOccurrences = async () => {
    if (!studentId) return
    const { data } = await supabase
      .from('student_occurrences')
      .select('*')
      .eq('student_id', studentId)
      .order('date', { ascending: false })
    if (data) setOccurrences(data)
  }

  useEffect(() => {
    fetchOccurrences()
  }, [studentId])

  const handleSave = async () => {
    if (!formData.date || !formData.title) return toast.error('Preencha a Data e o Título.')
    const { error } = await supabase
      .from('student_occurrences')
      .insert([{ ...formData, student_id: studentId }])
    if (error) toast.error('Erro ao salvar ocorrência.')
    else {
      toast.success('Ocorrência registrada com sucesso!')
      setOpen(false)
      setFormData({ date: '', title: '', category: 'Disciplinar', description: '' })
      fetchOccurrences()
    }
  }

  return (
    <div className="p-6 space-y-6 animate-fade-in print:hidden">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-secondary">Registro de Ocorrências</h3>
          <p className="text-sm text-muted-foreground">Acompanhamento disciplinar e pedagógico.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-primary hover:bg-primary/90 text-white shadow-md"
              disabled={!studentId}
            >
              <Plus className="w-4 h-4 mr-2" /> Registrar Ocorrência
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="text-secondary text-xl">Nova Ocorrência</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Data do Ocorrido</Label>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Categoria</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(v) => setFormData({ ...formData, category: v })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Disciplinar">Disciplinar</SelectItem>
                      <SelectItem value="Pedagógica">Pedagógica</SelectItem>
                      <SelectItem value="Saúde">Saúde</SelectItem>
                      <SelectItem value="Outros">Outros</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Título / Motivo</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Ex: Atraso reincidente"
                />
              </div>
              <div className="space-y-2">
                <Label>Descrição Detalhada</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  placeholder="Detalhes do acontecimento e providências..."
                />
              </div>
              <div className="pt-4 border-t flex justify-end">
                <Button onClick={handleSave} className="bg-primary text-white shadow-sm px-8">
                  Salvar Registro
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow>
              <TableHead className="w-40 font-semibold">Data</TableHead>
              <TableHead className="w-40 font-semibold">Categoria</TableHead>
              <TableHead className="font-semibold">Registro</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {occurrences.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-muted-foreground py-12">
                  Nenhuma ocorrência registrada para este aluno.
                </TableCell>
              </TableRow>
            ) : (
              occurrences.map((o) => (
                <TableRow key={o.id} className="hover:bg-slate-50 transition-colors">
                  <TableCell className="font-medium text-slate-700">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />{' '}
                      {new Date(o.date).toLocaleDateString('pt-BR')}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        o.category === 'Disciplinar'
                          ? 'destructive'
                          : o.category === 'Pedagógica'
                            ? 'default'
                            : 'secondary'
                      }
                      className="font-medium"
                    >
                      {o.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <p className="font-bold text-secondary text-sm">{o.title}</p>
                    {o.description && (
                      <p className="text-sm text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                        {o.description}
                      </p>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
