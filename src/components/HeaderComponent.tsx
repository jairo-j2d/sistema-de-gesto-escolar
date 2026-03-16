import { Bell, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { useLocation, Link } from 'react-router-dom'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { useContext } from 'react'
import { AppContext } from '@/context/AppProvider'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export function HeaderComponent() {
  const location = useLocation()
  const path = location.pathname.split('/').filter(Boolean)
  const { setAIChatOpen } = useContext(AppContext)

  return (
    <header className="h-16 border-b bg-background flex items-center justify-between px-4 sticky top-0 z-30 shadow-sm">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
        <Breadcrumb className="hidden sm:flex">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Início</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {path.map((segment, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="capitalize">
                    {segment.replace('-', ' ')}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </div>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setAIChatOpen(true)}
          className="hidden md:flex border-primary text-primary hover:bg-primary hover:text-white transition-colors"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          Assistente IA
        </Button>
        <Button variant="ghost" size="icon" className="text-muted-foreground relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full"></span>
        </Button>
        <div className="w-px h-6 bg-border mx-1"></div>
        <Avatar className="w-8 h-8 ring-2 ring-primary/20">
          <AvatarImage src="https://img.usecurling.com/ppl/thumbnail?gender=female&seed=2" />
          <AvatarFallback>AD</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
