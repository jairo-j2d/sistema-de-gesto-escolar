import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
import { PrintFooter } from '@/components/PrintFooter'
import { supabase } from '@/lib/supabase/client'
import { Search, Printer, Users, UserSquare2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'

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
  'Educação Física',
]
const EDUCATION_LEVELS = [
  'Ensino Médio Completo',
  'Ensino Médio Incompleto',
  'Ensino Fundamental Completo',
  'Ensino Fundamental Incompleto',
]
const TRANSPORT_METHODS = ['Ônibus', 'Micro-Ônibus', 'Toyota', 'Van', 'Outros']
const GRADES = [
  '1º Ano',
  '2º Ano',
  '3º Ano',
  '4º Ano',
  '5º Ano',
  '6º Ano',
  '7º Ano',
  '8º Ano',
  '9º Ano',
  'EJA',
]
const CLASSES = ['A', 'B', 'C', 'D', 'E', 'F']
const STATUSES = ['Ativo', 'Inativo', 'Transferido', 'Desistente']

const STUDENT_COLUMNS = [
  { label: 'Matrícula', value: 'enrollment_number' },
  { label: 'Nome do Aluno', value: 'name' },
  { label: 'Série/Ano', value: 'grade' },
  { label: 'Turma', value: 'class' },
  { label: 'Situação', value: 'status' },
  { label: 'Data Nasc.', value: 'birth_date' },
  { label: 'CPF', value: 'cpf' },
  { label: 'Responsável', value: 'parent_name' },
]

