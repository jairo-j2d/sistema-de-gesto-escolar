import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import StudentList from './pages/students/StudentList'
import StudentForm from './pages/students/StudentForm'
import ProfessionalList from './pages/professionals/ProfessionalList'
import ProfessionalForm from './pages/professionals/ProfessionalForm'
import TeacherPortal from './pages/teacher-portal/TeacherPortal'
import QueriesPage from './pages/queries/QueriesPage'
import ReportsPage from './pages/reports/ReportsPage'
import ComingSoon from './pages/ComingSoon'
import NotFound from './pages/NotFound'
import { AppProvider } from './context/AppProvider'

const App = () => (
  <AppProvider>
    <BrowserRouter future={{ v7_startTransition: false, v7_relativeSplatPath: false }}>
      <TooltipProvider>
        <Toaster />
        <Sonner position="top-right" />
        <Routes>
          <Route path="/login" element={<Login />} />
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
            <Route
              path="/configuracoes"
              element={<ComingSoon title="Configurações do Sistema" />}
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </BrowserRouter>
  </AppProvider>
)

export default App
