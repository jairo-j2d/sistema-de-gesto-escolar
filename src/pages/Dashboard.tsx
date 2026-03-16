import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, GraduationCap, Bus, Activity, FileText, Search, Sparkles } from 'lucide-react'
import { MOCK_STUDENTS } from '@/data/mock'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '@/context/AppProvider'

function StatCard({ title, value, icon: Icon, color }: any) {
  return (
    <Card
      className="border-l-4 shadow-sm transition-all hover:shadow-md hover:-translate-y-1"
      style={{ borderLeftColor: color }}
    >
      <CardContent className="p-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-3xl font-bold mt-1 text-secondary">{value}</h3>
        </div>
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${color}15`, color }}
        >
          <Icon className="w-6 h-6" />
        </div>
      </CardContent>
    </Card>
  )
}

export default function Dashboard() {
  const navigate = useNavigate()
  const { setAIChatOpen } = useContext(AppContext)

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-secondary">Visão Geral</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Alunos" value={1659} icon={Users} color="#1A237E" />
        <StatCard title="Matrículas Ativas" value={1520} icon={GraduationCap} color="#2E7D32" />
        <StatCard title="Alunos AEE" value={84} icon={Activity} color="#FBC02D" />
        <StatCard title="Transporte Escolar" value={430} icon={Bus} color="#D32F2F" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-semibold text-secondary">Ações Rápidas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card
              className="hover:shadow-md transition-shadow cursor-pointer border border-primary/20 bg-primary/5 hover:bg-primary/10"
              onClick={() => navigate('/alunos/novo')}
            >
              <CardContent className="p-6 flex flex-col items-center justify-center text-center gap-3">
                <div className="p-4 bg-primary text-white rounded-full shadow-inner">
                  <Users className="w-6 h-6" />
                </div>
                <p className="font-semibold text-primary">Novo Cadastro</p>
              </CardContent>
            </Card>
            <Card
              className="hover:shadow-md transition-shadow cursor-pointer hover:bg-secondary/5"
              onClick={() => navigate('/relatorios')}
            >
              <CardContent className="p-6 flex flex-col items-center justify-center text-center gap-3">
                <div className="p-4 bg-secondary/10 text-secondary rounded-full">
                  <FileText className="w-6 h-6" />
                </div>
                <p className="font-semibold text-secondary">Gerar Boletins</p>
              </CardContent>
            </Card>
            <Card
              className="hover:shadow-md transition-shadow cursor-pointer hover:bg-secondary/5"
              onClick={() => navigate('/consultas')}
            >
              <CardContent className="p-6 flex flex-col items-center justify-center text-center gap-3">
                <div className="p-4 bg-secondary/10 text-secondary rounded-full">
                  <Search className="w-6 h-6" />
                </div>
                <p className="font-semibold text-secondary">Consultar Turmas</p>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-xl font-semibold text-secondary mt-8 mb-4">Últimas Atualizações</h2>
          <Card className="overflow-hidden">
            <div className="divide-y">
              {MOCK_STUDENTS.slice(0, 3).map((s) => (
                <div
                  key={s.id}
                  className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
                >
                  <div>
                    <p className="font-semibold text-secondary">{s.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Atualizado em {s.lastUpdate} • {s.grade}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary hover:text-primary hover:bg-primary/10"
                    onClick={() => navigate(`/alunos/${s.id}`)}
                  >
                    Visualizar
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-2 border-primary/20 bg-gradient-to-b from-white to-primary/5 relative overflow-hidden shadow-sm">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <Sparkles className="w-32 h-32 text-primary" />
            </div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary text-xl">
                <Sparkles className="w-5 h-5" /> Assistente IA
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 relative z-10">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Estou aqui para ajudar a cruzar dados e gerar relatórios instantâneos a partir de
                perguntas simples.
              </p>
              <div className="bg-white p-4 rounded-lg border shadow-sm text-sm italic text-muted-foreground">
                "Quantos alunos moram no Sítio Pedra Branca?"
              </div>
              <div className="bg-white p-4 rounded-lg border shadow-sm text-sm italic text-muted-foreground">
                "Gere um relatório de alunos com deficiência visual."
              </div>
              <Button
                onClick={() => setAIChatOpen(true)}
                className="w-full bg-primary hover:bg-primary/90 text-white shadow-md mt-2"
              >
                Iniciar Conversa
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
