import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

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
const EJA_MODULES = [
  '1º Módulo',
  '2º Módulo',
  '3º Módulo',
  '4º Módulo',
  '5º Módulo',
  '6º Módulo',
  '7º Módulo',
  '8º Módulo',
]
const CLASSES = ['A', 'B', 'C', 'D', 'E', 'F']
const STATUSES = ['Ativo', 'Inativo', 'Transferido', 'Desistente']

export function AcademicDataTab({ data, onChange }: any) {
  const showModule = data.grade === 'EJA'
  const showOccurrenceDate = data.status === 'Transferido' || data.status === 'Desistente'

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 animate-fade-in">
      <div className="space-y-2">
        <Label>Nº Matrícula</Label>
        <Input
          value={data.enrollment_number || ''}
          onChange={(e) => onChange('enrollment_number', e.target.value)}
          placeholder="Ex: MAT12345"
        />
      </div>
      <div className="space-y-2">
        <Label>Código INEP</Label>
        <Input value={data.inep || ''} onChange={(e) => onChange('inep', e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label>Data de Cadastro</Label>
        <Input
          type="date"
          value={data.registrationDate || ''}
          onChange={(e) => onChange('registrationDate', e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label>Data de Admissão</Label>
        <Input
          type="date"
          value={data.admissionDate || ''}
          onChange={(e) => onChange('admissionDate', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Série/Ano</Label>
        <Select
          value={data.grade || ''}
          onValueChange={(v) => {
            onChange('grade', v)
            if (v !== 'EJA') onChange('module', '')
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione..." />
          </SelectTrigger>
          <SelectContent>
            {GRADES.map((g) => (
              <SelectItem key={g} value={g}>
                {g}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {showModule && (
        <div className="space-y-2 animate-fade-in">
          <Label className="text-primary font-semibold">Módulo (EJA)</Label>
          <Select value={data.module || ''} onValueChange={(v) => onChange('module', v)}>
            <SelectTrigger className="border-primary/50">
              <SelectValue placeholder="Selecione..." />
            </SelectTrigger>
            <SelectContent>
              {EJA_MODULES.map((m) => (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="space-y-2">
        <Label>Turma</Label>
        <Select value={data.classGroup || ''} onValueChange={(v) => onChange('classGroup', v)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione..." />
          </SelectTrigger>
          <SelectContent>
            {CLASSES.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Turno</Label>
        <Select value={data.shift || ''} onValueChange={(v) => onChange('shift', v)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Matutino">Matutino</SelectItem>
            <SelectItem value="Vespertino">Vespertino</SelectItem>
            <SelectItem value="Noturno">Noturno</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Situação Cadastral</Label>
        <Select
          value={data.status || ''}
          onValueChange={(v) => {
            onChange('status', v)
            if (v !== 'Transferido' && v !== 'Desistente') onChange('occurrenceDate', '')
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione..." />
          </SelectTrigger>
          <SelectContent>
            {STATUSES.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {showOccurrenceDate && (
        <div className="space-y-2 animate-fade-in">
          <Label className="text-destructive font-semibold">Data do Ocorrido</Label>
          <Input
            type="date"
            className="border-destructive/50"
            value={data.occurrenceDate || ''}
            onChange={(e) => onChange('occurrenceDate', e.target.value)}
          />
        </div>
      )}

      <div className="col-span-full mt-4 flex gap-8 p-4 bg-muted/30 rounded-lg border">
        <div className="flex items-center space-x-3">
          <Checkbox id="aee" checked={data.aee} onCheckedChange={(v) => onChange('aee', v)} />
          <Label htmlFor="aee" className="font-medium cursor-pointer">
            Participa do AEE
          </Label>
        </div>
        <div className="flex items-center space-x-3">
          <Checkbox
            id="fortalecimento"
            checked={data.fortalecimento}
            onCheckedChange={(v) => onChange('fortalecimento', v)}
          />
          <Label htmlFor="fortalecimento" className="font-medium cursor-pointer">
            Programa Fortalecimento
          </Label>
        </div>
      </div>
    </div>
  )
}
