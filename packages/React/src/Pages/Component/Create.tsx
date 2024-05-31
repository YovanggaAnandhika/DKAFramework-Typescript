import {Typography} from "@mui/material";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import * as React from "react";
import {FC, useEffect} from "react";
import {CreateConfigPropsConfigurator, EditConfigPropsConfigurator} from "../../../lib";
import TextField from "@mui/material/TextField";
import Create from "../../../lib/components/Template/CrudDataTable/Action/Create";


const Edit : FC<CreateConfigPropsConfigurator> = (props) => {

    const [ IsMounted, setIsMounted ] = React.useState(false);
    const [ ValueName, setValueName ] = React.useState("");


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