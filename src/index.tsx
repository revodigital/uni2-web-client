import 'assets/scss/style.scss'
import 'mapbox-gl/dist/mapbox-gl.css'
import ThemeCustomization from './themes'
import MapContainer from './views/map'
import React from 'react'
import { render } from 'react-dom'

// ==============================|| REACT DOM RENDER  ||============================== //

async function iframeRender(accessToken: any, target: HTMLElement, options: any) {
	const iframeContainer = document.createElement('iframe')
	iframeContainer.style.width = '100%'
	// iframeContainer.style.height = '500px'
	iframeContainer.style.border = 'none'
	iframeContainer.id = `${target.id}iframe`
	iframeContainer.setAttribute('scrolling', 'no')

	const directionContainer = target.querySelectorAll('[role*=presentation]')[0] as HTMLElement

	target?.appendChild(iframeContainer)
	target.removeChild(iframeContainer)
	target?.appendChild(iframeContainer)

	const inputHTMLElements = directionContainer.getElementsByTagName('input')
	const labelHTMLElements = directionContainer.getElementsByTagName('label')

	const inputHtmlArray = [...labelHTMLElements].map((item, index) => ({
		label: item.children[0].textContent ? item.children[0].textContent : '',
		htmlElementId: inputHTMLElements[index].id,
		inputValueAddress: inputHTMLElements[index].value,
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

    		<!-- Includi eventuali librerie per la mappa, ad esempio Mapbox -->
    		<link href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.css" rel="stylesheet" type="text/css" />
    		<link href="https://api.mapbox.com/mapbox-gl-js/v3.1.0/mapbox-gl.css" rel="stylesheet" />
    		
    		<link href="https://cdn.jsdelivr.net/gh/revodigital/uni2-web-client@0.4.34/dist/style.css" rel="stylesheet" />
    		<script src='https://cdn.jsdelivr.net/gh/revodigital/uni2-web-client@0.4.34/dist/bundle.js'></script>
    		<style>
           
        </style>
        </head>
        <body>
            <div id="MapContainer${target.id}"></div>
           	<script>          	
                const resizeObserver = new ResizeObserver(entries => {
    				for (let entry of entries) {
        				const height = entry.contentRect.height + 1;
        				parent.postMessage({ action: 'resizeIframe', height }, '*');
    				}
				})

				resizeObserver.observe(document.body)
                
        		window.addEventListener('message', function(event) {
          			const { accessToken, options, targetId, inputHtmlArray } = event.data
          			if (accessToken && options && targetId){ 
                    	mapRender(accessToken, targetId, inputHtmlArray, options)                   
                    }
        		}, false)
      		</script>
        </body>
        </html>
    `)
	iframeDoc?.close()
	setTimeout(() => {
		iframeContainer.contentWindow?.postMessage({ accessToken, options, targetId: target.id, inputHtmlArray }, '*')
	}, 500)

	window.addEventListener(
		'message',
		function (event) {
			// if (event.origin !== window.origin) return
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
		language?: string
		boundaries?: {
			min?: number[]
			max?: number[]
		}
		proximity?: number[]
	}
) => {
	render(
		<React.StrictMode>
			<ThemeCustomization>
				<MapContainer
					targetId={targetId}
					mapBoxToken={accessToken}
					defaultView={options?.defaultView}
					boundaries={options?.boundaries}
					proximity={options?.proximity}
					language={options?.language?.toLocaleLowerCase()}
					inputHtmlArray={inputHtmlArray}
				/>
			</ThemeCustomization>
		</React.StrictMode>,
		document.getElementById(`MapContainer${targetId}`)
	)
}
;(window as any).mapRender = mapRender
;(window as any).iframeRender = iframeRender
