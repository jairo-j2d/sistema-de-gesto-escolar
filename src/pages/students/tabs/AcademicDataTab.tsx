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

export function AcademicDataTab({ data, onChange }: any) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 animate-fade-in">
      <div className="space-y-2">
        <Label>ID Matrícula</Label>
        <Input value={data.id || ''} disabled className="bg-muted" />
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
        <Select value={data.grade || ''} onValueChange={(v) => onChange('grade', v)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="6º Ano">6º Ano</SelectItem>
            <SelectItem value="7º Ano">7º Ano</SelectItem>
            <SelectItem value="8º Ano">8º Ano</SelectItem>
            <SelectItem value="9º Ano">9º Ano</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Turma</Label>
        <Input
          value={data.classGroup || ''}
          onChange={(e) => onChange('classGroup', e.target.value)}
        />
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
        <Label>Situação Atual</Label>
        <Select value={data.status || ''} onValueChange={(v) => onChange('status', v)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Ativo">Ativo</SelectItem>
            <SelectItem value="Inativo">Inativo</SelectItem>
            <SelectItem value="Transferido">Transferido</SelectItem>
          </SelectContent>
        </Select>
      </div>

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
