import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Comanda } from '../models/Comanda';
import { ComandaItem } from '../models/ComandaItem';

@Injectable({
    providedIn: 'root'
})
export class ComandaService {

    baseURL = '/api/api/Comandas/';
    constructor(private http: HttpClient,
        private snackBar: MatSnackBar) { }

    recuperarComandasAbertas(): Observable<Comanda[]> {

        return this.http.get<Comanda[]>(this.baseURL + 'RecuperarComandasAbertas');
    }

    criarComanda(): Observable<Comanda> {
        return this.http.post<Comanda>(this.baseURL + 'GerarNovaComanda', {})
    }

    recuperarComandaPorCodigo(codigoComanda: number): Observable<Comanda> {
        return this.http.get<Comanda>(this.baseURL + codigoComanda);
    }

    registrarItem(codigoComanda: number, codigoItem: Number): Observable<ComandaItem> {
        return this.http.put<ComandaItem>
            (
                this.baseURL + 'RegistrarItem',
                { codigoComanda, codigoItem },
                { observe: 'body' });
    }

    recuperarCardapio(): Observable<ComandaItem[]> {
        return this.http.get<ComandaItem[]>(this.baseURL + 'RecuperarCardapio');
    }

    showMessage(msg: string): void {
        this.snackBar.open(msg, 'X', {
            duration: 3000,
            horizontalPosition: "right",
            verticalPosition: "top"
        });
    }

    resetarComanda(codigoComanda: number): Observable<Comanda> {
        return this.http.delete<Comanda>(this.baseURL + 'ResetarComanda/' + codigoComanda)
    }

    fecharComanda(codigoComanda: number) {
        return this.http.put(this.baseURL + 'FecharComanda/' + codigoComanda, {})
    }
}