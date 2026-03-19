import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { MultiSelect } from '@/components/MultiSelect'
import { PrintHeader } from '@/components/PrintHeader'
import { supabase } from '@/lib/supabase/client'
import { Search, Printer } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const DISCIPLINES = [
  'Português',
  'Matemática',
  'História',
  'Geografia',
  'Ciências',
  'Física',
  'Química',
  'Biologia',
  'Inglês',
  'Interpretação de Texto',
  'Redação',
  'Ensino Religioso',
  'Educação Física',
  'Educação Socioemocional',
  'Libras',
]
const EDUCATION_LEVELS = [
  'Ensino Médio Completo',
  'Ensino Médio Incompleto',
  'Ensino Fundamental Completo',
  'Ensino Fundamental Incompleto',
  'Analfabeto Funcional',
]
const TRANSPORT_METHODS = ['Ônibus', 'Micro-Ônibus', 'Toyota', 'Van', 'Outros']

export default function QueriesPage() {
  const [profs, setProfs] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [disciplines, setDisciplines] = useState<string[]>([])
  const [education, setEducation] = useState('Todos')
  const [transport, setTransport] = useState('Todos')

  useEffect(() => {
    supabase
      .from('professionals')
      .select('*')
      .then(({ data }) => setProfs(data || []))
  }, [])

  const filtered = profs.filter((p) => {
    const matchName = !search || (p.name && p.name.toLowerCase().includes(search.toLowerCase()))
    const matchEdu = education === 'Todos' || p.education === education
    const matchTransport = transport === 'Todos' || p.transport_used === transport
    const matchDisc =
      disciplines.length === 0 ||
      (p.disciplines && disciplines.some((d: string) => p.disciplines.includes(d)))
    return matchName && matchEdu && matchTransport && matchDisc
  })

  return (
    <div className="space-y-6 print:space-y-0 print:m-0 animate-fade-in">
      <div className="flex justify-between items-center print:hidden">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-secondary">Consultas Dinâmicas</h1>
          <p className="text-muted-foreground mt-1">
            Filtre a base de profissionais e gere relatórios.
          </p>
        </div>
        <Button onClick={() => window.print()} className="bg-primary text-white shadow-md">
          <Printer className="w-4 h-4 mr-2" /> Gerar Relatório
        </Button>
      </div>

      <Card className="print:shadow-none print:border-none print:bg-transparent">
        <PrintHeader />
        <CardHeader className="bg-muted/20 pb-4 border-b print:hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome..."
                className="pl-9 bg-white"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <MultiSelect
              options={DISCIPLINES}
              selected={disciplines}
              onChange={setDisciplines}
              placeholder="Disciplinas..."
            />
            <Select value={education} onValueChange={setEducation}>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Escolaridade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Todos">Todas as Escolaridades</SelectItem>
                {EDUCATION_LEVELS.map((l) => (
                  <SelectItem key={l} value={l}>
                    {l}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={transport} onValueChange={setTransport}>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Transporte" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Todos">Todos os Transportes</SelectItem>
                {TRANSPORT_METHODS.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="p-0 print:p-0">
          <div className="overflow-x-auto print:overflow-visible">
            <Table>
              <TableHeader className="bg-muted/50 print:bg-transparent print:border-b-2 print:border-black">
                <TableRow>
                  <TableHead className="print:text-black font-bold">Nome</TableHead>
                  <TableHead className="print:text-black font-bold">Função</TableHead>
                  <TableHead className="print:text-black font-bold">Disciplinas</TableHead>
                  <TableHead className="print:text-black font-bold">Escolaridade</TableHead>
                  <TableHead className="print:text-black font-bold">Transporte</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((p) => (
                  <TableRow key={p.id} className="print:border-b print:border-black/20">
                    <TableCell className="font-bold text-secondary print:text-black">
                      {p.name}
                    </TableCell>
                    <TableCell className="print:text-black">{p.role}</TableCell>
                    <TableCell className="print:text-black">
                      <div className="flex flex-wrap gap-1">
                        {p.disciplines?.map((d: string) => (
                          <Badge
                            key={d}
                            variant="outline"
                            className="text-[10px] print:border-none print:p-0 print:font-normal print:mr-1"
                          >
                            {d}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="print:text-black">{p.education}</TableCell>
                    <TableCell className="print:text-black">{p.transport_used}</TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                      Nenhum profissional encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
