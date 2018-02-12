import { Component, OnInit, ViewChildren, ElementRef, NgZone, AfterViewInit, QueryList } from '@angular/core';

import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';

declare var google: any;

@Component({
  selector: 'app-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.scss']
})
export class TransportComponent implements OnInit, AfterViewInit {
  @ViewChildren('') inputsRef;

  constructor(private mapsApi: MapsAPILoader,  private ngZone: NgZone) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    console.log(this.inputsRef);
    this.mapsApi.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.inputsRef.nativeElement, {
        types: ['address']
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place = autocomplete.getPlace();

        });
      });
    });
  }
}


