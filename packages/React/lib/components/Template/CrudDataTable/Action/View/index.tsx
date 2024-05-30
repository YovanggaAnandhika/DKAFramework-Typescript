import React, {FC, useContext, useEffect, useMemo} from "react";
import {
    DataGrid,
    GridToolbarContainer,
    GridSlots,
} from '@mui/x-data-grid';
import LinearProgress from '@mui/material/LinearProgress';
import {StyledGridOverlay} from "../../Helper/TableHelper.tsx";
import axios from "axios";
import {faEdit, faPlus, faTrash, faBan } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import AlerterHelper from "../../Helper/AlerterHelper.tsx";
import {Badge, Grid, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {CrudDataTableContext} from "../../Context/CrudDataTableContext.tsx";
import {CrudDataTableIfaces} from "../../Interfaces/CrudDataTable.Ifaces.ts";
import Box from "@mui/material/Box";
import Edit from "../Edit";
import Create from "../Create";
import AccessDenied from "../../Icons/AccessDenied.tsx";
import NotFound from "../../Icons/NotFound.tsx";
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
const View: FC<CrudDataTableIfaces> = (props) => {

    const [IsMounted, setIsMounted] = React.useState(false);
    const [IsLoading, setIsLoading] = React.useState(false);
    const [RowsData, setRowsData ] = React.useState<Array<any>>([]);
    const [Alerter, setAlerter] = React.useState<typeof AlerterHelper | React.JSX.Element>(<></>);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [ContainerLayout, setContainerLayout] = useContext(CrudDataTableContext);
    const [ checkedItem, setCheckedItem ] = React.useState<Array<any>>([]);

    const [ DeleteIsEnable, setDeleteIsEnable ] = React.useState<boolean>(false);
    const [ EditIsEnable, setEditIsEnable ] = React.useState<boolean>(false);

    props = useMemo(() => props, [props]);
    const ToolbarCostum = () => {
        return (
            <GridToolbarContainer sx={{ p : 2 }}>
                <Button onClick={() => {
                    setContainerLayout(<Create { ... props } />)
                }} variant="outlined" color={"success"} autoCapitalize={"false"} size="medium" sx={{ marginTop : 1, marginBottom : 1, justifyContent: 'right', textTransform : "none" }} startIcon={<FontAwesomeIcon icon={faPlus} size={"sm"} />}>
                    <Typography sx={{fontSize : 10, fontFamily: 'Raleway'}}>Data Baru</Typography>
                </Button>
                <Button disabled={!EditIsEnable} onClick={() => {
                    setContainerLayout(<Edit data={checkedItem[0]} props={props} />)
                }} variant="outlined" color={"warning"} autoCapitalize={"false"} size="medium" sx={{ marginTop : 1, marginBottom : 1, justifyContent: 'right', textTransform : "none" }} startIcon={<FontAwesomeIcon icon={faTrash} size={"sm"} />}>
                    <Typography sx={{fontSize : 10, fontFamily: 'Raleway'}}>Edit Data Terpilih</Typography>
                </Button>
                <Badge color="error" overlap="circular" badgeContent={checkedItem.length}>
                    <Button disabled={!DeleteIsEnable} onClick={() => {
                    }} variant="outlined" color={"error"} autoCapitalize={"false"} size="medium" sx={{ marginTop : 1, marginBottom : 1, justifyContent: 'right', textTransform : "none" }} startIcon={<FontAwesomeIcon icon={faTrash} size={"sm"} />}>
                        <Typography sx={{fontSize : 10, fontFamily: 'Raleway'}}>
                            Hapus Data Terpilih
                        </Typography>
                    </Button>
                </Badge>

                <Box sx={{ flexGrow: 1 }} />
            </GridToolbarContainer>
        )
    }

    useEffect(() => {
        setIsMounted(true);
        return () => {
            setIsMounted(false);
        }
    }, []);

    useEffect(() => {
        if (IsMounted){
            if (!props.delete?.isGrants) return setDeleteIsEnable(false);
            (checkedItem.length > 0) ? setDeleteIsEnable(true) : setDeleteIsEnable(false);
        }
    },[IsMounted, checkedItem, props]);

    useEffect(() => {
        if (IsMounted){
            if (!props.delete?.isGrants) return setEditIsEnable(false);
            (checkedItem.length == 1) ? setEditIsEnable(true) : setEditIsEnable(false);
        }
    },[IsMounted, checkedItem, props]);

    const CustomNoRowsOverlay = () => {
        return (
            <StyledGridOverlay>
                { (props.view !== undefined && props.view.isGrants) ? <NotFound/> : <AccessDenied/> }
                <Box sx={{ mt: 1 }}>{ (props.view !== undefined && props.view.isGrants) ? "Tidak Ada Data" : "Tidak Memiliki Hak Akses"}</Box>
            </StyledGridOverlay>
        );
    }

    useEffect(() => {
        if (IsMounted && props.view !== undefined && props.view.isGrants) {
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
                    console.log(error)
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
                <BlockUi tag="div" blocking={IsLoading}>
                    <Typography variant="h6" gutterBottom sx={{fontFamily: 'Raleway'}}>
                        Semua Data { props.title }
                    </Typography>

                    <DataGrid
                        rows={RowsData}
                        columns={[]}
                        slots={{
                            loadingOverlay: LinearProgress as GridSlots['loadingOverlay'],
                            noRowsOverlay: CustomNoRowsOverlay,
                            toolbar : ToolbarCostum
                        }}
                        checkboxSelection
                        disableRowSelectionOnClick
                        getRowId={(row : any) => {
                            return row._id || row.id
                        }}
                        onRowSelectionModelChange={(ids : Array<any>) => {
                            const selectedRowsData : Array<any> = RowsData.filter((data) => ids.includes(data._id) || ids.includes(data.id))
                            if (selectedRowsData.length > 0) return setCheckedItem(selectedRowsData);
                            setCheckedItem([]);
                        }}
                        sx={{
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
                            fontFamily: 'Raleway',
                            p : 2,
                            height : 650
                        }}
                        density={"compact"}
                        scrollbarSize={20}
                        loading={IsLoading}
                        { ... props.view?.tableProps }
                    />
                </BlockUi>

            </Box>
        </>
    )
}

export default View;