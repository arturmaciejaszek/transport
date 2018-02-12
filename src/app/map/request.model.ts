import { GoogleMapsAPIWrapper, LatLng } from '@agm/core';

export class Request {
    constructor(
        public origin: LatLng | String,
        public destination: LatLng | String,
        public travelMode: String,
        public waypoints?: {
            location: LatLng | String,
            stopover: Boolean
        }[],
        public provideRouteAlternatives?: Boolean,
        public avoidFerries?: Boolean,
        public avoidHighways?: Boolean,
        public avoidTolls?: Boolean,
    ) {}
}
