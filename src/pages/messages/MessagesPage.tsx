import { MessagesView } from './MessagesView'

export default function MessagesPage() {
  return (
    <div className="space-y-6 animate-fade-in pb-12 flex flex-col h-full">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-secondary">Hub de Mensagens</h1>
        <p className="text-muted-foreground mt-1">
          Comunique-se com a equipe escolar e coordenação em tempo real.
        </p>
      </div>
      <div className="flex-1">
        <MessagesView />
      </div>
    </div>
  )
}
