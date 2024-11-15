import React, { ReactElement } from 'react'
import { Box } from '@mui/material'
import { FormApi, ReactFormApi } from '@tanstack/react-form'
// @ts-ignore
import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding'
import InputComboboxAsync from './InputComboboxAsync'

interface VehicleFormProps<T, V> {
	reactForm: FormApi<any, undefined> & ReactFormApi<any, undefined>
	setPointsData: any
	inputName: any
	label?: any
	htmlElementId?: any
	mapBoxToken?: any
	setViewport?: any
}

const InputForm = <T, V>({
	reactForm,
	setPointsData,
	inputName,
	label,
	htmlElementId,
	mapBoxToken,
	setViewport
}: VehicleFormProps<T, V>): ReactElement => {
	const geocodingClient = mbxGeocoding({ accessToken: mapBoxToken })

	const getClientDriverOptionArray = async (setOptions: any, active: any, valueDebounce: any) => {
		if (!valueDebounce) {
			setOptions([])
			return
		}

		try {
			const response = await geocodingClient
				.forwardGeocode({
					query: valueDebounce,
					autocomplete: true,
					limit: 5,
					types: ['place', 'locality', 'neighborhood', 'address', 'poi'],
					countries: ['it'],
					language: ['it'],
					bbox: [11.2836, 44.4493, 11.4094, 44.5391],
					proximity: [11.3465, 44.4942]
				})
				.send()

			if (active) {
				const data = response.body
				if (data.features) {
					const mappedOptions = data.features.map((feature: any) => ({
						label: feature.place_name,
						value: feature.geometry.coordinates
					}))
					setOptions(mappedOptions)
				} else {
					setOptions([])
				}
			}
		} catch (error) {
			setOptions([])
		}
	}

	return (
		<Box key={inputName} sx={{ pb: 2 }}>
			<reactForm.Field name={inputName}>
				{({ state, handleChange, handleBlur }) => (
					<InputComboboxAsync
						getOptionArray={getClientDriverOptionArray}
						state={state}
						handleChange={(updater: any) => {
							handleChange(updater)

							const selectedOption = updater

							if (selectedOption && selectedOption.value) {
								const [lng, lat] = selectedOption.value
								// TODO: Qua dovrà esserci il postMessage per far comunicare la modifica!!
								// eslint-disable-next-line no-restricted-globals
								parent.postMessage(
									{ action: 'updateInput', data: { inputId: htmlElementId, value: selectedOption.label } },
									window.origin
								)
								setViewport((prevViewport: any) => {
									return { ...prevViewport, longitude: lng, latitude: lat }
								})
								// htmlElement!.value = selectedOption.label
								setPointsData((prevPoints: any) => {
									const existingPoint = prevPoints.find((point: any) => point.inputName === inputName)

									if (existingPoint) {
										// Aggiorna le coordinate del marker esistente
										return prevPoints.map((point: any) =>
											point.inputName === inputName ? { ...point, coordinates: [lng, lat] } : point
										)
									}
									// Aggiungi un nuovo marker
									return [
										...prevPoints,
										{
											id: Date.now(),
											coordinates: [lng, lat],
											inputName,
											inputHtmlId: htmlElementId
										}
									]
								})
							} else {
								// TODO: Qua dovrà esserci il postMessage per far comunicare la modifica!!
								// htmlElement!.value = ''
								// eslint-disable-next-line no-restricted-globals
								parent.postMessage({ action: 'updateInput', data: { inputId: htmlElementId, value: '' } }, window.origin)
								setPointsData((prevPoints: any) => prevPoints.filter((point: any) => point.inputName !== inputName))
							}
						}}
						label={label ?? ''}
						handleBlur={handleBlur}
						multiple={false}
					/>
				)}
			</reactForm.Field>
		</Box>
	)
}

export default InputForm
