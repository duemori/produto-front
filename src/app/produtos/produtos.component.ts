import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Produto } from '../models/Produto';
import { ProdutosService } from './produtos.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

  public produtos: Produto[] = [];
  public apresentaForm = false;
  public submitted = false;
  public produtoForm: FormGroup;

  constructor(private fb: FormBuilder, private produtoService: ProdutosService) {
    this.produtoForm = this.fb.group({
      id: [''],
      nome: ['', Validators.required],
      valorVenda: [0, Validators.required]
    });
  }

  ngOnInit(): void {
    this.listar();
  }

  get controls() { return this.produtoForm.controls; }

  private listar() {
    this.produtoService.listar().subscribe(
      (produtos: Produto[]) => this.produtos = produtos,
      (erro: any) => console.error(erro)
    );
  }

  cadastrar() {
    this.apresentaForm = true;
    this.produtoForm.patchValue(new Produto());
  }

  selecionar(id: number) {
    this.apresentaForm = true;
    this.produtoService.obter(id).subscribe(
      (produto: Produto) => this.produtoForm.patchValue(produto),
      (erro: any) => console.error(erro)
    );
  }

  fechar() {
    this.apresentaForm = false;
  }

  salvar() {
    this.submitted = true;

    if (this.produtoForm.invalid) {
      return;
    }

    if (this.produtoForm.value.id) {
      this.atualizar();
    } else {
      this.inserir();
    }
  }

  private atualizar() {
    this.produtoService.atualizar(this.produtoForm.value).subscribe(
      () => {
        this.apresentaForm = false;
        this.listar();
      },
      (erro: any) => console.error(erro)
    );
  }

  private inserir() {
    this.produtoService.salvar(this.produtoForm.value).subscribe(
      () => {
        this.apresentaForm = false;
        this.listar();
      },
      (erro: any) => console.error(erro)
    );
  }

  remover(id: number) {
    this.produtoService.remover(id).subscribe(_ => this.listar(), (erro: any) => console.error(erro));
  }
}
