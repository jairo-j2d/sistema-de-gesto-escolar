import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Send, Bot, User } from 'lucide-react'
import { useState, useContext, useRef, useEffect } from 'react'
import { AppContext } from '@/context/AppProvider'
import { ChartResponse } from './ChartResponse'
import { TableResponse } from './TableResponse'

export function AIChatDrawer() {
  const { isAIChatOpen, setAIChatOpen } = useContext(AppContext)
  const [messages, setMessages] = useState<any[]>([
    {
      role: 'ai',
      content:
        'Olá! Pergunte-me algo sobre os alunos. Ex: "Quais alunos têm deficiência?" ou "Quantidade por série"',
      type: 'text',
    },
  ])
  const [input, setInput] = useState('')
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return
    const userText = input
    setMessages((p) => [...p, { role: 'user', content: userText, type: 'text' }])
    setInput('')
    setTimeout(() => {
      const lower = userText.toLowerCase()
      if (lower.includes('deficiência')) {
        setMessages((p) => [
          ...p,
          {
            role: 'ai',
            content: 'Aqui está a prévia do relatório de alunos com deficiência:',
            type: 'table',
          },
        ])
      } else if (
        lower.includes('quantidade') ||
        lower.includes('série') ||
        lower.includes('grafico')
      ) {
        setMessages((p) => [
          ...p,
          { role: 'ai', content: 'Quantidade de alunos por série:', type: 'chart' },
        ])
      } else {
        setMessages((p) => [
          ...p,
          {
            role: 'ai',
            content: 'Entendido. Estou analisando a base de dados para trazer sua resposta...',
            type: 'text',
          },
        ])
      }
    }, 800)
  }

  return (
    <Sheet open={isAIChatOpen} onOpenChange={setAIChatOpen}>
      <SheetContent className="w-[400px] sm:w-[540px] flex flex-col p-0 border-l-0">
        <SheetHeader className="p-4 border-b bg-muted/30">
          <SheetTitle className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-primary" /> Assistente IA
          </SheetTitle>
          <SheetDescription>Consulte os dados escolares de forma inteligente.</SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-auto p-4 space-y-4">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.role === 'ai' && (
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
              )}
              <div
                className={`p-3 rounded-lg max-w-[85%] ${m.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}
              >
                {m.type === 'text' && <p className="text-sm">{m.content}</p>}
                {m.type === 'table' && (
                  <>
                    <p className="text-sm mb-2">{m.content}</p>
                    <TableResponse />
                  </>
                )}
                {m.type === 'chart' && (
                  <>
                    <p className="text-sm mb-2">{m.content}</p>
                    <ChartResponse />
                  </>
                )}
              </div>
              {m.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center shrink-0">
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          ))}
          <div ref={endRef} />
        </div>
        <div className="p-4 border-t flex gap-2 bg-background">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Escreva sua consulta..."
          />
          <Button onClick={handleSend} size="icon" className="shrink-0">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
