import { Outlet, Navigate, useLocation } from 'react-router-dom'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import { SidebarComponent } from './SidebarComponent'
import { HeaderComponent } from './HeaderComponent'
import { AIChatDrawer } from './chat/AIChatDrawer'
import { useAuth } from '@/hooks/use-auth'

export default function Layout() {
  const { user, profile, loading } = useAuth()
  const location = useLocation()

  if (loading)
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background text-muted-foreground font-medium">
        Carregando...
      </div>
    )
  if (!user) return <Navigate to="/login" replace />

  const role = profile?.role || ''

  // RBAC Routing Control
  if (
    role === 'Professor(a)' &&
    location.pathname !== '/' &&
    !location.pathname.startsWith('/portal-professor') &&
    !location.pathname.startsWith('/mensagens')
  ) {
    return <Navigate to="/" replace />
  }

  if (
    role === 'Coordenador(a)' &&
    (location.pathname.startsWith('/profissionais') ||
      location.pathname.startsWith('/configuracoes'))
  ) {
    return <Navigate to="/" replace />
  }

  if (
    (role === 'Diretor(a)' || role === 'Secretário(a)') &&
    location.pathname.startsWith('/configuracoes')
  ) {
    return <Navigate to="/" replace />
  }

  return (
    <SidebarProvider>
      <SidebarComponent />
      <SidebarInset className="h-screen overflow-hidden print:h-auto print:overflow-visible print:block flex flex-col flex-1 bg-background">
        <div className="print:hidden">
          <HeaderComponent />
        </div>
        <div className="flex-1 overflow-auto bg-slate-50/50 bg-pattern-tri p-4 md:p-6 lg:p-8 print:p-0 print:overflow-visible print:bg-transparent print:block print:w-full">
          <div className="mx-auto max-w-7xl print:max-w-none print:w-full pb-24 md:pb-8">
            <Outlet />
          </div>
        </div>
      </SidebarInset>
      <div className="print:hidden">
        <AIChatDrawer />
      </div>
    </SidebarProvider>
  )
}
