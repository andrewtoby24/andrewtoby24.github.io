(function () {
	var s = { ac: "NYYmTGo0", vid: "sNzy8CLr", surl: "https://binkiesproductionweu.servicebus.windows.net/binkiesproductionp2weu/messages", sauth: "SharedAccessSignature sr=https%3a%2f%2fbinkiesproductionweu.servicebus.windows.net%2fbinkiesproductionp2weu%2fmessages&sig=sM7o1lEFnv6hmxTHhtnlCoh21oZRvEbX5YOPpMsbYEI%3d&se=1721482598&skn=Send" };
	var errors = new Set();
	window.addEventListener("error", function (e) {
		var isPlayerError = e.filename.startsWith("https://az589851.vo.msecnd.net/players");
		var isIntegrationError = e.filename.startsWith("https://az589851.vo.msecnd.net/integrations") || e.filename.startsWith("https://embed.binkies3d.com");
		if (isPlayerError || isIntegrationError) {
			try {
				var errorMessage = e.error && e.error.stack ? e.error.stack : e.message + ":" + e.filename + ": " + e.lineno + ":" + e.colno;
				if (errors.has(errorMessage)) return;
				errors.add(errorMessage);
				var message = {
					accessKey: s.ac,
					messageType: "Error",
					viewId: s.vid,
					source: isPlayerError ? "player" : "integration",
					href: window.location.href,
					message: errorMessage,
					userAgent: navigator.userAgent
				}
				var req = new XMLHttpRequest();
				req.withCredentials = true;
				req.open("POST", s.surl, true);
				req.setRequestHeader("Content-type", "application/atom+xml;type=entry;charset=utf-8");
				req.setRequestHeader("Authorization", s.sauth);
				req.send(JSON.stringify(message));
			} catch (e) { }
		}
	});
})();
(function () {
    var regex = /biv=([0-9a-zA-Z]*)/;
    var match = regex.exec(location.search);

    if (match != null)
    {
        var script = document.createElement('script');script.crossOrigin="anonymous";script.async=true;
        script.src = 'https://embed.binkies3d.com/integrations/NYYmTGo0/adqmp1m2/' + match[1] + '/script.js';
        document.head.appendChild(script);
    }
    else {
        !function(t){"use strict";var n=function(){};n.main=function(){var t={IntegrationUrlPath:"https://az589851.vo.msecnd.net/integrations/NYYmTGo0/adqmp1m2/4e54a05",IntegrationId:"adqmp1m2",IntegrationVersion:"4e54a05",AccessKey:"NYYmTGo0",IsLive:!0};window.BinkiesSettings={ViewSettings:e.ViewSettings,IntegrationSettings:t,Supports3D:e.Supports3D};var n=window.document.createElement("script");n.crossOrigin="anonymous";n.async=true;n.async=!0,n.crossOrigin="anonymous",n.src=t.IntegrationUrlPath+"/integration_static.js",window.document.head.appendChild(n)};var e=function(){};e.Supports3D=function(t,n){null==n&&(n=!1),t(!0,"",null)},e.ViewSettings={ViewId:"sNzy8CLr",StatsUrl:"https://binkiesproductionweu.servicebus.windows.net/binkiesproductionp2weu/messages",StatsToken:"SharedAccessSignature sr=https%3a%2f%2fbinkiesproductionweu.servicebus.windows.net%2fbinkiesproductionp2weu%2fmessages&sig=sM7o1lEFnv6hmxTHhtnlCoh21oZRvEbX5YOPpMsbYEI%3d&se=1721482598&skn=Send",LightmapPath:"https://az589851.vo.msecnd.net/lightmaps/js/photo-studio-with-umbrella-1",PlayerPath:"https://az589851.vo.msecnd.net/players/v92",HotspotPath:"https://hotspot3d.blob.core.windows.net/players/v4",BrowserSupportsBrotli:true,BrowserSupportsGzip:true},n.main()}();
    }
})()