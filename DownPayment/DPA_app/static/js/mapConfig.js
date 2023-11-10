const CONFIGURATION = {
  locations: [
    {
      title: "Atlanta Housing Bureau",
      address1: "68 Mitchell St SW #1200",
      address2: "Atlanta, GA 30303, USA",
      coords: { lat: 33.74904429948123, lng: -84.39033844907378 },
      placeId:
        "Ei82OCBNaXRjaGVsbCBTdCBTVyAjMTIwMCwgQXRsYW50YSwgR0EgMzAzMDMsIFVTQSIgGh4KFgoUChIJU17_YbQD9YgRlLUTRuZeCCISBDEyMDA",
    },
    {
      title: "Fulton County Government",
      address1: "141 Pryor St SW",
      address2: "Atlanta, GA 30303, USA",
      coords: { lat: 33.751468831719976, lng: -84.39125762023772 },
      placeId: "ChIJpSRbo50D9YgRe3gJuX5-2bc",
    },
    {
      title: "Invest Atlanta",
      address1: "133 Peachtree St NE Suite 2900",
      address2: "Atlanta, GA 30303, USA",
      coords: { lat: 33.75737183927693, lng: -84.38691079140169 },
      placeId: "ChIJk-YAlIcD9YgRbVYm7QMireg",
    },
    {
      title: "Georgia Dept. of Community Affairs",
      address1: "60 Executive Park S",
      address2: "Atlanta, GA 30329, USA",
      coords: { lat: 33.82695844121949, lng: -84.34257507790983 },
      placeId: "ChIJqe75aBIG9YgReTdXFU1H1eA",
    },
    {
      title: "Atlanta Housing Bureau",
      address1: "230 John Wesley Dobbs Ave NE",
      address2: "Atlanta, GA 30303, USA",
      coords: { lat: 33.75784369889718, lng: -84.37983367790984 },
      placeId: "ChIJQQc1lZ8D9YgROMQCsNQBUqc",
    },
  ],
  mapOptions: {
    center: { lat: 38.0, lng: -100.0 },
    fullscreenControl: true,
    mapTypeControl: false,
    streetViewControl: false,
    zoom: 4,
    zoomControl: true,
    maxZoom: 17,
    mapId: "",
  },
  mapsApiKey: "AIzaSyB2MUok94X6NM60s7tsWqyxhmsi_hUwmDk",
  capabilities: {
    input: true,
    autocomplete: true,
    directions: true,
    distanceMatrix: true,
    details: true,
    actions: false,
  },
};
