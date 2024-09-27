import React, {FC, useContext, useEffect, useMemo, useState} from "react";
import Paper from "@mui/material/Paper";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRotateBack} from "@fortawesome/free-solid-svg-icons";
import {CrudDataTableIfaces} from "../../Interfaces/CrudDataTable.Ifaces.ts";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import {Typography} from "@mui/material";
import {CrudDataTableContext} from "../../Context/CrudDataTableContext.tsx";
import AlerterHelper from "../../Helper/AlerterHelper.tsx";
import axios from "axios";
import BlockUi from '@availity/block-ui';
import LoadingComponent from "../../Helper/LoadingComponent.tsx";

const View = React.lazy(() => import('../View'));

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

    useEffect(() => {
        if (IsMounted){

        }
    },[IsMounted])

    const Component = useMemo(() => props.create?.component, [props.create?.component]);

    const OnSubmit : (data : any) => void = (data) => {
        if (IsMounted){
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
                ... props.create?.requestProps,
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
                        case 400 :
                            // eslint-disable-next-line no-case-declarations
                            let title = `400 [BAD REQUEST]`;
                            // eslint-disable-next-line no-case-declarations
                            let msg = error.response.data.msg;

                            // If From Database Error
                            if (error.response.data.error !== undefined && error.response.data.error.errorResponse !== undefined) {
                                msg = `${error.response.data.error.errorResponse.errmsg}`;
                            }

                            if (error.response.data.error !== undefined && error.response.data.error.errors !== undefined){
                                title = `${error.response.data.error.message}`
                                Object.keys(error.response.data.error.errors).forEach((keys) => {
                                    msg += `${error.response.data.error.errors[keys].message}`;
                                })
                            }
                            if (error.response.data)
                            setAlerter(
                                <AlerterHelper
                                    alerterProps={{variant: "outlined", severity: "error"}}
                                    title={title}
                                    message={msg}
                                />
                            )
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
            <BlockUi tag="div" blocking={IsHidden} message={<LoadingComponent/>}>
                <Typography variant="h6" gutterBottom sx={{fontFamily: 'Raleway'}}>
                    Buat Data Baru { props.title }
                </Typography>
                <Paper sx={{ p : 2 }}>
                    { Component?.({callback : OnSubmit}) }
                </Paper>
            </BlockUi>
        </>
    )
}
export default Create;