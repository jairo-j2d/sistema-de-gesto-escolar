import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Save, ArrowLeft, ChevronLeft, ChevronRight, UserCircle, Printer } from 'lucide-react'
import { PersonalDataTab } from './tabs/PersonalDataTab'
import { AcademicDataTab } from './tabs/AcademicDataTab'
import { HealthDataTab } from './tabs/HealthDataTab'
import { ObservationsTab } from './tabs/ObservationsTab'
import { PrintHeader } from '@/components/PrintHeader'
import { supabase } from '@/lib/supabase/client'
import { toast } from 'sonner'

export default function StudentForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [data, setData] = useState<any>({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (id) {
      setLoading(true)
      supabase
        .from('students')
        .select('*')
        .eq('id', id)
        .single()
        .then(({ data: d, error }) => {
          if (d) {
            setData({
              ...d,
              ...(d.metadata || {}), // Unpack all extra form fields
              birthDate: d.birth_date,
              motherName: d.parent_name, // Mapping approximation
              classGroup: d.class,
            })
          }
          if (error) toast.error('Erro ao carregar dados do aluno.')
          setLoading(false)
        })
    }
  }, [id])

  const handleChange = (field: string, value: any) =>
    setData((p: any) => ({ ...p, [field]: value }))

  const handleSave = async () => {
    if (!data.name) {
      toast.error('O nome do aluno é obrigatório.')
      return
    }

    const {
      name,
      birthDate,
      birth_date,
      enrollment_number,
      cpf,
      rg,
      address,
      parent_name,
      motherName,
      fatherName,
      phone,
      email,
      grade,
      classGroup,
      class: c,
      status,
      metadata,
      updated_at,
      created_at,
      id: recordId,
      ...rest
    } = data

    const payload = {
      name,
      birth_date: birthDate || null,
      enrollment_number: enrollment_number || `MAT${Math.floor(Math.random() * 100000)}`,
      cpf: cpf || null,
      rg: rg || null,
      address: address || null,
      parent_name: motherName || fatherName || null,
      phone: phone || null,
      email: email || null,
      grade: grade || null,
      class: classGroup || null,
      status: status || 'Ativo',
      metadata: { ...rest, motherName, fatherName, classGroup }, // Save extra fields safely
    }

    try {
      if (id) {
        const { error } = await supabase.from('students').update(payload).eq('id', id)
        if (error) throw error
        toast.success('Cadastro atualizado com sucesso!')
      } else {
        const { error } = await supabase.from('students').insert(payload)
        if (error) throw error
        toast.success('Aluno cadastrado com sucesso!')
      }
      navigate('/alunos')
    } catch (e: any) {
      toast.error(e.message || 'Erro ao salvar o cadastro.')
    }
  }

  return (
    <div className="max-w-5xl mx-auto pb-24 animate-fade-in print:m-0 print:p-0">
      <style>{`
        @media print {
          [role="tabpanel"][data-state="inactive"] { display: block !important; margin-bottom: 2rem; }
          [role="tablist"] { display: none !important; }
          .fixed { display: none !important; }
          .card-wrapper { border: none !important; box-shadow: none !important; }
        }
      `}</style>

      <PrintHeader />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 print:hidden">
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
        {id && (
          <Button onClick={() => window.print()} variant="outline" className="shadow-sm">
            <Printer className="w-4 h-4 mr-2" /> Exportar Perfil (PDF)
          </Button>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center p-12">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <Card className="border-t-4 border-t-primary shadow-md overflow-hidden card-wrapper">
          <CardHeader className="bg-primary/5 pb-6 border-b border-primary/10 print:bg-transparent print:border-b-2 print:border-black">
            <CardTitle className="text-primary print:text-black tracking-wider uppercase text-sm font-bold flex items-center gap-2">
              <UserCircle className="w-5 h-5" /> Formulário de Aluno / Ficha Completa
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 bg-white">
            <Tabs defaultValue="pessoal" className="w-full">
              <TabsList className="w-full flex justify-start rounded-none border-b h-auto bg-slate-50 p-0 overflow-x-auto print:hidden">
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
      )}

      <div className="fixed bottom-0 left-0 right-0 md:left-[var(--sidebar-width)] bg-background/80 backdrop-blur-md border-t p-4 flex items-center justify-between shadow-[0_-10px_30px_rgba(0,0,0,0.05)] z-40 print:hidden">
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
