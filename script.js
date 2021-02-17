require([
        "esri/Map",
        "esri/views/MapView",
        "esri/layers/ImageryLayer",
        "esri/layers/support/RasterFunction"
      ], function(Map, MapView, ImageryLayer, RasterFunction) {


        var imagePopupTemplate = {
          // autocasts as new PopupTemplate()
          title: "Data from Landsat 8 satellite",
          content:
            "Rendered RGB values: <b>{Raster.ServicePixelValue} </b>" +
            "<br>Original values (CA, B, G, R, NIR, SWIR 1, SWIR 2, Pan, Cirrus, TIRS 1, TIRS 2): <b>{Raster.ItemPixelValue} </b>"
        };

var serviceRFT = new RasterFunction({
          functionName: "NDVI",
          rasterFunctionArguments: {
           "VisibleBandID": 4,
           "InfraredBandID": 5,},
          variableName: "Raster"
        });

        var layer = new ImageryLayer({
          url: "https://landsat2.arcgis.com/arcgis/rest/services/Landsat8_Views/ImageServer",
          renderingRule: serviceRFT,
          popupTemplate: imagePopupTemplate
        });

        var map = new Map({
          basemap: "hybrid",
          layers: [layer]
        });

        var view = new MapView({
          container: "viewDiv",
          map: map,
          center: [-90.1994, 38.6270],
          zoom: 6,
          popup: {
            actions: []
          }
        });
      });
