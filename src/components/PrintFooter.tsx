import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'

export function PrintFooter() {
  const [settings, setSettings] = useState<any>(null)

  useEffect(() => {
    supabase
      .from('school_settings')
      .select('*')
      .limit(1)
      .maybeSingle()
      .then(({ data }) => {
        setSettings(data || {})
      })
  }, [])

  if (!settings) return null

  return (
    <div className="hidden print:flex flex-row justify-between items-end mt-24 pt-8 w-full px-4 break-inside-avoid">
      <div className="flex flex-col items-center justify-end w-48">
        {settings.director_signature_url ? (
          <img
            src={settings.director_signature_url}
            className="h-12 object-contain mb-1"
            alt="Signature"
          />
        ) : (
          <div className="h-12 mb-1" />
        )}
        <div className="w-full border-t border-black text-center text-xs font-bold pt-1 text-black">
          Diretor(a)
        </div>
      </div>
      <div className="flex flex-col items-center justify-end w-48">
        {settings.coordinator_signature_url ? (
          <img
            src={settings.coordinator_signature_url}
            className="h-12 object-contain mb-1"
            alt="Signature"
          />
        ) : (
          <div className="h-12 mb-1" />
        )}
        <div className="w-full border-t border-black text-center text-xs font-bold pt-1 text-black">
          Coordenador(a)
        </div>
      </div>
      <div className="flex flex-col items-center justify-end w-48">
        {settings.secretary_signature_url ? (
          <img
            src={settings.secretary_signature_url}
            className="h-12 object-contain mb-1"
            alt="Signature"
          />
        ) : (
          <div className="h-12 mb-1" />
        )}
        <div className="w-full border-t border-black text-center text-xs font-bold pt-1 text-black">
          Secretário(a)
        </div>
      </div>
    </div>
  )
}
