import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Bell, Megaphone, Info, MailOpen, AlertCircle } from 'lucide-react'

export function MessagingHubTab() {
  const notifications = [
    {
      id: 1,
      title: 'Reunião Pedagógica Geral',
      date: '15/10/2026',
      content:
        'Lembrete: Reunião geral de professores nesta sexta-feira às 14h no auditório principal. Pauta: Avaliação do bimestre e novas diretrizes metodológicas.',
      type: 'alert',
      sender: 'Coordenação Escolar',
      read: false,
    },
    {
      id: 2,
      title: 'Prazo para Fechamento de Notas',
      date: '10/10/2026',
      content:
        'O sistema de notas será fechado para o 3º bimestre no dia 20/10. Por favor, garantam que todos os registros estejam atualizados.',
      type: 'warning',
      sender: 'Secretaria',
      read: false,
    },
    {
      id: 3,
      title: 'Novo Material de Apoio Disponível',
      date: '05/10/2026',
      content:
        'Informamos que os novos livros de apoio para a educação especial (AEE) já se encontram disponíveis na biblioteca para retirada.',
      type: 'info',
      sender: 'Direção',
      read: true,
    },
  ]

  const getIcon = (type: string) => {
    switch (type) {
      case 'alert':
        return <Megaphone className="w-5 h-5 text-primary" />
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-amber-500" />
      default:
        return <Info className="w-5 h-5 text-secondary" />
    }
  }

  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'alert':
        return 'bg-primary hover:bg-primary/90'
      case 'warning':
        return 'bg-amber-500 hover:bg-amber-600 text-white'
      default:
        return 'bg-secondary hover:bg-secondary/90'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-secondary flex items-center gap-2">
            <Bell className="w-6 h-6 text-primary" /> Central de Comunicação
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            Avisos e informativos da coordenação escolar.
          </p>
        </div>
        <Button variant="outline" size="sm" className="text-secondary border-secondary/20">
          <MailOpen className="w-4 h-4 mr-2" /> Marcar todos como lidos
        </Button>
      </div>

      <div className="grid gap-4">
        {notifications.map((n) => (
          <Card
            key={n.id}
            className={`transition-shadow hover:shadow-md border-l-4 ${!n.read ? 'border-l-primary bg-primary/5' : 'border-l-secondary bg-white'}`}
          >
            <CardContent className="p-5 flex flex-col sm:flex-row gap-4">
              <div className="mt-1 shrink-0 bg-white p-2 rounded-full shadow-sm border">
                {getIcon(n.type)}
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-lg text-secondary leading-none">{n.title}</h3>
                    {!n.read && (
                      <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="font-semibold">{n.sender}</span> • {n.date}
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-secondary/80">{n.content}</p>
                <div className="pt-2">
                  <Badge className={getBadgeColor(n.type)}>
                    {n.type === 'alert'
                      ? 'Importante'
                      : n.type === 'warning'
                        ? 'Atenção'
                        : 'Informativo'}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
