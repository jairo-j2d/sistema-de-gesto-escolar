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
import {
  Home,
  Users,
  Search,
  FileText,
  Settings,
  LogOut,
  Briefcase,
  BookOpen,
  MessageSquare,
} from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'

export function SidebarComponent() {
  const location = useLocation()
  const { signOut, profile } = useAuth()
  const role = profile?.role || ''

  const items = []

  if (role === 'Administrador' || role === 'Diretor(a)' || role === 'Secretário(a)') {
    items.push({ title: 'Dashboard', icon: Home, url: '/' })
    items.push({ title: 'Portal do Professor', icon: BookOpen, url: '/portal-professor' })
    items.push({ title: 'Alunos', icon: Users, url: '/alunos' })
    items.push({ title: 'Profissionais', icon: Briefcase, url: '/profissionais' })
    items.push({ title: 'Consultas', icon: Search, url: '/consultas' })
    items.push({ title: 'Relatórios', icon: FileText, url: '/relatorios' })
    items.push({ title: 'Mensagens', icon: MessageSquare, url: '/mensagens' })
    if (role === 'Administrador') {
      items.push({ title: 'Configurações', icon: Settings, url: '/configuracoes' })
    }
  } else if (role === 'Coordenador(a)') {
    items.push({ title: 'Dashboard', icon: Home, url: '/' })
    items.push({ title: 'Alunos', icon: Users, url: '/alunos' })
    items.push({ title: 'Consultas', icon: Search, url: '/consultas' })
    items.push({ title: 'Relatórios', icon: FileText, url: '/relatorios' })
    items.push({ title: 'Mensagens', icon: MessageSquare, url: '/mensagens' })
  } else if (role === 'Professor(a)') {
    items.push({ title: 'Dashboard', icon: Home, url: '/' })
    items.push({ title: 'Portal do Professor', icon: BookOpen, url: '/portal-professor' })
    items.push({ title: 'Mensagens', icon: MessageSquare, url: '/mensagens' })
  } else {
    items.push({ title: 'Dashboard', icon: Home, url: '/' })
  }

  return (
    <Sidebar className="border-r shadow-sm print:hidden">
      <SidebarHeader className="h-16 flex items-center px-4 border-b border-white/10 bg-secondary bg-pattern-hex-white text-white shrink-0">
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
              {items.map((item) => {
                const isActive =
                  location.pathname === item.url ||
                  (location.pathname.startsWith(item.url) && item.url !== '/')
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className="h-10 text-white/80 hover:bg-white/10 hover:text-white data-[active=true]:bg-primary data-[active=true]:text-white"
                    >
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
              onClick={() => signOut()}
              className="text-red-400 hover:text-red-300 hover:bg-white/5 cursor-pointer h-10"
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
