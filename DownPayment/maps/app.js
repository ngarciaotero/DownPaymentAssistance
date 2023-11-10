// This loads helper components from the Extended Component Library,
// https://github.com/googlemaps/extended-component-library.
// Please note unpkg.com is unaffiliated with Google Maps Platform.
import { APILoader } from "https://unpkg.com/@googlemaps/extended-component-library@0.4";

class LocatorPlus {
  static REQUIRED_MAPS_JS_LIBRARIES = ["core", "geometry", "marker", "routes"];

  constructor(configuration) {
    this.locations = configuration.locations || [];
    this.capabilities = configuration.capabilities || {};
    this.mapOptions = configuration.mapOptions || {};
  }

  /** Returns a fully initialized Locator widget. */
  static async init(configuration) {
    const locator = new LocatorPlus(configuration);

    await locator.loadMapsLibraries();
    locator.initializeDOMReferences();
    locator.initializeMapLocations();
    locator.initializeSearchInput();
    locator.initializeDistanceMatrix();

    // Initial render of results
    locator.renderResultsList();

    return locator;
  }

  /** Loads resources from the Google Maps JS SDK. */
  async loadMapsLibraries() {
    this.mapsLibraries = {};
    return Promise.all(
      LocatorPlus.REQUIRED_MAPS_JS_LIBRARIES.map(async (libName) => {
        this.mapsLibraries[libName] = await APILoader.importLibrary(libName);
      })
    );
  }

  /** Caches references to required DOM elements. */
  initializeDOMReferences() {
    this.mapEl = document.querySelector("gmp-map");
    this.routeEl = document.querySelector("gmp-map > gmpx-route-overview");
    this.panelEl = document.getElementById("locations-panel");
    this.sectionNameEl = document.getElementById(
      "location-results-section-name"
    );
    this.resultItemTemplate = document.getElementById(
      "locator-result-item-template"
    );
    this.resultsContainerEl = document.getElementById("location-results-list");

    this.overlayLayoutEl = document.querySelector("gmpx-overlay-layout");
    this.detailsEl = document.querySelector(
      "#details-panel gmpx-place-overview"
    );
    document
      .querySelector("#details-panel .back-button")
      .addEventListener("click", () => this.overlayLayoutEl.hideOverlay());
  }

