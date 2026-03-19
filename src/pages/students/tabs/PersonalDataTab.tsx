import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Camera } from 'lucide-react'

const UFS = [
  'AC',
  'AL',
  'AP',
  'AM',
  'BA',
  'CE',
  'DF',
  'ES',
  'GO',
  'MA',
  'MT',
  'MS',
  'MG',
  'PA',
  'PB',
  'PR',
  'PE',
  'PI',
  'RJ',
  'RN',
  'RS',
  'RO',
  'RR',
  'SC',
  'SP',
  'SE',
  'TO',
]
const STREET_TYPES = ['Rua', 'Avenida', 'Vila', 'Distrito', 'Sítio', 'Travessa', 'Praça', 'Rodovia']

export function PersonalDataTab({ data, onChange }: any) {
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      onChange('photo', url)
    }
  }

  return (
    <div className="p-6 animate-fade-in space-y-8">
      {/* Photo Section */}
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="flex-shrink-0 flex flex-col items-center print:hidden">
          <Label className="block mb-2 font-medium">Foto 3x4</Label>
          <div className="relative w-32 h-40 border-2 border-dashed border-muted-foreground/30 rounded-lg flex flex-col items-center justify-center bg-slate-50 overflow-hidden group hover:border-primary transition-colors cursor-pointer">
            {data.photo ? (
              <img src={data.photo} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <div className="flex flex-col items-center gap-2 p-4 text-center">
                <Camera className="w-8 h-8 text-muted-foreground/50 group-hover:text-primary transition-colors" />
                <span className="text-[10px] text-muted-foreground">Clique para alterar</span>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
        </div>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          <div className="space-y-2 lg:col-span-2">
            <Label>
              Nome Completo do Aluno <span className="text-destructive">*</span>
            </Label>
            <Input
              value={data.name || ''}
              onChange={(e) => onChange('name', e.target.value)}
              placeholder="Ex: Maria da Silva"
              required
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
            <Label>CPF</Label>
            <Input
              value={data.cpf || ''}
              onChange={(e) => onChange('cpf', e.target.value)}
              placeholder="000.000.000-00"
            />
          </div>
          <div className="space-y-2">
            <Label>RG</Label>
            <Input
              value={data.rg || ''}
              onChange={(e) => onChange('rg', e.target.value)}
              placeholder="0.000.000"
            />
          </div>
          <div className="space-y-2">
            <Label>E-mail</Label>
            <Input
              type="email"
              value={data.email || ''}
              onChange={(e) => onChange('email', e.target.value)}
              placeholder="aluno@email.com"
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
          <div className="space-y-2">
            <Label>Telefone / WhatsApp</Label>
            <Input
              value={data.phone || ''}
              onChange={(e) => onChange('phone', e.target.value)}
              placeholder="(00) 00000-0000"
            />
          </div>
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-4 text-secondary">Endereço Residencial</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-2">
            <Label>Tipo de Logradouro</Label>
            <Select value={data.streetType || ''} onValueChange={(v) => onChange('streetType', v)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione..." />
              </SelectTrigger>
              <SelectContent>
                {STREET_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 lg:col-span-2">
            <Label>Logradouro / Endereço</Label>
            <Input
              value={data.address || ''}
              onChange={(e) => onChange('address', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Número</Label>
            <Input
              value={data.addressNumber || ''}
              onChange={(e) => onChange('addressNumber', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Complemento</Label>
            <Input
              value={data.addressComplement || ''}
              onChange={(e) => onChange('addressComplement', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Bairro</Label>
            <Input
              value={data.neighborhood || ''}
              onChange={(e) => onChange('neighborhood', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>UF</Label>
            <Select value={data.state || ''} onValueChange={(v) => onChange('state', v)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione..." />
              </SelectTrigger>
              <SelectContent>
                {UFS.map((uf) => (
                  <SelectItem key={uf} value={uf}>
                    {uf}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 lg:col-span-2">
            <Label>Ponto de Referência</Label>
            <Input
              value={data.referencePoint || ''}
              onChange={(e) => onChange('referencePoint', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
