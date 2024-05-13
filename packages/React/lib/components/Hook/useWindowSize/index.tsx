import React, { useState, useLayoutEffect } from "react";

type useWindowSizeCallback = [
    witdh : number,
    height : number
];
export function useWindowSize() : useWindowSizeCallback {

    const [size, setSize] = useState<useWindowSizeCallback>([window.innerWidth, window.innerHeight]);

    useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    return size;
}