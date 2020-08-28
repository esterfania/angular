import { Component, OnInit } from '@angular/core';
import { ComandaService } from 'src/app/services/comanda.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ComandaItem } from 'src/app/models/ComandaItem';
import { Observable, throwError, of } from 'rxjs';
import { Comanda } from 'src/app/models/Comanda';
import { switchMap, finalize, tap, catchError } from 'rxjs/operators';

@Component({
    selector: 'app-comanda-form',
    templateUrl: './comanda-form.component.html',
    styleUrls: ['./comanda-form.component.css']
})
export class ComandaFormComponent implements OnInit {

    codigoComanda: number;
    codigoItem: number;
    cardapio$: Observable<ComandaItem[]>;
    comanda$: Observable<Comanda>;
    displayedColumns = ['nome', 'valor', 'desconto', 'total'];

    constructor(
        private comandaService: ComandaService,
        private router: Router,
        private activatedRouter: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.codigoComanda = this.activatedRouter.snapshot.params.codigoComanda;
        this.recuperarCardapio();
        this.comanda$ = this.comandaService.recuperarComandaPorCodigo(this.codigoComanda);

    }

    recuperarCardapio() {
        this.cardapio$ = this.comandaService.recuperarCardapio();
    }

    adicionarItem() {
        this.comanda$ = this.comandaService
            .registrarItem(Number(this.codigoComanda), this.codigoItem).pipe(catchError(err => {
                return err.status == '500' ? of("Só é permitido 3 sucos por comanda!") : throwError(err)
            }))
            .pipe(
                tap((res) => {
                    if (res instanceof Object)
                        this.comandaService.showMessage("Item inserido com sucesso!");
                    else
                        this.comandaService.showMessage(res.toString());
                },
                    err => this.comandaService.showMessage(err.message)
                )).pipe(
                    switchMap(() =>
                        this.comandaService
                            .recuperarComandaPorCodigo(this.codigoComanda)));
    }
    cancel() {
        this.router.navigate(['/comandas'])
    }
    resetarComanda() {
        this.comanda$ =
            this.comandaService
                .resetarComanda(this.codigoComanda)
                .pipe(tap(() => this.comandaService.showMessage('Resetado com sucesso!'),
                    () => this.comandaService.showMessage('Um erro ocorreu, por gentileza tenar novamente!')
                ));
    }

    fecharComanda() {
        this.comandaService
            .fecharComanda(this.codigoComanda)
            .subscribe(res => {
                this.comandaService.showMessage('Comanda fechada com sucesso!')
                this.router.navigate(['comanda', this.codigoComanda, 'fechamento'])
            }, err => this.comandaService.showMessage(err.message))
    }
}