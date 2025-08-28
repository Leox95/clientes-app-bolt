import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxMaskDirective } from 'ngx-mask';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente.model';

@Component({
  selector: 'app-clientes-form',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatButtonModule,
    NgxMaskDirective, MatDatepickerModule
  ],
  templateUrl: './clientes-form.component.html',
})
export class ClientesFormComponent implements OnInit {


  public id?: string = '';
  public form: FormGroup;
  public title: string = '';
  public modoTela: string = '';

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private clienteService: ClienteService
  ){
    this.form = this.criarForm();
  }

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    const acao = this.route.snapshot.paramMap.get('acao');
    if (param) {
      this.id = param;
      this.clienteService.detalhar(this.id).subscribe(c => this.form.patchValue(c));
    }
    this.definirModoTela(acao);
  }

  definirModoTela(acao: string | null): void {
  switch (true) {
    case !this.id:
      this.modoTela = 'novo';
      this.title = 'Cadastrar';
      break;

    case acao === 'detalhar':
      this.modoTela = 'detalhar';
      this.title = 'Detalhar';
      this.form.disable();
      break;

    case acao === 'editar':
    default:
      this.modoTela = 'editar';
      this.title = 'Editar';
      break;
  }
}


  cancelar(): void{
    this.form.reset();
    this.router.navigate(['/clientes']);
  }

  voltar(): void{
    this.router.navigate(['/clientes']);
  }

  criarForm(): FormGroup {
    return this.fb.group({
        nome: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        telefone: ['', [Validators.required]],      
        cpf: ['', [Validators.required]],      
        dataCriacao: [new Date(), Validators.required]
    });
  }

  salvar() {
    const payload: Cliente = this.form.getRawValue() as any;
    if (this.id) {
      this.clienteService.atualizar(this.id, payload).subscribe(() => this.router.navigate(['/clientes']));
    } else {
      this.clienteService.criar(payload).subscribe(() => this.router.navigate(['/clientes']));
    }
  }
}
