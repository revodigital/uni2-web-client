import { Theme } from '@mui/material/styles'
import { TypographyOptions } from '@mui/material/styles/createTypography'

const Typography = (theme: Theme, borderRadius: number, fontFamily: string): TypographyOptions => ({
	fontFamily,
	h5: {
		fontSize: '1.125rem',
		color: theme.palette.text.dark,
		fontWeight: 700
	},
	h4: {
		fontSize: '1.250rem',
		color: theme.palette.text.dark,
		fontWeight: 700
	},
	h3: {
		fontSize: '1.438rem',
		color: theme.palette.text.dark,
		fontWeight: 700
	},
	h2: {
		fontSize: '1.625rem',
		color: theme.palette.text.dark,
		fontWeight: 700
	},
	h1: {
		fontSize: '1.813rem',
		color: theme.palette.text.dark,
		fontWeight: 700
	},
	caption: {
		fontSize: '0.75rem',
		lineHeight: '145%',
		color: theme.palette.text.main,
		fontWeight: 400
	},
	body1: {
		fontSize: '1rem',
		fontWeight: 400,
		lineHeight: '145%',
		color: theme.palette.text.main
	},
	body2: {
		fontSize: '0.875rem',
		fontWeight: 400,
		lineHeight: '145%',
		color: theme.palette.text.main
	},
	button: {
		textTransform: 'none'
	},
	mainContent: {
		backgroundColor: theme.palette.prjNeutral['25'],
		width: '100%',
		minHeight: '100vh',
		flexGrow: 1,
		padding: 0,
		marginTop: '0px',
		borderRadius: `${borderRadius}px`
	},
	menuCaption: {
		fontSize: '0.875rem',
		fontWeight: 500,
		color: theme.palette.grey[600],
		padding: '6px',
		textTransform: 'capitalize',
		marginTop: '10px'
	},
	subMenuCaption: {
		fontSize: '0.6875rem',
		fontWeight: 500,
		color: theme.palette.text.secondary,
		textTransform: 'capitalize'
	},
	commonAvatar: {
		cursor: 'pointer',
		borderRadius: '8px'
	},
	smallAvatar: {
		width: '22px',
		height: '22px',
		fontSize: '1rem'
	},
	mediumAvatar: {
		width: '40px',
		height: '40px',
		fontSize: '1.2rem'
	},
	largeAvatar: {
		width: '44px',
		height: '44px',
		fontSize: '1.5rem'
	}
})

export default Typography
