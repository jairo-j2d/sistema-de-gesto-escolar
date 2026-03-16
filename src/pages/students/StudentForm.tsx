import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Save, ArrowLeft, ChevronLeft, ChevronRight, UserCircle } from 'lucide-react'
import { PersonalDataTab } from './tabs/PersonalDataTab'
import { AcademicDataTab } from './tabs/AcademicDataTab'
import { HealthDataTab } from './tabs/HealthDataTab'
import { ObservationsTab } from './tabs/ObservationsTab'
import { MOCK_STUDENTS } from '@/data/mock'
import { toast } from 'sonner'

export default function StudentForm() {
  const { id } = useParams()
  const navigate = useNavigate()

  const existing = MOCK_STUDENTS.find((s) => s.id === id)
  const [data, setData] = useState<any>(
    existing || { id: Math.floor(Math.random() * 10000).toString() },
  )

  const handleChange = (field: string, value: any) =>
    setData((p: any) => ({ ...p, [field]: value }))

  const handleSave = () => {
    toast.success('Cadastro salvo com sucesso!', {
      description: `Os dados do aluno ${data.name || 'novo'} foram atualizados.`,
    })
    navigate('/alunos')
  }

  return (
    <div className="max-w-5xl mx-auto pb-24 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/alunos')}
            className="shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-secondary">
              {id ? 'Editar Cadastro' : 'Novo Cadastro'}
            </h1>
            {id && (
              <p className="text-muted-foreground mt-1">
                Atualizando dados de <strong className="text-secondary">{data.name}</strong>
              </p>
            )}
          </div>
        </div>
      </div>

      <Card className="border-t-4 border-t-primary shadow-md overflow-hidden">
        <CardHeader className="bg-primary/5 pb-6 border-b border-primary/10">
          <CardTitle className="text-primary tracking-wider uppercase text-sm font-bold flex items-center gap-2">
            <UserCircle className="w-5 h-5" /> Formulário de Aluno 2026
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 bg-white">
          <Tabs defaultValue="pessoal" className="w-full">
            <TabsList className="w-full flex justify-start rounded-none border-b h-auto bg-slate-50 p-0 overflow-x-auto">
              <TabsTrigger
                value="pessoal"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-white data-[state=active]:text-primary h-14 px-6 text-sm font-semibold"
              >
                Dados Pessoais
              </TabsTrigger>
              <TabsTrigger
                value="academico"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-white data-[state=active]:text-primary h-14 px-6 text-sm font-semibold"
              >
                Dados Acadêmicos
              </TabsTrigger>
              <TabsTrigger
                value="saude"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-white data-[state=active]:text-primary h-14 px-6 text-sm font-semibold"
              >
                Saúde e Social
              </TabsTrigger>
              <TabsTrigger
                value="obs"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-white data-[state=active]:text-primary h-14 px-6 text-sm font-semibold"
              >
                Observações
              </TabsTrigger>
            </TabsList>
            <div className="min-h-[400px]">
              <TabsContent value="pessoal" className="m-0">
                <PersonalDataTab data={data} onChange={handleChange} />
              </TabsContent>
              <TabsContent value="academico" className="m-0">
                <AcademicDataTab data={data} onChange={handleChange} />
              </TabsContent>
              <TabsContent value="saude" className="m-0">
                <HealthDataTab data={data} onChange={handleChange} />
              </TabsContent>
              <TabsContent value="obs" className="m-0">
                <ObservationsTab data={data} onChange={handleChange} />
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>

      {/* Floating Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 md:left-[var(--sidebar-width)] bg-background/80 backdrop-blur-md border-t p-4 flex items-center justify-between shadow-[0_-10px_30px_rgba(0,0,0,0.05)] z-40">
        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="hidden sm:flex" disabled={!id}>
            <ChevronLeft className="w-5 h-5 text-secondary" />
          </Button>
          <Button variant="outline" size="icon" className="hidden sm:flex" disabled={!id}>
            <ChevronRight className="w-5 h-5 text-secondary" />
          </Button>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <Button
            variant="outline"
            onClick={() => navigate('/alunos')}
            className="flex-1 sm:flex-none"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            className="bg-primary hover:bg-primary/90 text-white shadow-md flex-1 sm:flex-none font-semibold text-base px-6"
          >
            <Save className="w-4 h-4 mr-2" /> Salvar Cadastro
          </Button>
        </div>
      </div>
    </div>
  )
}
