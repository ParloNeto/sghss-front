import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Consulta } from '../../app/models/consulta';
import { FooterComponent } from '../../shared/footer/footer.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-consulta-detalhe',
  imports: [
    FooterComponent,
    HeaderComponent,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './consulta-detalhe.component.html',
  styleUrl: './consulta-detalhe.component.scss',
})
export class ConsultaDetalheComponent implements OnInit {
  #route = inject(ActivatedRoute);

  consulta!: Consulta;

  ngOnInit(): void {
    const id = this.#route.snapshot.paramMap.get('id');
    console.log('Consulta selecionada ID:', id);

    this.consulta = {
      id: id ?? '1',
      paciente: 'Paulo Neto',
      profissional: 'Dr. João Silva',
      especialidade: 'Cardiologia',
      dataHora: '2025-09-15 14:30',
      local: 'Rua Alberto Mallin, 255',
      status: 'AGENDADA',
      linkTelemedicina: 'https://meet.vidaplus.com/consulta-123'
    };
  }

  cancelarConsulta() {
    if (confirm('Deseja realmente cancelar esta consulta?')) {
      console.log('Consulta cancelada:', this.consulta.id);
      alert('Consulta cancelada com sucesso!');
      this.consulta.status = 'CANCELADA';
    }
  }

  entrarTeleconsulta() {
    if (this.consulta.linkTelemedicina) {
      window.open(this.consulta.linkTelemedicina, '_blank');
    }
  }
}
