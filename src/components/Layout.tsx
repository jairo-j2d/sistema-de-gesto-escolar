import { Outlet, Navigate, useLocation } from 'react-router-dom'
import { SidebarProvider } from '@/components/ui/sidebar'
import { SidebarComponent } from './SidebarComponent'
import { HeaderComponent } from './HeaderComponent'
import { AIChatDrawer } from './chat/AIChatDrawer'
import { useContext } from 'react'
import { AppContext } from '@/context/AppProvider'

export default function Layout() {
  const { isAuthenticated, user } = useContext(AppContext)
  const location = useLocation()

  if (!isAuthenticated) return <Navigate to="/login" replace />

  const isTeacher = user?.role === 'Professor(a)'
  const isTeacherRoute = location.pathname.startsWith('/portal-professor')

  if (isTeacher && !isTeacherRoute) {
    return <Navigate to="/portal-professor" replace />
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background font-sans text-foreground">
        <SidebarComponent />
        <div className="flex-1 flex flex-col w-full h-screen overflow-hidden">
          <HeaderComponent />
          <main className="flex-1 overflow-auto bg-slate-50/50 p-4 md:p-6 lg:p-8">
            <div className="mx-auto max-w-7xl">
              <Outlet />
            </div>
          </main>
        </div>
        <AIChatDrawer />
      </div>
    </SidebarProvider>
  )
}
