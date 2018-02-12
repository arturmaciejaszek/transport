import { element } from 'protractor';
import { Component, OnInit, ViewChild, ViewChildren, ElementRef, NgZone, AfterViewInit, QueryList } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

import { } from 'googlemaps';

declare var google: any;

@Component({
  selector: 'app-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.scss']
})
export class TransportComponent implements OnInit, AfterViewInit {
  @ViewChild('start') startRef: ElementRef;
  @ViewChild('end') endRef: ElementRef;
  @ViewChildren('location', { read: ElementRef }) locRefs: QueryList<ElementRef> = new QueryList<ElementRef>();
  inputRefs: ElementRef[] = [];
  form: FormGroup;

  constructor(private mapsApi: MapsAPILoader,  private ngZone: NgZone) { }

  ngOnInit() {
    this.formInit();
  }

  formInit() {
    this.form = new FormGroup({
      origin: new FormControl(),
      destination: new FormControl(),
      waypoints: new FormArray([])
    });
  }

  onSubmit() {
    console.log(this.form.value);
    console.log(this.locRefs);
  }

  addPlace() {
    (<FormArray>this.form.get('waypoints')).push(new FormGroup({
      location: new FormControl()
    }));
  }

  getControls() {
    return (<FormArray>this.form.get('waypoints')).controls;
  }

  deletePlace(i: number) {
    (<FormArray>this.form.get('waypoints')).removeAt(i);
  }

  setAutocomplete(el: ElementRef) {
    this.mapsApi.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(el.nativeElement, {
        types: ['address'], componentRestrictions: {country: 'pl'}
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place = autocomplete.getPlace();

        });
      });
    });
  }

  ngAfterViewInit() {
    this.inputRefs.push(this.startRef, this.endRef);
    this.inputRefs.forEach( res => {
      this.setAutocomplete(res);
    });
    this.locRefs.changes.subscribe(() =>
      this.locRefs.forEach(res => this.setAutocomplete(res))
    );
  }

}


