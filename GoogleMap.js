var locations = [
            ['Metro <br/>Brigadeiro', -23.5685068, -46.6481119, 18],
            ['Metro <br/>TrianonMasp ', -23.5630436, -46.6544703, 17],
			['Rua Paraba', -23.5328218, -46.6187577, 17]
];

function media(view) {
	var cartesian = [0, 0];
	for (i = 0 ; i < view.length ; i++) {
		cartesian[0] += view[i][1];
		cartesian[1] += view[i][2];
	}
	cartesian[0] /= view.length;
	cartesian[1] /= view.length;

	return cartesian;
}
var pmedia = media(locations)


var map = new google.maps.Map(document.getElementById('map'), {
	zoom: 12,
	//center: new google.maps.LatLng(-23.53728515, -46.61693815),
	center: new google.maps.LatLng(pmedia[0], pmedia[1]),
	zoomControl: !0,
	scrollwheel: !1,
	mapTypeId: google.maps.MapTypeId.ROADMAP
});

var infowindow = new google.maps.InfoWindow();

var marker, i;

for (i = 0; i < locations.length; i++) {
	marker = new google.maps.Marker({
		position: new google.maps.LatLng(locations[i][1], locations[i][2]),
		//animation: google.maps.Animation.BOUNCE, //animação
		//icone da chronic
		//icon: "front/img/chronic_maps.png",
		//icon: "front/img/ico-where-contact.png",
		map: map
	});


	google.maps.event.addListener(marker, 'click', (function (marker, i) {
		return function () {
			if (marker.getAnimation() !== null) {
				marker.setAnimation(null);
				infowindow.close(map, marker);
			} else {
				marker.setAnimation(google.maps.Animation.BOUNCE);
				infowindow.setContent(locations[i][0]);
				infowindow.open(map, marker);
			}
		}
	})(marker, i));
}