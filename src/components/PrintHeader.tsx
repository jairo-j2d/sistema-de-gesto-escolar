import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'

export function PrintHeader() {
  const [settings, setSettings] = useState<any>(null)

  useEffect(() => {
    supabase
      .from('school_settings')
      .select('*')
      .limit(1)
      .single()
      .then(({ data }) => {
        if (data) setSettings(data)
      })
  }, [])

  if (!settings) return null

  return (
    <div className="hidden print:flex flex-col items-center justify-center border-b-2 border-slate-800 pb-4 mb-6 text-black w-full">
      <style>{`
        @media print {
          @page { margin: 1cm; }
          body { 
            -webkit-print-color-adjust: exact; 
            print-color-adjust: exact; 
            background: white !important; 
          }
          input, select, textarea, .radix-select-trigger {
            border: 1px solid transparent !important;
            background: transparent !important;
            color: black !important;
            box-shadow: none !important;
            padding: 0 !important;
            height: auto !important;
            min-height: 0 !important;
          }
          .lucide-chevron-down { display: none !important; }
          .print\\:hidden { display: none !important; }
        }
      `}</style>
      {settings.logo_url && (
        <img src={settings.logo_url} alt="Logo" className="w-20 h-20 object-contain mb-3" />
      )}
      <h1 className="text-xl font-bold uppercase tracking-wide text-center">
        {settings.school_name}
      </h1>
      <div className="text-xs text-center mt-1 text-slate-700 font-medium">
        <p>{settings.address}</p>
        <p className="mt-1">
          CNPJ: {settings.cnpj} &bull; INEP: {settings.inep_code} &bull; Portaria:{' '}
          {settings.portaria}
        </p>
      </div>
    </div>
  )
}
