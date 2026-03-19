import { useState, useEffect, useRef } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Send, User as UserIcon } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'
import { useAuth } from '@/hooks/use-auth'

export function MessagesView() {
  const { user, profile } = useAuth()
  const [contacts, setContacts] = useState<any[]>([])
  const [selected, setSelected] = useState<any>(null)
  const [messages, setMessages] = useState<any[]>([])
  const [text, setText] = useState('')
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    supabase
      .from('professionals')
      .select('*')
      .not('user_id', 'is', null)
      .then(({ data }) => {
        let filtered = data || []
        if (profile?.role === 'Professor(a)') {
          filtered = filtered.filter((p: any) => p.role === 'Coordenador(a)')
        }
        setContacts(filtered.filter((p: any) => p.user_id !== user?.id))
      })
  }, [profile, user])

  useEffect(() => {
    if (!selected || !user) return
    const fetchMsgs = async () => {
      const { data } = await supabase
        .from('messages')
        .select('*')
        .or(
          `and(sender_id.eq.${user.id},receiver_id.eq.${selected.user_id}),and(sender_id.eq.${selected.user_id},receiver_id.eq.${user.id})`,
        )
        .order('created_at', { ascending: true })
      setMessages(data || [])
      setTimeout(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }), 100)
    }
    fetchMsgs()

    const sub = supabase
      .channel('msgs')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload) => {
          if (
            (payload.new.sender_id === user.id && payload.new.receiver_id === selected.user_id) ||
            (payload.new.sender_id === selected.user_id && payload.new.receiver_id === user.id)
          ) {
            setMessages((p) => [...p, payload.new])
            setTimeout(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }), 100)
          }
        },
      )
      .subscribe()
    return () => {
      supabase.removeChannel(sub)
    }
  }, [selected, user])

  const handleSend = async () => {
    if (!text.trim() || !selected || !user) return
    await supabase.from('messages').insert({
      sender_id: user.id,
      receiver_id: selected.user_id,
      content: text,
    })
    setText('')
  }

  return (
    <div className="flex h-[600px] border rounded-lg bg-white overflow-hidden shadow-sm">
      <div className="w-1/3 border-r bg-muted/10 flex flex-col">
        <div className="p-4 border-b font-semibold text-secondary bg-white">Contatos</div>
        <div className="flex-1 overflow-y-auto">
          {contacts.map((c) => (
            <div
              key={c.id}
              onClick={() => setSelected(c)}
              className={`p-3 cursor-pointer border-b flex items-center gap-3 hover:bg-muted/50 ${selected?.id === c.id ? 'bg-primary/10 border-l-4 border-l-primary' : ''}`}
            >
              <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center shrink-0">
                <UserIcon className="w-5 h-5 text-secondary" />
              </div>
              <div className="overflow-hidden">
                <p className="font-semibold text-sm truncate">{c.name}</p>
                <p className="text-xs text-muted-foreground truncate">{c.role}</p>
              </div>
            </div>
          ))}
          {contacts.length === 0 && (
            <div className="p-4 text-center text-sm text-muted-foreground">
              Nenhum contato disponível.
            </div>
          )}
        </div>
      </div>
      <div className="w-2/3 flex flex-col bg-slate-50/50 relative">
        <div className="absolute inset-0 bg-pattern-tri opacity-5 pointer-events-none"></div>
        {selected ? (
          <>
            <div className="p-4 border-b font-semibold flex items-center gap-2 bg-white relative z-10">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                <UserIcon className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-secondary leading-none">{selected.name}</p>
                <p className="text-xs font-normal text-muted-foreground mt-1">{selected.role}</p>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 relative z-10">
              {messages.map((m) => {
                const isMe = m.sender_id === user?.id
                return (
                  <div key={m.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`p-3 rounded-xl max-w-[80%] text-sm shadow-sm ${isMe ? 'bg-primary text-white rounded-br-sm' : 'bg-white border rounded-bl-sm text-slate-800'}`}
                    >
                      {m.content}
                    </div>
                  </div>
                )
              })}
              {messages.length === 0 && (
                <div className="text-center text-muted-foreground text-sm mt-10">
                  Nenhuma mensagem ainda. Envie um "Olá"!
                </div>
              )}
              <div ref={endRef} />
            </div>
            <div className="p-3 bg-white border-t flex gap-2 relative z-10">
              <Input
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={`Mensagem para ${selected.name.split(' ')[0]}...`}
                className="bg-slate-50"
              />
              <Button onClick={handleSend} size="icon" className="shrink-0 bg-primary text-white">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground relative z-10">
            <MessageSquare className="w-12 h-12 mb-2 opacity-20" />
            <p className="text-sm">Selecione um contato ao lado para iniciar a conversa.</p>
          </div>
        )}
      </div>
    </div>
  )
}
