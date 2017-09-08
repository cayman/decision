
export const sectors = ({companies}) => {
    return companies.sectors;
};

export const companies = ({companies}) => {
    return companies.map;
};

export const years = ({companies}) => {
    return companies.years;
};

export const company = ({companies}) => {
    return companies.model;
};

export const urls = ({urls}) => {
    return urls;
};

export const getCompany = ({companies}) => (id) => {
    console.info('getCompany',id, companies.map[id]);
    return companies.map[id];
};

//LINKS getters
export const links = ({dictionary}) => {
    return dictionary.links;
};
export const getLink = ({dictionary}) => (id) => {
    return dictionary.links.find(link=>link.id == id);
};

export const infoLink = (state,{getLink})=>{
    return getLink(0);
};
export const stockLink= (state,{getLink})=>{
    return getLink(5);
};


//InstrumentTypes getters
export const instrumentTypes = ({dictionary}) => {
    return dictionary.instrumentTypes;
};

export const getInstrumentType = ({dictionary}) => (id) => {
    return dictionary.instrumentTypes.find(type=>type.id == id);
};

export const allSectors = ({dictionary}) => {
    return dictionary.sectors;
};



