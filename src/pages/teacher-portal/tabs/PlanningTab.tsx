import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { useState } from 'react'
import { Target, FileText, Download, History, RotateCw } from 'lucide-react'

export function PlanningTab({ selectedClass }: { selectedClass: string }) {
  const [obj, setObj] = useState('')
  const [met, setMet] = useState('')
  const [cron, setCron] = useState('')

  const [plans] = useState([
    {
      id: 1,
      date: 'Agosto 2025',
      obj: 'Desenvolver a capacidade de interpretação de textos e resolução de problemas estruturados.',
      met: 'Aulas expositivas e dinâmicas em grupo semanais utilizando material didático padrão.',
      cron: 'Módulo 3 - Duração de 4 semanas',
    },
    {
      id: 2,
      date: 'Março 2025',
      obj: 'Introdução aos conceitos básicos de equações e pensamento lógico.',
      met: 'Exercícios práticos em sala de aula e lições de casa gamificadas.',
      cron: 'Módulo 1 - Duração de 3 semanas',
    },
  ])

  const handleSave = () => {
    if (!obj || !met) return toast.error('Preencha os campos obrigatórios.')
    toast.success('Plano de aula salvo com sucesso!')
    setObj('')
    setMet('')
    setCron('')
  }

  const handleReuse = (plan: any) => {
    setObj(plan.obj)
    setMet(plan.met)
    setCron(plan.cron)
    toast.info('Plano carregado com sucesso para edição.')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleExportPDF = () => {
    if (!obj && !met) return toast.error('Não há dados no formulário para exportar.')
    toast.success('Planejamento exportado para PDF com sucesso!')
    const blob = new Blob(['Plan Content'], { type: 'application/pdf' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `planejamento-${Date.now()}.pdf`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <Card className="border-t-4 border-t-secondary shadow-sm relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-tri opacity-5 pointer-events-none"></div>
        <CardHeader className="bg-muted/10 border-b flex flex-row items-center justify-between relative z-10">
          <CardTitle className="text-lg flex items-center gap-2 text-secondary">
            <Target className="w-5 h-5 text-primary" /> Estruturar Planejamento - {selectedClass}
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportPDF}
            className="border-secondary/20 text-secondary"
          >
            <Download className="w-4 h-4 mr-2" /> Exportar PDF
          </Button>
        </CardHeader>
        <CardContent className="space-y-5 pt-6 relative z-10 bg-white/90 backdrop-blur-sm">
          <div className="space-y-2">
            <Label className="text-base text-secondary font-semibold">
              Objetivos de Aprendizagem
            </Label>
            <Textarea
              value={obj}
              onChange={(e) => setObj(e.target.value)}
              placeholder="O que os alunos devem aprender ou ser capazes de fazer no final desta etapa?"
              className="resize-none h-24 border-secondary/20 focus-visible:ring-secondary"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-base text-secondary font-semibold">
              Estratégias e Metodologias
            </Label>
            <Textarea
              value={met}
              onChange={(e) => setMet(e.target.value)}
              placeholder="Quais métodos e ferramentas serão utilizados? (Ex: Aulas expositivas, debates...)"
              className="resize-none h-24 border-secondary/20 focus-visible:ring-secondary"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-base text-secondary font-semibold">Cronograma Previsto</Label>
            <Textarea
              value={cron}
              onChange={(e) => setCron(e.target.value)}
              placeholder="Distribuição do conteúdo no tempo..."
              className="resize-none h-20 border-secondary/20 focus-visible:ring-secondary"
            />
          </div>
          <div className="flex justify-end pt-4 border-t mt-4">
            <Button
              onClick={handleSave}
              className="bg-secondary hover:bg-secondary/90 text-white shadow-md px-8"
            >
              Gravar Planejamento
            </Button>
          </div>
        </CardContent>
      </Card>

      <h3 className="text-xl font-bold text-secondary flex items-center gap-2 mt-8 mb-4 border-b pb-2">
        <History className="w-6 h-6 text-primary" /> Histórico de Planejamentos
      </h3>
      <div className="grid gap-4 md:grid-cols-2">
        {plans.map((p) => (
          <Card
            key={p.id}
            className="hover:shadow-md transition-shadow border-secondary/20 bg-secondary/5"
          >
            <CardContent className="p-5 space-y-4">
              <div className="flex justify-between items-center border-b border-secondary/10 pb-3">
                <span className="font-bold text-secondary text-lg">Plano Referência</span>
                <span className="text-xs font-bold bg-white border text-secondary px-3 py-1 rounded-full shadow-sm">
                  {p.date}
                </span>
              </div>
              <div>
                <p className="text-xs text-primary uppercase font-bold mb-1 tracking-wider">
                  Objetivos
                </p>
                <p className="text-sm leading-relaxed text-secondary">{p.obj}</p>
              </div>
              <div>
                <p className="text-xs text-primary uppercase font-bold mb-1 tracking-wider">
                  Metodologia
                </p>
                <p className="text-sm leading-relaxed text-secondary line-clamp-2">{p.met}</p>
              </div>
              <div className="flex justify-end mt-4 pt-4 border-t border-secondary/10">
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => handleReuse(p)}
                  className="bg-white text-secondary border hover:bg-secondary hover:text-white transition-colors"
                >
                  <RotateCw className="w-4 h-4 mr-2" /> Reutilizar Conteúdo
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
