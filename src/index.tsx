import 'assets/scss/style.scss'
import 'mapbox-gl/dist/mapbox-gl.css'
import ThemeCustomization from './themes'
import MapContainer from './views/map'
import React from 'react'
import ReactDOM from 'react-dom/client'

// ==============================|| REACT DOM RENDER  ||============================== //
;

(function (global) {
	// Il tuo codice esistente

	const mapRender = (
		accessToken: string,
		target: HTMLElement,
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

		const directionContainer = target.querySelectorAll('[role*=presentation]')[0] as HTMLElement

		const inputHTMLElements = directionContainer.getElementsByTagName('input')
		const labelHTMLElements = directionContainer.getElementsByTagName('label')

		const inputHtmlArray = [...labelHTMLElements].map((item, index) => ({
			label: item.children[0].textContent ? item.children[0].textContent : '',
			htmlElement: inputHTMLElements[index],
			elementIndex: index
		}))

		const shadowRoot = container.attachShadow({ mode: 'open' })
		const style = document.createElement('style')
		style.textContent = `
      /* Inserisci qui i tuoi stili CSS, ad esempio importando i file CSS come stringhe */`
		shadowRoot.appendChild(style)

		const root = ReactDOM.createRoot(shadowRoot)

		root.render(
			<React.StrictMode>
				<ThemeCustomization>
					<MapContainer mapBoxToken={accessToken} defaultView={options?.defaultView} inputHtmlArray={inputHtmlArray} />
				</ThemeCustomization>
			</React.StrictMode>
		)
		directionContainer.style.display = 'none'
	}

	// @ts-ignore
	global.QualtricsMapBoxLibrary = {
		mapRender
	}
})(window)
// ;(window as any).mapRender = mapRender

/*
<script>  jQuery.noConflict(); </script><br /><link href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.css" rel="stylesheet" type="text/css" /><link href="https://api.mapbox.com/mapbox-gl-js/v3.1.0/mapbox-gl.css" rel="stylesheet" /><script src="https://cdn.jsdelivr.net/gh/keita-makino/qualtrics-map@3.1.0/dist/bundle.js"></script>
<script>  jQuery.noConflict(); </script><br /><link href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.css" rel="stylesheet" type="text/css" /><link href="https://api.mapbox.com/mapbox-gl-js/v3.1.0/mapbox-gl.css" rel="stylesheet" /><link href="https://cdn.jsdelivr.net/gh/revodigital/uni2-web-client@0.2.6/dist/style.css" rel="stylesheet" /> <script src='https://cdn.jsdelivr.net/gh/revodigital/uni2-web-client@0.2.6/dist/bundle.js'></script>
 */
