import { useState } from 'react'
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
import { BookOpen } from 'lucide-react'

export default function TeacherPortal() {
  const [selectedClass, setSelectedClass] = useState('7º Ano - A')

  return (
    <div className="space-y-6 animate-fade-in pb-24">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-secondary flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-primary" /> Portal do Professor
        </h1>
        <p className="text-muted-foreground mt-1">
          Bem-vindo(a)! Selecione a turma para gerenciar suas atividades pedagógicas.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xl bg-white p-4 rounded-lg border shadow-sm">
        <div className="flex-1 space-y-1">
          <label className="text-xs font-semibold text-muted-foreground uppercase">
            Turma Ativa
          </label>
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger className="bg-white font-semibold text-secondary">
              <SelectValue placeholder="Selecione a Turma" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="6º Ano - C">6º Ano - Turma C</SelectItem>
              <SelectItem value="7º Ano - A">7º Ano - Turma A</SelectItem>
              <SelectItem value="8º Ano - B">8º Ano - Turma B</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1 space-y-1">
          <label className="text-xs font-semibold text-muted-foreground uppercase">
            Disciplina
          </label>
          <Select defaultValue="matematica">
            <SelectTrigger className="bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="matematica">Matemática</SelectItem>
              <SelectItem value="portugues">Língua Portuguesa</SelectItem>
              <SelectItem value="ciencias">Ciências</SelectItem>
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
            Chamada Eletrônica
          </TabsTrigger>
          <TabsTrigger
            value="registro"
            className="flex-1 py-3 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:font-semibold"
          >
            Diário de Classe
          </TabsTrigger>
          <TabsTrigger
            value="notas"
            className="flex-1 py-3 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:font-semibold"
          >
            Lançamento de Notas
          </TabsTrigger>
          <TabsTrigger
            value="planejamento"
            className="flex-1 py-3 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:font-semibold"
          >
            Planejamento
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
        </div>
      </Tabs>
    </div>
  )
}
