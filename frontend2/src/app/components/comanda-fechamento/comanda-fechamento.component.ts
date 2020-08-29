import { Component, OnInit } from "@angular/core";
import { ComandaService } from 'src/app/services/comanda.service';
import { ActivatedRoute } from '@angular/router';
import { Comanda } from 'src/app/models/Comanda';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-comanda-fechamento',
    templateUrl: './comanda-fechamento.component.html',
    styleUrls: ['./comanda-fechamento.component.css']
})
export class ComandaFechamentoComponet implements OnInit {
    codigoComanda: number;
    comanda$: Observable<Comanda>;

    constructor(
        private comandaService: ComandaService,
        private activatedRouter: ActivatedRoute) { }
    displayedColumns = ['nome', 'valor', 'desconto', 'total'];

    ngOnInit(): void {
        this.codigoComanda = this.activatedRouter.snapshot.params.codigoComanda;
        this.getComanda()
    }

    getComanda() {
        this.comanda$ = this.comandaService
            .recuperarComandaPorCodigo(this.codigoComanda)
            .pipe(tap(res => this.finalizaComanda(res), err => this
                .comandaService
                .showMessage('Um erro ocorreu, por favor tentar novamente!')));

    }

    reduzirValor(res, campo): number {
        return res.map(res => res[campo]).reduce((a, v) => a + v, 0);
    }
    finalizaComanda(res: Comanda) {
        res.valorTotal = this.reduzirValor(res.listaItem, 'valor');
        res.desconto = this.reduzirValor(res.listaItem, 'desconto');
        res.valorFinal = res.valorTotal - res.desconto;
        return res;
    }
}