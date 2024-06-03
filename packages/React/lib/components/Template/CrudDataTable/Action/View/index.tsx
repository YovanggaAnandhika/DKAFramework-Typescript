import React, {FC, useContext, useEffect, useMemo} from "react";
import {
    DataGrid,
    DataGridProps,
    GridToolbarContainer,
    GridSlots,
} from '@mui/x-data-grid';
import LinearProgress from '@mui/material/LinearProgress';
import {StyledGridOverlay} from "../../Helper/TableHelper.tsx";
import axios from "axios";
import moment, { Moment, Duration } from "moment-timezone";
import {faEdit, faPlus, faTrash, faBan, faEye} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import AlerterHelper from "../../Helper/AlerterHelper.tsx";
import {Badge, Grid, Typography, useMediaQuery, useTheme} from "@mui/material";
import Button from "@mui/material/Button";
import {CrudDataTableContext} from "../../Context/CrudDataTableContext.tsx";
import {CrudDataTableIfaces} from "../../Interfaces/CrudDataTable.Ifaces.ts";
import Box from "@mui/material/Box";
import Edit from "../Edit";
import Create from "../Create";
import AccessDenied from "../../Icons/AccessDenied.tsx";
import NotFound from "../../Icons/NotFound.tsx";
import BlockUi from '@availity/block-ui';
import useScreenType from "react-screentype-hook";
import LoadingComponent from "../../Helper/LoadingComponent.tsx";

