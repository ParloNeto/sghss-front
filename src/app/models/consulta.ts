export interface Consulta {
  id: string;
  paciente: string;
  profissional: string;
  especialidade: string;
  dataHora: string;
  local?: string;
  linkTelemedicina?: string;
  status: 'AGENDADA' | 'REALIZADA' | 'CANCELADA';
}
