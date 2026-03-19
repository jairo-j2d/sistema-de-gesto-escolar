import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Save, ArrowLeft, Briefcase, Printer } from 'lucide-react'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase/client'
import { MultiSelect } from '@/components/MultiSelect'
import { PrintHeader } from '@/components/PrintHeader'
import { MOCK_STUDENTS } from '@/data/mock'

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

export default function ProfessionalForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [data, setData] = useState<any>({ disciplines: [], grades: [], classes: [], students: [] })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (id) {
      supabase
        .from('professionals')
        .select('*')
        .eq('id', id)
        .single()
        .then(({ data: d, error }) => {
          if (d) setData(d)
          if (error) toast.error('Erro ao carregar os dados.')
        })
    }
  }, [id])

  const toggleArr = (arr: string[] = [], item: string) =>
    arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item]
  const handleChange = (f: string, v: any) => setData((p: any) => ({ ...p, [f]: v }))

  const handleSave = async () => {
    setLoading(true)
    try {
      if (id) {
        const { error } = await supabase.from('professionals').update(data).eq('id', id)
        if (error) throw error
      } else {
        const { error } = await supabase.from('professionals').insert([data])
        if (error) throw error
      }
      toast.success('Profissional salvo com sucesso!')
      navigate('/profissionais')
    } catch (e) {
      toast.error('Ocorreu um erro ao salvar.')
    } finally {
      setLoading(false)
    }
  }

  const textFields = [
    { l: 'Nome', f: 'name', md: true },
    { l: 'CPF', f: 'cpf' },
    { l: 'Matrícula', f: 'registration_number' },
    { l: 'E-mail', f: 'email', t: 'email' },
    { l: 'Telefone', f: 'phone' },
  ]
  const selectFields = [
    { l: 'Vínculo', f: 'employment_type', opts: ['Efetivo', 'Contratado'] },
    { l: 'Carga Horária', f: 'workload', opts: ['100 h/a', '150 h/a', '200 h/a'] },
    {
      l: 'Escolaridade',
      f: 'education',
      opts: [
        'Ensino Médio Completo',
        'Ensino Médio Incompleto',
        'Ensino Fundamental Completo',
        'Ensino Fundamental Incompleto',
        'Analfabeto Funcional',
      ],
    },
    { l: 'Função', f: 'role', opts: ['Professor(a)', 'Coordenador(a)', 'Apoio Pedagógico'] },
    {
      l: 'Transporte',
      f: 'transport_used',
      opts: ['Ônibus', 'Micro-Ônibus', 'Toyota', 'Van', 'Outros'],
    },
  ]

  return (
    <div className="max-w-4xl mx-auto pb-24 animate-fade-in relative print:p-0 print:m-0 print:max-w-none">
      <div className="flex items-center gap-4 mb-6 print:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/profissionais')}
          disabled={loading}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight text-secondary">
          {id ? 'Editar Profissional' : 'Novo Profissional'}
        </h1>
        {id && (
          <Button
            onClick={() => window.print()}
            className="ml-auto bg-secondary/10 text-secondary hover:bg-secondary/20"
          >
            <Printer className="w-4 h-4 mr-2" /> Exportar Ficha
          </Button>
        )}
      </div>

      <Card className="border-t-4 border-t-primary shadow-md relative overflow-hidden bg-background/95 backdrop-blur-sm print:border-none print:shadow-none print:bg-transparent print:rounded-none">
        <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-bl-[100px] pointer-events-none print:hidden" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rotate-45 -translate-x-1/2 translate-y-1/2 pointer-events-none print:hidden" />

        <CardContent className="p-6 relative z-10 print:p-0">
          <PrintHeader />
          <div className="grid grid-cols-1 md:grid-cols-2 print:grid-cols-2 gap-6">
            {textFields.map((i) => (
              <div
                key={i.f}
                className={`space-y-2 ${i.md ? 'md:col-span-2 print:col-span-2' : ''}`}
              >
                <Label>{i.l}</Label>
                <Input
                  type={i.t || 'text'}
                  value={data[i.f] || ''}
                  onChange={(e) => handleChange(i.f, e.target.value)}
                />
              </div>
            ))}
            <div className="space-y-2 md:col-span-2 print:col-span-2">
              <Label>Disciplinas</Label>
              <MultiSelect
                options={DISCIPLINES}
                selected={data.disciplines || []}
                onChange={(v) => handleChange('disciplines', v)}
                placeholder="Selecione as disciplinas"
              />
            </div>
            {selectFields.map((i) => (
              <div key={i.f} className="space-y-2">
                <Label>{i.l}</Label>
                <Select value={data[i.f] || ''} onValueChange={(v) => handleChange(i.f, v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    {i.opts.map((o) => (
                      <SelectItem key={o} value={o}>
                        {o}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>

          {(data.role === 'Professor(a)' || data.role === 'Coordenador(a)') && (
            <div className="space-y-6 mt-8 pt-6 border-t border-dashed border-border/60">
              <h3 className="font-semibold text-lg text-secondary print:text-black">
                Alocação de Turmas
              </h3>
              <div className="space-y-3">
                <Label>Séries Vinculadas</Label>
                <div className="flex flex-wrap gap-4">
                  {['6º Ano', '7º Ano', '8º Ano', '9º Ano'].map((g) => (
                    <label
                      key={g}
                      className="flex items-center gap-2 cursor-pointer bg-muted/40 print:bg-transparent px-3 py-1.5 rounded-md"
                    >
                      <Checkbox
                        checked={data.grades?.includes(g)}
                        onCheckedChange={() => handleChange('grades', toggleArr(data.grades, g))}
                      />
                      <span className="text-sm font-medium">{g}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="space-y-3 mt-4">
                <Label>Turmas Vinculadas</Label>
                <div className="flex flex-wrap gap-4">
                  {['A', 'B', 'C', 'D', 'E'].map((c) => (
                    <label
                      key={c}
                      className="flex items-center gap-2 cursor-pointer bg-muted/40 print:bg-transparent px-3 py-1.5 rounded-md"
                    >
                      <Checkbox
                        checked={data.classes?.includes(c)}
                        onCheckedChange={() => handleChange('classes', toggleArr(data.classes, c))}
                      />
                      <span className="text-sm font-semibold">{c}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {data.role === 'Apoio Pedagógico' && (
            <div className="space-y-6 mt-8 pt-6 border-t border-dashed border-border/60">
              <h3 className="font-semibold text-lg text-secondary print:text-black">
                Vínculo de Alunos (AEE)
              </h3>
              <div className="grid gap-2">
                {MOCK_STUDENTS.filter((s) => s.aee).map((s) => (
                  <label
                    key={s.id}
                    className="flex items-center gap-2 bg-muted/30 print:bg-transparent p-2 rounded border print:border-none cursor-pointer"
                  >
                    <Checkbox
                      checked={data.students?.includes(s.id)}
                      onCheckedChange={() =>
                        handleChange('students', toggleArr(data.students, s.id))
                      }
                    />
                    <span className="text-sm">
                      {s.name} - {s.grade} {s.classGroup}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="fixed bottom-0 left-0 right-0 md:left-[var(--sidebar-width)] bg-background/80 backdrop-blur-md border-t p-4 flex items-center justify-end shadow-lg z-40 print:hidden">
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => navigate('/profissionais')} disabled={loading}>
            Cancelar
          </Button>
          <Button onClick={handleSave} className="bg-primary px-6" disabled={loading}>
            <Save className="w-4 h-4 mr-2" /> {loading ? 'Salvando...' : 'Salvar Cadastro'}
          </Button>
        </div>
      </div>
    </div>
  )
}
