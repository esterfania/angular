import { Component, OnInit } from "@angular/core";
import { ComandaService } from 'src/app/services/comanda.service';
import { Comanda } from 'src/app/models/Comanda';
import { Observable } from 'rxjs';
import { finalize, switchMap, tap, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
    selector: 'app-comandas',
    templateUrl: './comandas.component.html',
    styleUrls: ['./comandas.component.css']
})
export class ComandasComponent implements OnInit {

    comandasAbertas$: Observable<Comanda[]>;
    comandaCriada: Comanda;
    displayedColumns = ['codigoComanda', 'situacao', 
        'dataAberturaComanda', 'dataFechamentoComanda', 'action'];

    constructor(
        private comandaService: ComandaService,
        private router: Router) { }

    ngOnInit(): void {
        if (!this.comandasAbertas$) {
            this.getComandasAbertas();
        }
    }

    getComandasAbertas() {
        this.comandasAbertas$ = this.comandaService
            .recuperarComandasAbertas();
    }

    navegarGeracaoComanda() {
        this.create()
    }

    create() {
        this.comandaService.criarComanda()
            .pipe(
                finalize(() =>
                    this.router
                        .navigate(['comanda', this.comandaCriada.codigoComanda])))
            .subscribe(res => this.comandaCriada = res);
    }

}