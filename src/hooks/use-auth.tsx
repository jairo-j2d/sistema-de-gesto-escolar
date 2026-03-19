import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase/client'

interface AuthContextType {
  user: User | null
  session: Session | null
  profile: any | null
  role: string
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signOut: () => Promise<{ error: any }>
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<any | null>(null)
  const [role, setRole] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (!session) {
        setProfile(null)
        setRole('')
        setLoading(false)
      }
    })

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (!session) setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        try {
          const [profileRes, roleRes] = await Promise.all([
            supabase.from('professionals').select('*').eq('user_id', user.id).maybeSingle(),
            supabase.rpc('get_user_role'),
          ])

          if (profileRes.data) {
            setProfile(profileRes.data)
          } else {
            setProfile(null)
          }

          let fetchedRole = ''
          if (roleRes.data) {
            fetchedRole = roleRes.data as string
          } else if (profileRes.data?.role) {
            fetchedRole = profileRes.data.role
          } else {
            // Development fallback roles based on seed emails
            if (user.email === 'admin@escola.gov.br') fetchedRole = 'Administrador'
            else if (user.email === 'coord@escola.gov.br') fetchedRole = 'Coordenador(a)'
            else if (user.email === 'prof@escola.gov.br') fetchedRole = 'Professor(a)'
          }
          setRole(fetchedRole)
        } catch (err) {
          console.error('Error fetching user data:', err)
        } finally {
          setLoading(false)
        }
      }
      fetchUserData()
    }
  }, [user])

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return { error }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  }

  return (
    <AuthContext.Provider value={{ user, session, profile, role, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
