import React, {FC, useContext, useEffect, useState} from "react";
import Paper from "@mui/material/Paper";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRotateBack} from "@fortawesome/free-solid-svg-icons";
import {CrudDataTableIfaces} from "../../Interfaces/CrudDataTable.Ifaces.ts";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import {Typography} from "@mui/material";
import {CrudDataTableContext} from "../../Context/CrudDataTableContext.tsx";
import View from "../View";
import AlerterHelper from "../../Helper/AlerterHelper.tsx";
import axios from "axios";
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
const Create: FC<CrudDataTableIfaces> = (props) => {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [ IsMounted, setIsMounted ] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks, @typescript-eslint/no-unused-vars
    const [ ContainerLayout, setContainerLayout ] = useContext(CrudDataTableContext);
    const [IsHidden, setIsHidden] = React.useState(false);
    const [Alerter, setAlerter] = React.useState<typeof AlerterHelper | React.JSX.Element>(<></>);

    const ButtonBackOnClick : React.MouseEventHandler<HTMLButtonElement> = (event) => {
        setContainerLayout(<View {... props } />);
    }

    useEffect(() => {
        setIsMounted(true);
        return () => {
            setIsMounted(false);
        }
    }, []);


    const OnSubmit : (data : any) => void = (data) => {
        setIsHidden(true);
        setAlerter(<AlerterHelper
            alerterProps={{
                variant: "filled",
                severity: "info",
            }}
            title={"Harap Tunggu"}
            message={"Sedang Memuat Data ..."}
        />);
        //############### Mengirim Data ###############
        axios({
            url: `${props.endpoint}`,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Cache-Control": "no-cache",
            },
            method: "POST",
            timeout: 1000 * 10,
            data : data,
            ... props.edit?.requestProps,
        }).then(({request, headers, status, data}) => {
            setIsHidden(false);
            setAlerter(
                <AlerterHelper
                    alerterProps={{
                        variant: "outlined",
                        severity: "success",
                    }}
                    title={"OK"}
                    message={"Data Berhasil Dibuat"}
                />
            );
            setTimeout(() => {
                setAlerter(<></>);
                setContainerLayout(<View { ... props }/>)
            },800);
            /**
             * Function Yang Akan Berjalan Jika Response Berstatus 200 Dan Tidak Ada Error;
             */
        }).catch((error) => {
            setIsHidden(false);
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                switch (error.response.status) {
                    case 404 :
                        setAlerter(<AlerterHelper
                            alerterProps={{
                                variant: "outlined",
                                severity: "error",
                            }}
                            title={"URL Tidak Ditemukan"}
                            message={"Periksa Backend URL Anda"}
                        />);
                        break;
                    default :
                        setAlerter(
                            <AlerterHelper
                                alerterProps={{variant: "outlined", severity: "error"}}
                                title={`CODE [${error.response.status}]`}
                                message={error.response.data.msg}
                            />
                        )
                        break;
                }
            } else {
                // Something happened in setting up the request that triggered an Error
                setAlerter(
                    <AlerterHelper
                        alerterProps={{variant: "outlined", severity: "error"}}
                        title={"Fatal Error"}
                        message={error.message}/>
                )
            }
        });
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={6} md={6} lg={6}>
                    <Button onClick={ButtonBackOnClick} variant="outlined" color={"primary"} autoCapitalize={"false"} size="medium" sx={{ marginTop : 1, marginBottom : 1, justifyContent: 'right', textTransform : "none" }} startIcon={<FontAwesomeIcon icon={faArrowRotateBack} size={"sm"} />}>
                        <Typography sx={{fontSize : 10}}> Kembali Ke Data</Typography>
                    </Button>
                </Grid>
            </Grid>
            { Alerter }
            <BlockUi tag="div" blocking={IsHidden}>
                <Typography variant="h6" gutterBottom sx={{fontFamily: 'Raleway'}}>
                    Buat Data Baru { props.title }
                </Typography>
                <Paper sx={{ p : 2 }}>
                    { props.create?.component?.({ callback : OnSubmit }) }
                </Paper>
            </BlockUi>

        </>
    )
}
export default Create;