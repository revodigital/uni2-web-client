import 'assets/scss/style.scss'
import 'mapbox-gl/dist/mapbox-gl.css'
import ThemeCustomization from './themes'
import MapContainer from './views/map'
import React from 'react'
import { render } from 'react-dom'

// ==============================|| REACT DOM RENDER  ||============================== //

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

	render(
		<React.StrictMode>
			<ThemeCustomization>
				<MapContainer mapBoxToken={accessToken} defaultView={options?.defaultView} inputHtmlArray={inputHtmlArray} />
			</ThemeCustomization>
		</React.StrictMode>,
		document.getElementById(`MapContainer${target.id}`)
	)
	directionContainer.style.display = 'none'
}

;(window as any).mapRender = mapRender
