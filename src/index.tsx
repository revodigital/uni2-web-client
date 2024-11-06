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
	// iframeContainer.style.height = '500px'
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

	const presentationElements = target.querySelectorAll('[role*=presentation]')
	if (presentationElements.length > 0) {
		// @ts-ignore
		presentationElements[0].style.display = 'none'
	}

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
    		
    		<link href="https://cdn.jsdelivr.net/gh/revodigital/uni2-web-client@0.3.6/dist/style.css" rel="stylesheet" />
    		<script src='https://cdn.jsdelivr.net/gh/revodigital/uni2-web-client@0.3.6/dist/bundle.js'></script>
        </head>
        <body>
            <div id="MapContainer${target.id}"></div>
           	<script>
           		function sendHeightToParent() {
                    const height = document.body.scrollHeight;
                    parent.postMessage({ action: 'resizeIframe', height }, '*');
                }
                window.addEventListener('load', sendHeightToParent);
                window.addEventListener('resize', sendHeightToParent);
                
        		window.addEventListener('message', function(event) {
          			const { accessToken, options, targetId, inputHtmlArray } = event.data
          			if (accessToken && options && targetId){ 
                    	mapRender(accessToken, targetId, inputHtmlArray, options)
                    	sendHeightToParent()
                    }
        		}, false)
      		</script>
        </body>
        </html>
    `)
	iframeDoc?.close()
	iframeContainer.onload = () => {
		iframeContainer.contentWindow?.postMessage({ accessToken, options, targetId: target.id, inputHtmlArray }, '*')
		// Nota: Sostituisci '*' con l'origine specifica per maggiore sicurezza
	}
	directionContainer.style.display = 'none'

	window.addEventListener(
		'message',
		function (event) {
			if (event.origin !== window.origin) return
			const { action, data, height } = event.data

			if (action === 'updateInput') {
				const { inputId, value } = data
				const inputElement = [...inputHTMLElements].find((el) => el.id === inputId)
				if (inputElement) {
					inputElement.value = value
				}
			} else if (action === 'resizeIframe' && height) {
				iframeContainer.style.height = `${height}px`
			}
		},
		false
	)
}

const mapRender = (
	accessToken: string,
	targetId: any,
	inputHtmlArray: any[],
	options?: {
		defaultView?: {
			longitude: number
			latitude: number
			zoom: number
		}
	}
) => {
	render(
		<React.StrictMode>
			<ThemeCustomization>
				<MapContainer mapBoxToken={accessToken} defaultView={options?.defaultView} inputHtmlArray={inputHtmlArray} />
			</ThemeCustomization>
		</React.StrictMode>,
		document.getElementById(`MapContainer${targetId}`)
	)
}
;(window as any).mapRender = mapRender
;(window as any).iframeRender = iframeRender
