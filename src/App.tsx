import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import StudentList from './pages/students/StudentList'
import StudentForm from './pages/students/StudentForm'
import AcademicHistoryPrint from './pages/students/AcademicHistoryPrint'
import ProfessionalList from './pages/professionals/ProfessionalList'
import ProfessionalForm from './pages/professionals/ProfessionalForm'
import TeacherPortal from './pages/teacher-portal/TeacherPortal'
import QueriesPage from './pages/queries/QueriesPage'
import ReportsPage from './pages/reports/ReportsPage'
import SettingsPage from './pages/settings/SettingsPage'
import MessagesPage from './pages/messages/MessagesPage'
import NotFound from './pages/NotFound'
import { AppProvider } from './context/AppProvider'
import { AuthProvider } from './hooks/use-auth'

const App = () => (
  <AuthProvider>
    <AppProvider>
      <BrowserRouter future={{ v7_startTransition: false, v7_relativeSplatPath: false }}>
        <TooltipProvider>
          <Toaster />
          <Sonner position="top-right" />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/alunos/:id/historico" element={<AcademicHistoryPrint />} />
            <Route element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/alunos" element={<StudentList />} />
              <Route path="/alunos/novo" element={<StudentForm />} />
              <Route path="/alunos/:id" element={<StudentForm />} />
              <Route path="/profissionais" element={<ProfessionalList />} />
              <Route path="/profissionais/novo" element={<ProfessionalForm />} />
              <Route path="/profissionais/:id" element={<ProfessionalForm />} />
              <Route path="/portal-professor" element={<TeacherPortal />} />
              <Route path="/consultas" element={<QueriesPage />} />
              <Route path="/relatorios" element={<ReportsPage />} />
              <Route path="/configuracoes" element={<SettingsPage />} />
              <Route path="/mensagens" element={<MessagesPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </BrowserRouter>
    </AppProvider>
  </AuthProvider>
)

export default App