  /** Sets one of the locations as "selected". */
  selectResultItem(locationIdx, panToMarker, scrollToResult) {
    this.selectedLocationIdx = locationIdx;
    for (const li of this.resultsContainerEl.children) {
      li.classList.remove("selected");
      if (parseInt(li.dataset.locationIndex) === this.selectedLocationIdx) {
        li.classList.add("selected");
        if (scrollToResult) {
          li.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      }
    }
    if (panToMarker && locationIdx != null && !this.searchLocation) {
      this.map.panTo(this.locations[locationIdx].coords);
    }
  }

  /** Updates the map bounds to markers. */
  updateBounds() {
    const bounds = new this.mapsLibraries.core.LatLngBounds();
    if (this.searchLocationMarker) {
      bounds.extend(this.searchLocationMarker.getPosition());
    }
    for (let i = 0; i < this.markers.length; i++) {
      bounds.extend(this.markers[i].getPosition());
    }
    this.map.fitBounds(bounds);
  }

  /** Initializes the map and markers. */
  initializeMapLocations() {
    this.searchLocation = null;
    this.searchLocationMarker = null;
    this.selectedLocationIdx = null;
    this.userCountry = null;

    // Initialize the map.
    this.map = this.mapEl.innerMap;
    this.map.setOptions({
      ...this.mapOptions,
      mapId: this.mapOptions.mapId || "DEMO_MAP_ID",
    });

    // Create a marker for each location.
    this.markers = this.locations.map((location, index) => {
      const marker = new this.mapsLibraries.marker.Marker({
        position: location.coords,
        map: this.map,
        title: location.title,
      });
      marker.addListener("click", () => {
        this.selectResultItem(index, false, true);
      });
      return marker;
    });

    // Fit map to marker bounds after initialization.
    if (this.locations.length) {
      this.updateBounds();
    }

    // Create a PlaceResult stub for each location.
    const LatLng = this.mapsLibraries.core.LatLng;
    for (const location of this.locations) {
      location.placeResult = {
        place_id: location.placeId,
        name: location.title,
        formatted_address: location.address1 + " " + location.address2,
        geometry: { location: new LatLng(location.coords) },
      };
    }
  }

  /**
   * Gets the distance from a store location to the user's location, used in
   * sorting the list.
   */
  getLocationDistance(location) {
    if (!this.searchLocation) return null;

    // Use travel distance if available (from Distance Matrix).
    if (location.travelDistanceValue != null) {
      return location.travelDistanceValue;
    }

    // Fall back to straight-line distance.
    return this.mapsLibraries.geometry.spherical.computeDistanceBetween(
      new this.mapsLibraries.core.LatLng(location.coords),
      this.searchLocation.location
    );
  }

  /**
   * Creates a DOM Element corresponding to an individual result item.
   */
  createResultItem(location) {
    // Create the parent DOM node.
    const li =
      this.resultItemTemplate.content.firstElementChild.cloneNode(true);
    li.dataset.locationIndex = location.index;
    if (location.index === this.selectedLocationIdx) {
      li.classList.add("selected");
    }

    li.querySelector("gmpx-place-data-provider").place = location.placeResult;
    li.querySelector(".address").append(
      location.address1,
      document.createElement("br"),
      location.address2
    );
    li.querySelector("gmpx-place-directions-button").origin = this
      .searchLocation
      ? this.searchLocation.location
      : null;
    li.querySelector(".distance").textContent =
      location.travelDistanceText ?? "";
    const actionsContainer = li.querySelector(".actions");
    for (const action of location.actions ?? []) {
      if (action.defaultUrl) {
        const actionButton = document.createElement("gmpx-icon-button");
        actionButton.icon = "open_in_new";
        actionButton.href = action.defaultUrl;
        actionButton.textContent = action.label;
        actionsContainer.append(actionButton);
      }
    }

    // Add click event handlers.
    li.querySelector(".view-details").addEventListener("click", () => {
      this.showDetails(location.index);
    });

    const resultSelectionHandler = () => {
      if (
        location.index !== this.selectedLocationIdx ||
        this.updateDirectionsOnSelect
      ) {
        this.selectResultItem(location.index, true, false);
        this.updateDirections();
        this.updateDirectionsOnSelect = false;
      }
    };

    // Clicking anywhere on the item selects this location.
    // Additionally, create a button element to make this behavior
    // accessible under tab navigation.
    li.addEventListener("click", resultSelectionHandler);
    li.querySelector(".select-location").addEventListener("click", (e) => {
      resultSelectionHandler();
      e.stopPropagation();
    });

    return li;
  }

  /** Renders the list of items next to the map. */
  renderResultsList() {
    let locations = this.locations.slice();
    for (let i = 0; i < locations.length; i++) {
      locations[i].index = i;
    }
    if (this.searchLocation) {
      this.sectionNameEl.textContent =
        "Nearest locations (" + locations.length + ")";
      locations.sort((a, b) => {
        return this.getLocationDistance(a) - this.getLocationDistance(b);
      });
    } else {
      this.sectionNameEl.textContent = `All locations (${locations.length})`;
    }

    this.resultsContainerEl.replaceChildren(
      ...locations.map((x) => this.createResultItem(x))
    );
  }

  /** Updates the end user's location, used for travel times and sorting. */
  updateSearchLocation(place) {
    if (this.searchLocationMarker) {
      this.searchLocationMarker.setMap(null);
    }
    this.searchLocation = place;
    this.clearDirections();
    if (!this.searchLocation) {
      return;
    }
    this.searchLocationMarker = new this.mapsLibraries.marker.Marker({
      position: place.location,
      map: this.map,
      title: "My location",
      icon: {
        path: this.mapsLibraries.core.SymbolPath.CIRCLE,
        scale: 12,
        fillColor: "#3367D6",
        fillOpacity: 0.5,
        strokeOpacity: 0,
      },
    });

    // Update the locator's idea of the user's country, used for units. Use
    // `formatted_address` instead of the more structured `address_components`
    // to avoid an additional billed call.
    const addressParts = place.formattedAddress.split(" ");
    this.userCountry = addressParts[addressParts.length - 1];

    // Update map bounds to include the new location marker.
    this.updateBounds();

    // Update the result list so we can sort it by proximity.
    this.renderResultsList();

    this.updateTravelTimes();
  }

  /** When the search input capability is enabled, initialize it. */
  initializeSearchInput() {
    const placePicker = document.querySelector("gmpx-place-picker");
    placePicker.addEventListener("gmpx-placechange", () => {
      this.updateSearchLocation(placePicker.value);
    });
  }

  /** Initialize Distance Matrix for the locator. */
  initializeDistanceMatrix() {
    this.distanceMatrixService =
      new this.mapsLibraries.routes.DistanceMatrixService();
  }

  /** Annotate travel times to the selected location using Distance Matrix. */
  updateTravelTimes() {
    if (!this.searchLocation) return;

    const units =
      this.userCountry === "USA"
        ? this.mapsLibraries.core.UnitSystem.IMPERIAL
        : this.mapsLibraries.core.UnitSystem.METRIC;
    const request = {
      origins: [this.searchLocation.location],
      destinations: this.locations.map((x) => x.coords),
      travelMode: this.mapsLibraries.routes.TravelMode.DRIVING,
      unitSystem: units,
    };
    const callback = (response, status) => {
      if (status === "OK") {
        const distances = response.rows[0].elements;
        for (let i = 0; i < distances.length; i++) {
          const distResult = distances[i];
          let travelDistanceText, travelDistanceValue;
          if (distResult.status === "OK") {
            travelDistanceText = distResult.distance.text;
            travelDistanceValue = distResult.distance.value;
          }
          const location = this.locations[i];
          location.travelDistanceText = travelDistanceText;
          location.travelDistanceValue = travelDistanceValue;
        }

        // Re-render the results list, in case the ordering has changed.
        this.renderResultsList();
      }
    };
    this.distanceMatrixService.getDistanceMatrix(request, callback);
  }

  /**
   * Update directions displayed from the search location to the selected
   * location on the map.
   */
  updateDirections() {
    if (this.searchLocation && this.selectedLocationIdx != null) {
      this.routeEl.originLatLng = this.searchLocation.location;
      this.routeEl.destinationLatLng =
        this.locations[this.selectedLocationIdx].coords;
    }
  }

  /** Removes the directions polyline from the map. */
  clearDirections() {
    this.routeEl.originLatLng = undefined;
    this.routeEl.destinationLatLng = undefined;
  }

  /** Opens the overlay to show details about a selected location. */
  showDetails(locationIndex) {
    const location = this.locations[locationIndex];
    if (location.placeId) {
      this.detailsEl.place = location.placeId;
      this.overlayLayoutEl.showOverlay();
    }
  }
}

document.addEventListener("DOMContentLoaded", () =>
  LocatorPlus.init(CONFIGURATION)
);
