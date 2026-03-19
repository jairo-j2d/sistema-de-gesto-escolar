import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { AttendanceTab } from './tabs/AttendanceTab'
import { LessonRegistryTab } from './tabs/LessonRegistryTab'
import { GradesTab } from './tabs/GradesTab'
import { PlanningTab } from './tabs/PlanningTab'
import { MessagingHubTab } from './tabs/MessagingHubTab'
import { BookOpen } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'

export default function TeacherPortal() {
  const { profile } = useAuth()

  const availableClasses: string[] = []
  if (profile?.role === 'Professor(a)') {
    const grades = profile.grades || []
    const classes = profile.classes || []
    grades.forEach((g: string) => {
      classes.forEach((c: string) => {
        availableClasses.push(`${g} - ${c}`)
      })
    })
  }

  if (availableClasses.length === 0) {
    availableClasses.push('6º Ano - C', '7º Ano - A', '8º Ano - B')
  }

  const [selectedClass, setSelectedClass] = useState(availableClasses[0])

  useEffect(() => {
    if (availableClasses.length > 0 && !availableClasses.includes(selectedClass)) {
      setSelectedClass(availableClasses[0])
    }
  }, [availableClasses, selectedClass])

  return (
    <div className="space-y-6 animate-fade-in pb-24">
      <div className="relative overflow-hidden bg-white p-6 rounded-xl border shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="absolute inset-0 bg-pattern-hex-white opacity-20 pointer-events-none filter invert"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold tracking-tight text-secondary flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-primary" /> Portal do Professor
          </h1>
          <p className="text-muted-foreground mt-1 text-lg">
            Olá, <strong className="text-primary">{profile?.name || 'Professor(a)'}</strong>!
            Selecione a turma para gerenciar suas atividades pedagógicas.
          </p>
        </div>
        <div className="flex-1 w-full md:w-auto md:min-w-[250px] relative z-10 bg-white/80 p-2 rounded-lg backdrop-blur-sm border shadow-sm">
          <label className="text-xs font-semibold text-muted-foreground uppercase ml-1">
            Turma Ativa
          </label>
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger className="bg-white font-semibold text-secondary mt-1 border-secondary/20">
              <SelectValue placeholder="Selecione a Turma" />
            </SelectTrigger>
            <SelectContent>
              {availableClasses.map((ac) => (
                <SelectItem key={ac} value={ac}>
                  {ac}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="chamada" className="w-full">
        <TabsList className="bg-white border shadow-sm rounded-md h-auto p-1 mb-6 flex flex-wrap sm:flex-nowrap w-full">
          <TabsTrigger
            value="chamada"
            className="flex-1 py-3 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:font-semibold"
          >
            Chamada Digital
          </TabsTrigger>
          <TabsTrigger
            value="registro"
            className="flex-1 py-3 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:font-semibold"
          >
            Diário de Aulas
          </TabsTrigger>
          <TabsTrigger
            value="notas"
            className="flex-1 py-3 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:font-semibold"
          >
            Gestão de Notas
          </TabsTrigger>
          <TabsTrigger
            value="planejamento"
            className="flex-1 py-3 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:font-semibold"
          >
            Planejamento
          </TabsTrigger>
          <TabsTrigger
            value="mensagens"
            className="flex-1 py-3 data-[state=active]:bg-secondary/10 data-[state=active]:text-secondary data-[state=active]:font-semibold relative"
          >
            Hub de Mensagens
          </TabsTrigger>
        </TabsList>
        <div className="mt-4">
          <TabsContent value="chamada" className="m-0">
            <AttendanceTab selectedClass={selectedClass} />
          </TabsContent>
          <TabsContent value="registro" className="m-0">
            <LessonRegistryTab selectedClass={selectedClass} />
          </TabsContent>
          <TabsContent value="notas" className="m-0">
            <GradesTab selectedClass={selectedClass} />
          </TabsContent>
          <TabsContent value="planejamento" className="m-0">
            <PlanningTab selectedClass={selectedClass} />
          </TabsContent>
          <TabsContent value="mensagens" className="m-0">
            <MessagingHubTab />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
