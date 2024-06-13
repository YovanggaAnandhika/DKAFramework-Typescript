import {Typography} from "@mui/material";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import * as React from "react";
import {FC, useEffect} from "react";
import {EditConfigPropsConfigurator} from "../../../lib";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";


const Edit : FC<EditConfigPropsConfigurator> = (props) => {

    const [ IsMounted, setIsMounted ] = React.useState(false);

    useEffect(() => {
        setIsMounted(true);
        return () => {
            setIsMounted(false);
        }
    }, []);

    const onHandlerButton : React.MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={6} md={6} lg={6}>
                    <TextField
                        label={"Nama"}
                        />
                </Grid>
                <Grid item xs={6} md={6} lg={6}>
                    <Box flex={1}>

                    </Box>
                    <Button variant="outlined" color={"primary"} onClick={onHandlerButton}>
                        Ubah
                    </Button>
                </Grid>
            </Grid>

        </>
    )
}
export default Edit;