import { Component, OnInit, AfterViewInit } from '@angular/core';

import { } from 'googlemaps';
import { Request } from './request.model';
import { MapsAPILoader } from '@agm/core';

declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {
  lat = 52.40375419463349;
  lng = 16.923773288726807;
  dir = undefined;
  distance: number;
  rate: number;
  estimate = this.distance * 1.05 * this.rate;

  testRequest = new Request('Poznań', 'Warszawa', 'DRIVING', [
    {
      location: 'Bydgoszcz',
      stopover: true
    },
    {
      location: 'Łódź',
      stopover: true
    }] );


  constructor(private mapsApi: MapsAPILoader) {}

  extractKm(string: string) {
      return string.match(/\d+/)[0];
  }

  ngOnInit() {
    this.dir = this.testRequest;
  }

  ngAfterViewInit() {
    this.mapsApi.load().then(() => {
      const dService = new google.maps.DirectionsService();
      dService.route( this.testRequest, ( response, status) => {
        if (status === 'OK') {
          console.log(response.routes[0].legs[0].distance.text);
          this.distance = +this.extractKm(response.routes[0].legs[0].distance.text);
        }
      });
    }
    );
  }


}
