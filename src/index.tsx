import 'assets/scss/style.scss'
import 'mapbox-gl/dist/mapbox-gl.css'
import ThemeCustomization from './themes'
import MapContainer from './views/map'
import React from 'react'
import { render } from 'react-dom'

// ==============================|| REACT DOM RENDER  ||============================== //

function iframeRender(accessToken: any, target: HTMLElement, options: any) {
	const iframeContainer = document.createElement('iframe')
	iframeContainer.style.width = '100%'
	iframeContainer.style.height = '500px'
	iframeContainer.style.border = 'none'
	iframeContainer.id = `${target.id}iframe`

	const directionContainer = target.querySelectorAll('[role*=presentation]')[0] as HTMLElement
	target?.appendChild(iframeContainer)

	const inputHTMLElements = directionContainer.getElementsByTagName('input')
	const labelHTMLElements = directionContainer.getElementsByTagName('label')

	const inputHtmlArray = [...labelHTMLElements].map((item, index) => ({
		label: item.children[0].textContent ? item.children[0].textContent : '',
		htmlElementId: inputHTMLElements[index].id,
		elementIndex: index
	}))

	const iframeDoc = iframeContainer.contentWindow?.document
	iframeDoc?.open()
	iframeDoc?.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8" />
            <title>Map</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
           <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

    		<!-- Includi eventuali librerie per la mappa, ad esempio Mapbox -->
    		<link href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.css" rel="stylesheet" type="text/css" />
    		<link href="https://api.mapbox.com/mapbox-gl-js/v3.1.0/mapbox-gl.css" rel="stylesheet" />
    		
    		<link href="https://cdn.jsdelivr.net/gh/revodigital/uni2-web-client@0.3.4/dist/style.css" rel="stylesheet" />
    		<script src='https://cdn.jsdelivr.net/gh/revodigital/uni2-web-client@0.3.4/dist/bundle.js'></script>
        </head>
        <body>
            <div id="MapContainer${target.id}"></div>
           <script>
        window.addEventListener('message', function(event) {
          // Verifica l'origine del messaggio per motivi di sicurezza
          // Se l'iframe e il parent sono dello stesso dominio, puoi omettere questa verifica
          // if (event.origin !== 'http://tuo-dominio.com') return;

          const { accessToken, options, target, inputHtmlArray } = event.data;

          if (accessToken && options && target) {
            // 1. Nascondi il primo elemento con role che contiene 'presentation' all'interno di #QID5
            const presentationElements = target.querySelectorAll('[role*=presentation]');
            if (presentationElements.length > 0) {
              presentationElements[0].style.display = 'none';
            }

            // 2. Inizializza la mappa con pin predefiniti
            mapRender(accessToken, target, inputHtmlArray, options);
          }
        }, false);
      </script>
        </body>
        </html>
    `)
	iframeDoc?.close()
	iframeContainer.onload = () => {
		iframeContainer.contentWindow?.postMessage({ accessToken, options, target, inputHtmlArray }, '*')
		// Nota: Sostituisci '*' con l'origine specifica per maggiore sicurezza
	}
	directionContainer.style.display = 'none'

	window.addEventListener(
		'message',
		function (event) {
			if (event.origin !== window.origin) return
			const { action, data } = event.data

			if (action === 'updateInput') {
				const { inputId, value } = data
				const inputElement = [...inputHTMLElements].find((el) => el.id === inputId)
				if (inputElement) {
					inputElement.value = value
				}
			}
		},
		false
	)
}

const mapRender = (
	accessToken: string,
	target: HTMLElement,
	inputHtmlArray: any[],
	options?: {
		defaultView?: {
			longitude: number
			latitude: number
			zoom: number
		}
	}
) => {
	const container = document.createElement('div')
	container.setAttribute('id', `MapContainer${target.id}`)

	target.getElementsByClassName('ChoiceStructure')[0].appendChild(container)

	render(
		<React.StrictMode>
			<ThemeCustomization>
				<MapContainer mapBoxToken={accessToken} defaultView={options?.defaultView} inputHtmlArray={inputHtmlArray} />
			</ThemeCustomization>
		</React.StrictMode>,
		document.getElementById(`MapContainer${target.id}`)
	)
}
;(window as any).mapRender = mapRender
;(window as any).iframeRender = iframeRender

/*
<script>  jQuery.noConflict(); </script><br /><link href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.css" rel="stylesheet" type="text/css" /><link href="https://api.mapbox.com/mapbox-gl-js/v3.1.0/mapbox-gl.css" rel="stylesheet" /><script src="https://cdn.jsdelivr.net/gh/keita-makino/qualtrics-map@3.1.0/dist/bundle.js"></script>
<script>  jQuery.noConflict(); </script><br /><link href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.css" rel="stylesheet" type="text/css" /><link href="https://api.mapbox.com/mapbox-gl-js/v3.1.0/mapbox-gl.css" rel="stylesheet" /><link href="https://cdn.jsdelivr.net/gh/revodigital/uni2-web-client@0.2.6/dist/style.css" rel="stylesheet" /> <script src='https://cdn.jsdelivr.net/gh/revodigital/uni2-web-client@0.2.6/dist/bundle.js'></script>
 */
