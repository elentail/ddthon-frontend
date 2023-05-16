<template>
    <div>
        <h2> 카카오 맵</h2>
        <div id="map"></div>
    </div>
</template>

<script setup>
// import { reactive } from 'vue';
import { onMounted } from 'vue';

let map = null;
const loadMaker = () => {
    const markerPosition = new window.kakao.maps.LatLng(33.450701, 126.570667);
    const marker = new window.kakao.maps.Marker({ position: markerPosition, });
    marker.setMap(map);
}
const loadScript = () => {
    const script = document.createElement("script");
    script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=180c9b22cc75bb9c8b1396913ae96cc9&autoload=false";
    script.onload = () => window.kakao.maps.load(loadMap);
    document.head.appendChild(script);
}
const loadMap = () => {
    const container = document.getElementById("map");
    const options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 3
    };
    map = new window.kakao.maps.Map(container, options);
    loadMaker();
}
onMounted(() => {
    if (window.kakao && window.kakao.maps) { loadMap(); }
    else { loadScript(); }
});

</script>
<style scoped>
#map {
    width: 100%;
    height: 50vh;
}
</style>