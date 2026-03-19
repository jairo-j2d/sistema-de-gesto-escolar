import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Settings,
  MessageSquare,
  BookOpen,
  FileText,
  Search,
} from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from '@/components/ui/sidebar'
import logoImg from '@/assets/icone-cumaru-pe-c3adf.jpg'

const navItems = [
  { title: 'Dashboard', icon: LayoutDashboard, url: '/' },
  { title: 'Alunos', icon: Users, url: '/alunos' },
  { title: 'Profissionais', icon: GraduationCap, url: '/profissionais' },
  { title: 'Portal do Professor', icon: BookOpen, url: '/portal-professor' },
  { title: 'Consultas', icon: Search, url: '/consultas' },
  { title: 'Relatórios', icon: FileText, url: '/relatorios' },
  { title: 'Mensagens', icon: MessageSquare, url: '/mensagens' },
  { title: 'Configurações', icon: Settings, url: '/configuracoes' },
]

export function SidebarComponent() {
  const location = useLocation()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-transparent shrink-0">
                  <img src={logoImg} alt="Logo" className="size-full object-contain" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Gilda Bertinho Gestão Escolar</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={
                      location.pathname === item.url ||
                      (item.url !== '/' && location.pathname.startsWith(item.url))
                    }
                    tooltip={item.title}
                  >
                    <Link to={item.url}>
                      <item.icon className="size-4 shrink-0" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>{/* Footer items if needed */}</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
