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
import { Plus, Search, Edit2, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { useAuth } from '@/hooks/use-auth'

export default function ProfessionalList() {
  const navigate = useNavigate()
  const { role } = useAuth()
  const [search, setSearch] = useState('')
  const [professionals, setProfessionals] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const isAdmin = role === 'Administrador'
  const canEdit = ['Administrador', 'Diretor(a)', 'Secretário(a)'].includes(role)

  const fetchProfessionals = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('professionals')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) toast.error('Erro ao carregar profissionais.')
    else setProfessionals(data || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchProfessionals()
  }, [])

  const handleDelete = async (id: string) => {
    if (!isAdmin) return toast.error('Apenas o Administrador pode excluir registros.')
    if (!confirm('Tem certeza que deseja excluir este profissional?')) return
    const { error } = await supabase.from('professionals').delete().eq('id', id)
    if (error) toast.error('Erro ao excluir profissional.')
    else {
      toast.success('Profissional excluído com sucesso.')
      fetchProfessionals()
    }
  }

  const filtered = professionals.filter(
    (p) =>
      p.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.role?.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-secondary">Profissionais</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie professores, coordenadores e equipe de apoio.
          </p>
        </div>
        {canEdit && (
          <Button
            onClick={() => navigate('/profissionais/novo')}
            className="bg-primary hover:bg-primary/90 text-white shadow-md"
          >
            <Plus className="w-4 h-4 mr-2" /> Novo Profissional
          </Button>
        )}
      </div>

      <Card className="shadow-sm">
        <CardHeader className="py-4 flex flex-row items-center justify-between border-b bg-muted/20">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome ou função..."
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
                  <TableHead>Nome</TableHead>
                  <TableHead>Função</TableHead>
                  <TableHead>Escolaridade</TableHead>
                  <TableHead>Situação</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      Carregando...
                    </TableCell>
                  </TableRow>
                ) : filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                      Nenhum profissional encontrado.
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((p) => (
                    <TableRow key={p.id} className="hover:bg-muted/30 transition-colors">
                      <TableCell className="font-bold text-secondary">{p.name}</TableCell>
                      <TableCell>{p.role || '-'}</TableCell>
                      <TableCell>{p.education || '-'}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            p.status === 'Ativo' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600'
                          }
                        >
                          {p.status || 'Inativo'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {canEdit && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-amber-600 hover:bg-amber-50 hover:text-amber-700"
                            onClick={() => navigate(`/profissionais/${p.id}`)}
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                        )}
                        {isAdmin && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                            onClick={() => handleDelete(p.id)}
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
