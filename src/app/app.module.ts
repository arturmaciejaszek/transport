import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterializeModule } from 'angular2-materialize';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';

import { AppComponent } from './app.component';
import { TransportComponent } from './transport/transport.component';
import { environment } from '../environments/environment';
import { MapComponent } from './map/map.component';


@NgModule({
  declarations: [
    AppComponent,
    TransportComponent,
    MapComponent,
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: environment.googleMaps.key,
      libraries: ['places']
    }),
    AgmDirectionModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    MaterializeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
