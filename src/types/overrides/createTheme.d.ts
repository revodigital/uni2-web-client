// eslint-disable-next-line
import * as createTheme from '@mui/material/styles'
import customShadows from 'themes/shadows'
import { TypographyOptions } from '@mui/material/styles/createTypography'
import { Palette } from '@mui/material'
import Typography from '../../themes/typography'

declare module '@mui/material/styles' {
	interface PaletteColor {
		75?: string
		150?: string
		850?: string
		950?: string
	}

	interface SimplePaletteColorOptions {
		75?: string
		150?: string
		850?: string
		950?: string
	}
	export interface ThemeOptions {
		customShadows?: customShadows
		customization?: TypographyOptions | ((palette: Palette) => TypographyOptions)
		darkTextSecondary?: string
		textDark?: string
		darkTextPrimary?: string
		grey500?: string
	}
	interface Theme {
		customShadows: customShadows
		customization: Typography
		darkTextSecondary: string
		textDark: string
		grey500: string
		darkTextPrimary: string
	}
}
