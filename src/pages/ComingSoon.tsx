import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Clock } from 'lucide-react'

export default function ComingSoon({ title }: { title: string }) {
  return (
    <div className="flex-1 h-full flex items-center justify-center min-h-[60vh] animate-fade-in">
      <Card className="w-full max-w-md text-center shadow-lg border-t-4 border-t-secondary">
        <CardHeader>
          <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-secondary">
            <Clock className="w-8 h-8" />
          </div>
          <CardTitle className="text-2xl text-secondary">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-lg">
            Esta funcionalidade estará disponível em breve no novo sistema online.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
