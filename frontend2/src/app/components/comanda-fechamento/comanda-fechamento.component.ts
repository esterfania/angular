import { Component, OnInit } from "@angular/core";
import { ComandaService } from 'src/app/services/comanda.service';
import { ActivatedRoute } from '@angular/router';
import { Comanda } from 'src/app/models/Comanda';

@Component({
    selector: 'app-comanda-fechamento',
    templateUrl: './comanda-fechamento.component.html',
    styleUrls: ['./comanda-fechamento.component.css']
})
export class ComandaFechamentoComponet implements OnInit {
    codigoComanda: number;
    comanda: Comanda;
    valorFinal: number;

    constructor(
        private comandaService: ComandaService,
        private activatedRouter: ActivatedRoute) { }
    displayedColumns = ['nome', 'valor', 'desconto', 'total'];

    ngOnInit(): void {
        this.codigoComanda = this.activatedRouter.snapshot.params.codigoComanda;
        this.getComanda()
    }

    getComanda() {
        this.comandaService
            .recuperarComandaPorCodigo(this.codigoComanda)
            .subscribe(res => {
                this.finalizaComanda(res);
            },
                err => this.comandaService.showMessage('Um erro ocorreu, por favor tentar novamente!'));

    }

    reduzirValor(res, campo): number {
        return res.map(res => res[campo]).reduce((a, v) => a + v, 0);
    }
    finalizaComanda(res: Comanda) {
        this.comanda = res;
        this.comanda.valorTotal = this.reduzirValor(res.listaItem, 'valor');
        this.comanda.desconto = this.reduzirValor(res.listaItem, 'desconto');
        this.valorFinal = this.comanda.valorTotal - this.comanda.desconto;
    }
}