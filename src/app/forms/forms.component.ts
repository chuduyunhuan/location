import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { MapService } from '../service/map.service';

import { ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'my-forms',
    templateUrl: './forms.component.html',
    styleUrls: ['./forms.component.css']
})

export class FormsComponent implements OnInit {
    @Input() type: string;
    @Input() lat: number;
    @Input() lng: number;
    @Output() onShown = new EventEmitter<boolean>();

    ngOnInit() {}

    shown(show: boolean) {
        this.onShown.emit(show);
    }
}