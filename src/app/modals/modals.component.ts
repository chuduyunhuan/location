import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { MapService } from '../service/map.service';

import { ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'my-modals',
    templateUrl: './modals.component.html',
    styleUrls: ['./modals.component.css']
})

export class ModalsComponent implements OnInit {
    @Input() type: string;
    @Input() lat: number;
    @Input() lng: number;
    @Output() onShown = new EventEmitter<boolean>();

    ngOnInit() {}

    shown(show: boolean) {
        this.onShown.emit(show);
    }
}