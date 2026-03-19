import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase/client'
import { PrintHeader } from '@/components/PrintHeader'
import { PrintFooter } from '@/components/PrintFooter'
import { Button } from '@/components/ui/button'
import { Printer, ArrowLeft } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export default function AcademicHistoryPrint() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [student, setStudent] = useState<any>(null)
  const [records, setRecords] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      Promise.all([
        supabase.from('students').select('*').eq('id', id).single(),
        supabase
          .from('academic_records')
          .select('*')
          .eq('student_id', id)
          .order('year', { ascending: true }),
      ]).then(([{ data: s }, { data: r }]) => {
        setStudent(s)
        setRecords(r || [])
        setLoading(false)
      })
    }
  }, [id])

  if (loading)
    return (
      <div className="p-12 flex justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  if (!student)
    return <div className="p-12 text-center text-muted-foreground">Aluno não encontrado.</div>

  return (
    <div className="bg-slate-100 min-h-screen p-4 md:p-8 print:p-0 print:bg-white animate-fade-in">
      <div className="flex justify-between mb-6 print:hidden max-w-5xl mx-auto items-center">
        <Button variant="outline" onClick={() => navigate(`/alunos/${id}`)} className="bg-white">
          <ArrowLeft className="w-4 h-4 mr-2" /> Voltar ao Perfil
        </Button>
        <Button
          onClick={() => window.print()}
          className="bg-primary text-white shadow-md text-base px-6"
        >
          <Printer className="w-5 h-5 mr-2" /> Imprimir Documento
        </Button>
      </div>

      <div className="max-w-5xl mx-auto print:max-w-none print:w-full bg-white p-8 md:p-16 print:p-0 rounded-sm shadow-xl print:shadow-none border border-border/50 print:border-none min-h-[297mm]">
        <PrintHeader />

        <h2 className="text-2xl font-bold text-center uppercase my-10 text-black tracking-widest border-b-2 border-black pb-4">
          Histórico Escolar
        </h2>

        <div className="mb-10 border border-black rounded-sm relative mt-6">
          <h3 className="font-bold text-sm uppercase absolute -top-3 left-4 bg-white px-2">
            I - Dados de Identificação
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-6 text-sm p-6 pt-5">
            <div className="col-span-2 md:col-span-4">
              <span className="font-bold uppercase mr-2">Nome do Aluno:</span>{' '}
              <span className="text-base">{student.name}</span>
            </div>
            <div className="col-span-2">
              <span className="font-bold uppercase mr-2">Nascimento:</span>{' '}
              {student.birth_date ? new Date(student.birth_date).toLocaleDateString('pt-BR') : '-'}
            </div>
            <div className="col-span-2">
              <span className="font-bold uppercase mr-2">Matrícula:</span>{' '}
              {student.enrollment_number || '-'}
            </div>
            <div className="col-span-2">
              <span className="font-bold uppercase mr-2">CPF:</span> {student.cpf || '-'}
            </div>
            <div className="col-span-2">
              <span className="font-bold uppercase mr-2">RG:</span> {student.rg || '-'}
            </div>
            <div className="col-span-2 md:col-span-4">
              <span className="font-bold uppercase mr-2">Responsável Legal:</span>{' '}
              {student.parent_name || student.metadata?.motherName || '-'}
            </div>
          </div>
        </div>

        <div className="mb-10 border border-black rounded-sm relative mt-8">
          <h3 className="font-bold text-sm uppercase absolute -top-3 left-4 bg-white px-2">
            II - Progressão Escolar
          </h3>
          <div className="p-4 pt-6">
            <Table className="border border-black text-black">
              <TableHeader>
                <TableRow className="border-black hover:bg-transparent bg-slate-50 print:bg-transparent">
                  <TableHead className="font-bold text-black border-r border-black w-24 text-center">
                    Ano Letivo
                  </TableHead>
                  <TableHead className="font-bold text-black border-r border-black w-32">
                    Série / Ano
                  </TableHead>
                  <TableHead className="font-bold text-black border-r border-black">
                    Estabelecimento de Ensino
                  </TableHead>
                  <TableHead className="font-bold text-black w-40 text-center">
                    Situação Final
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {records.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center h-20 border-black font-medium">
                      Nenhum registro de progressão escolar cadastrado.
                    </TableCell>
                  </TableRow>
                ) : (
                  records.map((r) => (
                    <TableRow key={r.id} className="border-black hover:bg-transparent">
                      <TableCell className="border-r border-black font-bold text-center">
                        {r.year}
                      </TableCell>
                      <TableCell className="border-r border-black uppercase font-medium">
                        {r.grade}
                      </TableCell>
                      <TableCell className="border-r border-black font-medium">
                        {r.school_name}
                      </TableCell>
                      <TableCell className="text-center font-bold uppercase">{r.status}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="mb-12 border border-black rounded-sm relative mt-8">
          <h3 className="font-bold text-sm uppercase absolute -top-3 left-4 bg-white px-2">
            III - Observações Pedagógicas
          </h3>
          <div className="p-6 pt-5 min-h-[120px] text-sm whitespace-pre-wrap leading-relaxed">
            {student.metadata?.observations ||
              'Não constam observações adicionais no histórico deste aluno.'}
          </div>
        </div>

        <PrintFooter />
      </div>
    </div>
  )
}
