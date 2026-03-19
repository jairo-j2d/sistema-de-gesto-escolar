import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { ShieldCheck } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'
import { toast } from 'sonner'

export default function Login() {
  const { signIn, user, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('admin@escola.gov.br')
  const [password, setPassword] = useState('admin123')
  const [loading, setLoading] = useState(false)

  if (user && !authLoading) {
    return <Navigate to="/" replace />
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await signIn(email, password)
    if (error) {
      toast.error('Erro ao fazer login. Verifique suas credenciais.')
      setLoading(false)
    } else {
      navigate('/')
    }
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
              <Label htmlFor="email">E-mail de Acesso</Label>
              <Input
                id="email"
                type="email"
                placeholder="Ex: admin@escola.gov.br"
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
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 text-white mt-8 h-12 text-lg font-semibold shadow-md"
            >
              {loading ? 'Acessando...' : 'Acessar Sistema'}
            </Button>
          </form>
          <div className="mt-8 text-center space-y-2 text-xs text-muted-foreground bg-muted/20 p-3 rounded">
            <p className="font-semibold">Credenciais de Teste:</p>
            <p>Admin: admin@escola.gov.br / admin123</p>
            <p>Coord: coord@escola.gov.br / coord123</p>
            <p>Prof: prof@escola.gov.br / prof123</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
