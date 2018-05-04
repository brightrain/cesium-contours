document.addEventListener('DOMContentLoaded', function() {
    var viewer = new Cesium.Viewer('cesiumContainer', {
        terrainProvider: Cesium.createWorldTerrain({
            requestVertexNormals: true
        })
    });
    // light it up!
    viewer.scene.globe.enableLighting = true;

    // SHOUT OUT to Axis Maps for these geojson contours via
    // http://contours.axismaps.com
    // add contours as geojson polygons
    var contours;
    viewer.dataSources.add(Cesium.GeoJsonDataSource.load("data/rainier-countours.geojson", {
        stroke: Cesium.Color.DARKGRAY,
        strokeWidth: 1,
        fill: Cesium.Color.WHITE.withAlpha(0.5)
    })).then(
        function(dataSource) {
            contours = dataSource;
            // extrude contour polys by elevation
            var p = dataSource.entities.values;
            for (var i = 0; i < p.length; i++) {
                p[i].polygon.extrudedHeight = p[i].properties.elevation.getValue();
            }
        });
    viewer.camera.flyTo({
        // fly on over to mount reindeer
        destination : Cesium.Cartesian3.fromDegrees(-121.45, 46.25, 20000.0),
        orientation : {
            heading : Cesium.Math.toRadians(340.0),
            pitch : Cesium.Math.toRadians(-10.0),
            roll : 0.3
        }
    });
    document.getElementById("contoursToggleBtn").onclick = toggleContours;
    function toggleContours(e) {
        if(viewer.dataSources.contains(contours)) {
            viewer.dataSources.remove(contours);
            e.target.classList.remove("visible");
            e.target.classList.add("not-visible");
        } else {
            viewer.dataSources.add(contours);
            e.target.classList.add("visible");
            e.target.classList.remove("not-visible");
        }
    }
});