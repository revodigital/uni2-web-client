// eslint-disable-next-line
import '@mui/material/Button'

declare module '@mui/material/Button' {
	interface ButtonPropsVariantOverrides {
		dashed: true
	}

	interface ButtonPropsColorOverrides {
		customColor: true
	}
}
