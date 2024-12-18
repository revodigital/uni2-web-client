// @ts-ignore
import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding'
import { useForm } from '@tanstack/react-form'
import { useEffect, useState } from 'react'

const useMapContainer = (
	pointsData: any[],
	setPointsData: any,
	mapBoxToken: any,
	boundaries: { min: number[]; max: number[] },
	proximity: number[],
	language: string,
	inputHtmlArray: any,
	mapRef: any
) => {
	const [initialState, setInitialState] = useState({})
	const [loadingPage, setLoadingPage] = useState(true)

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

	const lang = language ? [language] : ['it']
	const bbox = boundaries ? [...boundaries.min, ...boundaries.max] : [11.2836, 44.4493, 11.4094, 44.5391]
	const prox = proximity ?? [11.3465, 44.4942]

	// Funzione per eseguire il geocoding di un indirizzo
	const geocodeAddress = async (address: string) => {
		try {
			const response = await geocodingClient
				.forwardGeocode({
					query: address,
					limit: 1,
					types: ['place', 'address', 'locality', 'neighborhood', 'poi'],
					countries: ['it'],
					language: lang,
					bbox,
					proximity: prox
				})
				.send()

			const data = response.body
			if (data && data.features && data.features.length > 0) {
				const feature = data.features[0]
				return {
					address: feature.place_name,
					coordinates: feature.geometry.coordinates
				}
			}
			return null
		} catch (error) {
			console.error('GEOCODE ERROR:', error)
			return null
		}
	}

	/*
	bbox,
	proximity: prox
	 */
	const reverseGeocode = async (lng: any, lat: any) => {
		try {
			const response = await geocodingClient
				.reverseGeocode({
					query: [lng, lat],
					limit: 1,
					types: ['place', 'address', 'locality', 'neighborhood', 'poi'],
					countries: ['it'],
					language: lang
				})
				.send()

			const data = response.body
			if (data && data.features && data.features.length > 0) {
				return data.features[0].place_name
			}
			return null
		} catch (error) {
			console.error('REVERSE GEOCODE ERROR:', error)
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
				// @ts-ignore
				reactForm.setFieldValue(point.inputName, newValue)
				// Modifica il valore dell'input di Qualtrics
				// TODO: Qua dovrà esserci il postMessage per far comunicare la modifica!!
				// eslint-disable-next-line no-restricted-globals
				parent.postMessage({ action: 'updateInput', data: { inputId: point.inputHtmlId, value: newValue.value.join(';') } })
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
			// @ts-ignore
			reactForm.setFieldValue(inputName, newValue as any)
			// Modifica il valore dell'input di Qualtrics
			// TODO: Qua dovrà esserci il postMessage per far comunicare la modifica!!
			// eslint-disable-next-line no-restricted-globals
			parent.postMessage({ action: 'updateInput', data: { inputId: newPoint.inputHtmlId, value: newValue.value.join(';') } })
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
			parent.postMessage({ action: 'updateInput', data: { inputId: point.inputHtmlId, value: '' } })
			// point.inputHtml!.value = ''
		})
		setPointsData([])
	}

	useEffect(() => {
		const initialize = async () => {
			const newInitialFormValues: any = {}
			const newPointsData: any[] = []

			for (const el of inputHtmlArray) {
				const inputName = `name${el.elementIndex + 1}`
				if (el.inputValueAddress && el.inputValueAddress !== '') {
					// Esegui il geocoding dell'indirizzo
					const coordinates = el.inputValueAddress.split(';')
					const address = await reverseGeocode(+coordinates[0], +coordinates[1])
					if (address) {
						const newValue = {
							label: address,
							value: coordinates
						}
						// Imposta il valore iniziale nel form
						newInitialFormValues[inputName] = newValue
						// Aggiungi il marker ai punti
						newPointsData.push({
							id: Date.now() + Math.random(), // Assicura un ID univoco
							coordinates: newValue.value,
							inputName,
							inputHtmlId: el.htmlElementId
						})
					} else {
						// Se il geocoding non ha successo, imposta il valore a null
						newInitialFormValues[inputName] = null
					}
				} else {
					// Se non c'è un indirizzo, imposta il valore a null
					newInitialFormValues[inputName] = null
				}
			}
			console.log(newPointsData)
			// Imposta i valori nel form
			setInitialState(newInitialFormValues)
			// Aggiorna lo stato dei punti
			setPointsData(newPointsData)
			// Aggiorna la vista della mappa per includere i nuovi marker
			if (newPointsData.length > 0) {
				newMapView()
			}
			setLoadingPage(false)
		}

		initialize()
	}, [])

	return {
		reactForm,
		handleMapClick,
		handleMarkerDragEnd,
		removeAllPin,
		newMapView,
		loadingPage
	}
}

export default useMapContainer
