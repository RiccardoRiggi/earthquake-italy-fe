import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import Layout from '../components/Layout';
import remarkGfm from 'remark-gfm'
import { useDispatch } from 'react-redux';
import { fetchIsLoadingAction, fetchTestoDangerAction, fetchTestoSuccessAction, fetchTestoWarnAction } from '../modules/feedback/actions';


import { MapContainer } from '../../node_modules/react-leaflet/lib/MapContainer'
import { TileLayer } from '../../node_modules/react-leaflet/lib/TileLayer'
import { Popup } from '../../node_modules/react-leaflet/lib/Popup'
import { Marker } from '../../node_modules/react-leaflet/lib/Marker'
import earthquakeService from '../services/EarthquakeService';
import { getIcon, radarIcon } from '../components/Markers';




export default function CoordinatePage() {

    let dispatch = useDispatch();


    const [ricercaEseguita, setRicercaEseguita] = React.useState(false);
    const [lista, setLista] = React.useState<any>([]);

    const [latitudineGlobale, setLatitudineGlobale] = React.useState(42.29);
    const [longitudineGlobale, setLongitudineGlobale] = React.useState(11.95);






    const eseguiRicerca = async (lat: any, lon: any) => {
        dispatch(fetchIsLoadingAction(true));

        const params = {
            distance: raggio * 1000,
            minMagnitude: magnitudo,
            latitude: lat,
            longitude: lon
        };

        await earthquakeService.getTerremoti(params).then(response => {
            console.log(response.data);
            setLista(response.data);
            dispatch(fetchIsLoadingAction(false));
        }).catch(e => {
            console.error(e);
            dispatch(fetchIsLoadingAction(false));
        });
    }


    useEffect(() => {
        if (!ricercaEseguita) {
            dispatch(fetchTestoDangerAction(""));
            dispatch(fetchTestoWarnAction(""));
            dispatch(fetchTestoSuccessAction(""));
            setRicercaEseguita(true);

        }
    });


    const [magnitudo, setMagnitudo] = React.useState(2);

    const aggiornaMagnitudo = (event: any) => {
        setMagnitudo(event.target.value);
    };

    const [raggio, setRaggio] = React.useState(30);

    const aggiornaRaggio = (event: any) => {
        setRaggio(event.target.value);
    };

    const center = {
        lat: latitudineGlobale,
        lng: longitudineGlobale,
    }

    function DraggableMarker() {
        const [draggable, setDraggable] = React.useState(false)
        const [position, setPosition] = React.useState(center)
        const markerRef = React.useRef(null)
        const eventHandlers = React.useMemo(
            () => ({
                dragend() {
                    const marker: any = markerRef.current
                    if (marker != null) {
                        setPosition(marker.getLatLng())
                        console.info(marker.getLatLng());


                    }
                },
            }),
            [],
        )
        const toggleDraggable = React.useCallback(() => {
            setDraggable((d) => !d);
            const marker: any = markerRef.current
            setLatitudineGlobale(marker.getLatLng().lat);
            setLongitudineGlobale(marker.getLatLng().lng);
        }, [])

        const usaCoordinate = () => {
            const marker: any = markerRef.current
            console.info(+"USO COORDINATE" + marker.getLatLng());
            setLatitudineGlobale(marker.getLatLng().lat);
            setLongitudineGlobale(marker.getLatLng().lng);
            eseguiRicerca(marker.getLatLng().lat, (marker.getLatLng().lng));
        }

        return (
            <Marker icon={radarIcon}
                draggable={draggable}
                eventHandlers={eventHandlers}
                position={position}
                ref={markerRef}>
                <Popup >
                    <div className='text-center'>
                        <span>Latitudine: {latitudineGlobale.toFixed(2)} Longitudine: {longitudineGlobale.toFixed(2)}</span>
                        <span onClick={toggleDraggable}>
                            {draggable
                                ? <span className='btn btn-outline-primary'>Conferma posizione</span>
                                : <span className='btn btn-primary'>Clicca per poter spostare il marker</span>}
                        </span>
                        {!draggable && <span className='btn btn-primary mt-1' onClick={usaCoordinate}>
                            Cerca in quest'area
                        </span>}
                    </div>
                </Popup>
            </Marker>
        )
    }


    return (
        <Layout>
            <div className='row'>
                <div className='col-12'>
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-primary"><i className="fa-solid fa-filter text-primary pr-1"></i> Filtri</h6>
                        </div>
                        <div className="card-body">
                            <div className='row'>
                                <div className='col-6'>
                                    <label>Raggio: {raggio}km</label>
                                    <input type={"range"} onChange={aggiornaRaggio} className={"form-control"} value={raggio} min={1} max={100} step={0.1} />
                                </div>

                                <div className='col-6'>
                                    <label>Magnitudo: {magnitudo}</label>
                                    <input type={"range"} onChange={aggiornaMagnitudo} className={"form-control"} value={magnitudo} min={0} max={10} step={0.1} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className='col-12'>
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-primary"><i className="fa-solid fa-map-location-dot text-primary pr-1"></i> Mappa</h6>
                        </div>
                        <div className="card-body">
                            <MapContainer center={[41.60897592585041, 12.593894063067715]} zoom={5} scrollWheelZoom={false} >
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />

                                {Array.isArray(lista) && lista.map((elemento: any, index: number) =>
                                    <span key={index}>
                                        <Marker icon={getIcon(elemento.magnitude)} position={[elemento.coordinates.coordinates[0], elemento.coordinates.coordinates[1]]}>
                                            <Popup>
                                                <div className='text-center'>
                                                    <span className='text-center'>
                                                        <span className='h5'>{elemento.magnitude}</span>{elemento.magType}<br />

                                                    </span>
                                                    {elemento.eventLocationName}<br /><span>Distante <strong>{elemento.distance.toFixed(2)}km</strong> dal luogo indicato</span><br />{new Date(elemento.time).toUTCString()}
                                                </div>
                                            </Popup>
                                        </Marker>
                                    </span>
                                )}

                                <DraggableMarker />

                            </MapContainer>
                        </div>
                    </div>


                </div>
            </div>
        </Layout>
    );

}


