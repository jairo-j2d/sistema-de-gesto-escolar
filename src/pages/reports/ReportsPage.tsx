import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell, PieChart, Pie } from 'recharts'
import { supabase } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { Building2, Save, BarChart3, PieChart as PieChartIcon } from 'lucide-react'

const chartConfig = { count: { label: 'Total', color: 'hsl(var(--primary))' } }

export default function ReportsPage() {
  const [profs, setProfs] = useState<any[]>([])
  const [settings, setSettings] = useState<any>({})
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    supabase
      .from('professionals')
      .select('*')
      .then(({ data }) => setProfs(data || []))
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

  const eduMap = profs.reduce((acc, p) => {
    const k = p.education || 'Não Informado'
    acc[k] = (acc[k] || 0) + 1
    return acc
  }, {} as any)
  const eduData = Object.keys(eduMap).map((k, i) => ({
    name: k,
    count: eduMap[k],
    fill: `hsl(var(--chart-${(i % 5) + 1}))`,
  }))

  const transMap = profs.reduce((acc, p) => {
    const k = p.transport_used || 'Não Informado'
    acc[k] = (acc[k] || 0) + 1
    return acc
  }, {} as any)
  const transData = Object.keys(transMap).map((k, i) => ({
    name: k,
    count: transMap[k],
    fill: `hsl(var(--chart-${(i % 5) + 1}))`,
  }))

  const fields = [
    { f: 'school_name', l: 'Nome da Escola' },
    { f: 'logo_url', l: 'URL da Logo' },
    { f: 'address', l: 'Endereço Completo' },
    { f: 'cnpj', l: 'CNPJ' },
    { f: 'inep_code', l: 'Código INEP' },
    { f: 'portaria', l: 'Portaria' },
  ]

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-secondary">Módulo de Relatórios</h1>
        <p className="text-muted-foreground mt-1">
          Dashboard socioeconômico e configurações de impressão.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" /> Nível de Escolaridade
            </CardTitle>
          </CardHeader>
          <CardContent>
            {eduData.length > 0 ? (
              <ChartContainer config={chartConfig} className="h-[250px] w-full">
                <BarChart data={eduData}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis
                    dataKey="name"
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v) => v.split(' ')[0]}
                  />
                  <YAxis />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                  <Bar dataKey="count" radius={4}>
                    {eduData.map((e, i) => (
                      <Cell key={i} fill={e.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ChartContainer>
            ) : (
              <p className="text-center text-muted-foreground py-10">Sem dados.</p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <PieChartIcon className="w-5 h-5 text-primary" /> Uso de Transporte
            </CardTitle>
          </CardHeader>
          <CardContent>
            {transData.length > 0 ? (
              <ChartContainer config={chartConfig} className="h-[250px] w-full">
                <PieChart>
                  <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                  <Pie
                    data={transData}
                    dataKey="count"
                    nameKey="name"
                    innerRadius={60}
                    strokeWidth={2}
                  >
                    {transData.map((e, i) => (
                      <Cell key={i} fill={e.fill} />
                    ))}
                  </Pie>
                  <ChartLegend content={<ChartLegendContent />} className="flex-wrap" />
                </PieChart>
              </ChartContainer>
            ) : (
              <p className="text-center text-muted-foreground py-10">Sem dados.</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="border-t-4 border-t-secondary shadow-md">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Building2 className="w-5 h-5 text-secondary" /> Dados da Instituição (Cabeçalho PDF)
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fields.map((field) => (
            <div key={field.f} className="space-y-2">
              <Label>{field.l}</Label>
              <Input
                value={settings[field.f] || ''}
                onChange={(e) => setSettings({ ...settings, [field.f]: e.target.value })}
              />
            </div>
          ))}
          <div className="md:col-span-2 flex justify-end mt-4">
            <Button
              onClick={handleSave}
              disabled={saving}
              className="bg-secondary hover:bg-secondary/90 text-white shadow-md"
            >
              <Save className="w-4 h-4 mr-2" /> {saving ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
