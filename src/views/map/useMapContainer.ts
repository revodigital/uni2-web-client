// @ts-ignore
import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding'
import { useForm } from '@tanstack/react-form'

const useMapContainer = (pointsData: any[], setPointsData: any, mapBoxToken: any, inputHtmlArray: any, mapRef: any) => {
	const initialState: any = {}
	inputHtmlArray?.forEach((el: any, index: any) => {
		initialState[`name${el.elementIndex + 1}`] = null
	})
	const reactForm = useForm({
		defaultValues: {
			...initialState
		}
	})

	const geocodingClient = mbxGeocoding({ accessToken: mapBoxToken })
	const getFirstAvailableInput = (): any => {
		for (let i = 0; i < inputHtmlArray.length; i++) {
			const inputName = `name${inputHtmlArray[i].elementIndex + 1}`
			if (!pointsData.find((point: any) => point.inputName === inputName)) {
				return { inputName, inputHtmlId: inputHtmlArray[i].htmlElementId }
			}
		}
		return null
	}

	const reverseGeocode = async (lng: any, lat: any) => {
		try {
			const response = await geocodingClient
				.reverseGeocode({
					query: [lng, lat],
					limit: 1,
					types: ['place', 'address', 'locality', 'neighborhood', 'poi'],
					countries: ['it']
				})
				.send()

			const data = response.body
			if (data && data.features && data.features.length > 0) {
				return data.features[0].place_name
			}
			return null
		} catch (error) {
			console.error('Errore nel reverse geocoding:', error)
			return null
		}
	}

	// Funzione per aggiornare le coordinate del marker trascinato
	const handleMarkerDragEnd = async (event: any, id: number) => {
		const { lng, lat } = event.target.getLngLat()

		// Aggiorna le coordinate del marker nel stato
		setPointsData((prevPoints: any) =>
			prevPoints.map((point: any) => (point.id === id ? { ...point, coordinates: [lng, lat] } : point))
		)

		const point = pointsData.find((point: any) => point.id === id)

		if (point) {
			const address = await reverseGeocode(lng, lat)

			if (address) {
				const newValue = {
					label: address,
					value: [lng, lat]
				}
				reactForm.setFieldValue(point.inputName, newValue)
				// Modifica il valore dell'input di Qualtrics
				// TODO: Qua dovrà esserci il postMessage per far comunicare la modifica!!
				// eslint-disable-next-line no-restricted-globals
				parent.postMessage({ action: 'updateInput', data: { inputId: point.inputHtmlId, value: newValue.label } }, window.origin)
				// point.inputHtml!.value = newValue.label
			}
		}
	}

	// Funzione per gestire il click sulla mappa
	const handleMapClick = async (event: any) => {
		// Impedisce l'evento di propagarsi ad altri handler
		event.originalEvent.stopPropagation()

		// Estrai la latitudine e la longitudine dal click
		const { lng, lat } = event.lngLat

		// Controlla se abbiamo già i marker
		if (pointsData.length >= inputHtmlArray.length) {
			return
		}

		const { inputName, inputHtmlId } = getFirstAvailableInput()

		// Crea un nuovo punto con un ID unico
		const newPoint = {
			id: Date.now(), // Puoi usare un generatore di ID più sofisticato se necessario
			coordinates: [lng, lat],
			inputName,
			// Salva il campo html Qualtrics
			inputHtmlId
		}

		// Aggiorna lo stato aggiungendo il nuovo punto
		setPointsData([...pointsData, newPoint])

		const address = await reverseGeocode(lng, lat)

		if (address && inputName) {
			const newValue = {
				label: address,
				value: [lng, lat]
			}
			// Aggiorna il campo di input con il nuovo indirizzo
			reactForm.setFieldValue(inputName, newValue as any)
			// Modifica il valore dell'input di Qualtrics
			// TODO: Qua dovrà esserci il postMessage per far comunicare la modifica!!
			// eslint-disable-next-line no-restricted-globals
			parent.postMessage({ action: 'updateInput', data: { inputId: newPoint.inputHtmlId, value: newValue.label } }, window.origin)
			// inputHtml!.value = newValue.label
		}
	}

	const calculateZoomLevel = (minLon: any, maxLon: any, minLat: any, maxLat: any) => {
		// Dimensioni della mappa
		const mapHeight = window.innerHeight + 50 // Altezza in px
		const mapWidth = window.innerWidth // Larghezza in px

		const WORLD_DIM = { height: 256, width: 256 }
		const ZOOM_MAX = 18

		const latFraction =
			((lat) => Math.log(Math.tan(Math.PI / 4 + (Math.PI / 360) * lat)))(maxLat) -
			((lat) => Math.log(Math.tan(Math.PI / 4 + (Math.PI / 360) * lat)))(minLat)
		const lonFraction = (maxLon - minLon) / 360

		const latZoom = Math.log2(mapHeight / WORLD_DIM.height / latFraction)
		const lonZoom = Math.log2(mapWidth / WORLD_DIM.width / lonFraction)

		return Math.min(latZoom, lonZoom, ZOOM_MAX)
	}

	const newMapView = () => {
		const lons = pointsData.map((item: any) => item.coordinates[0])
		const lats = pointsData.map((item: any) => item.coordinates[1])
		if (lons && lons.length > 0 && lats && lats.length > 0) {
			const minLon = Math.min(...lons)
			const maxLon = Math.max(...lons)
			const minLat = Math.min(...lats)
			const maxLat = Math.max(...lats)
			mapRef.current.flyTo({
				center: [(minLon + maxLon) / 2, (minLat + maxLat) / 2],
				zoom: calculateZoomLevel(minLon, maxLon, minLat, maxLat)
			})
		}
	}

	const removeAllPin = () => {
		reactForm.reset()
		pointsData.forEach((point, i) => {
			// Elimina i valori relativi agli input Qualtrics
			// TODO: Qua dovrà esserci il postMessage per far comunicare la modifica vuota!!
			// eslint-disable-next-line no-restricted-globals
			parent.postMessage({ action: 'updateInput', data: { inputId: point.inputHtmlId, value: '' } }, window.origin)
			// point.inputHtml!.value = ''
		})
		setPointsData([])
	}

	return {
		reactForm,
		handleMapClick,
		handleMarkerDragEnd,
		removeAllPin,
		newMapView
	}
}

export default useMapContainer
