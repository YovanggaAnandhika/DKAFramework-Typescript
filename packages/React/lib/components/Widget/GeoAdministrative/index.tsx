

import Grid from "@mui/material/Grid";
import {Autocomplete} from "@mui/material";
import TextField from "@mui/material/TextField";
import React, { FC } from "react";
import {useEffect, useState} from "react";
import axios from "axios";
import {GeoAdministrativeSelectionProps, onChangeEventAutoCompleteTypes} from "./index.types.ts";
import {GeoAdministrativeDefaultConfig} from "./index.config.ts";
import {GeoAdministrativeType} from "./index.enum.ts";

const GeoAdministrative : FC<GeoAdministrativeSelectionProps> = ({ onChange, defaultValue, config = GeoAdministrativeDefaultConfig }) => {

    const [ IsMounted, setIsMounted ] = useState(false);
    const [ DataListProvince, setDataListProvince ] = useState<Array<any>>([]);
    const [ DataListRegencies, setDataListRegencies ] = useState<Array<any>>([])
    const [ DataListDistricts, setDataListDistricts ] = useState<Array<any>>([])
    const [ DataListVillages, setDataListVillages ] = useState<Array<any>>([])

    const [ StateProvince] = useState<boolean>(true);
    const [ StateRegencies, setStateRegencies ] = useState<boolean>(false);
    const [ StateDistricts, setStateDistricts ] = useState<boolean>(false);
    const [ StateVillages, setStateVillages ] = useState<boolean>(false);

    const [ ValueProvince, setValueProvince ] = React.useState<any>('');
    const [ ValueRegencies, setValueRegencies ] = React.useState<any>('');
    const [ ValueDistricts, setValueDistricts ] = React.useState<any>('');
    const [ ValueVillages, setValueVillages ] = React.useState<any>('');

    useEffect(() => {
        console.clear();
        setIsMounted(true);
        return () => {
            setIsMounted(false);
        }
    },[]);

    useEffect(() => {
        if (IsMounted){
            //#########################
            switch (config.type) {
                case GeoAdministrativeType.LOCAL:
                    setDataListProvince(config.province);
                    break;
                case GeoAdministrativeType.URL:
                    axios({
                        url : config.province,
                        method : "GET",
                        headers : {
                            'Cache-Control' : 'no-cache'
                        }
                    }).then(async (response) => {
                        setDataListProvince(response.data.data);

                    }).catch((error) => {
                        /** Failover Default Roles Access TO Role Route**/
                        console.error(error)
                    });
                    break
            }
        }
    }, [IsMounted]);

    useEffect(() => {
        if (IsMounted && DataListProvince.length > 0){
            if (defaultValue?.province !== undefined) onChangePronvice(undefined, defaultValue.province, "selectOption",null);
        }
    },[IsMounted, DataListProvince]);

    useEffect(() => {
        if (IsMounted && DataListRegencies.length > 0){
            if (defaultValue?.regency !== undefined) onChangeRegencies(undefined, defaultValue.regency, "selectOption",null);
        }
    }, [IsMounted, DataListRegencies]);

    useEffect(() => {
        if (IsMounted && DataListDistricts.length > 0){
            if (defaultValue?.district !== undefined) onChangeDistricts(undefined, defaultValue.district, "selectOption",null);
        }
    }, [IsMounted, DataListDistricts]);

    useEffect(() => {
        if (IsMounted && DataListVillages.length > 0){
            if (defaultValue?.village !== undefined) onChangeVillages(undefined, defaultValue.village, "selectOption",null);
        }
    }, [IsMounted, DataListVillages]);


    // @ts-ignore
    const onChangePronvice : onChangeEventAutoCompleteTypes = (event,value,reason, details) => {
        switch (reason) {
            case "selectOption":
                //#########################
                setValueProvince(value);
                //########################
                setStateRegencies(false);
                setStateDistricts(false);
                setStateVillages(false);
                //################################
                setValueRegencies("");
                setValueDistricts("");
                setValueVillages("")
                //#########################
                switch (config.type) {
                    case GeoAdministrativeType.LOCAL:
                        setStateRegencies(true);
                        setDataListRegencies(config.regency.filter((data) => data.province_id === value.id));
                        break;
                    case GeoAdministrativeType.URL:
                        axios({
                            url : config.regency,
                            method : "GET",
                            headers : {
                                'Cache-Control' : 'no-cache'
                            },
                            params : {
                                province_id : value.id
                            }
                        }).then(async (response) => {
                            setStateRegencies(true);
                            setDataListRegencies(response.data.data);
                        }).catch((error) => {
                            /** Failover Default Roles Access TO Role Route**/
                            console.error(error)
                        });

                        onChange?.({
                            province : value,
                        })
                        break
                }
                break;
            default :
                setStateRegencies(false);
                setStateDistricts(false);
                setStateVillages(false);
                //################################
                setValueRegencies("");
                setValueDistricts("");
                setValueVillages("");

                onChange?.({
                    province : undefined
                })
                break;
        }
    }

    // @ts-ignore
    const onChangeRegencies : onChangeEventAutoCompleteTypes = (event,value,reason, details) => {
        switch (reason) {
            case "selectOption":
                //########################
                setValueRegencies(value)
                //################################
                setStateDistricts(false);
                setStateVillages(false);
                setValueDistricts("");
                setValueVillages("")
                //#########################
                switch (config.type) {
                    case GeoAdministrativeType.LOCAL:
                        setStateDistricts(true)
                        setDataListDistricts(config.district.filter((item) => item.regency_id === value.id ));
                        break;
                    case GeoAdministrativeType.URL:
                        axios({
                            url : config.district,
                            method : "GET",
                            headers : {
                                'Cache-Control' : 'no-cache'
                            },
                            params : {
                                regency_id : value.id
                            }
                        }).then(async (response) => {

                            setDataListDistricts(response.data.data);
                            setStateDistricts(true)
                        }).catch((error) => {
                            /** Failover Default Roles Access TO Role Route**/
                            console.error(error)
                        });
                        onChange?.({
                            province : ValueProvince,
                            regency : value,
                        })
                        break;
                }
                break;
            default :
                setStateDistricts(false);
                setStateVillages(false);
                //################################
                setValueDistricts("");
                setValueVillages("");
                //********************
                onChange?.({
                    province : ValueProvince,
                    regency : undefined,
                })
                break;
        }
    }

    // @ts-ignore
    const onChangeDistricts : onChangeEventAutoCompleteTypes = (event,value,reason, details) => {
        switch (reason) {
            case "selectOption":
                //########################
                setValueDistricts(value)
                //################################
                setStateVillages(false);
                setValueVillages("")
                //#########################
                switch (config.type) {
                    case GeoAdministrativeType.LOCAL:
                        setDataListVillages(config.village.filter((item) => item.district_id === value.id ));
                        setStateVillages(true)
                        break;
                    case GeoAdministrativeType.URL:
                        axios({
                            url : config.village,
                            method : "GET",
                            headers : {
                                'Cache-Control' : 'no-cache'
                            },
                            params : {
                                district_id : value.id
                            }
                        }).then(async (response) => {
                            setDataListVillages(response.data.data);
                            setStateVillages(true)
                        }).catch((error) => {
                            /** Failover Default Roles Access TO Role Route**/
                            console.error(error)
                        });
                        onChange?.({
                            province : ValueProvince,
                            regency : ValueRegencies,
                            district : value
                        })
                        break;
                }
                break;
            default :
                setStateVillages(false);
                //################################
                setValueVillages("")
                onChange?.({
                    province : ValueProvince,
                    regency : ValueRegencies,
                    district : undefined
                })
                break;
        }
    }

    // @ts-ignore
    const onChangeVillages : onChangeEventAutoCompleteTypes = (event,value,reason, details) => {
        switch (reason) {
            case "selectOption":
                //########################
                setValueVillages(value);
                onChange?.({
                    province : ValueProvince,
                    regency : ValueRegencies,
                    district : ValueDistricts,
                    village : value
                })
                //########################
                break;
            default :
                onChange?.({
                    province : ValueProvince,
                    regency : ValueRegencies,
                    district : ValueDistricts,
                    village : undefined
                })
                break
        }
    }

    return(
        <>
            <Grid container spacing={2} sx={{ p : 1}}>
                <Grid item xs={12} md={3} lg={3}>
                    <Autocomplete
                        options={DataListProvince}
                        getOptionLabel={(option) => (option.name !== undefined) ? option.name : ""}
                        filterSelectedOptions={true}
                        onChange={onChangePronvice}
                        disabled={!StateProvince}
                        value={ValueProvince}
                        size={"medium"}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Pilih Data Provinsi"
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={3} lg={3}>
                    <Autocomplete
                        options={DataListRegencies}
                        getOptionLabel={(option) => (option.name !== undefined) ? option.name : ""}
                        filterSelectedOptions={true}
                        onChange={onChangeRegencies}
                        disabled={!StateRegencies}
                        value={ValueRegencies}
                        size={"medium"}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Pilih Data Kota / Kabupaten"
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={3} lg={3}>
                    <Autocomplete
                        options={DataListDistricts}
                        getOptionLabel={(option) => (option.name !== undefined) ? option.name : ""}
                        filterSelectedOptions={true}
                        disabled={!StateDistricts}
                        onChange={onChangeDistricts}
                        value={ValueDistricts}
                        size={"medium"}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Pilih Data Kecamatan"
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={3} lg={3}>
                    <Autocomplete
                        options={DataListVillages}
                        getOptionLabel={(option) => (option.name !== undefined) ? option.name : ""}
                        filterSelectedOptions={true}
                        disabled={!StateVillages}
                        value={ValueVillages}
                        onChange={onChangeVillages}
                        size={"medium"}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Pilih Data Kelurahan"
                            />
                        )}
                    />
                </Grid>
            </Grid>
        </>
    )
}

export default GeoAdministrative;