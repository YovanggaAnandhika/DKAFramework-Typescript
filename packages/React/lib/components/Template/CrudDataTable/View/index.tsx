import {FC, useEffect} from "react";
import {DataGrid} from "@mui/x-data-grid";
import {ViewConfigProps} from "./Interfaces/ViewConfigProps.ts";
import {LinearProgress} from "@mui/material";
import {CustomNoRowsOverlay} from "../Helper/TableHelper.tsx";
import axios from "axios";


const View : FC<ViewConfigProps> = (props) => {

    const [ IsMounted , setIsMounted ] = React.useState(false);
    const [ IsLoading, setIsLoading ] = React.useState(false);

    useEffect(() => {
        setIsMounted(true);
        return () => {
            setIsMounted(false);
        }
    }, []);


    useEffect(() => {
        if (IsMounted){
            setIsLoading(true);
            axios({
                headers : {
                    "Content-Type" : "application/json",
                    "Accept" : "application/json",
                    "Cache-Control" : "no-cache",
                },
                method : "GET",
                timeout : 1000 * 10,
                ...props.requestProps,
            }).then((callback) => {
                setIsLoading(false);
                /**
                 * FUnction Yang Akan Berjalan Jika Response Berstatus 200 Dan Tidak Ada Error;
                 */

            }).catch((error) => {
                setIsLoading(false);
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser
                    // and an instance of http.ClientRequest in node.js
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
            });
        }
    }, [IsMounted]);


    return (
        <>
            <DataGrid
                disableRowSelectionOnClick={true}
                slots={{
                    loadingOverlay: LinearProgress,
                    noRowsOverlay : CustomNoRowsOverlay
                }}
                loading={IsLoading}
                { ... props.tableProps }
            />
        </>
    )
}

export default View;