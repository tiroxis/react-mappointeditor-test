import * as React from 'react';
import {connect} from "react-redux";
import PointList from './components/entity/point/List';
import * as EventEmitter from "eventemitter3";
import {add, remove, reorder, save} from "./store/actions/point";
import {Map, Marker, Polyline, Popup} from "react-leaflet";
import IPoint from "./models/Point";
import {DivIcon, gridLayer, LatLng} from "leaflet";
import ReactGoogleMapLoader from "react-google-maps-loader"
import 'leaflet/dist/leaflet.css';


interface IApp {
    points: IPoint[];
    onAdd: (point: IPoint) => void;
    onSave: (point: IPoint) => void;
    onRemove: (point: IPoint) => void;
    onReorder: (point: any) => void;
}

class App extends React.Component<IApp> {

    public events = new EventEmitter();
    public marker: DivIcon;

    public state = {
        lat: 55.7497649,
        lng: 37.592422,
        zoom: 13,
    };

    public leafletMap: Map | null;

    constructor(props: any) {
        super(props);

        // delete L.Icon.Default.prototype._getIconUrl;

        this.marker  = new DivIcon({
            className: 'leaflet-mouse-marker',
            iconAnchor: [12.5, 41],
            iconSize: [25, 41]
        });

        this.renderMap = this.renderMap.bind(this);
        this.onDrag = this.onDrag.bind(this);

        this.events.on('remove', (point) => {
            this.props.onRemove(point);
        });

        this.events.on('reorder', (points) => {
            this.props.onReorder({
                list: points
            });
        });

        this.events.on('add', (point) => {
            if(this.leafletMap){
                this.props.onAdd({
                    ...point,
                    ...{
                        coordinates: this.leafletMap.leafletElement.getCenter()
                    }
                } as IPoint)
            }
        })
    }

    public onDrag(point: IPoint){
        return (e: any) => {

            this.props.onSave({
                ...point,
                ...{
                    coordinates: e.latlng
                }
            } as IPoint);
        }
    }

    public renderMap(googleMaps: any, error: any){
        const position = new LatLng(this.state.lat, this.state.lng);
        const layers = [
            gridLayer.googleMutant({
                type: 'roadmap'
            })
        ];

        return googleMaps ? (
            <div>
                {error ? error :
                    (
                        <div>
                            <div className={'map'}>
                                <Map
                                    center={position}
                                    zoom={this.state.zoom}
                                    ref={m => { this.leafletMap = m; }}
                                    layers={layers}
                                >
                                    {this.props.points.map((point, idx) =>
                                        <Marker
                                            key={`marker-${point.id}`}
                                            position={point.coordinates}
                                            icon={this.marker}
                                            draggable={true}
                                            onDrag={this.onDrag(point)}
                                        >
                                            <Popup>
                                                <h3>{point.title}</h3>
                                            </Popup>
                                        </Marker>
                                    )}

                                    <Polyline positions={this.props.points.map(item => item.coordinates )} />
                                </Map>
                            </div>
                            <div className={'map-points'}>
                                <PointList points={this.props.points} events={this.events}/>
                            </div>
                        </div>
                    )
                }
            </div>
        )   :   (
            <div>
                {/*Check for network error so loading state ends if user lost connection.*/}
                {error === "Network Error" ? <p>{error}</p> : <p>isLoading...</p>}
            </div>
        );

    }

    public render() {
        return (
            <div className={'application-root'}>
                <ReactGoogleMapLoader
                    params={{
                        key: 'AIzaSyDdGkodn8CyAdTkhT3duRZXf3v8PXB9I80', // Define your api key here
                        libraries: "places,geometry", // To request multiple libraries, separate them with a comma
                    }}
                    render={this.renderMap}/>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        points: state.points.list


    }
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onAdd: (point: IPoint) => dispatch(add(point)),
        onSave: (point: IPoint) => dispatch(save(point)),
        onRemove: (point: IPoint) => dispatch(remove(point)),
        onReorder: (points: any) => dispatch(reorder(points)),
    }
};
const ConnectedApp = connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

export default ConnectedApp;
