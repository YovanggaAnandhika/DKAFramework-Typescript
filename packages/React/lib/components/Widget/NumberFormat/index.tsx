import React,{ FC} from "react";
// @ts-ignore
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import {NumbericTextFieldProps} from "./index.types.ts";
const NumberFormat : FC<NumbericTextFieldProps> = (props) => {

    return (
        <CurrencyTextField
            variant="outlined"
            currencySymbol="Rp."
            outputFormat="string"
            decimalCharacter=","
            digitGroupSeparator="."
            { ... props }
        />
    )
}

export default NumberFormat;