import * as React from 'react';
import { Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import getSignInSideTheme from './Component/getSignInSideTheme';
import {SignInSideConfiguration} from "./Interfaces/SignInSideConfiguration.ts";
import {useEffect, useState} from "react";

interface ToggleCustomThemeProps {
    showCustomTheme: boolean;
    toggleCustomTheme: () => void;
}

const Content = React.lazy(() => import("./Component/Content"));
const ToggleColorMode = React.lazy(() => import('./Component/ToggleColorMode'));

export function ToggleCustomTheme({ showCustomTheme, toggleCustomTheme } : ToggleCustomThemeProps) {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100dvw',
                position: 'fixed',
                bottom: 24,
            }}
        >
            <ToggleButtonGroup
                color="primary"
                exclusive
                value={showCustomTheme}
                onChange={toggleCustomTheme}
                aria-label="Toggle design language"
                sx={{
                    backgroundColor: 'background.default',
                    '& .Mui-selected': {
                        pointerEvents: 'none',
                    },
                }}
            >
                <ToggleButton value><AutoAwesomeRoundedIcon sx={{ fontSize: '20px', mr: 1 }} />DKA Themes</ToggleButton>
                <ToggleButton value={false}>Standar UI</ToggleButton>
            </ToggleButtonGroup>
        </Box>
    );
}

const SignInCard = React.lazy(() => import("./Component/SignInCard"));
export default function SignInSide(config ?: SignInSideConfiguration) {
    const [ IsMounted, setIsMounted ] = React.useState(false);
    const [mode, setMode] = React.useState<PaletteMode>('light');
    const [showCustomTheme, setShowCustomTheme] = React.useState(true);
    const defaultTheme = createTheme({ palette: { mode } });
    const SignInSideTheme = createTheme(getSignInSideTheme(mode));
    const [ LoginForm, setLoginForm ] = useState<React.JSX.Element>(<></>);


    useEffect(() => {
        setIsMounted(true);
        return () => {
            setIsMounted(false);
        }
    },[]);

    useEffect(() => {
        if (IsMounted){
            setLoginForm(<SignInCard { ... config } />);
        }
    },[IsMounted])
    const toggleColorMode = () => {
        setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    const toggleCustomTheme = () => {
        setShowCustomTheme((prev) => !prev);
    };

    return (
        <ThemeProvider theme={showCustomTheme ? SignInSideTheme : defaultTheme}>
            <CssBaseline />
            <Stack
                direction="column"
                justifyContent="space-between"
                sx={(theme) => ({
                    backgroundImage:
                        theme.palette.mode === 'light'
                            ? 'radial-gradient(ellipse at 70% 51%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))'
                            : 'radial-gradient(at 70% 51%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
                    backgroundSize: 'cover',
                    height: { xs: 'auto', md: '100dvh' },
                    pb: { xs: 12, sm: 0 },
                })}
                component="main"
            >
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    sx={{
                        position: { sm: 'static', md: 'fixed' },
                        width: '100%',
                        p: { xs: 2, sm: 4 },
                    }}
                >
                    <Box></Box>
                    <React.Suspense>
                        <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
                    </React.Suspense>
                </Stack>
                <Stack
                    direction={{ xs: 'column-reverse', md: 'row' }}
                    justifyContent="center"
                    gap={{ xs: 6, sm: 12 }}
                    sx={{ height: { xs: '100%', md: '100dvh' }, p: 2 }}
                >
                    <React.Suspense>
                        <Content />
                    </React.Suspense>
                    <React.Suspense>
                        { LoginForm }
                    </React.Suspense>
                </Stack>
            </Stack>
            <ToggleCustomTheme
                showCustomTheme={showCustomTheme}
                toggleCustomTheme={toggleCustomTheme}
            />
        </ThemeProvider>
    );
}