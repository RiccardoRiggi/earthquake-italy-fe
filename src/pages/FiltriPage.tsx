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




export default function FiltriPage() {

    let dispatch = useDispatch();


    const [ricercaEseguita, setRicercaEseguita] = React.useState(false);
    const [lista, setLista] = React.useState<any>([]);








    const eseguiRicerca = async () => {
        dispatch(fetchIsLoadingAction(true));

        const params = {
            startDate: startDate,
            endDate: endDate,
            minMagnitude: magnitudo
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


    const [magnitudo, setMagnitudo] = React.useState(2);

    const aggiornaMagnitudo = (event: any) => {
        console.log(event.target.value);
        setMagnitudo(event.target.value);
    };

    const generaInizioDal = () => {
        let date = new Date();
        date.setDate(date.getDate() - 7);
        return date.toISOString().substring(0, 10);
    }

    const [startDate, setStartDate] = React.useState(generaInizioDal());

    const aggiornaStartDate = (event: any) => {
        console.log(event.target.value);
        setStartDate(event.target.value);
    };

    const [endDate, setEndDate] = React.useState(new Date().toISOString().substring(0, 10));

    const aggiornaEndDate = (event: any) => {
        console.log(event.target.value);
        setEndDate(event.target.value);
    };

    return (
        <Layout>
            <div className='row'>
                <div className='col-12'>
                    <div className="card shadow mb-4">
                        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                            <h6 className="m-0 font-weight-bold text-primary"><i className="fa-solid fa-filter text-primary pr-1"></i> Filtri</h6>
                            <span className='btn btn-primary' onClick={eseguiRicerca}>Aggiorna mappa</span>
                        </div>
                        <div className="card-body">
                            <div className='row'>
                                <div className='col-6'>
                                    <label>Dal:</label>
                                    <input type={"date"} onChange={aggiornaStartDate} className={"form-control"} value={startDate} />
                                </div>

                                <div className='col-6'>
                                    <label>Al:</label>
                                    <input type={"date"} onChange={aggiornaEndDate} className={"form-control"} value={endDate} />
                                </div>

                                <div className='col-12'>
                                    <label>Magnitudo: {magnitudo}</label>
                                    <input type={"range"} onChange={aggiornaMagnitudo} className={"form-control"} value={magnitudo} min={0} max={10} step={0.1} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='col-12'>
                    <div className="card shadow mb-4">
                        <div className="card-header py-3 ">
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


