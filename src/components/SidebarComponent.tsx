import { Link, useLocation } from 'react-router-dom'
import {
  BookOpen,
  GraduationCap,
  Search,
  FileText,
  MessageSquare,
  Settings,
  LayoutDashboard,
  LogOut,
} from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar'
import logoImg from '@/assets/39027474_204147847122063_635923255961583616_n-42988.png'
import { useAuth } from '@/hooks/use-auth'

const menuItems = [
  { title: 'Dashboard', icon: LayoutDashboard, url: '/' },
  { title: 'Portal do Professor', icon: BookOpen, url: '/profissionais' },
  { title: 'Aluno', icon: GraduationCap, url: '/alunos' },
  { title: 'Consultas', icon: Search, url: '/consultas' },
  { title: 'Relatórios', icon: FileText, url: '/relatorios' },
  { title: 'Mensagens', icon: MessageSquare, url: '/mensagens' },
  { title: 'Configurações', icon: Settings, url: '/configuracoes' },
]

export function SidebarComponent() {
  const location = useLocation()
  const { signOut } = useAuth()
  const { state, setOpenMobile, isMobile } = useSidebar()

  const handleLinkClick = () => {
    if (isMobile) {
      setOpenMobile(false)
    }
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4">
        <Link to="/" className="flex items-center gap-3 overflow-hidden" onClick={handleLinkClick}>
          <img
            src={logoImg}
            alt="Logo Escola Municipal"
            className="w-8 h-8 flex-shrink-0 object-contain rounded-md"
          />
          {state === 'expanded' && (
            <span className="font-semibold text-xs leading-tight whitespace-nowrap">
              Escola Municipal
              <br />
              Prof. Gilda Bertino Gomes
            </span>
          )}
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={
                      location.pathname === item.url ||
                      (item.url !== '/' && location.pathname.startsWith(item.url))
                    }
                    tooltip={item.title}
                  >
                    <Link to={item.url} onClick={handleLinkClick}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => signOut()} tooltip="Sair">
              <LogOut className="w-4 h-4" />
              <span>Sair</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
