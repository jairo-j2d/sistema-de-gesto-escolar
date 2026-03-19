import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { supabase } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { Building2, Save, PenTool } from 'lucide-react'

export default function SettingsPage() {
  const [settings, setSettings] = useState<any>({})
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    supabase
      .from('school_settings')
      .select('*')
      .limit(1)
      .single()
      .then(({ data }) => {
        if (data) setSettings(data)
      })
  }, [])

  const handleSave = async () => {
    if (!settings.id) return
    setSaving(true)
    try {
      const { error } = await supabase
        .from('school_settings')
        .update({
          school_name: settings.school_name,
          logo_url: settings.logo_url,
          address: settings.address,
          cnpj: settings.cnpj,
          inep_code: settings.inep_code,
          portaria: settings.portaria,
          director_signature_url: settings.director_signature_url,
          coordinator_signature_url: settings.coordinator_signature_url,
          secretary_signature_url: settings.secretary_signature_url,
        })
        .eq('id', settings.id)
      if (error) throw error
      toast.success('Configurações salvas com sucesso!')
    } catch (e) {
      toast.error('Erro ao salvar as configurações.')
    } finally {
      setSaving(false)
    }
  }

  const fields = [
    { f: 'school_name', l: 'Nome da Escola' },
    { f: 'logo_url', l: 'URL da Logo' },
    { f: 'address', l: 'Endereço Completo' },
    { f: 'cnpj', l: 'CNPJ' },
    { f: 'inep_code', l: 'Código INEP' },
    { f: 'portaria', l: 'Portaria' },
  ]
  const signatures = [
    { f: 'director_signature_url', l: 'Diretor(a)' },
    { f: 'coordinator_signature_url', l: 'Coordenador(a)' },
    { f: 'secretary_signature_url', l: 'Secretário(a)' },
  ]

  return (
    <div className="space-y-6 animate-fade-in pb-12 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-secondary">
          Configurações do Sistema
        </h1>
        <p className="text-muted-foreground mt-1">
          Gerencie dados institucionais e assinaturas digitais para documentos.
        </p>
      </div>

      <Card className="border-t-4 border-t-secondary shadow-md">
        <CardHeader className="bg-muted/10 border-b">
          <CardTitle className="text-xl flex items-center gap-2">
            <Building2 className="w-6 h-6 text-secondary" /> Cabeçalho Institucional
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Estes dados aparecerão no topo de todos os relatórios e perfis gerados.
          </p>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
          {fields.map((field) => (
            <div key={field.f} className="space-y-2">
              <Label className="font-semibold text-slate-700">{field.l}</Label>
              <Input
                value={settings[field.f] || ''}
                onChange={(e) => setSettings({ ...settings, [field.f]: e.target.value })}
                className="bg-white"
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-t-4 border-t-primary shadow-md">
        <CardHeader className="bg-muted/10 border-b">
          <CardTitle className="text-xl flex items-center gap-2">
            <PenTool className="w-6 h-6 text-primary" /> Assinaturas Digitais (URLs)
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Adicione os links das imagens com as assinaturas para o rodapé dos relatórios.
          </p>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          {signatures.map((sig) => (
            <div key={sig.f} className="space-y-2">
              <Label className="font-semibold text-slate-700">{sig.l}</Label>
              <Input
                value={settings[sig.f] || ''}
                onChange={(e) => setSettings({ ...settings, [sig.f]: e.target.value })}
                placeholder="https://..."
                className="bg-white"
              />
              {settings[sig.f] && (
                <div className="mt-3 p-2 border rounded bg-slate-50 flex items-center justify-center h-24">
                  <img src={settings[sig.f]} alt={sig.l} className="max-h-full object-contain" />
                </div>
              )}
            </div>
          ))}
          <div className="md:col-span-3 flex justify-end mt-4 pt-4 border-t border-muted">
            <Button
              onClick={handleSave}
              disabled={saving}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white shadow-md font-semibold px-8"
            >
              <Save className="w-5 h-5 mr-2" /> {saving ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
