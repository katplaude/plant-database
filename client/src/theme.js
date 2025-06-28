import { createTheme } from '@mui/material/styles';
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/700.css';

const theme = createTheme({
    palette: {
        primary: {
            main: '#42a5f5',
            light: '#64b5f6',
            dark: '#1976d2',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#ffab40',
            light: '#ffd740',
            dark: '#ff6f00',
            contrastText: '#000000',
        },
        background: {
            default: '#f7f9fc',
            paper: '#ffffff',
        },
        text: {
            primary: '#333333',
            secondary: '#555555',
        },
    },
    typography: {
        fontFamily: 'Inter, sans-serif',
        h4: {
            fontWeight: 600,
            fontSize: '2rem',
            marginBottom: '1.5rem',
            color: '#333333',
        },
        h5: {
            fontWeight: 600,
            fontSize: '1.5rem',
            marginBottom: '1rem',
            color: '#444444',
        },
        body1: {
            fontSize: '1rem',
            lineHeight: 1.6,
        },
        button: {
            textTransform: 'none',
            fontWeight: 600,
        },
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
                },
            },
        },
        MuiTextField: {
            defaultProps: {
                variant: 'outlined',
                size: 'small',
            },
            styleOverrides: {
                root: {
                    marginBottom: '1rem',
                },
            },
        },
        MuiButton: {
            defaultProps: {
                disableElevation: true,
            },
            styleOverrides: {
                root: {
                    borderRadius: 8,
                },
            },
        },
        MuiCheckbox: {
            defaultProps: {
                color: 'primary',
            }
        },
        MuiRadio: {
            defaultProps: {
                color: 'primary',
            }
        },
        MuiFormControlLabel: {
            styleOverrides: {
                root: {
                    marginBottom: '0.5rem',
                },
            },
        },
        MuiFormGroup: {
            styleOverrides: {
                root: {
                    paddingLeft: '0.5rem',
                },
            },
        },
    },
    spacing: 8,
});

export default theme;