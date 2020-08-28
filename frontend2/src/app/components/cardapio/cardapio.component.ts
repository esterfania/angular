import { Component, OnInit } from '@angular/core';
import { ComandaService } from 'src/app/services/comanda.service';
import { Observable } from 'rxjs';
import { ComandaItem } from 'src/app/models/ComandaItem';

@Component({
    templateUrl:'./cardapio.component.html'
})
export class CardapioComponent implements OnInit {

    cardapio$: Observable<ComandaItem[]>;
    displayedColumns = ['nome', 'valor'];

    constructor(private comandaService: ComandaService) { }

    ngOnInit(): void {
        this.recuperarCardapio();
    }

    recuperarCardapio() {
        this.cardapio$ = this.comandaService.recuperarCardapio();
    }
}