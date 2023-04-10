import {
  createTheme,
  PaletteOptions,
  responsiveFontSizes,
  ThemeOptions,
} from '@mui/material/styles'
// Create a theme instance.

interface IPalette extends PaletteOptions {
  neutral?: any
}
interface IThemeOptions extends ThemeOptions {
  breakpoints?: any
  palette?: IPalette
}

export let theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1000,
      lg: 1224,
      xl: 1920,
    },
  },
  components: {
    MuiContainer: {
      defaultProps: {
        maxWidth: 'lg',
      },
      styleOverrides: {
        root: {
          // paddingLeft: '0px!important',
          // paddingRight: '0px!important',
        },
        maxWidthSm: {
          // paddingLeft: "0px!important",
          // paddingRight: "0px!important",
          maxWidth: '680px',
          '@media (min-width: 600px)': {
            maxWidth: '680px',
          },
        },
        maxWidthMd: {
          maxWidth: '824px',
          '@media (min-width: 900px)': {
            maxWidth: '824px',
          },
        },
        maxWidthLg: {
          maxWidth: '1224px',
          '@media (min-width: 1025px)': {
            maxWidth: '1224px',
          },
        },
      },
      variants: [],
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          // paddingLeft: "0px!important",
          // paddingRight: "0px!important",
        },
      },
    },
    MuiLink: {
      defaultProps: {
        underline: 'hover',
      },
      styleOverrides: {
        root: {
          color: 'black',
          '&:hover, &.active': {
            color: '#556cd6',
          },
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableRipple: false,
      },
      styleOverrides: {
        root: {
          // '&.Mui-disabled': {
          //   background: '#ADB5BD',
          //   color: '#FFFFFF',
          // },
          textTransform: 'none',
        },
      },
      variants: [
        {
          props: {
            variant: 'contained',
            color: 'primary',
          },
          style: {
            '&.Mui-disabled': {
              background: '#ADB5BD',
              color: '#FFFFFF',
            },
            textTransform: 'none',
            color: 'white',
            fontSize: '1rem',
            padding: '8px 24px',
            background: '#ED1E24',
            borderRadius: '8px',
            lineHeight: 1.5,
          },
        },
        {
          props: {
            variant: 'outlined',
            color: 'primary',
          },
          style: {
            textTransform: 'none',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            color: 'white',
            fontSize: '1rem',
            padding: '12px 32px',
            borderRadius: '8px',
            fontFamily: 'Avenir Next',
            fontWeight: 600,
            lineHeight: 1.5,
          },
        },
      ],
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          // color: palette.secondary,
          '&.Mui-checked': {
            color: '#ED1E24',
          },
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          display: 'block',
        },

        label: {
          display: 'inline-block',
          fontSize: '1rem',
          fontWeight: 500,
          color: '#212529',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            border: 'none', //`5px solid green`,
          },
          padding: 0,
          borderRadius: '12px',
          minHeight: '48px',
          '&:hover': {
            '& .MuiOutlinedInput-notchedOutline': {
              border: `1px solid #ED1E24`,
            },
          },
          '&.Mui-focused': {
            '& .MuiOutlinedInput-notchedOutline': {
              border: `1px solid #ED1E24`,
            },
            background: '#FFFFFF',
          },
        },
        input: {
          padding: '0 44px 0 16px',
          paddingTop: '4px',
          fontSize: '1rem',
          fontWeight: 500,
          height: '48px',
          color: '#212529',
          border: 'none',
          outline: 'none',
          backgroundColor: 'transparent',
          '&::placeholder': {
            fontSize: '16px!important',
            fontWeight: 500,
            opacity: 1,
            color: '#868E96',
          },
          '&:-webkit-autofill': {
            WebkitBoxShadow: '0 0 0 100px #F5F7FA inset',
            WebkitTextFillColor: '#868E96',
            border: 'none',
          },
        },
        notchedOutline: {
          borderColor: '#D8E0F3', // instead for .MuiOutlinedInput-notchedOutline
        },
      },
      variants: [
        {
          props: {
            name: 'dark',
          },
          style: {
            fontSize: '0.9375rem',
            lineHeight: 1.5,
            fontWeight: 500,
            color: '#39476A',
            backgroundColor: '#101426',
          },
        },
      ],
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: '0.9375rem',
          fontWeight: 400,
          lineHeight: 1.5,
          color: '#D8E0F3',
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: 'red',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          paddingInline: 4,
        },
      },
      variants: [
        {
          props: {
            color: 'secondary',
          },
          style: {
            fontWeight: 'bold',
            fontSize: 16,
            color: 'white',
            backgroundColor: '#142850',
          },
        },
      ],
    },
  },
  palette: {
    neutral: {
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827',
    },
    primary: {
      main: '#FFFFFF',
      light: '#828DF8',
      dark: '#DA6868',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#212529',
      light: '#495057',
      dark: '#0B815A',
      contrastText: '#868E96',
    },
    success: {
      main: '#14B8A6',
      light: '#43C6B7',
      dark: '#0E8074',
      contrastText: '#FFFFFF',
    },
    info: {
      main: '#2196F3',
      light: '#64B6F7',
      dark: '#0B79D0',
      contrastText: '#FFFFFF',
    },
    warning: {
      main: '#FFB020',
      light: '#FFBF4C',
      dark: '#B27B16',
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#D14343',
      light: '#DA6868',
      dark: '#922E2E',
      contrastText: '#FFFFFF',
    },
    action: {
      active: '#6B7280',
      focus: 'rgba(55, 65, 81, 0.12)',
      hover: 'rgba(55, 65, 81, 0.04)',
      selected: 'rgba(55, 65, 81, 0.08)',
      disabledBackground: 'rgba(55, 65, 81, 0.12)',
      disabled: 'rgba(55, 65, 81, 0.26)',
    },
    background: {
      default: '#F9FAFC',
      paper: '#FFFFFF',
    },
    divider: '#E6E8F0',
    text: {
      primary: '#FFFFFF',
      secondary: '#65748B',
      disabled: 'rgba(55, 65, 81, 0.48)',
    },
  },
  shadows: [
    'none',
    '0px 1px 1px rgba(100, 116, 139, 0.06), 0px 1px 2px rgba(100, 116, 139, 0.1)',
    '0px 1px 2px rgba(100, 116, 139, 0.12)',
    '0px 1px 4px rgba(100, 116, 139, 0.12)',
    '0px 1px 5px rgba(100, 116, 139, 0.12)',
    '0px 1px 6px rgba(100, 116, 139, 0.12)',
    '0px 2px 6px rgba(100, 116, 139, 0.12)',
    '0px 3px 6px rgba(100, 116, 139, 0.12)',
    '0px 2px 4px rgba(31, 41, 55, 0.06), 0px 4px 6px rgba(100, 116, 139, 0.12)',
    '0px 5px 12px rgba(100, 116, 139, 0.12)',
    '0px 5px 14px rgba(100, 116, 139, 0.12)',
    '0px 5px 15px rgba(100, 116, 139, 0.12)',
    '0px 6px 15px rgba(100, 116, 139, 0.12)',
    '0px 7px 15px rgba(100, 116, 139, 0.12)',
    '0px 8px 15px rgba(100, 116, 139, 0.12)',
    '0px 9px 15px rgba(100, 116, 139, 0.12)',
    '0px 10px 15px rgba(100, 116, 139, 0.12)',
    '0px 12px 22px -8px rgba(100, 116, 139, 0.25)',
    '0px 13px 22px -8px rgba(100, 116, 139, 0.25)',
    '0px 14px 24px -8px rgba(100, 116, 139, 0.25)',
    '0px 10px 10px rgba(31, 41, 55, 0.04), 0px 20px 25px rgba(31, 41, 55, 0.1)',
    '0px 25px 50px rgba(100, 116, 139, 0.25)',
    '0px 25px 50px rgba(100, 116, 139, 0.25)',
    '0px 25px 50px rgba(100, 116, 139, 0.25)',
    '0px 25px 50px rgba(100, 116, 139, 0.25)',
  ],
  typography: {
    allVariants: {
      fontFamily: ['Avenir Next', 'sans-serif'].join(','),
      color: '#FFFFFF',
    },
    button: {
      fontWeight: 900,
    },
    fontFamily: [
      'Avenir Next',
      'UTM Bebas',
      'Inter',
      'sans-serif',
      'Caveat cursive',
      'Livvic sans-serif',
    ].join(','),
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.57,
    },
    subtitle1: {
      fontSize: '0.9375rem',
      fontWeight: 600,
      lineHeight: 1.6,
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 600,
      letterSpacing: '0.5px',
      lineHeight: 2.5,
      textTransform: 'uppercase',
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1.66,
    },
    h1: {
      fontFamily: 'UTM Bebas',
      fontWeight: 400,
      fontSize: '7.5rem',
      lineHeight: 1.25,
    },
    h2: {
      fontFamily: 'UTM Bebas',
      fontWeight: 400,
      fontSize: '3rem',
      lineHeight: 1.25,
    },
    h3: {
      fontFamily: 'UTM Bebas',
      fontWeight: 400,
      fontSize: '2.25rem',
      lineHeight: 1.25,
    },
    h4: {
      fontFamily: 'UTM Bebas',
      fontWeight: 400,
      fontSize: '1.875rem',
      lineHeight: 1.375,
    },
    h5: {
      fontFamily: 'UTM Bebas',
      fontWeight: 400,
      fontSize: '1.375rem',
      lineHeight: 1.375,
    },
    h6: {
      fontFamily: 'UTM Bebas',
      fontWeight: 400,
      fontSize: '1.125rem',
      lineHeight: 1.25,
      letterSpacing: '1px',
    },
  },
} as IThemeOptions)

theme = responsiveFontSizes(theme)
