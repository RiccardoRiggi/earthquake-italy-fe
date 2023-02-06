import http from "../http-common";


const getTerremoti = (params: any) => {
    return http.get("/earthquakes",{params});
}



const earthquakeService = {
    
    getTerremoti
};
export default earthquakeService;