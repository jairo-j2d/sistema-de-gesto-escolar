import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export function TableResponse() {
  return (
    <div className="bg-background rounded border mt-2 overflow-hidden shadow-sm">
      <Table>
        <TableHeader className="bg-muted">
          <TableRow>
            <TableHead>Aluno</TableHead>
            <TableHead>Série</TableHead>
            <TableHead>Deficiência</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">João Pedro Alves</TableCell>
            <TableCell>7º Ano</TableCell>
            <TableCell>Baixa visão</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Lucas Moreira</TableCell>
            <TableCell>6º Ano</TableCell>
            <TableCell>Autismo</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
