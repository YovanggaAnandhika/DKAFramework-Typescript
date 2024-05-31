import React, {FC} from "react";
// @ts-ignore
import SnailLoading from "./../Assets/snail_loading.gif";
import Box from "@mui/material/Box";
import {Typography, Grid, Backdrop} from "@mui/material";
import Stack from "@mui/material/Stack";


const LoadingComponent: FC<any> = (props) => {

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12} lg={12}>
                    <Box component={"img"} sx={{width: 150, height: 150, m: 3}} src={SnailLoading} alignItems="center"
                         justifyContent="center"></Box>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12} lg={12}>
                    <Typography variant={"caption"} fontSize={14} textTransform={"none"} sx={{ml: 1}}>Sedang Loading Harap
                        Tunggu</Typography>
                </Grid>
            </Grid>
        </>
    )
}

export default LoadingComponent;