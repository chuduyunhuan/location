import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { MapService } from '../../service/map.service';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { MustLatitude, MustLongitude } from '../../shared/shared.module';
@Component({
    selector: 'my-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css']
})

export class EditComponent implements OnInit {
    geoInfos: Array<any>;
    lat: number;
    lng: number;
    @Output() onShown = new EventEmitter<boolean>();
    names: Array<any>;
    city: string;
    country: string;
    description: string;
    submitted = false;
    mustLatitude = MustLatitude;
    mustLongitude = MustLongitude;
    constructor(
        private mapService: MapService,
        private router: Router
    ) {}
    ngOnInit() {
        this.mapService.getAllGeo()
            .subscribe(data => {
                this.names = data.map(obj => {
                    return obj.address;
                });
                this.geoInfos = data;
                this.filterData(0);
            })
    }
    shown(show: boolean) {
        this.onShown.emit(show);
    }
    filterData(index: number) {
        let target = this.geoInfos[index];
        this.lat = target.location.lat;
        this.lng = target.location.lng;
        let infos = target.address.split(',');
        this.city = infos[0];
        this.country = infos[infos.length - 1];
    }
    filterDataByName(name: string) {
        let index = this.geoInfos.findIndex(obj => {
            return obj.address == name;
        });
        this.filterData(index);
    }
    onSubmit() {
        // this.submitted = true;
        // let obj = {
        //     "results": [
        //         {
        //             "address_components": [
        //                 {
        //                     "long_name": this.name, 
        //                     "short_name": this.name, 
        //                     "types": [
        //                         "locality", 
        //                         "political"
        //                     ]
        //                 }, 
        //                 {
        //                     "long_name": "Cook County", 
        //                     "short_name": "Cook County", 
        //                     "types": [
        //                         "administrative_area_level_2", 
        //                         "political"
        //                     ]
        //                 }, 
        //                 {
        //                     "long_name": "Illinois", 
        //                     "short_name": "IL", 
        //                     "types": [
        //                         "administrative_area_level_1", 
        //                         "political"
        //                     ]
        //                 }, 
        //                 {
        //                     "long_name": "United States", 
        //                     "short_name": "US", 
        //                     "types": [
        //                         "country", 
        //                         "political"
        //                     ]
        //                 }
        //             ], 
        //             "formatted_address": this.name + ", IL, USA", 
        //             "geometry": {
        //                 "bounds": {
        //                     "northeast": {
        //                         "lat": this.lat, 
        //                         "lng": this.lng
        //                     }, 
        //                     "southwest": {
        //                         "lat": this.lat, 
        //                         "lng": this.lng
        //                     }
        //                 }, 
        //                 "location": {
        //                     "lat": this.lat, 
        //                     "lng": this.lng
        //                 }, 
        //                 "location_type": "APPROXIMATE", 
        //                 "viewport": {
        //                     "northeast": {
        //                         "lat": this.lat + 0.005, 
        //                         "lng": this.lng + 0.005
        //                     }, 
        //                     "southwest": {
        //                         "lat": this.lat - 0.005, 
        //                         "lng": this.lng - 0.005
        //                     }
        //                 }
        //             }, 
        //             "place_id": "ChIJ7cv00DwsDogRAMDACa2m4K8", 
        //             "types": [
        //                 "locality", 
        //                 "political"
        //             ]
        //         }
        //     ], 
        //     "status": "OK"
        // };
        // this.mapService.addGeo(obj)
        //     .subscribe(data => {
        //         let link = ['/map', {type: 'Add', random: Math.random()}];
        //         this.router.navigate(link);
        //     });
        // this.shown(false);
     }
}