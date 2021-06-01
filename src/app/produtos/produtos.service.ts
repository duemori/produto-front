import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Produto } from '../models/Produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  baseUrl = `${environment.baseUrl}/produto`;

  constructor(private http: HttpClient) { }

  listar(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.baseUrl);
  }

  obter(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.baseUrl}/${id}`);
  }

  salvar(produto: Produto) {
    return this.http.post(this.baseUrl, produto);
  }

  atualizar(produto: Produto) {
    return this.http.put(this.baseUrl, produto);
  }

  remover(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
