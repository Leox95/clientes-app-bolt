import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientesFormComponent } from './clientes-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { provideNgxMask } from 'ngx-mask';
import { ClienteService } from '../../services/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ClientesFormComponent', () => {
  let component: ClientesFormComponent;
  let fixture: ComponentFixture<ClientesFormComponent>;
  let clienteServiceSpy: jasmine.SpyObj<ClienteService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    clienteServiceSpy = jasmine.createSpyObj('ClienteService', ['criar', 'atualizar', 'detalhar']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        ClientesFormComponent,
        ReactiveFormsModule,
        BrowserAnimationsModule // 👈 Necessário para evitar o erro do @transitionMessages
      ],
      providers: [
        provideNgxMask(),
        provideNativeDateAdapter(),
        { provide: ClienteService, useValue: clienteServiceSpy },
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => {
                  if (key === 'id') return null;
                  if (key === 'acao') return null;
                  return null;
                }
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ClientesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve chamar clienteService.criar ao salvar', () => {
    component.form.setValue({
      nome: 'Leonardo',
      email: 'leo@exemplo.com',
      telefone: '91912345678',
      cpf: '12345678900',
      dataCriacao: new Date()
    });

    const clienteMock = {
      id: 'e52',
      nome: 'Leonardo',
      email: 'leo@exemplo.com',
      telefone: '91912345678',
      cpf: '12345678900',
      dataCriacao: new Date().toISOString()
    };

    clienteServiceSpy.criar.and.returnValue(of(clienteMock));

    component.salvar();

    expect(clienteServiceSpy.criar).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/clientes']);
  });

  it('deve navegar para /clientes ao cancelar', () => {
    component.cancelar();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/clientes']);
  });

  it('deve navegar para /clientes ao voltar', () => {
    component.voltar();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/clientes']);
  });

  it('deve definir modoTela como "novo" se id não existir', () => {
    component.id = undefined;
    component['definirModoTela'](null);
    expect(component.modoTela).toBe('novo');
    expect(component.title).toBe('Cadastrar');
  });
  
  it('deve definir modoTela como "detalhar" se acao for detalhar', () => {
    component.id = '8er';
    component.form.enable(); // Garante que esteja habilitado antes
    component['definirModoTela']('detalhar');
    expect(component.modoTela).toBe('detalhar');
    expect(component.title).toBe('Detalhar');
    expect(component.form.disabled).toBeTrue();
  });

  it('deve definir modoTela como "editar" se acao for editar', () => {
    component.id = '12r';
    component['definirModoTela']('editar');
    expect(component.modoTela).toBe('editar');
    expect(component.title).toBe('Editar');
  });


});
