import { Component, OnInit } from "@angular/core";
import { MapService } from '../service/map.service';
import * as L from 'leaflet';
import 'leaflet-contextmenu';

import { ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {
    map: any;
    dataCenterGroup = L.featureGroup();
    geoInfos = [];
    siteIcons = ['icon-blue', 'icon-yellow', 'icon-green', 'icon-red'];
    blinkList = ['blink-icon-blue', 'blink-icon-yellow', 'blink-icon-green', 'blink-icon-red'];
    modalDataCenter = false;
    modalInfo = {
        address: ''
    };
    vcds = [];
    siteChecked: string;
    showEdit = {
        show: false,
        type: 'Add',
        lat: 31,
        lng: 121
    };
    constructor(
        private mapService: MapService,
        private route: ActivatedRoute
    ) {
        document.addEventListener('click', function(e) {
        }.bind(this));
    }
    ngOnInit() {
        this.mapService.getCurrentLocation()
            .subscribe(data => {
                let location = {
                    lat: parseFloat(data.latitude),
                    lng: parseFloat(data.longitude)
                };
                this.initMap(location);
            }, error => {
                console.log('An error occured, the map has been located to default location.');
                this.initMap({lat: 31, lng:121});
            });
    }
    initMap(center: Object) {
        this.map = L.map('map', {
            noWrap: false,
            worldCopyJump: true,
            contextmenu: true,
            contextmenuItems: this.setContextMenu()
        }).setView(L.latLng(center),5);
        let url = 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png';
        L.tileLayer(url, {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            maxZoom: 7,
            minZoom: 3
        }).addTo(this.map);
        this.getRoutes();
        this.addDataCenterLayer();
        this.addTwinkLayer();
    }
    setContextMenu(): Array<object> {
        let menu = [
            {
                text: 'Add new location',
                callback: (e) => {
                    this.showEdit.type = 'Add';
                    this.setFormsParams(e);
                }
            },
            {
                text: 'Place to existing location',
                callback: (e) => {
                    this.showEdit.type = 'Edit';
                    this.setFormsParams(e);
                }
            }
        ];
        return menu;
    }
    setFormsParams(e) {
        this.showEdit.show = true;
        let latlng = e.latlng;
        this.showEdit.lat = latlng.lat.toFixed(3);
        this.showEdit.lng = latlng.lng.toFixed(3);
    }
    getRoutes() {
        this.route.params.subscribe((params: Params) => {
            let location = params.location;
            let type = params.type;
            if(location) {
                this.panToLocate(JSON.parse(location));
            }else if(type) {
                this.refreshDataCenterLayer();
            }
        });
    }
    panToLocate(point: object) {
        let icon = L.icon({
            iconUrl: './assets/images/marker-icon.png',
            iconSize: [25, 41]
        });
        let marker = L.marker(point, {icon: icon}).addTo(this.map);
        this.map.setView(point, 7);
        setTimeout(() => {
            this.map.removeLayer(marker);
        }, 1000*60);
    }
    addDataCenterLayer() {
        this.mapService.getAllGeo()
            .subscribe(data => {
                this.geoInfos = data;
                data.map((obj,i) => {
                    let location = obj.location;
                    let address = obj.address;
                    if(!location) return;
                    let icon = this.setDivIcon(this.siteIcons[0]);
                    let marker = L.marker(location, {icon: icon, title: address, opacity: 1, animated: false, firstAnimation: true}).addTo(this.dataCenterGroup);
                    this.registerMarkerClick(marker, address);
                });
                this.map.addLayer(this.dataCenterGroup);
            });
    }
    refreshDataCenterLayer() {
        this.dataCenterGroup.clearLayers();
        this.map.removeLayer(this.dataCenterGroup);
        this.addDataCenterLayer();
    }
    setDivIcon(className: string): object {
        let icon = L.divIcon({
            iconSize: L.point(30, 30),
            iconAnchor: [-10, -10], //self icon size divide 4 minus datacenter icon size divide 2, then plus datacenter icon anchor.
            className: className
        });
        return icon;
    }
    registerMarkerClick(marker: any, address: string) {
        marker.on('click', e => {
            this.modalDataCenter = true;
            this.modalInfo.address = address;
            let start = ~~(Math.random()*(19 - 0) + 0);
            let end = ~~(Math.random()*(19 - 0) + 0);
            let order = this.exchange(start, end);
            this.mapService.getAllOrgs().subscribe(data => {
                this.vcds = data.slice(order[0], order[1]);
                this.siteChecked = this.vcds[0].site;
            });
        });
    }
    exchange(start: number, end: number) {
        if(start == end) {
            end = start + 1;
        }else if (start > end) {
            start ^= end;
            end ^= start;
            start ^= end;
        }
        return[start, end];
    }
    addTwinkLayer() {
        setInterval(() =>{
            let geoInfo = this.geoInfos;
            let len = geoInfo.length;
            let random = ~~(Math.random() * (len - 0) + 0);
            let data = geoInfo[random];
            let address = data.address;
            let blinkRandom = ~~(Math.random() * (4 - 0) + 0);
            let blink = this.blinkList[blinkRandom];
            if(this.isFlashing(address, blinkRandom)) {
                return;
            }
            this.registerAnimation(data.location, blink, address);
        },1000*0.5);
    }
    isFlashing(address: string, index: number): boolean {
        let flag = true;
        this.dataCenterGroup.eachLayer(layer => {
            let options = layer.options;
            let title = options.title;
            if (title == address) {
                let animated = options.animated;
                if(!animated) {
                    flag = false;
                    let icon = this.setDivIcon(this.siteIcons[index]);
                    layer.options.animated = true;
                    layer.setIcon(icon);
                }
            }
        });
        return flag;
    }
    registerAnimation(location: Object, className='change-twink-wx', title: string) {
        let icon = this.setDivIcon(className);
        let marker = L.marker(location, {icon: icon, title: title}).addTo(this.map);
        setTimeout(() => {
            this.map.removeLayer(marker);
            this.setAnimated(title);
        }, 1000*60*0.2);
    }
    setAnimated(address: string) {
        this.dataCenterGroup.eachLayer(layer => {
            let options = layer.options;
            let title = options.title;
            if (title == address) {
                layer.options.animated = false;
                layer.setIcon(this.setDivIcon(this.siteIcons[0]));
                return;
            }
        });
    }
    closeModalDataCenter() {
        this.modalDataCenter = false;
    }
    changeSiteChecked(name: string) {
        this.siteChecked = name;
    }
    onShown() {
        this.showEdit.show = false;
    }
}