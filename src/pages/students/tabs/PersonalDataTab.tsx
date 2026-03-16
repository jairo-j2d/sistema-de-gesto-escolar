import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function PersonalDataTab({ data, onChange }: any) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 animate-fade-in">
      <div className="space-y-2">
        <Label>Nome Completo do Aluno</Label>
        <Input
          value={data.name || ''}
          onChange={(e) => onChange('name', e.target.value)}
          placeholder="Ex: Maria da Silva"
        />
      </div>
      <div className="space-y-2">
        <Label>CPF</Label>
        <Input
          value={data.cpf || ''}
          onChange={(e) => onChange('cpf', e.target.value)}
          placeholder="000.000.000-00"
        />
      </div>
      <div className="space-y-2">
        <Label>Data de Nascimento</Label>
        <Input
          type="date"
          value={data.birthDate || ''}
          onChange={(e) => onChange('birthDate', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Sexo</Label>
        <Select value={data.gender || ''} onValueChange={(v) => onChange('gender', v)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Feminino">Feminino</SelectItem>
            <SelectItem value="Masculino">Masculino</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Cor/Raça</Label>
        <Select value={data.race || ''} onValueChange={(v) => onChange('race', v)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Branca">Branca</SelectItem>
            <SelectItem value="Preta">Preta</SelectItem>
            <SelectItem value="Parda">Parda</SelectItem>
            <SelectItem value="Amarela">Amarela</SelectItem>
            <SelectItem value="Indígena">Indígena</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Fator RH</Label>
        <Input
          value={data.rhFactor || ''}
          onChange={(e) => onChange('rhFactor', e.target.value)}
          placeholder="Ex: O+"
        />
      </div>

      <div className="space-y-2 md:col-span-2 lg:col-span-3">
        <Label>Nome da Mãe</Label>
        <Input
          value={data.motherName || ''}
          onChange={(e) => onChange('motherName', e.target.value)}
        />
      </div>
      <div className="space-y-2 md:col-span-2 lg:col-span-3">
        <Label>Nome do Pai</Label>
        <Input
          value={data.fatherName || ''}
          onChange={(e) => onChange('fatherName', e.target.value)}
        />
      </div>

      <div className="space-y-2 lg:col-span-2">
        <Label>Endereço Residencial</Label>
        <Input value={data.address || ''} onChange={(e) => onChange('address', e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label>Número / Complemento</Label>
        <Input
          value={data.addressNumber || ''}
          onChange={(e) => onChange('addressNumber', e.target.value)}
        />
      </div>
    </div>
  )
}
