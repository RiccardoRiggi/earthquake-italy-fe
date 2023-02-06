import { divIcon } from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';


//Magnitudo <2
const iconMarkupVeryLow: any = renderToStaticMarkup(<i className=" fa fa-map-marker-alt fa-3x magnitudo-very-low" />);
const veryLow = divIcon({
    html: iconMarkupVeryLow,
    bgPos: [0, 0],
    shadowAnchor: [0, 0],
    shadowSize: [0, 0],

});

//Magnitudo >2 e <3
const iconMarkupLow: any = renderToStaticMarkup(<i className=" fa fa-map-marker-alt fa-3x magnitudo-low" />);
const low = divIcon({
    html: iconMarkupLow,
    bgPos: [0, 0],
    shadowAnchor: [0, 0],
    shadowSize: [0, 0],

});

//Magnitudo >3 e <4
const iconMarkupMid: any = renderToStaticMarkup(<i className=" fa fa-map-marker-alt fa-3x magnitudo-mid" />);
const mid = divIcon({
    html: iconMarkupMid,
    bgPos: [0, 0],
    shadowAnchor: [0, 0],
    shadowSize: [0, 0],

});

//Magnitudo 4 e <5
const iconMarkupMidHigh: any = renderToStaticMarkup(<i className=" fa fa-map-marker-alt fa-3x magnitudo-mid-high" />);
const midHigh = divIcon({
    html: iconMarkupMidHigh,
    bgPos: [0, 0],
    shadowAnchor: [0, 0],
    shadowSize: [0, 0],

});

//Magnitudo 5 e <6
const iconMarkupHigh: any = renderToStaticMarkup(<i className=" fa fa-map-marker-alt fa-3x magnitudo-high" />);
const high = divIcon({
    html: iconMarkupHigh,
    bgPos: [0, 0],
    shadowAnchor: [0, 0],
    shadowSize: [0, 0],

});

//Magnitudo >6
const iconMarkupVeryHigh: any = renderToStaticMarkup(<i className=" fa fa-map-marker-alt fa-3x magnitudo-very-high" />);
const veryHigh = divIcon({
    html: iconMarkupVeryHigh,
    bgPos: [0, 0],
    shadowAnchor: [0, 0],
    shadowSize: [0, 0],

});

export const getIcon = (magnitude: any) => {
    if (magnitude < 2) {
        return veryLow;
    } else if (magnitude < 3) {
        return low;
    }else if (magnitude < 4) {
        return mid;
    }else if (magnitude < 5) {
        return midHigh;
    }else if (magnitude < 6) {
        return high;
    }else{
        return veryHigh
    }
}

//Magnitudo >6
const radar: any = renderToStaticMarkup(<i className=" fa fa-bullseye fa-3x text-primary" />);
export const radarIcon = divIcon({
    html: radar,
    bgPos: [0, 0],
    shadowAnchor: [0, 0],
    shadowSize: [0, 0],

});