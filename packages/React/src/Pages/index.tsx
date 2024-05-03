import * as React from "react";
import { useEffect, useState, FC } from "react";
import {GeoAdministrative, Template } from "../../lib/components/Widget";
import {Typography} from "@mui/material";

const Pages : FC = () =>{

    const [IsMounted, setIsMounted] = React.useState(false);

    useEffect(() => {
        setIsMounted(true);
        return () => {

            setIsMounted(false);
        }
    });


    return (
        <>
            <Template>
                <Typography variant="h6" component="div">Header</Typography>
            </Template>
        </>
    )
}

export default Pages