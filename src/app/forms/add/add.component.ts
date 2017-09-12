import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { MapService } from '../../service/map.service';

import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'my-add',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.css']
})

export class AddComponent implements OnInit {
    @Input() lat: number;
    @Input() lng: number;
    @Output() onShown = new EventEmitter<boolean>();
    name: string;
    city: string;
    country: string;
    description: string;
    submitted = false;
    mustNumber = /^(-?\d+)(\.\d+)?$/;
    constructor(
        private mapService: MapService,
        private router: Router
    ) {}
    ngOnInit() {}
    shown(show: boolean) {
        this.onShown.emit(show);
    }
    onSubmit() {
        this.submitted = true;
        let obj = {
            "results": [
                {
                    "address_components": [
                        {
                            "long_name": this.name, 
                            "short_name": this.name, 
                            "types": [
                                "locality", 
                                "political"
                            ]
                        }, 
                        {
                            "long_name": "Cook County", 
                            "short_name": "Cook County", 
                            "types": [
                                "administrative_area_level_2", 
                                "political"
                            ]
                        }, 
                        {
                            "long_name": "Illinois", 
                            "short_name": "IL", 
                            "types": [
                                "administrative_area_level_1", 
                                "political"
                            ]
                        }, 
                        {
                            "long_name": "United States", 
                            "short_name": "US", 
                            "types": [
                                "country", 
                                "political"
                            ]
                        }
                    ], 
                    "formatted_address": this.name + ", IL, USA", 
                    "geometry": {
                        "bounds": {
                            "northeast": {
                                "lat": this.lat, 
                                "lng": this.lng
                            }, 
                            "southwest": {
                                "lat": this.lat, 
                                "lng": this.lng
                            }
                        }, 
                        "location": {
                            "lat": this.lat, 
                            "lng": this.lng
                        }, 
                        "location_type": "APPROXIMATE", 
                        "viewport": {
                            "northeast": {
                                "lat": this.lat + 0.005, 
                                "lng": this.lng + 0.005
                            }, 
                            "southwest": {
                                "lat": this.lat - 0.005, 
                                "lng": this.lng - 0.005
                            }
                        }
                    }, 
                    "place_id": "ChIJ7cv00DwsDogRAMDACa2m4K8", 
                    "types": [
                        "locality", 
                        "political"
                    ]
                }
            ], 
            "status": "OK"
        };
        this.mapService.addGeo(obj)
            .subscribe(data => {
                let link = ['/map', {type: 'Add', random: Math.random()}];
                this.router.navigate(link);
            });
        this.shown(false);
     }
}