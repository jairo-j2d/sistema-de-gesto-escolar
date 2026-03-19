import { MessagesView } from '@/pages/messages/MessagesView'

export function MessagingHubTab() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-bold text-secondary">Comunicação Interna</h2>
        <p className="text-sm text-muted-foreground">
          Fale diretamente com a coordenação para alinhar pautas e ocorrências.
        </p>
      </div>
      <MessagesView />
    </div>
  )
}
