import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientesListarComponent } from './clientes-listar.component';
import { ClienteService } from '../../services/cliente.service';
import { of } from 'rxjs';
import { Cliente } from '../../models/cliente.model';
import { RouterTestingModule } from '@angular/router/testing';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

describe('ClientesListarComponent', () => {
  let component: ClientesListarComponent;
  let fixture: ComponentFixture<ClientesListarComponent>;
  let clienteServiceSpy: jasmine.SpyObj<ClienteService>;

  const mockClientes: Cliente[] = [
    { id: '45s', nome: 'Leo', email: 'leo@email.com', telefone: '999999999', cpf: '12345678900', dataCriacao: '2025-08-01' },
    { id: '6sf', nome: 'Maria', email: 'maria@email.com', telefone: '888888888', cpf: '98765432100', dataCriacao: '2025-08-02' }
  ];

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ClienteService', ['listar', 'excluir']);

    await TestBed.configureTestingModule({
      imports: [
        ClientesListarComponent,
        CommonModule,
        MatTableModule,
        MatButtonModule,
        RouterTestingModule
      ],
      providers: [
        { provide: ClienteService, useValue: spy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ClientesListarComponent);
    component = fixture.componentInstance;
    clienteServiceSpy = TestBed.inject(ClienteService) as jasmine.SpyObj<ClienteService>;
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve carregar os clientes no ngOnInit', () => {
    clienteServiceSpy.listar.and.returnValue(of(mockClientes));
    fixture.detectChanges(); // chama ngOnInit
    expect(clienteServiceSpy.listar).toHaveBeenCalled();
    expect(component.data()).toEqual(mockClientes);
  });

});
