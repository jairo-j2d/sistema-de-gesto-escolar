import { SidebarTrigger } from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { User, Bell } from 'lucide-react'
import logoImg from '@/assets/39027474_204147847122063_635923255961583616_n-42988.png'
import { useAuth } from '@/hooks/use-auth'

export function HeaderComponent() {
  const { user } = useAuth()

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-background px-4 shadow-sm">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <div className="flex items-center gap-2 md:hidden">
          <img src={logoImg} alt="Logo" className="w-8 h-8 rounded-sm object-contain" />
          <span className="font-semibold text-sm truncate max-w-[180px]">Gilda Bertino Gomes</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive" />
        </Button>

        <div className="flex items-center gap-2 text-sm">
          <span className="hidden md:inline-block font-medium">{user?.email || 'Usuário'}</span>
          <Button variant="secondary" size="icon" className="rounded-full">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
