document.addEventListener('DOMContentLoaded', function() {
    var mapboxNAIPImagery = new Cesium.MapboxImageryProvider({
        mapId: 'brightrain.map-bpwe9yas',
        accessToken: 'pk.eyJ1IjoiYnJpZ2h0cmFpbiIsImEiOiJyMjgtNGk4In0.Y64dPMiS4Xi8BXRiDhWXyg'
    });

    var viewer = new Cesium.Viewer('cesiumContainer', {
        imageryProvider: mapboxNAIPImagery,
        baseLayerPicker: false
    });
    
    var mapboxOutdoors = new Cesium.MapboxImageryProvider({
        mapId: 'brightrain.ooac5jf6',
        accessToken: 'pk.eyJ1IjoiYnJpZ2h0cmFpbiIsImEiOiJyMjgtNGk4In0.Y64dPMiS4Xi8BXRiDhWXyg',
        alpha: 0.5
    });
    // I don't think this (classic) mapbox service supports alpha channel
    //viewer.scene.imageryLayers.addImageryProvider(mapboxOutdoors);
    
    // SHOUT OUT to Axis Maps for these geojson contours via
    // http://contours.axismaps.com
    viewer.dataSources.add(Cesium.GeoJsonDataSource.load("/data/rainier-countours.geojson", {
        stroke: Cesium.Color.DARKGRAY,
        strokeWidth: 1,
        fill: Cesium.Color.WHITE.withAlpha(0.5)
    })).then(
        function(dataSource) {
            var p = dataSource.entities.values;
            for (var i = 0; i < p.length; i++) {
                p[i].polygon.extrudedHeight = p[i].properties.elevation.getValue();
            }
        });
    viewer.camera.flyTo({
        destination : Cesium.Cartesian3.fromDegrees(-121.45, 46.25, 20000.0),
        orientation : {
            heading : Cesium.Math.toRadians(340.0),
            pitch : Cesium.Math.toRadians(-10.0),
            roll : 0.15
        }
    });
});