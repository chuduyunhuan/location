import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Router } from '@angular/router';

import { MapService } from '../service/map.service'

import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
    selector: 'my-search',
    styleUrls: ['./search.component.css'],
    templateUrl: './search.component.html'
})

export class SearchComponent implements OnInit, AfterViewInit{
    private searchTerms = new Subject<string>();
    constructor(
        private mapService: MapService,
        private router: Router
    ) {}
    ngOnInit(): void {
        this.searchTerms
            .filter(text => {
                return text.length > 2;
            })
            .debounceTime(500)
            .distinctUntilChanged()
            .switchMap(term => {
                return this.mapService.geocode(term);
            })
            .subscribe(data => {
                let result = data.results;
                let location = result[0].geometry.location;
                let link = ['/map', {location: JSON.stringify(location)}];
                this.router.navigate(link);
            }, err => {
                console.error(err);
            })
    }
    ngAfterViewInit() {
    }
    searchAndLocate(term: string): void {
        this.searchTerms.next(term);
    }
}