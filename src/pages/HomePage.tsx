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
import { getIcon } from '../components/Markers';




export default function HomePage() {

    let dispatch = useDispatch();


    const [ricercaEseguita, setRicercaEseguita] = React.useState(false);
    const [lista, setLista] = React.useState<any>([]);








    const eseguiRicerca = async () => {
        dispatch(fetchIsLoadingAction(true));

        let dt = new Date();
        dt.setDate(dt.getDate() - 1);

        const params = {
            startDate: dt.toISOString().substring(0, 10),

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
            eseguiRicerca();
        }
    });





    return (
        <Layout>
            <div className='row'>
                <div className='col-12'>

                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-primary"><i className="fa-solid fa-map-location-dot text-primary pr-1"></i> Mappa</h6>
                        </div>
                        <div className="card-body">
                            <MapContainer center={[41.60897592585041, 12.593894063067715]} zoom={5} scrollWheelZoom={false}>
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
                                                    {elemento.eventLocationName}<br />{new Date(elemento.time).toUTCString()}
                                                </div>
                                            </Popup>
                                        </Marker>
                                    </span>
                                )}

                            </MapContainer>
                        </div>
                    </div>




                </div>
            </div>
        </Layout>
    );

}


