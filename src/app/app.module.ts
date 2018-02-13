import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterializeModule } from 'angular2-materialize';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';

import { AppComponent } from './app.component';
import { TransportComponent } from './transport/transport.component';
import { environment } from '../environments/environment';
import { MapComponent } from './map/map.component';

const appRoutes: Routes = [
  {path: '', component: TransportComponent, pathMatch: 'full'},
  {path: '**', redirectTo: ''}
];

@NgModule({
  declarations: [
    AppComponent,
    TransportComponent,
    MapComponent,
  ],
  imports: [
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleMaps.key,
      libraries: ['places']
    }),
    AgmDirectionModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    BrowserModule,
    MaterializeModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
