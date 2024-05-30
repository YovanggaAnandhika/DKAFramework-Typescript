import React, {FC, useContext, useEffect} from "react";
import {DataGrid, GridSlots} from "@mui/x-data-grid";
import LinearProgress from '@mui/material/LinearProgress';
import {CustomNoRowsOverlay} from "../../Helper/TableHelper.tsx";
import axios from "axios";
import {extend, merge} from "lodash";
import {faEdit, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Paper from "@mui/material/Paper";
import AlerterHelper from "../../Helper/AlerterHelper.tsx";
import {Grid, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {CrudDataTableContext} from "../../Context/CrudDataTableContext.tsx";
import {CrudDataTableIfaces} from "../../Interfaces/CrudDataTable.Ifaces.ts";
import Box from "@mui/material/Box";

const View: FC<CrudDataTableIfaces> = (props) => {

    const [IsMounted, setIsMounted] = React.useState(false);
    const [IsLoading, setIsLoading] = React.useState(false);
    const [ RowsData, setRowsData ] = React.useState<Array<any>>([]);
    const [Alerter, setAlerter] = React.useState<typeof AlerterHelper | React.JSX.Element>(<></>);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [ContainerLayout, setContainerLayout] = useContext(CrudDataTableContext);

    const DefaultPropsTable: React.ComponentProps<typeof DataGrid> = merge({
        columns: [],
        slots: {
            loadingOverlay: LinearProgress as GridSlots['loadingOverlay'],
            noRowsOverlay: CustomNoRowsOverlay
        },
        checkboxSelection : true,
        disableRowSelectionOnClick : true,
        sx: {
            "& ::-webkit-scrollbar": {
                width: "6px"
            },
            "& ::-webkit-scrollbar-track": {
                backgroundColor: "#f5f5f5"
            },
            "& ::-webkit-scrollbar-thumb": {
                boxShadow: "inset 0 0 3px rgba(0,0,0,.3)",
                backgroundColor: "#f5f5f5"
            },
            p : 2
        },
        scrollbarSize: 20,
        loading: IsLoading,
    }, props.view.tableProps);

    useEffect(() => {
        setIsMounted(true);
        return () => {
            setIsMounted(false);
        }
    }, []);


    useEffect(() => {
        if (IsMounted && props.view.isGrants) {
            setIsLoading(true);
            setAlerter(
                <AlerterHelper
                    alerterProps={{
                        variant: "filled",
                        severity: "info",
                    }}
                    title={"Harap Tunggu"}
                    message={"Sedang Memuat Data ..."}
                />
            );
            axios({
                url: `${props.endpoint}`,
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Cache-Control": "no-cache",
                },
                method: "GET",

                timeout: 1000 * 10,
                ...props.view.requestProps,
            }).then(({request, headers, status, data}) => {
                setIsLoading(false);
                setRowsData(data.data);
                setAlerter(
                    <AlerterHelper
                        alerterProps={{
                            variant: "outlined",
                            severity: "success",
                        }}
                        title={"OK"}
                        message={"Data Berhasil Di Dapatkan"}
                    />
                );
                setTimeout(() => {
                    setAlerter(<></>)
                },2000);

                /**
                 * Function Yang Akan Berjalan Jika Response Berstatus 200 Dan Tidak Ada Error;
                 */
            }).catch((error) => {
                setIsLoading(false);
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    switch (error.response.status) {
                        case 404 :
                            setAlerter(
                                <AlerterHelper
                                    alerterProps={{ variant: "outlined", severity: "error"}}
                                    title={"Not Found"}
                                    message={error.response.data}
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
    }, [IsMounted, props]);


    return (
        <>
            <Box sx={{p: 2, height : 700, m : 2 }}>
                <>
                    {Alerter}
                </>
                <Grid container spacing={2}>
                    <Grid item xs={6} md={6} lg={6}>
                        <Button onClick={() => {

                        }} variant="contained" color={"primary"} autoCapitalize={"false"} size="medium" sx={{ marginTop : 1, marginBottom : 1, justifyContent: 'right', borderRadius : 28, textTransform : "none" }} startIcon={<FontAwesomeIcon icon={faPlus} size={"sm"} />}>
                            <Typography sx={{fontSize : 10}}>Data Baru</Typography>
                        </Button>
                        &nbsp;
                        <Button onClick={() => {
                        }} variant="outlined" color={"success"} autoCapitalize={"false"} size="medium" sx={{ marginTop : 1, marginBottom : 1, justifyContent: 'center', borderRadius : 28, width : 7 }}>
                            <FontAwesomeIcon icon={faEdit} size={"sm"} />
                        </Button>
                    </Grid>
                </Grid>

                <DataGrid
                    rows={RowsData}
                    getRowId={(row) => row._id}
                    {...DefaultPropsTable}
                />
            </Box>
        </>
    )
}

export default View;