export default function QueriesPage() {
  const [activeTab, setActiveTab] = useState('alunos')

  const [profs, setProfs] = useState<any[]>([])
  const [pSearch, setPSearch] = useState('')
  const [pDisciplines, setPDisciplines] = useState<string[]>([])
  const [pEducation, setPEducation] = useState('Todos')
  const [pTransport, setPTransport] = useState('Todos')

  const [students, setStudents] = useState<any[]>([])
  const [sSearch, setSSearch] = useState('')
  const [sEnrollment, setSEnrollment] = useState('')
  const [sGrade, setSGrade] = useState('Todos')
  const [sClass, setSClass] = useState('Todos')
  const [sStatus, setSStatus] = useState('Todos')
  const [sColumns, setSColumns] = useState([
    'Matrícula',
    'Nome do Aluno',
    'Série/Ano',
    'Turma',
    'Situação',
  ])

  useEffect(() => {
    supabase
      .from('professionals')
      .select('*')
      .then(({ data }) => setProfs(data || []))
    supabase
      .from('students')
      .select('*')
      .then(({ data }) => setStudents(data || []))
  }, [])

  const filteredProfs = profs.filter((p) => {
    const matchName = !pSearch || (p.name && p.name.toLowerCase().includes(pSearch.toLowerCase()))
    const matchEdu = pEducation === 'Todos' || p.education === pEducation
    const matchTransport = pTransport === 'Todos' || p.transport_used === pTransport
    const matchDisc =
      pDisciplines.length === 0 ||
      (p.disciplines && pDisciplines.some((d: string) => p.disciplines.includes(d)))
    return matchName && matchEdu && matchTransport && matchDisc
  })

  const filteredStudents = students.filter((s) => {
    const matchName = !sSearch || (s.name && s.name.toLowerCase().includes(sSearch.toLowerCase()))
    const matchEnrollment =
      !sEnrollment ||
      (s.enrollment_number && s.enrollment_number.toLowerCase().includes(sEnrollment.toLowerCase()))
    const matchGrade = sGrade === 'Todos' || s.grade === sGrade
    const matchClass = sClass === 'Todos' || s.class === sClass
    const matchStatus = sStatus === 'Todos' || s.status === sStatus
    return matchName && matchEnrollment && matchGrade && matchClass && matchStatus
  })

  return (
    <div className="space-y-6 print:space-y-0 print:m-0 animate-fade-in pb-12 print:pb-0 flex flex-col min-h-full">
      <PrintHeader />

      <div className="flex justify-between items-center print:hidden">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-secondary">Consultas Dinâmicas</h1>
          <p className="text-muted-foreground mt-1">
            Filtre a base de dados e gere relatórios em PDF com assinaturas.
          </p>
        </div>
        <Button onClick={() => window.print()} className="bg-primary text-white shadow-md">
          <Printer className="w-4 h-4 mr-2" /> Exportar PDF
        </Button>
      </div>

      <div className="flex-1">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="print:hidden mb-4 grid grid-cols-2 w-full max-w-md bg-muted/50 p-1">
            <TabsTrigger
              value="alunos"
              className="data-[state=active]:bg-white data-[state=active]:text-primary font-semibold"
            >
              <Users className="w-4 h-4 mr-2" /> Alunos
            </TabsTrigger>
            <TabsTrigger
              value="profissionais"
              className="data-[state=active]:bg-white data-[state=active]:text-secondary font-semibold"
            >
              <UserSquare2 className="w-4 h-4 mr-2" /> Profissionais
            </TabsTrigger>
          </TabsList>

          <TabsContent value="alunos" className="m-0 border-none print:block">
            <Card className="print:shadow-none print:border-none print:bg-transparent">
              <CardHeader className="bg-primary/5 pb-4 border-b border-primary/10 print:hidden space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar por nome..."
                      className="pl-9 bg-white"
                      value={sSearch}
                      onChange={(e) => setSSearch(e.target.value)}
                    />
                  </div>
                  <Input
                    placeholder="Nº Matrícula"
                    className="bg-white"
                    value={sEnrollment}
                    onChange={(e) => setSEnrollment(e.target.value)}
                  />
                  <Select value={sGrade} onValueChange={setSGrade}>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Série/Ano" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Todos">Todas as Séries</SelectItem>
                      {GRADES.map((g) => (
                        <SelectItem key={g} value={g}>
                          {g}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={sClass} onValueChange={setSClass}>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Turma" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Todos">Todas as Turmas</SelectItem>
                      {CLASSES.map((c) => (
                        <SelectItem key={c} value={c}>
                          Turma {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={sStatus} onValueChange={setSStatus}>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Todos">Todos os Status</SelectItem>
                      {STATUSES.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="pt-2 border-t border-primary/10">
                  <Label className="text-xs font-semibold text-muted-foreground mb-2 block uppercase tracking-wider">
                    Colunas do Relatório (PDF)
                  </Label>
                  <MultiSelect
                    options={STUDENT_COLUMNS.map((c) => c.label)}
                    selected={sColumns}
                    onChange={setSColumns}
                    placeholder="Selecione as colunas a serem impressas..."
                  />
                </div>
              </CardHeader>
              <CardContent className="p-0 print:p-0">
                <div className="overflow-x-auto print:overflow-visible">
                  <Table className="print:border print:border-black">
                    <TableHeader className="bg-muted/50 print:bg-transparent print:border-b-2 print:border-black">
                      <TableRow>
                        {STUDENT_COLUMNS.filter((c) => sColumns.includes(c.label)).map((col) => (
                          <TableHead
                            key={col.value}
                            className="print:text-black font-bold print:border-r print:border-black last:border-0"
                          >
                            {col.label}
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredStudents.map((s) => (
                        <TableRow key={s.id} className="print:border-b print:border-black/20">
                          {STUDENT_COLUMNS.filter((c) => sColumns.includes(c.label)).map((col) => {
                            let val = s[col.value] || '-'
                            if (col.value === 'birth_date' && s.birth_date)
                              val = new Date(s.birth_date).toLocaleDateString('pt-BR')
                            const isId = col.value === 'enrollment_number' || col.value === 'cpf'
                            const isName = col.value === 'name'
                            return (
                              <TableCell
                                key={col.value}
                                className={`print:border-r print:border-black print:text-black text-sm last:border-0 ${isId ? 'font-mono text-muted-foreground' : ''} ${isName ? 'font-bold text-secondary' : ''}`}
                              >
                                {val}
                              </TableCell>
                            )
                          })}
                        </TableRow>
                      ))}
                      {filteredStudents.length === 0 && (
                        <TableRow>
                          <TableCell
                            colSpan={sColumns.length || 1}
                            className="h-24 text-center text-muted-foreground"
                          >
                            Nenhum aluno encontrado.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profissionais" className="m-0 border-none print:block">
            <Card className="print:shadow-none print:border-none print:bg-transparent">
              <CardHeader className="bg-secondary/5 pb-4 border-b border-secondary/10 print:hidden">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar por nome..."
                      className="pl-9 bg-white"
                      value={pSearch}
                      onChange={(e) => setPSearch(e.target.value)}
                    />
                  </div>
                  <MultiSelect
                    options={DISCIPLINES}
                    selected={pDisciplines}
                    onChange={setPDisciplines}
                    placeholder="Disciplinas..."
                  />
                  <Select value={pEducation} onValueChange={setPEducation}>
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
                  <Select value={pTransport} onValueChange={setPTransport}>
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
                  <Table className="print:border print:border-black">
                    <TableHeader className="bg-muted/50 print:bg-transparent print:border-b-2 print:border-black">
                      <TableRow>
                        <TableHead className="print:text-black font-bold print:border-r print:border-black">
                          Nome
                        </TableHead>
                        <TableHead className="print:text-black font-bold print:border-r print:border-black">
                          Função
                        </TableHead>
                        <TableHead className="print:text-black font-bold print:border-r print:border-black">
                          Disciplinas
                        </TableHead>
                        <TableHead className="print:text-black font-bold print:border-r print:border-black">
                          Escolaridade
                        </TableHead>
                        <TableHead className="print:text-black font-bold">Transporte</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProfs.map((p) => (
                        <TableRow key={p.id} className="print:border-b print:border-black/20">
                          <TableCell className="font-bold text-secondary print:text-black print:border-r print:border-black">
                            {p.name}
                          </TableCell>
                          <TableCell className="print:text-black print:border-r print:border-black">
                            {p.role}
                          </TableCell>
                          <TableCell className="print:text-black print:border-r print:border-black">
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
                          <TableCell className="print:text-black print:border-r print:border-black">
                            {p.education}
                          </TableCell>
                          <TableCell className="print:text-black">{p.transport_used}</TableCell>
                        </TableRow>
                      ))}
                      {filteredProfs.length === 0 && (
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
          </TabsContent>
        </Tabs>
      </div>

      <PrintFooter />
    </div>
  )
}
