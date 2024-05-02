import * as React from "react";
import { useEffect, useState, FC } from "react";
import {GeoAdministrative} from "../../lib/components/Widget";

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
            <GeoAdministrative/>
        </>
    )
}

export default Pages