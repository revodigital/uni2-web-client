import React, { useEffect } from 'react'
import { Autocomplete, Box, Chip, CircularProgress, InputLabel, TextField } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useDebounce } from '@uidotdev/usehooks'

interface InputComboboxAsyncProps {
	state: any
	handleBlur: (event: React.FocusEvent<HTMLDivElement>) => void
	handleChange: any
	label?: string
	language?: string
	mediumLabel?: boolean
	id?: string
	multiple?: boolean
	optional?: boolean
	apiSearch?: boolean
	getOptionLabel?: (option: any) => string
	getOptionArray: (setOptions: any, active: any, valueSearch?: any) => Promise<void>
	helperText?: string
}

const InputComboboxAsync = (fieldRenderProps: InputComboboxAsyncProps) => {
	const {
		state,
		handleBlur,
		getOptionArray,
		handleChange,
		label,
		language,
		id,
		multiple,
		getOptionLabel,
		mediumLabel,
		optional,
		helperText
	} = fieldRenderProps
	const [inputValue, setInputValue] = React.useState<string | undefined>()
	const valueDebounce = useDebounce(inputValue, 400)
	const [open, setOpen] = React.useState(false)
	const [loading, setLoading] = React.useState(false)
	const [options, setOptions] = React.useState<readonly any[]>([])

	useEffect(() => {
		let active = true

		if (!loading) {
			return undefined
		}

		;(async () => {
			await getOptionArray(setOptions, active, valueDebounce)
			setLoading(false)
		})()

		return () => {
			active = false
		}
	}, [loading])

	React.useEffect(() => {
		if (!open) {
			setOptions([])
		} else {
			setLoading(true)
		}
	}, [open, valueDebounce])

	return (
		<Box key={id}>
			{label && (
				<InputLabel error={state.meta.errors && state.meta.errors.length > 0} sx={{ pb: 1, fontWeight: mediumLabel ? 500 : 400 }}>
					{label}
				</InputLabel>
			)}
			{state.value !== undefined && (
				<Autocomplete
					disablePortal
					value={state.value}
					id={id}
					open={open}
					onOpen={() => {
						setOpen(true)
					}}
					onClose={() => {
						setOpen(false)
					}}
					filterOptions={(x) => x}
					options={options}
					multiple={multiple}
					getOptionLabel={getOptionLabel}
					onInputChange={(event, newInputValue) => {
						setInputValue(newInputValue)
					}}
					loading={loading}
					loadingText={language === 'it' ? 'Caricamento in corso...' : 'Loading in progress...'}
					noOptionsText={
						language === 'it' ? 'Scrivi un indirizzo per ricevere dei suggerimenti' : 'Type an address to get suggestions'
					}
					renderTags={(value: any[], getTagProps) =>
						value.map((option: any, index: number) => {
							const { key, ...tagProps } = getTagProps({ index })
							return (
								<Chip
									variant="outlined"
									label={option.label ?? option}
									key={key}
									{...tagProps}
									deleteIcon={<CloseIcon sx={{ fontSize: '12px' }} />}
								/>
							)
						})
					}
					renderInput={(params) => (
						<TextField
							{...params}
							size="small"
							error={state.meta.errors && state.meta.errors.length > 0}
							helperText={state.meta.errors && state.meta.errors.length > 0 ? state.meta.errors.join(', ') : helperText}
							InputProps={{
								...params.InputProps,
								endAdornment: (
									<>
										{loading ? <CircularProgress color="inherit" size={20} /> : null}
										{params.InputProps.endAdornment}
									</>
								)
							}}
						/>
					)}
					onChange={(e, value) => {
						handleChange(value)
					}}
					onBlur={handleBlur}
				/>
			)}
		</Box>
	)
}

export default InputComboboxAsync
