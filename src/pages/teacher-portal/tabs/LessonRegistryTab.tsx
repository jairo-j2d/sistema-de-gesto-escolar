import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { FileEdit, Clock } from 'lucide-react'

export function LessonRegistryTab({ selectedClass }: { selectedClass: string }) {
  const handleSave = () => {
    toast.success('Diário atualizado com sucesso!')
  }

  return (
    <div className="space-y-6">
      <Card className="border-t-4 border-t-secondary shadow-sm">
        <CardHeader className="bg-muted/10 border-b">
          <CardTitle className="text-lg flex items-center gap-2">
            <FileEdit className="w-5 h-5 text-secondary" /> Registrar Conteúdo - {selectedClass}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5 pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Data da Aula</Label>
              <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
            </div>
            <div className="space-y-2">
              <Label>Carga Horária (Quantidade de Aulas)</Label>
              <Input type="number" defaultValue={2} min={1} max={5} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Conteúdo Ministrado em Sala</Label>
            <Textarea
              placeholder="Descreva detalhadamente os assuntos abordados, páginas do livro e atividades realizadas..."
              rows={6}
              className="resize-none"
            />
          </div>
          <div className="flex justify-end">
            <Button onClick={handleSave} className="bg-secondary text-white">
              Salvar Registro
            </Button>
          </div>
        </CardContent>
      </Card>

      <h3 className="text-lg font-semibold text-secondary flex items-center gap-2">
        <Clock className="w-5 h-5" /> Histórico Recente de Aulas
      </h3>
      <div className="space-y-3">
        <Card className="bg-white">
          <CardContent className="p-4 flex flex-col sm:flex-row gap-4 sm:items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-secondary">Ontem, 14/10/2026</span>
                <span className="text-xs bg-muted px-2 py-0.5 rounded-full font-medium">
                  2 Aulas
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Introdução a Equações de 1º Grau. Resolução de problemas práticos utilizando o livro
                didático (páginas 45 a 48). Atividade em grupo para fixação do conteúdo.
              </p>
            </div>
            <Button variant="ghost" size="sm" className="text-primary self-start">
              Editar
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
