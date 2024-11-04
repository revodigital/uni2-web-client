import { useRef, useState } from 'react'
import { Box, Button } from '@mui/material'
import Map, { Marker, NavigationControl } from 'react-map-gl'
import markerMap from '../../assets/img/map/marker.svg'
import InputForm from '../components/InputForm'
import useMapContainer from './useMapContainer'

const MapContainer = ({ mapBoxToken, defaultView, inputHtmlArray }: any) => {
	const mapRef = useRef<any>()
	const [pointsData, setPointsData] = useState<any>([])

	const [viewport, setViewport] = useState(
		defaultView ?? {
			longitude: 12.4964,
			latitude: 41.9028,
			zoom: 13
		}
	)

	const { reactForm, handleMapClick, handleMarkerDragEnd, removeAllPin, newMapView } = useMapContainer(
		pointsData,
		setPointsData,
		mapBoxToken,
		inputHtmlArray,
		setViewport
	)
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
			<Map
				{...viewport}
				ref={mapRef}
				style={{ width: '100%', height: '60vh', borderRadius: '10px' }}
				mapStyle="mapbox://styles/mapbox/streets-v11"
				dragPan
				dragRotate
				doubleClickZoom
				touchZoomRotate
				onClick={handleMapClick}
				onMove={(event) => setViewport(event.viewState)}
				mapboxAccessToken={mapBoxToken}>
				{pointsData &&
					pointsData.map((point: any) => (
						<Marker
							key={point.id}
							longitude={point.coordinates[0]}
							latitude={point.coordinates[1]}
							draggable // Rendi il marker trascinabile
							onDragEnd={(event) => handleMarkerDragEnd(event, point.id)}
							style={{ zIndex: 30 }}>
							<img alt="marker" src={markerMap} style={{ height: '50px', width: 'auto' }} />
						</Marker>
					))}

				<Box sx={{ position: 'absolute', bottom: 25, left: 'calc(50% - 24px)' }}>
					<Button variant="contained" onClick={removeAllPin}>
						Elimina pin
					</Button>
				</Box>
			</Map>
		</Box>
	)
}

// <NavigationControl position="top-right" />
export default MapContainer
