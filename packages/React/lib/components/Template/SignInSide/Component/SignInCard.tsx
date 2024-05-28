import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Card as MuiCard } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import ForgotPassword from './ForgotPassword';
import { GoogleIcon, FacebookIcon, SitemarkIcon } from './CustomIcons';
import {SignInSideConfiguration} from "../Interfaces/SignInSideConfiguration.ts";

const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    gap: theme.spacing(4),
    width: '100%',
    padding: theme.spacing(2),
    boxShadow:
        theme.palette.mode === 'light'
            ? 'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px, hsla(220, 30%, 5%, 0.05) 0px 0px 0px 1px'
            : 'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px, hsla(220, 30%, 5%, 0.05) 0px 0px 0px 1px',
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4),
        width: '450px',
    },
}));

export default function SignInCard(config ?: SignInSideConfiguration) {

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        config?.onSubmit?.({
            username : data.get('username')?.toString(),
            password : data.get("password")?.toString()
        });
    };

    return (
        <Card>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                {/** Logo **/}
                {/*<SitemarkIcon />*/}
            </Box>
            <Typography
                component="h2"
                variant="h6"
                sx={{ width: '100%', fontSize: 'clamp(1rem, 3vw, 1.25rem)' }}
            >
                Masuk Untuk menggunakan Akun DKA
            </Typography>
            <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    gap: 2,
                }}
            >
                <FormControl>
                    <FormLabel htmlFor="email">Nama Pengguna</FormLabel>
                    <TextField
                        name="username"
                        placeholder="Nama Pengguna Anda"
                        autoFocus
                        required
                        fullWidth
                        variant="outlined"
                        color={'primary'}
                        sx={{ ariaLabel: 'email' }}
                    />
                </FormControl>
                <FormControl>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <FormLabel htmlFor="password">Kata Sandi</FormLabel>
                        <Link
                            component="button"
                            variant="body2"
                            sx={{ alignSelf: 'baseline' }}
                        >
                            Lupa Password ?
                        </Link>
                    </Box>
                    <TextField
                        name="password"
                        placeholder="••••••"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        autoFocus
                        required
                        fullWidth
                        variant="outlined"
                        color={ 'primary'}
                    />
                </FormControl>
                {/*<FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                />*/}
                {/*<ForgotPassword open={open} handleClose={handleClose} />*/}
                <Button type="submit" fullWidth variant="contained">
                    Masuk
                </Button>
                {/*<Link variant="body2" sx={{ alignSelf: 'center' }}>
                    Belum Punya Akun? Daftar Sekarang
                </Link>*/}
            </Box>
            {/*<Divider>or</Divider>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                    type="submit"
                    fullWidth
                    variant="outlined"
                    color="secondary"
                    onClick={() => alert('Sign in with Google')}
                    startIcon={<GoogleIcon />}
                >
                    Login Dengan Google
                </Button>
                <Button
                    type="submit"
                    fullWidth
                    variant="outlined"
                    color="secondary"
                    onClick={() => alert('Sign in with Facebook')}
                    startIcon={<FacebookIcon />}
                >
                    Login Dengan Facebook
                </Button>
            </Box>*/}
        </Card>
    )
}