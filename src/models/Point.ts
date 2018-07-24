import {LatLng} from "leaflet";

interface IPoint {
    id: string;
    title: string;
    coordinates: LatLng;
}

export {IPoint};
export default IPoint;