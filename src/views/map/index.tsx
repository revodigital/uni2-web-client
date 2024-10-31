import { useEffect, useRef, useState } from 'react'
import { Box, Button } from '@mui/material'
import InputForm from '../components/InputForm'
import useMapContainer from './useMapContainer'
// eslint-disable-next-line import/no-extraneous-dependencies
import mapboxgl from 'mapbox-gl'

const MapContainer = ({ mapBoxToken, defaultView, inputHtmlArray }: any) => {
	const mapContainerRef = useRef(null)
	const mapRef = useRef<any>(null)
	const [pointsData, setPointsData] = useState<any>([])

	const viewport = defaultView ?? {
		longitude: 12.4964,
		latitude: 41.9028,
		zoom: 13
	}

	const { reactForm, handleMapClick, handleMarkerDragEnd, removeAllPin, newMapView } = useMapContainer(
		pointsData,
		setPointsData,
		mapBoxToken,
		inputHtmlArray,
		mapRef
	)

	useEffect(() => {
		if (mapRef.current) return // Evita l'inizializzazione multipla

		mapRef.current = new mapboxgl.Map({
			accessToken: mapBoxToken,
			container: mapContainerRef.current as any,
			style: 'mapbox://styles/mapbox/streets-v11',
			center: [viewport.longitude, viewport.latitude],
			zoom: viewport.zoom
		})

		mapRef.current.addControl(new mapboxgl.NavigationControl(), 'top-right')
		mapRef.current.on('click', handleMapClick)

		// Memorizza i marker sulla mappa
		mapRef.current.markers = []

		// Pulisci al dismount
		return () => {
			mapRef.current.remove()
		}
	}, [])

	// Aggiorna i marker quando `pointsData` cambia
	useEffect(() => {
		if (!mapRef.current) return

		// Rimuovi marker esistenti
		mapRef.current.markers.forEach((marker: any) => marker.remove())
		mapRef.current.markers = []

		// Aggiungi nuovi marker
		pointsData.forEach((point: any) => {
			const marker = new mapboxgl.Marker({ draggable: true }).setLngLat(point.coordinates).addTo(mapRef.current)

			marker.on('dragend', (event) => handleMarkerDragEnd(event, point.id))

			mapRef.current.markers.push(marker)
		})
	}, [pointsData])

	return (
		<Box sx={{ p: '60px' }}>
			<Box sx={{ width: '100%', pb: 3 }}>
				{/* Da inserire ancora il ciclo for */}
				{inputHtmlArray.map((el: any, index: any) => {
					const inputName = `name${el.elementIndex + 1}`
					return (
						<InputForm
							reactForm={reactForm}
							setPointsData={setPointsData}
							inputName={inputName}
							label={el.label}
							htmlElement={el.htmlElement}
							mapBoxToken={mapBoxToken}
							newMapView={newMapView}
						/>
					)
				})}
			</Box>
			<Box ref={mapContainerRef} sx={{ width: '100%', height: '60vh', borderRadius: '10px' }} />
			<Box sx={{ position: 'absolute', bottom: 25, left: 'calc(50% - 24px)' }}>
				<Button variant="contained" onClick={removeAllPin}>
					Elimina pin
				</Button>
			</Box>
		</Box>
	)
}

export default MapContainer
