import { environment } from './../../environments/environment';
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
import { FormGroup, FormControl, Validators, FormArray, NgForm } from '@angular/forms';

import { } from 'googlemaps';
import { Request } from './../map/request.model';
import { Http, Headers, HttpModule } from '@angular/http';
import { FlashMessagesService } from 'angular2-flash-messages';

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
  link: string;
  est: {distance: number, estimate: number} = {distance: null, estimate: null};
  showSpinner = false;
  hideButton = false;
  green = false;
  red = false;


  constructor(private mapsApi: MapsAPILoader,
              private ngZone: NgZone,
              private http: Http) { }

  ngOnInit() {
    this.formInit();
  }

  setEst(e) {
    this.est = e;
  }

  formInit() {
    this.form = new FormGroup({
      origin: new FormControl(this.origin, Validators.required),
      destination: new FormControl('', Validators.required),
      waypoints: new FormArray([])
    });
  }

  onSend(f: NgForm) {
    this.showSpinner = true;
    this.hideButton = true;
    this.sendMail({
      name: f.value.name,
      email: f.value.email,
      phone: f.value.phone,
      msg: f.value.msg,
      link: this.link,
      dist: this.est.distance,
      est: this.est.estimate
    }).subscribe(
      res => {
        this.showSpinner = false;
        if (res.json()) {
          this.green = true;
          setTimeout(() => {
            this.green = false;
            this.hideButton = false;
          }, 1000);
        } else {
          this.red = true;
          setTimeout(() => {
            this.red = false;
            this.hideButton = false;
          } , 1000);
        }
      }
    );
    f.reset();
  }

  sendMail({name: name, email: email, phone: phone, msg: msg, link: link, dist: dist, est: est }) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('https://us-central1-transport-maciejaszek.cloudfunctions.net/sendEmail', {
      name: name,
      email: email,
      phone: phone,
      msg: msg,
      link: link,
      dist: dist,
      est: est
    }, {headers: headers});
  }

  onSubmit() {
    this.request = new Request(
      this.form.value.origin,
      this.form.value.destination,
      'DRIVING',
      this.form.value.waypoints,
      false, true, true, true);
    this.generateLink();
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

  generateLink() {
    this.link = 'https://www.google.pl/maps/dir/';
    this.link += this.request.origin + '/';
    this.request.waypoints.forEach( res => this.link += res.location + '/' );
    this.link += this.request.destination + '/';
    this.link = this.link.replace(/\s/g, '');
  }

  generateIframe() {
    this.link = 'https://www.google.com/maps/embed/v1/directions?key=' + environment.googleMaps.key;
    this.link += '&origin=' + this.request.origin;
    this.request.waypoints.forEach( res => this.link += '&waypoints=' + res.location );
    this.link += '&destination=' + this.request.destination;
    this.link = this.link.replace(/\s/g, '');
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


