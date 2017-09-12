import { Component, OnInit, Input } from "@angular/core";

@Component({
    selector: 'my-alert',
    templateUrl: './alert.component.html'
})

export class AlertComponent implements OnInit {
    @Input() info: string;
    ngOnInit() {}
}