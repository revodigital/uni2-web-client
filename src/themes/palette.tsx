// material-ui
import { createTheme } from '@mui/material/styles'

// assets
import defaultColor from 'assets/scss/_themes-vars.module.scss'

// types
interface ColorProps {
	readonly [key: string]: string
}

// ==============================|| DEFAULT THEME - PALETTE  ||============================== //

const Palette = () => {
	const colors: ColorProps = defaultColor
	return createTheme({
		palette: {
			mode: 'light',
			common: {
				black: colors.darkPaper
			},
			prjPrimary: {
				0: colors.P0,
				10: colors.P10,
				20: colors.P20,
				30: colors.P30,
				40: colors.P40,
				50: colors.P50,
				60: colors.P60,
				70: colors.P70,
				80: colors.P80,
				90: colors.P90,
				95: colors.P95,
				98: colors.P98,
				100: colors.P100
			},
			prjNeutral: {
				0: colors.N0,
				25: colors.N25,
				50: colors.N50,
				100: colors.N100,
				200: colors.N200,
				300: colors.N300,
				400: colors.N400,
				500: colors.N500,
				600: colors.N600,
				700: colors.N700,
				800: colors.N800,
				900: colors.N900,
				1000: colors.N1000
			},
			prjError: {
				light: colors.errorLight,
				dark: colors.errorDark,
				main: colors.errorMain
			},
			prjWarning: {
				light: colors.warningLight,
				dark: colors.warningDark,
				main: colors.warningMain
			},
			prjSuccess: {
				light: colors.successLight,
				dark: colors.successDark,
				main: colors.successMain
			},
			text: {
				dark: colors.N800,
				main: colors.N700,
				light: colors.N600,
				placeholder: colors.N500,
				disabled: colors.N400,
				link: colors.N900
			},
			divider: colors.N200,
			background: {
				paper: colors.paper,
				default: colors.paper
			}
		}
	})
}

export default Palette
