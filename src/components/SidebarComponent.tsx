import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { Home, Users, Search, FileText, Settings, LogOut, Briefcase, BookOpen } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '@/context/AppProvider'

export function SidebarComponent() {
  const location = useLocation()
  const { logout, user } = useContext(AppContext)

  const adminItems = [
    { title: 'Dashboard', icon: Home, url: '/' },
    { title: 'Portal do Professor', icon: BookOpen, url: '/portal-professor' },
    { title: 'Alunos', icon: Users, url: '/alunos' },
    { title: 'Profissionais', icon: Briefcase, url: '/profissionais' },
    { title: 'Consultas', icon: Search, url: '/consultas' },
    { title: 'Relatórios', icon: FileText, url: '/relatorios' },
    { title: 'Configurações', icon: Settings, url: '/configuracoes' },
  ]

  const teacherItems = [{ title: 'Portal do Professor', icon: BookOpen, url: '/portal-professor' }]

  const navItems = user?.role === 'Professor(a)' ? teacherItems : adminItems

  return (
    <Sidebar className="border-r shadow-sm">
      <SidebarHeader className="h-16 flex items-center px-4 border-b border-white/10 bg-secondary bg-pattern-hex-white text-white">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center font-bold text-white shadow-sm shrink-0">
            GB
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="font-bold text-sm leading-tight truncate">Gilda Bertino</span>
            <span className="text-[10px] text-white/70">Gestão Escolar</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-secondary bg-pattern-hex-white text-sidebar-foreground">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="mt-4 gap-2 px-2 relative z-10">
              {navItems.map((item) => {
                const isActive =
                  location.pathname === item.url ||
                  (location.pathname.startsWith(item.url) && item.url !== '/')
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive} className="h-10">
                      <Link to={item.url}>
                        <item.icon className="w-5 h-5 mr-3" />
                        <span className="font-medium">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-white/10 bg-secondary bg-pattern-hex-white p-4">
        <SidebarMenu className="relative z-10">
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={logout}
              className="text-red-400 hover:text-red-300 hover:bg-white/5"
            >
              <LogOut className="w-5 h-5 mr-3" />
              <span className="font-medium">Sair do Sistema</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