const View: FC<CrudDataTableIfaces> = (props) => {

    /** Declare Variables **/
    const [IsMounted, setIsMounted] = React.useState(false);
    const [IsLoading, setIsLoading] = React.useState(false);
    const [RowsData, setRowsData] = React.useState<Array<any>>([]);
    const [Alerter, setAlerter] = React.useState<typeof AlerterHelper | React.JSX.Element>(<></>);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [ContainerLayout, setContainerLayout] = useContext(CrudDataTableContext);
    const [checkedItem, setCheckedItem] = React.useState<Array<any>>([]);

    const [DeleteIsEnable, setDeleteIsEnable] = React.useState<boolean>(false);
    const [EditIsEnable, setEditIsEnable] = React.useState<boolean>(false);
    const [ DetectScreenSize, setDetectScreenSize ] = React.useState<boolean>(false);

    const screenType = useScreenType();

    /** Add Memorize Props **/
    props = useMemo(() => props, [props]);


    /** Use Effect Is Component Didmount or Not **/
    useEffect(() => {
        setIsMounted(true);
        return () => {
            setIsMounted(false);
        }
    }, []);

    useEffect(() => {
        if (IsMounted){
            // @ts-ignore
            import("@availity/block-ui/dist/index.css");
        }
    },[IsMounted])

    /**
     * @todo Function Button OnClick Block
     */
    /** Create Button On Click **/
    const CreateHandlerButtons : React.MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();
        setContainerLayout(<Create {...props} />)
    }
    /** Edit Button On Click ***/
    const EditHandlerButtons : React.MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();
        setContainerLayout(<Edit data={checkedItem[0]} props={props}/>)
    }
    const EditHandlerButtonsFromRow = (event : React.MouseEvent<HTMLButtonElement, MouseEvent>, row : any) => {
        event.preventDefault();
        setContainerLayout(<Edit data={row} props={props}/>)
    }
    const DeleteHandlerButtons : React.MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();
    }
    /**
     * End Function Button OnClick Block
     */


    const ToolbarCostum = () => {
        return (
            <GridToolbarContainer sx={{p: 1}}>
                { /** Create Action **/}
                <Button
                    onClick={CreateHandlerButtons}
                    variant="outlined"
                    color={"success"}
                    autoCapitalize={"false"}
                    size={(screenType.isMobile) ? "small" : (screenType.isTablet) ? "medium" : "large"}
                    sx={{marginTop: 1, marginBottom: 1, justifyContent: 'right', textTransform: "none"}}
                    startIcon={<FontAwesomeIcon icon={faPlus} size={"sm"}/>
                }>
                    <Typography sx={{
                        fontSize: (screenType.isMobile) ? 10 : (screenType.isTablet) ? 14 : 16,
                        fontFamily: 'Raleway',
                        display : (screenType.isMobile) ? "none" : "block"
                    }}>Data Baru</Typography>
                </Button>
                { /** Edit Action **/}
                <Button
                    disabled={!EditIsEnable}
                    onClick={EditHandlerButtons}
                    variant="outlined"
                    color={"warning"}
                    autoCapitalize={"false"}
                    size={(screenType.isMobile) ? "small" : (screenType.isTablet) ? "medium" : "large"}
                    sx={{marginTop: 1, marginBottom: 1, justifyContent: 'right', textTransform: "none"}}
                    startIcon={<FontAwesomeIcon icon={faEdit} size={"sm"}/>
                }>
                    <Typography sx={{
                        fontSize: (screenType.isMobile) ? 10 : (screenType.isTablet) ? 14 : 16,
                        fontFamily: 'Raleway',
                        display : (screenType.isMobile) ? "none" : "block"
                    }}>Edit Data Terpilih</Typography>
                </Button>
                { /** Delete Action **/}
                <Badge color="error" overlap="circular" badgeContent={checkedItem.length}>
                    <Button
                        disabled={!DeleteIsEnable}
                        onClick={DeleteHandlerButtons}
                        variant="outlined" color={"error"}
                        autoCapitalize={"false"}
                        size={(screenType.isMobile) ? "small" : (screenType.isTablet) ? "medium" : "large"}
                        sx={{marginTop: 1, marginBottom: 1, justifyContent: 'right', textTransform: "none"}}
                        startIcon={<FontAwesomeIcon icon={faTrash} size={"sm"}/>
                    }>
                        <Typography sx={{
                            fontSize: (screenType.isMobile) ? 10 : (screenType.isTablet) ? 14 : 16,
                            fontFamily: 'Raleway',
                            display : (screenType.isMobile) ? "none" : "block"
                        }}>Hapus Data Terpilih</Typography>
                    </Button>
                </Badge>

                <Box sx={{flexGrow: 1}}/>
            </GridToolbarContainer>
        )
    }

    /** Checked If Delete Enable & Checkend State Disable / Unable Delete Button **/
    useEffect(() => {
        if (IsMounted) {
            if (props.delete !== undefined && !props.delete.isGrants) return setDeleteIsEnable(false);
            (checkedItem.length > 0) ? setDeleteIsEnable(true) : setDeleteIsEnable(false);
        }
    }, [IsMounted, checkedItem, props]);

    /** Checked If Edit Enable & Checkend State Disable / Unable Edit Button **/

    useEffect(() => {
        if (IsMounted) {
            if (props.edit !== undefined && !props.edit.isGrants) return setEditIsEnable(false);
            (checkedItem.length == 1) ? setEditIsEnable(true) : setEditIsEnable(false);
        }
    }, [IsMounted, checkedItem, props]);

    /** Custom No Rows Overlay **/
    const CustomNoRowsOverlay = () => {
        return (
            <StyledGridOverlay>
                {(props.view !== undefined && props.view.isGrants) ? <NotFound/> : <AccessDenied/>}
                <Box
                    sx={{mt: 1}}>{(props.view !== undefined && props.view.isGrants) ? "Tidak Ada Data" : "Tidak Memiliki Hak Akses"}</Box>
            </StyledGridOverlay>
        );
    }

    /**
     * Running If First Load Component
     */
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
                        message={`Data Berhasil Di Dapatkan`}
                    />
                );
                setTimeout(() => {
                    setAlerter(<></>)
                }, 2000);

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

    /** Adding Component To Data Grid Option **/
    useEffect(() => {
        if (IsMounted && props.view !== undefined && props.view.tableProps !== undefined && props.view.tableProps.columns !== undefined) {
            if (props.options?.useActionMenuOnRow !== undefined && props.options.useActionMenuOnRow.enabled) {
                const newColumn = {
                    field: "Aksi",
                    headerName: "Aksi",
                    flex: 1,
                    maxWidth: 300,
                    renderCell: (params : any) => {
                        return (
                            <>
                                {
                                    (props.options?.useActionMenuOnRow?.settings?.showView) ? (<>
                                        <Button variant="outlined" color={"success"}>
                                            <FontAwesomeIcon icon={faEye} size={"sm"}/>
                                            {/*<Typography variant={"caption"} fontSize={8} textTransform={"none"} sx={{ml : 1}}>Lihat</Typography>*/}
                                        </Button> &nbsp;
                                    </>) : <></>
                                }
                                {
                                    (props.options?.useActionMenuOnRow?.settings?.showEdit) ? (<>
                                        <Button variant="outlined" color={"warning"} onClick={(event) => EditHandlerButtonsFromRow(event, params.row)}>
                                            <FontAwesomeIcon icon={faEdit} size={"sm"}/>
                                            {/*<Typography variant={"caption"} fontSize={8} textTransform={"none"} sx={{ml : 1}}>Ubah</Typography>*/}
                                        </Button> &nbsp;
                                    </>) : <></>
                                }
                                {
                                    (props.options?.useActionMenuOnRow?.settings?.showDelete) ? (<>
                                        <Button variant="outlined" color={"error"}>
                                            <FontAwesomeIcon icon={faTrash} size={"sm"}/>
                                            {/*<Typography variant={"caption"} fontSize={8} textTransform={"none"} sx={{ml : 1}}>Hapus</Typography>*/}
                                        </Button>
                                    </>) : <></>
                                }
                            </>
                        )
                    }
                }
                /** Inject New Columns in Array Coloumn **/
                props.view.tableProps.columns = [...props.view.tableProps.columns, newColumn];
                /** Prevent Remove Duplicate Column **/
                props.view.tableProps.columns = props.view.tableProps.columns.filter((obj1, i, arr) => arr.findIndex(obj2 => (obj2.field === obj1.field)) === i)
            }
        }
    }, [IsMounted, props]);

    /** Return Layout **/
    return (
        <>
            <Box sx={{height: 700}}>
                <Typography gutterBottom sx={{fontFamily: 'Raleway', fontWeight : "bolder", fontSmooth : "always", mb : 3, mt : 3, ml : 2}}>
                    Semua Data {props.title}
                </Typography>
                <>
                    {Alerter}
                </>
                <BlockUi tag="div" blocking={IsLoading} message={<LoadingComponent/>} >
                    <DataGrid
                        columns={[]}
                        {...props.view?.tableProps}
                        slots={{
                            loadingOverlay: LinearProgress as GridSlots['loadingOverlay'],
                            noRowsOverlay: CustomNoRowsOverlay,
                            toolbar: ToolbarCostum
                        }}
                        checkboxSelection
                        disableRowSelectionOnClick
                        getRowId={(row: any) => {
                            return row._id || row.id
                        }}
                        onRowSelectionModelChange={(ids: Array<any>) => {
                            const selectedRowsData: Array<any> = RowsData.filter((data) => ids.includes(data._id) || ids.includes(data.id))
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
                            p: 2,
                            height: 650
                        }}
                        rows={RowsData}
                        scrollbarSize={20}
                        loading={IsLoading}
                    />
                </BlockUi>
            </Box>
        </>
    )
}

export default View;