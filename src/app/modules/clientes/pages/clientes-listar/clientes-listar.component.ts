import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente.model';

@Component({
  selector: 'app-clientes-listar',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, RouterLink],
  templateUrl: './clientes-listar.component.html',
})
export class ClientesListarComponent implements OnInit {


 constructor(private clienteService: ClienteService){

 }

  displayedColumns = ['nome','email','telefone','cpf','dataCriacao','acoes'];
  data = signal<Cliente[]>([]);

  ngOnInit() {
    this.load();
  }

  load() {
    this.clienteService.listar().subscribe(res => this.data.set(res));
  }

  excluir(id: string) {
    this.clienteService.excluir(id).subscribe(() => this.load());
  }
}
