import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ClienteService } from './cliente.service';
import { Cliente } from '../models/cliente.model';

describe('ClienteService', () => {
  let service: ClienteService;
  let httpMock: HttpTestingController;

  const mockCliente: Cliente = {
    id: '62b',
    nome: 'João',
    email: 'joao@example.com',
    telefone: '11999999999',
    cpf: '12345678900',
    dataCriacao: '2023-01-01'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClienteService]
    });

    service = TestBed.inject(ClienteService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve listar os clientes', () => {
    service.listar().subscribe(res => {
      expect(res.length).toBe(1);
      expect(res[0]).toEqual(mockCliente);
    });

    const req = httpMock.expectOne('http://localhost:3000/clientes');
    expect(req.request.method).toBe('GET');
    req.flush([mockCliente]);
  });

  it('deve detalhar um cliente', () => {
    service.detalhar(1).subscribe(res => {
      expect(res).toEqual(mockCliente);
    });

    const req = httpMock.expectOne('http://localhost:3000/clientes/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockCliente);
  });

  it('deve criar um cliente', () => {
    service.criar(mockCliente).subscribe(res => {
      expect(res).toEqual(mockCliente);
    });

    const req = httpMock.expectOne('http://localhost:3000/clientes');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockCliente);
    req.flush(mockCliente);
  });

  it('deve atualizar um cliente', () => {
    service.atualizar(1, mockCliente).subscribe(res => {
      expect(res).toEqual(mockCliente);
    });

    const req = httpMock.expectOne('http://localhost:3000/clientes/1');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockCliente);
    req.flush(mockCliente);
  });


});
