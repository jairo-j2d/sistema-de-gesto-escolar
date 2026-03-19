import logoImg from '@/assets/icone-cumaru-pe-c3adf.jpg'

export function PrintHeader({ title }: { title?: string }) {
  return (
    <div className="hidden print:block mb-8 border-b border-border pb-4">
      <div className="flex items-center gap-6 justify-center">
        <img src={logoImg} alt="Logo" className="size-16 object-contain shrink-0" />
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight">Gilda Bertinho Gestão Escolar</h1>
          <p className="text-sm text-muted-foreground mt-1">Sistema Integrado de Gestão Escolar</p>
        </div>
      </div>
      {title && <h2 className="text-xl font-semibold mt-6 text-center">{title}</h2>}
    </div>
  )
}
