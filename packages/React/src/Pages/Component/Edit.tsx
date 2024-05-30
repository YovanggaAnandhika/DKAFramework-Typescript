import {Typography} from "@mui/material";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import * as React from "react";
import {FC, useEffect} from "react";
import {EditConfigPropsConfigurator} from "../../../lib";
import TextField from "@mui/material/TextField";


const Edit : FC<EditConfigPropsConfigurator> = (props) => {

    const [ IsMounted, setIsMounted ] = React.useState(false);
    const Data = props.data;
    const [ ValueName, setValueName ] = React.useState(Data.name);


    useEffect(() => {
        setIsMounted(true);
        return () => {
            setIsMounted(false);
        }
    }, []);


    const onHandlerButton : React.MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();
        props.callback({
            name : ValueName
        });
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={6} md={6} lg={6}>
                    <TextField
                        value={ValueName}
                        onChange={(event) => {
                            setValueName(event.target.value);
                        }}
                        label={"Nama"}
                        />
                </Grid>
                <Grid item xs={6} md={6} lg={6}>
                    <Button variant="outlined" color={"primary"} onClick={onHandlerButton}>
                        Ubah
                    </Button>
                </Grid>
            </Grid>

        </>
    )
}
export default Edit;