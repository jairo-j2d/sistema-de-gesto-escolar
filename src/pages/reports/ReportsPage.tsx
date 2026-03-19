import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { supabase } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { Building2, Save } from 'lucide-react'

export default function ReportsPage() {
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

  return (
    <div className="space-y-6 animate-fade-in pb-12 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-secondary">Módulo de Relatórios</h1>
        <p className="text-muted-foreground mt-1">
          Gerencie as configurações institucionais para impressão de documentos e relatórios em PDF.
        </p>
      </div>

      <Card className="border-t-4 border-t-secondary shadow-md">
        <CardHeader className="bg-muted/10 border-b">
          <CardTitle className="text-xl flex items-center gap-2">
            <Building2 className="w-6 h-6 text-secondary" /> Cabeçalho Institucional (PDF)
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Estes dados aparecerão no topo de todos os relatórios e perfis gerados pelo sistema.
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
          <div className="md:col-span-2 flex justify-end mt-4 pt-4 border-t border-muted">
            <Button
              onClick={handleSave}
              disabled={saving}
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-white shadow-md font-semibold px-8"
            >
              <Save className="w-5 h-5 mr-2" /> {saving ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
