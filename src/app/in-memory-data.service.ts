import { InMemoryDbService } from 'angular-in-memory-web-api';
import MapGeo from './map/map.geo';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const orgs = [
      {id: 1, name: 'Bill', orgs: 15, errors: 12, site: 'www.google.com', status: 'Warning'},
      {id: 2, name: 'Jackson', orgs: 20, errors: 20, site: 'www.baidu.com', status: 'Error'},
      {id: 3, name: 'Allen', orgs: 2, errors: 0, site: 'www.github.com', status: 'Normal'},
      {id: 4, name: 'Kobe', orgs: 100, errors: 34, site: 'www.facebook.com', status: 'Normal'},
      {id: 5, name: 'Wade', orgs: 56, errors: 1, site: 'www.microsoft.com', status: 'Normal'},
      {id: 6, name: 'Howard', orgs: 98, errors: 0, site: 'www.oracle.com', status: 'Normal'},
      {id: 7, name: 'Jones', orgs: 8, errors: 3, site: 'www.qq.com', status: 'Warning'},
      {id: 8, name: 'Nash', orgs: 43, errors: 16, site: 'www.alipay.com', status: 'Error'},
      {id: 9, name: 'Pierce', orgs: 21, errors: 0, site: 'www.mdn.com', status: 'Normal'},
      {id: 10, name: 'Till', orgs: 43, errors: 16, site: 'www.juejin.com', status: 'Error'},
      {id: 11, name: 'Mr. Nice', power: 'fly', salary: '$400', orgs: 43, errors: 16, site: 'www.biying.com', status: 'Error'},
      {id: 12, name: 'Narco', orgs: 243, errors: 16, site: 'www.tencent.com', status: 'Normal'},
      {id: 13, name: 'Bombasto', orgs: 18, errors: 16, site: 'www.help.com', status: 'Error'},
      {id: 14, name: 'Celeritas', orgs: 59, errors: 16, site: 'www.vmware.com', status: 'Warning'},
      {id: 15, name: 'Magneta', orgs: 413, errors: 16, site: 'www.intel.com', status: 'Normal'},
      {id: 16, name: 'RubberMan', orgs: 43, errors: 1, site: 'www.ibm.com', status: 'Normal'},
      {id: 17, name: 'Dynama', orgs: 43, errors: 12, site: 'www.sun.com', status: 'Error'},
      {id: 18, name: 'Dr IQ', orgs: 43, errors: 15, site: 'www.learn.com', status: 'Warning'},
      {id: 19, name: 'Magma', orgs: 473, errors: 16, site: 'www.front.com', status: 'Normal'},
      {id: 20, name: 'Tornado', orgs: 125, errors: 106, site: 'www.3c.com', status: 'Error'}
    ];
    let geoInfos = MapGeo;
    return {geoInfos, orgs};
  }
}