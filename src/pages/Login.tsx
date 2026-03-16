import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useContext, useState } from 'react'
import { AppContext } from '@/context/AppProvider'
import { useNavigate } from 'react-router-dom'
import { ShieldCheck } from 'lucide-react'

export default function Login() {
  const { login } = useContext(AppContext)
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    login()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border-t-4 border-t-primary">
        <CardHeader className="text-center pb-8 pt-8">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white shadow-lg">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <CardTitle className="text-2xl font-bold text-secondary">Sistema de Gestão</CardTitle>
          <CardDescription className="font-medium mt-1">Escola Gilda Bertino Gomes</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2 text-left">
              <Label htmlFor="email">E-mail Corporativo</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@escola.gov.br"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2 text-left">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Senha</Label>
                <a href="#" className="text-xs text-primary hover:underline">
                  Esqueceu a senha?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white mt-8 h-12 text-lg font-semibold shadow-md"
            >
              Acessar Sistema
            </Button>
          </form>
          <div className="mt-8 text-center text-xs text-muted-foreground">
            <p>Acesso restrito a funcionários autorizados da prefeitura municipal.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
