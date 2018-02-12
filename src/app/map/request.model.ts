import { GoogleMapsAPIWrapper, LatLng } from '@agm/core';

export class Request {
    constructor(
        public origin: LatLng | string,
        public destination: LatLng | string,
        public travelMode?: string,
        public waypoints?: {
            location: LatLng | string,
            stopover: boolean
        }[],
        public provideRouteAlternatives?: boolean,
        public avoidFerries?: boolean,
        public avoidHighways?: boolean,
        public avoidTolls?: boolean,
    ) {
        this.travelMode = 'DRIVING';
    }
}
