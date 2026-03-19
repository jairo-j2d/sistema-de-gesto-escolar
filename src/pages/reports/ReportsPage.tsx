import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { FileText, Download, FilePlus, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { supabase } from '@/lib/supabase/client'
import { Badge } from '@/components/ui/badge'

export default function ReportsPage() {
  const [reports, setReports] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  const fetchReports = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('generated_reports')
      .select('*')
      .order('created_at', { ascending: false })
    if (data) setReports(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchReports()
  }, [])

  const filtered = reports.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.category.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-secondary">
            Repositório de Relatórios
          </h1>
          <p className="text-muted-foreground mt-1">
            Gerencie e acesse todos os documentos e relatórios salvos no sistema.
          </p>
        </div>
        <Button className="bg-primary text-white shadow-md">
          <FilePlus className="w-4 h-4 mr-2" /> Novo Documento
        </Button>
      </div>

      <Card className="shadow-sm">
        <CardHeader className="py-4 border-b bg-muted/20">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome ou categoria..."
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
                  <TableHead>Nome do Relatório</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Data de Geração</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                      Carregando...
                    </TableCell>
                  </TableRow>
                ) : filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                      Nenhum relatório encontrado.
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((r) => (
                    <TableRow key={r.id} className="hover:bg-muted/30">
                      <TableCell className="font-semibold text-secondary flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-md text-primary">
                          <FileText className="w-4 h-4" />
                        </div>
                        {r.name}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-normal">
                          {r.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(r.created_at).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-primary hover:text-primary"
                          asChild
                        >
                          <a href={r.file_url || '#'} target="_blank" rel="noopener noreferrer">
                            <Download className="w-4 h-4 mr-2" /> Baixar PDF
                          </a>
                        </Button>
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
