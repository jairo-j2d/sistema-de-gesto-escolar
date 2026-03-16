import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'

export function HealthDataTab({ data, onChange }: any) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 animate-fade-in">
      <div className="space-y-6">
        <h3 className="font-semibold text-secondary border-b pb-2">Programas Sociais</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Nº Cartão do SUS</Label>
            <Input
              value={data.susCard || ''}
              onChange={(e) => onChange('susCard', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Nº NIS</Label>
            <Input value={data.nis || ''} onChange={(e) => onChange('nis', e.target.value)} />
          </div>
          <div className="flex items-center space-x-3">
            <Checkbox
              id="q"
              checked={data.quilombola}
              onCheckedChange={(v) => onChange('quilombola', v)}
            />
            <Label htmlFor="q" className="cursor-pointer">
              Família Quilombola
            </Label>
          </div>
          <div className="flex items-center space-x-3">
            <Checkbox
              id="bf"
              checked={data.bolsaFamilia}
              onCheckedChange={(v) => onChange('bolsaFamilia', v)}
            />
            <Label htmlFor="bf" className="cursor-pointer">
              Participa do Bolsa Família
            </Label>
          </div>
        </div>

        <h3 className="font-semibold text-secondary border-b pb-2 mt-8 pt-4">Transporte</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Checkbox
              id="tp"
              checked={data.publicTransport}
              onCheckedChange={(v) => onChange('publicTransport', v)}
            />
            <Label htmlFor="tp" className="cursor-pointer">
              Utiliza transporte público/escolar
            </Label>
          </div>
          {data.publicTransport && (
            <div className="pl-7 space-y-2 animate-fade-in">
              <Label>Transporte utilizado</Label>
              <Input
                placeholder="Ex: Ônibus Rota 3..."
                value={data.transportType || ''}
                onChange={(e) => onChange('transportType', e.target.value)}
              />
            </div>
          )}
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="font-semibold text-secondary border-b pb-2">Dados de Saúde</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Checkbox
              id="al"
              checked={data.allergic}
              onCheckedChange={(v) => onChange('allergic', v)}
            />
            <Label htmlFor="al" className="cursor-pointer">
              Aluno é alérgico
            </Label>
          </div>
          {data.allergic && (
            <div className="pl-7 space-y-2 animate-fade-in">
              <Label>Descrição da alergia</Label>
              <Input
                placeholder="Ex: Amendoim, poeira..."
                value={data.allergyDesc || ''}
                onChange={(e) => onChange('allergyDesc', e.target.value)}
              />
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Checkbox
              id="com"
              checked={data.comorbidities}
              onCheckedChange={(v) => onChange('comorbidities', v)}
            />
            <Label htmlFor="com" className="cursor-pointer">
              Aluno possui comorbidade
            </Label>
          </div>
          {data.comorbidities && (
            <div className="pl-7 space-y-2 animate-fade-in">
              <Label>Descrição da comorbidade</Label>
              <Input
                placeholder="Ex: Asma, Diabetes..."
                value={data.comorbiditiesDesc || ''}
                onChange={(e) => onChange('comorbiditiesDesc', e.target.value)}
              />
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Checkbox
              id="def"
              checked={data.disability}
              onCheckedChange={(v) => onChange('disability', v)}
            />
            <Label htmlFor="def" className="cursor-pointer">
              Apresenta deficiência ou habilidade especial
            </Label>
          </div>
          {data.disability && (
            <div className="pl-7 space-y-2 animate-fade-in">
              <Label>Descrição</Label>
              <Input
                placeholder="Ex: Deficiência visual, Altas habilidades..."
                value={data.disabilityDesc || ''}
                onChange={(e) => onChange('disabilityDesc', e.target.value)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
