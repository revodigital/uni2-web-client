// eslint-disable-next-line
import { PaletteColorOptions } from '@mui/material'

declare module '@mui/material/styles/createPalette' {
	interface PaletteColor {
		0?: string
		10?: string
		20?: string
		25?: string
		30?: string
		40?: string
		50?: string
		60?: string
		70?: string
		80?: string
		90?: string
		95?: string
		98?: string
		100?: string
		200?: string
		300?: string
		400?: string
		500?: string
		600?: string
		700?: string
		800?: string
		900?: string
		1000?: string
		110?: string
		dark?: string
		main?: string
		light?: string
	}

	interface PaletteCustomColor {
		0?: string
		10?: string
		20?: string
		25?: string
		30?: string
		40?: string
		50?: string
		60?: string
		70?: string
		80?: string
		90?: string
		95?: string
		98?: string
		100?: string
		200?: string
		300?: string
		400?: string
		500?: string
		600?: string
		700?: string
		800?: string
		900?: string
		1000?: string
		110?: string
		dark?: string
		main?: string
		light?: string
	}

	interface PaletteCustomOptions {
		0?: string
		10?: string
		20?: string
		25?: string
		30?: string
		40?: string
		50?: string
		60?: string
		70?: string
		80?: string
		90?: string
		95?: string
		98?: string
		100?: string
		200?: string
		300?: string
		400?: string
		500?: string
		600?: string
		700?: string
		800?: string
		900?: string
		1000?: string
		110?: string
		dark?: string
		main?: string
		light?: string
	}

	export interface TypeText {
		dark: string
		main: string
		light: string
		hint: string
		placeholder: string
		link: string
	}

	interface PaletteOptions {
		orange?: PaletteColorOptions
		dark?: PaletteColorOptions
		prjPrimary?: PaletteCustomOptions
		prjNeutral?: PaletteCustomOptions
		prjError?: PaletteCustomOptions
		prjWarning?: PaletteCustomOptions
		prjSuccess?: PaletteCustomOptions
	}

	interface Palette {
		orange: PaletteColor
		dark: PaletteColor
		prjPrimary: PaletteCustomColor
		prjNeutral: PaletteCustomColor
		prjError: PaletteCustomColor
		prjWarning: PaletteCustomColor
		prjSuccess: PaletteCustomColor
	}
}
