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
      <div className="flex min-h-screen w-full bg-background font-sans text-foreground print:bg-white print:block">
        <div className="print:hidden shrink-0 flex">
          <SidebarComponent />
        </div>
        <div className="flex-1 flex flex-col w-full h-screen overflow-hidden print:h-auto print:overflow-visible print:block">
          <div className="print:hidden">
            <HeaderComponent />
          </div>
          <main className="flex-1 overflow-auto bg-slate-50/50 bg-pattern-tri p-4 md:p-6 lg:p-8 print:p-0 print:overflow-visible print:bg-transparent print:block print:w-full">
            <div className="mx-auto max-w-7xl print:max-w-none print:w-full">
              <Outlet />
            </div>
          </main>
        </div>
        <div className="print:hidden">
          <AIChatDrawer />
        </div>
      </div>
    </SidebarProvider>
  )
}
