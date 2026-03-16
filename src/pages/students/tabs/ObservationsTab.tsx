import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

export function ObservationsTab({ data, onChange }: any) {
  return (
    <div className="p-6 space-y-4 animate-fade-in">
      <Label className="text-secondary font-semibold">Observações Gerais</Label>
      <p className="text-sm text-muted-foreground mb-2">
        Adicione informações relevantes sobre o histórico do aluno, comportamento ou orientações
        específicas.
      </p>
      <Textarea
        rows={12}
        value={data.observations || ''}
        onChange={(e) => onChange('observations', e.target.value)}
        placeholder="Digite as observações aqui..."
        className="resize-none border-secondary/20 focus-visible:ring-primary shadow-inner bg-slate-50"
      />
    </div>
  )
}
