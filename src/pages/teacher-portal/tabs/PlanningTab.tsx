import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { useState } from 'react'
import { Target, FileText } from 'lucide-react'

export function PlanningTab({ selectedClass }: { selectedClass: string }) {
  const [plans] = useState([
    {
      id: 1,
      date: 'Outubro 2026',
      obj: 'Desenvolver a capacidade de interpretação de textos e resolução de problemas estruturados.',
      met: 'Aulas expositivas e dinâmicas em grupo semanais.',
      cron: 'Módulo 3 - Duração de 4 semanas',
    },
  ])

  const handleSave = () => {
    toast.success('Plano de aula salvo com sucesso!')
  }

  return (
    <div className="space-y-6">
      <Card className="border-t-4 border-t-indigo-600 shadow-sm">
        <CardHeader className="bg-muted/10 border-b">
          <CardTitle className="text-lg flex items-center gap-2">
            <Target className="w-5 h-5 text-indigo-600" /> Estruturar Planejamento - {selectedClass}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5 pt-6">
          <div className="space-y-2">
            <Label className="text-base">Objetivos de Aprendizagem</Label>
            <Textarea
              placeholder="O que os alunos devem aprender ou ser capazes de fazer no final desta etapa?"
              className="resize-none h-24 bg-indigo-50/30"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-base">Estratégias e Metodologias</Label>
            <Textarea
              placeholder="Quais métodos e ferramentas serão utilizados? (Ex: Aulas expositivas, debates, pesquisas...)"
              className="resize-none h-24 bg-indigo-50/30"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-base">Cronograma Previsto</Label>
            <Textarea
              placeholder="Distribuição do conteúdo no tempo..."
              className="resize-none h-20 bg-indigo-50/30"
            />
          </div>
          <div className="flex justify-end pt-2">
            <Button
              onClick={handleSave}
              className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md"
            >
              Gravar Planejamento
            </Button>
          </div>
        </CardContent>
      </Card>

      <h3 className="text-lg font-semibold text-secondary flex items-center gap-2 mt-8">
        <FileText className="w-5 h-5" /> Acervo de Planejamentos
      </h3>
      <div className="grid gap-4 md:grid-cols-2">
        {plans.map((p) => (
          <Card key={p.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5 space-y-3">
              <div className="flex justify-between items-center border-b pb-2">
                <span className="font-bold text-indigo-700">Plano Bimestral</span>
                <span className="text-xs font-semibold bg-muted px-2 py-1 rounded">{p.date}</span>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase font-bold mb-1">Objetivos</p>
                <p className="text-sm leading-relaxed">{p.obj}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase font-bold mb-1">
                  Metodologia
                </p>
                <p className="text-sm leading-relaxed">{p.met}</p>
              </div>
              <div className="flex justify-end mt-4 pt-2 border-t">
                <Button variant="ghost" size="sm" className="text-indigo-600 hover:bg-indigo-50">
                  Editar Plano
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
