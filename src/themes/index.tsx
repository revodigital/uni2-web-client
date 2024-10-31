import { ReactNode, useMemo } from 'react'
import { CssBaseline, StyledEngineProvider } from '@mui/material'
import { createTheme, Theme, ThemeOptions, ThemeProvider } from '@mui/material/styles'
import Palette from './palette'
import Typography from './typography'
import componentStyleOverrides from './compStyleOverride'
import { TypographyOptions } from '@mui/material/styles/createTypography'

interface Props {
	children: ReactNode
}

export default function ThemeCustomization({ children }: Props) {
	const fontFamily = `'Roboto', sans-serif`
	const borderRadius = 10

	const theme: Theme = useMemo<Theme>(() => Palette(), [])

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const themeTypography: TypographyOptions = useMemo<TypographyOptions>(
		() => Typography(theme, borderRadius, fontFamily),
		[theme]
	)

	const themeOptions: ThemeOptions = useMemo(
		() => ({
			direction: 'ltr',
			palette: theme.palette,
			mixins: {
				toolbar: {
					minHeight: '48px',
					padding: '16px',
					'@media (min-width: 600px)': {
						minHeight: '48px'
					}
				}
			},
			typography: themeTypography
		}),
		[theme, themeTypography]
	)

	const themes: Theme = createTheme(themeOptions)
	// @ts-ignore
	themes.components = useMemo(() => componentStyleOverrides(themes, borderRadius), [themes])

	return (
		<StyledEngineProvider injectFirst>
			<ThemeProvider theme={themes}>
				<CssBaseline />
				{children}
			</ThemeProvider>
		</StyledEngineProvider>
	)
}
