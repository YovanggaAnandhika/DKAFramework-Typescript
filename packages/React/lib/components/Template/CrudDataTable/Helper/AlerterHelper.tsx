import React, {FC} from "react";
import Alert, {AlertProps} from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";


export interface AlerterHelperProps {
    alerterProps : AlertProps,
    title : string,
    message : string | React.JSX.Element
}

const AlerterHelper : FC<AlerterHelperProps> = (props) => {

    return (
        <>
            <Alert variant={"outlined"} sx={{ mb : 1, mt : 1, fontFamily: 'Raleway'}}  { ... props.alerterProps}>
                <AlertTitle sx={{fontFamily: 'Raleway'}}>{ props.title }</AlertTitle>
                { props.message}
            </Alert>
        </>
    )
}

export default AlerterHelper;