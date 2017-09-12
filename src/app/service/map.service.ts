import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class MapService {
    locations: number;
    vcds: number;
    private headers = new Headers({'Content-Type': 'application/json'});
    private geoUrl = 'api/geoInfos';
    private orgsUrl = 'api/orgs';

    constructor(private http: Http) {}

    getAllGeo(): Observable<any> {
        return this.http.get(this.geoUrl)
            .map(res => {
                let data = res.json().data;
                this.locations = data.length;
                this.vcds = this.locations * 2 + 5;
                return data.map(obj => {
                    let result = obj.results[0];
                    return {
                        address: result.formatted_address,
                        location: result.geometry.location
                    }
                });
            })
            .catch(this.handleError);
    }
    getAllOrgs(): Observable<any> {
        return this.http.get(this.orgsUrl)
            .map(res => {
                return res.json().data;
            })
            .catch(this.handleError);
    }
    addGeo(obj: object): Observable<any> {
        return this.http.post(this.geoUrl,
            JSON.stringify(obj), {headers: this.headers}
        )
        .map(res => res.json())
        .catch(this.handleError);
    }
    getCurrentLocation(): Observable<any> {
        return this.http
            .get('http://ipv4.myexternalip.com/json')
            .map(res => res.json())
            .catch(this.handleError)
            .mergeMap(res => this.http.get('http://freegeoip.net/json/' + res.ip))
            .map((res: Response) => res.json())
            .catch(this.handleError)
    }
    geocode(address: string): Observable<any> {
        let url = 'http://maps.googleapis.com/maps/api/geocode/json?address=';
        return this.http
            .get(url + encodeURIComponent(address))
            .map(res => res.json())
            .map(data => {
                if(data.status != 'OK') { throw new Error('unable to geocode address'); }
                return data;
            });
    }
    private handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `$ {
                error.status
            } - $ {
                error.statusText || ''
            }
            $ {
                err
            }`;
        } else {
            errMsg = error.message ? error.message: error.toString();
        }
        return Observable.throw (errMsg);
    }
}