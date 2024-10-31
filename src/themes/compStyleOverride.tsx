// project imports
import { Theme } from '@mui/material/styles'

// eslint-disable-next-line @typescript-eslint/naming-convention
export default function componentStyleOverrides(theme: Theme, borderRadius: number, outlinedFilled: boolean) {
	const menuSelected = theme.palette.secondary.dark

	return {
		MuiButton: {
			styleOverrides: {
				root: {
					fontSize: '14px',
					fontWeight: 600,
					textTransform: 'none',
					borderRadius: '10px',
					minHeight: '48px'
				},
				sizeSmall: {
					minHeight: '32px'
				},
				contained: {
					backgroundColor: theme.palette.prjNeutral['900'], // Colore di sfondo personalizzato
					color: 'white', // Colore del testo
					padding: '8px 24px',
					'&:hover': {
						backgroundColor: theme.palette.prjNeutral['700'] // Colore di sfondo al passaggio del mouse
					},
					'&:disabled': {
						color: theme.palette.prjNeutral['400'],
						backgroundColor: theme.palette.prjNeutral['50']
					}
				},
				text: {
					backgroundColor: 'transparent', // Colore di sfondo personalizzato
					color: theme.palette.prjNeutral['900'], // Colore del testo
					padding: '8px 24px',
					'&:hover': {
						backgroundColor: theme.palette.prjNeutral['50'] // Colore di sfondo al passaggio del mouse
					},
					'&:disabled': {
						color: theme.palette.prjNeutral['400'],
						backgroundColor: 'transparent'
					}
				},
				outlined: {
					backgroundColor: 'transparent', // Colore di sfondo personalizzato
					border: '2px solid',
					borderColor: theme.palette.prjNeutral['900'],
					color: theme.palette.prjNeutral['900'], // Colore del testo
					padding: '8px 24px',
					'&:hover': {
						backgroundColor: theme.palette.prjNeutral['50'],
						border: '2px solid',
						borderColor: theme.palette.prjNeutral['900']
					},
					'&:disabled': {
						color: theme.palette.prjNeutral['400'],
						backgroundColor: 'transparent',
						border: '2px solid',
						borderColor: theme.palette.prjNeutral['400']
					}
				},
				textError: {
					backgroundColor: 'transparent',
					color: theme.palette.prjError.dark, // Colore del testo per error
					'&:hover': {
						backgroundColor: theme.palette.prjError.light // Colore di sfondo al passaggio del mouse
					},
					'&:disabled': {
						color: theme.palette.prjError.light,
						backgroundColor: 'transparent'
					}
				}
			},
			defaultProps: {
				disableRipple: true
			}
		},
		MuiLink: {
			styleOverrides: {
				root: {
					color: theme.palette.text.dark, // Colore del link
					fontSize: '1rem',
					fontWeight: 500,
					lineHeight: '145%',
					textDecorationColor: theme.palette.text.dark,
					'&:hover': {
						color: theme.palette.text.dark, // Colore al passaggio del mouse (hover)
						textDecoration: 'underline' // Decorazione quando si passa sopra
					}
				}
			}
		},
		MuiPaper: {
			defaultProps: {
				elevation: 0
			},
			styleOverrides: {
				root: {
					backgroundImage: 'none'
				},
				rounded: {
					borderRadius: `${borderRadius}px`
				}
			}
		},
		MuiCardHeader: {
			styleOverrides: {
				root: {
					color: theme.palette.text.dark,
					padding: '24px'
				},
				title: {
					fontSize: '1.125rem'
				}
			}
		},
		MuiCardContent: {
			styleOverrides: {
				root: {
					padding: '24px'
				}
			}
		},
		MuiCardActions: {
			styleOverrides: {
				root: {
					padding: '24px'
				}
			}
		},
		MuiAccordion: {
			styleOverrides: {
				root: {
					backgroundColor: theme.palette.prjNeutral['0'],
					marginBottom: '16px',
					border: `1px Solid ${theme.palette.prjNeutral['200']}`, // puoi usare il tema qui
					borderBottomLeftRadius: '10px',
					borderBottomRightRadius: '10px',
					borderTopLeftRadius: '10px',
					borderTopRightRadius: '10px',
					'&:last-of-type': {
						borderBottomLeftRadius: '10px',
						borderBottomRightRadius: '10px'
					},
					'&:first-of-type': {
						borderTopLeftRadius: '10px',
						borderTopRightRadius: '10px'
					},
					'&::before': {
						display: 'none'
					},
					'&.Mui-disabled': {
						backgroundColor: theme.palette.prjNeutral['25']
					}
				}
			}
		},
		MuiAccordionSummary: {
			styleOverrides: {
				root: {
					minHeight: '72px',
					padding: '6px 16px 6px 16px',
					flexDirection: 'row-reverse',
					'&.Mui-expanded': {
						margin: '0px',
						minHeight: '72px'
					},
					'& .MuiAccordionSummary-expandIconWrapper': {
						margin: '0'
					},
					'& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
						transform: 'rotate(90deg)'
					},
					'& .MuiAccordionSummary-content': {
						marginLeft: theme.spacing(1),
						margin: '0'
					}
				}
			}
		},
		MuiAccordionDetails: {
			styleOverrides: {
				root: {
					paddingTop: 0,
					paddingLeft: theme.spacing(3),
					paddingRight: theme.spacing(3)
				}
			}
		},
		MuiAlert: {
			styleOverrides: {
				root: {
					alignItems: 'center'
				},
				outlined: {
					border: '1px dashed'
				},
				filledSuccess: {
					backgroundColor: theme.palette.prjNeutral['200'], // Colore di sfondo per success
					color: theme.palette.text.dark, // Colore del testo per success
					'& .MuiAlert-icon': {
						color: theme.palette.text.dark // Colore dell'icona per success
					}
				},
				filledError: {
					backgroundColor: theme.palette.prjError.main, // Colore di sfondo per error
					color: theme.palette.prjNeutral['0'], // Colore del testo per error
					'& .MuiAlert-icon': {
						color: theme.palette.prjError.light // Colore dell'icona per error
					}
				},
				filledWarning: {
					width: '100%',
					backgroundColor: theme.palette.prjWarning.light, // Colore di sfondo per error
					color: theme.palette.prjWarning.dark, // Colore del testo per error
					'& .MuiAlert-icon': {
						color: theme.palette.prjWarning.dark // Colore dell'icona per error
					}
				},
				standardError: {
					backgroundColor: theme.palette.prjError.light, // Colore di sfondo per error
					color: theme.palette.prjError.dark, // Colore del testo per error
					'& .MuiAlert-icon': {
						color: theme.palette.prjError.dark // Colore dell'icona per error
					}
				},
				action: {
					padding: '0 0 0 16px'
				}
			}
		},
		MuiListItemButton: {
			styleOverrides: {
				root: {
					color: theme.palette.text.main,
					paddingTop: '8px',
					paddingBottom: '8px',
					'&.Mui-selected': {
						color: menuSelected,
						backgroundColor: theme.palette.prjNeutral['50'],
						'&:hover': {
							backgroundColor: theme.palette.prjNeutral['50']
						},
						'& .MuiListItemIcon-root': {
							color: menuSelected
						}
					},
					'&:hover': {
						backgroundColor: theme.palette.prjNeutral['50'],
						color: menuSelected,
						'& .MuiListItemIcon-root': {
							color: menuSelected
						}
					}
				}
			}
		},
		MuiListItemIcon: {
			styleOverrides: {
				root: {
					color: theme.palette.text.main,
					minWidth: '36px'
				}
			}
		},
		MuiListItemText: {
			styleOverrides: {
				primary: {
					color: theme.palette.text.main
				}
			}
		},
		MuiDivider: {
			styleOverrides: {
				root: {
					borderColor: theme.palette.prjNeutral['200'],
					opacity: 1
				}
			}
		},
		MuiAvatar: {
			styleOverrides: {
				root: {
					color: theme.palette.primary.dark,
					background: theme.palette.primary[200]
				}
			}
		},
		MuiChip: {
			styleOverrides: {
				root: {
					fontWeight: 500,
					borderRadius: '10px',
					fontSize: '0.875rem',
					'&.MuiChip-colorWarning': {
						backgroundColor: theme.palette.prjWarning.light,
						color: theme.palette.prjWarning.dark
					},
					'&.MuiChip-colorSuccess': {
						backgroundColor: theme.palette.prjSuccess.light,
						color: theme.palette.prjSuccess.dark
					},
					'&.MuiChip-colorError': {
						backgroundColor: theme.palette.prjError.light,
						color: theme.palette.prjError.dark
					}
				},
				filled: {
					backgroundColor: theme.palette.prjNeutral['50'],
					color: theme.palette.text.main,
					// border: '1px solid',
					// borderColor: theme.palette.prjNeutral['200'],
					'& .MuiChip-deleteIcon': {
						color: theme.palette.text.main
					}
				}
			}
		},
		MuiTabs: {
			styleOverrides: {
				flexContainer: {
					borderBottom: '1px solid',
					borderColor: theme.palette.grey[200]
				}
			}
		},
		MuiDialog: {
			styleOverrides: {
				paper: {
					minWidth: '600px'
				}
			}
		},
		MuiDialogTitle: {
			styleOverrides: {
				root: {
					color: theme.palette.text.dark, // Colore del testo del titolo del gridSystem
					fontSize: '1.4375rem',
					fontWeight: 700,
					fontFamily: `'Roboto', sans-serif`,
					display: 'flex', // Usato per posizionare l'icona di chiusura
					justifyContent: 'space-between', // Spaziatura tra titolo e icona
					alignItems: 'center'
				}
			}
		},
		MuiDialogActions: {
			styleOverrides: {
				root: {
					paddingBottom: '16px',
					paddingRight: '24px'
				}
			}
		},
		MuiDialogContent: {
			styleOverrides: {
				root: {
					paddingTop: '0'
				}
			}
		},
		MuiTableCell: {
			styleOverrides: {
				root: {
					borderColor: theme.palette.grey[200],
					'&.MuiTableCell-head': {
						fontSize: '0.875rem',
						color: theme.palette.grey[600],
						fontWeight: 500
					}
				}
			}
		},
		MuiTooltip: {
			styleOverrides: {
				tooltip: {
					color: theme.palette.background.paper,
					background: theme.palette.text.primary
				}
			}
		},
		MuiInputLabel: {
			styleOverrides: {
				root: {
					fontSize: '0.875rem',
					fontWeight: 400,
					lineHeight: '145%',
					'&.Mui-error': {
						color: theme.palette.prjError.dark
					}
				}
			}
		},
		MuiFormHelperText: {
			styleOverrides: {
				root: {
					color: theme.palette.text.light,
					fontSize: '0.875rem',
					'&.Mui-error': {
						color: theme.palette.prjError.dark
					}
				}
			}
		},
		MuiTextField: {
			styleOverrides: {
				root: {
					'& .MuiOutlinedInput-root': {
						fontSize: '1rem',
						borderRadius: '10px',
						minHeight: '48px',
						backgroundColor: theme.palette.prjNeutral['0'],
						'&:hover': {
							background: theme.palette.prjNeutral['50']
						},
						'&.Mui-focused': {
							background: '#FFF'
						},
						'& fieldset': {
							border: '1px solid',
							borderColor: theme.palette.prjNeutral['300']
						},
						'&:hover fieldset': {
							border: '1px solid',
							borderColor: theme.palette.prjNeutral['500']
						},
						'&.Mui-focused fieldset': {
							border: '2px solid',
							borderColor: theme.palette.prjNeutral['900']
						},
						'&.Mui-error fieldset': {
							border: '2px solid',
							borderColor: theme.palette.prjError.dark
						},
						'&.Mui-error:hover fieldset': {
							border: '2px solid',
							borderColor: theme.palette.prjError.dark // Mantieni il bordo rosso su hover
						},
						'&.Mui-error.Mui-focused fieldset': {
							border: '2px solid',
							borderColor: theme.palette.prjError.dark // Mantieni il bordo rosso su focus
						},
						'&.Mui-disabled': {
							backgroundColor: theme.palette.prjNeutral['50'],
							'& fieldset': {
								border: '1px solid',
								borderColor: theme.palette.prjNeutral['100']
							},
							'&:hover': {
								backgroundColor: theme.palette.prjNeutral['50']
							},
							'&:hover fieldset': {
								border: '1px solid',
								borderColor: theme.palette.prjNeutral['100']
							},
							// Se vuoi disabilitare il cambiamento di colore del bordo in hover
							'& .MuiOutlinedInput-root': {
								'& fieldset': {
									borderColor: theme.palette.prjNeutral['100'] // Mantiene il colore del bordo
								}
							}
						}
					}
				}
			}
		},
		MuiAutocomplete: {
			styleOverrides: {
				popper: {
					'& .MuiAutocomplete-paper': {
						borderColor: theme.palette.prjNeutral['100'],
						boxShadow: '0px 2px 8px 0px rgba(0, 0, 0, 0.12)'
					},
					'& .MuiAutocomplete-listbox': {
						'& .MuiAutocomplete-option': {
							'&[aria-selected="true"]': {
								backgroundColor: theme.palette.prjNeutral['100']
							},
							'&:hover': {
								backgroundColor: theme.palette.prjNeutral['50']
							}
						}
					}
				}
			}
		},
		MuiCheckbox: {
			styleOverrides: {
				root: {
					color: theme.palette.prjNeutral['700'],
					'&.Mui-checked': {
						color: theme.palette.prjNeutral['900']
					},
					'&.Mui-disabled': {
						color: theme.palette.prjNeutral['400']
					}
				}
			}
		},
		MuiFormControlLabel: {
			styleOverrides: {
				root: {
					marginLeft: '0px'
				},
				label: {
					color: theme.palette.text.main,
					fontSize: '0.875rem',
					fontWeight: 400
				}
			}
		},
		MuiSwitch: {
			styleOverrides: {
				root: {
					width: 42,
					height: 26,
					padding: 0,
					marginRight: '16px',
					fontWeight: 600
				},
				switchBase: {
					padding: 0,
					margin: 2,
					transitionDuration: '300ms',
					'&.Mui-checked': {
						transform: 'translateX(16px)',
						color: 'white',
						'& + .MuiSwitch-track': {
							backgroundColor: theme.palette.prjNeutral[900]
						},
						'&.Mui-disabled + .MuiSwitch-track': {
							opacity: 0.5
						}
					},
					'&.Mui-focusVisible .MuiSwitch-thumb': {
						color: theme.palette.prjNeutral[900],
						border: `6px solid ${'white'}`
					},
					'&.Mui-disabled .MuiSwitch-thumb': {
						color: theme.palette.prjNeutral[100]
					},
					'&.Mui-disabled + .MuiSwitch-track': {
						opacity: 1
					}
				},
				thumb: {
					boxSizing: 'border-box',
					width: 22,
					height: 22
				},
				track: {
					borderRadius: 26 / 2,
					backgroundColor: theme.palette.prjNeutral[300],
					opacity: 1,
					transition: theme.transitions.create(['background-color'], {
						duration: 500
					})
				}
			}
		},
		MuiRadio: {
			styleOverrides: {
				root: {
					color: theme.palette.text.main,
					'&.Mui-checked': {
						color: theme.palette.prjNeutral['900']
					},
					'&.Mui-disabled': {
						color: '#999999'
					}
				}
			}
		},
		MuiDataGrid: {
			styleOverrides: {
				root: {
					border: `1px solid ${theme.palette.prjNeutral['200']}`,
					'--DataGrid-rowBorderColor': theme.palette.prjNeutral['200']
				},
				main: {
					borderRadius: '8px'
				},
				columnHeaders: {
					backgroundColor: theme.palette.prjNeutral['0']
				},
				columnHeader: {
					paddingLeft: '24px',
					paddingRight: '24px',
					backgroundColor: theme.palette.prjNeutral['0'],
					'&:focus': {
						outline: 'none' // Remove the focus outline from cells
					},
					'&:focus-within': {
						outline: 'none' // Remove the focus outline from cells when within
					}
				},
				columnHeaderTitle: {
					fontWeight: 600
				},
				cell: {
					fontWeight: 400,
					fontFamily: 'Roboto',
					fontSize: '1rem',
					color: theme.palette.text.main,
					paddingLeft: '24px',
					paddingRight: '24px',
					'&:focus': {
						outline: 'none' // Remove the focus outline from cells
					},
					'&:focus-within': {
						outline: 'none' // Remove the focus outline from cells when within
					}
				},
				row: {
					backgroundColor: theme.palette.prjNeutral['0'],
					'&:not(:last-child)': {
						borderBottom: `1px solid ${theme.palette.prjNeutral['200']}` // Add bottom border to all rows except the last one
					},
					'&:hover': {
						backgroundColor: theme.palette.prjNeutral['0'] // Disables the hover background color change
					},
					'&.Mui-selected': {
						backgroundColor: theme.palette.prjNeutral['50'], // Custom background color for selected row
						'&:hover': {
							backgroundColor: theme.palette.prjNeutral['100'] // Custom hover color for selected row
						}
					}
				},
				footerContainer: {
					backgroundColor: '#FFFFFF',
					borderBottomLeftRadius: '8px',
					borderBottomRightRadius: '8px',
					maxHeight: '50px',
					'&.MuiDataGrid-withBorderColor': {
						borderColor: theme.palette.prjNeutral['200']
					}
				}
			}
		},
		MuiTablePagination: {
			styleOverrides: {
				toolbar: {
					padding: 0,
					[theme.breakpoints.up('sm')]: {
						maxHeight: '50px',
						minHeight: '45px'
					}
				}
			}
		},
		MuiSlider: {
			styleOverrides: {
				root: {
					color: theme.palette.prjNeutral['900'], // Cambia il colore della traccia
					height: 6, // Altezza della traccia
					paddingTop: '13px',
					paddingBottom: '6px'
				},
				thumb: {
					height: 16, // Altezza del thumb
					width: 16, // Larghezza del thumb
					backgroundColor: theme.palette.prjNeutral['900'], // Colore del thumb
					border: '2px solid currentColor', // Bordo del thumb
					'&:hover': {
						boxShadow: '0 0 0 8px rgba(25, 118, 210, 0.16)' // Ombra del thumb quando è hover
					},
					'&.Mui-active': {
						boxShadow: '0 0 0 14px rgba(25, 118, 210, 0.16)' // Ombra del thumb quando è attivo
					}
				},
				track: {
					height: 6, // Altezza della traccia attiva
					borderRadius: 20 // Bordo arrotondato della traccia attiva
				},
				rail: {
					backgroundColor: theme.palette.prjNeutral['300'],
					height: 6, // Altezza della traccia inattiva
					borderRadius: 20 // Bordo arrotondato della traccia inattiva
				},
				mark: {
					backgroundColor: 'transparent'
				}
			}
		}
	}
}
