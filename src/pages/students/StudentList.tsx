import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Search, Edit2, Trash2, Eye } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { useAuth } from '@/hooks/use-auth'

export default function StudentList() {
  const navigate = useNavigate()
  const { profile } = useAuth()
  const [search, setSearch] = useState('')
  const [students, setStudents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const isAdmin = profile?.role === 'Administrador'
  const canEdit = ['Administrador', 'Diretor(a)', 'Secretário(a)'].includes(profile?.role || '')

  const fetchStudents = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) toast.error('Erro ao carregar alunos.')
    else setStudents(data || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchStudents()
  }, [])

  const handleDelete = async (id: string) => {
    if (!isAdmin) return toast.error('Você não tem permissão para excluir registros.')
    if (!confirm('Tem certeza que deseja excluir este aluno?')) return
    const { error } = await supabase.from('students').delete().eq('id', id)
    if (error) toast.error('Erro ao excluir aluno.')
    else {
      toast.success('Aluno excluído com sucesso.')
      fetchStudents()
    }
  }

  const filtered = students.filter(
    (s) =>
      (s.name && s.name.toLowerCase().includes(search.toLowerCase())) ||
      (s.cpf && s.cpf.includes(search)) ||
      (s.enrollment_number && s.enrollment_number.toLowerCase().includes(search.toLowerCase())),
  )

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-secondary">Gestão de Alunos</h1>
          <p className="text-muted-foreground mt-1">
            Consulte e gerencie as matrículas ativas da instituição.
          </p>
        </div>
        {canEdit && (
          <Button
            onClick={() => navigate('/alunos/novo')}
            className="bg-primary hover:bg-primary/90 text-white shadow-md"
          >
            <Plus className="w-4 h-4 mr-2" /> Novo Aluno
          </Button>
        )}
      </div>

      <Card className="shadow-sm">
        <CardHeader className="py-4 flex flex-row items-center justify-between border-b bg-muted/20">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome, CPF ou Matrícula..."
              className="pl-9 bg-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="w-32">Matrícula</TableHead>
                  <TableHead>Nome do Aluno</TableHead>
                  <TableHead>Série/Ano</TableHead>
                  <TableHead>Turma</TableHead>
                  <TableHead>Situação</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      Carregando...
                    </TableCell>
                  </TableRow>
                ) : filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                      Nenhum aluno encontrado.
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((s) => (
                    <TableRow key={s.id} className="hover:bg-muted/30 transition-colors">
                      <TableCell className="font-mono text-muted-foreground text-xs">
                        {s.enrollment_number || '-'}
                      </TableCell>
                      <TableCell className="font-bold text-secondary">{s.name}</TableCell>
                      <TableCell>{s.grade}</TableCell>
                      <TableCell>
                        {s.class ? (
                          <Badge
                            variant="outline"
                            className="font-bold text-secondary border-secondary/20"
                          >
                            {s.class}
                          </Badge>
                        ) : (
                          '-'
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            s.status === 'Ativo'
                              ? 'bg-green-600 hover:bg-green-700'
                              : 'bg-red-600 hover:bg-red-700'
                          }
                        >
                          {s.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          title="Visualizar"
                          className="text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                          onClick={() => navigate(`/alunos/${s.id}`)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        {canEdit && (
                          <Button
                            variant="ghost"
                            size="icon"
                            title="Editar"
                            className="text-amber-600 hover:bg-amber-50 hover:text-amber-700"
                            onClick={() => navigate(`/alunos/${s.id}`)}
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                        )}
                        {isAdmin && (
                          <Button
                            variant="ghost"
                            size="icon"
                            title="Excluir"
                            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                            onClick={() => handleDelete(s.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
