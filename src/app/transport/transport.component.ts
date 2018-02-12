import {
  Component,
  OnInit,
  ViewChild,
  ViewChildren,
  ElementRef,
  NgZone,
  AfterViewInit,
  QueryList } from '@angular/core';
  import { MapsAPILoader } from '@agm/core';
  import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

  import { } from 'googlemaps';
  import { Request } from './../map/request.model';


declare var google: any;

@Component({
  selector: 'app-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.scss']
})
export class TransportComponent implements OnInit, AfterViewInit {
  @ViewChild('origin') startRef: ElementRef;
  @ViewChild('destination') endRef: ElementRef;
  @ViewChildren('location', { read: ElementRef }) locRefs: QueryList<ElementRef> = new QueryList<ElementRef>();
  origin = 'Poznań';
  inputRefs: ElementRef[] = [];
  form: FormGroup;
  request: Request = new Request('', '');

  constructor(private mapsApi: MapsAPILoader,  private ngZone: NgZone) { }

  ngOnInit() {
    this.formInit();
  }

  formInit() {
    this.form = new FormGroup({
      origin: new FormControl(this.origin, Validators.required),
      destination: new FormControl('', Validators.required),
      waypoints: new FormArray([])
    });
  }

  onSubmit() {
    this.request = new Request(
      this.form.value.origin,
      this.form.value.destination,
      'DRIVING',
      this.form.value.waypoints,
      false, true, true, true);
    console.log(this.request);
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

          if (place.geometry !== undefined || place.geometry !== null) {
            const id = el.nativeElement.id;
            if (id !== 'origin' && id !== 'destination') {
              const idx = (<FormArray>this.form.get('waypoints')).controls.length - 1;
              (<FormGroup>(<FormArray>this.form.controls.waypoints).controls[idx]).controls[id].patchValue(place.formatted_address);
            } else {
              this.form.controls[id].patchValue(place.formatted_address);
            }
          }

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


