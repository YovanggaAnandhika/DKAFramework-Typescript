import Grid from "@mui/material/Grid";
import {Autocomplete} from "@mui/material";
import TextField from "@mui/material/TextField";
import React, {FC} from "react";
import {useEffect, useState} from "react";
import Firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/database';
import {
    getDatabase,
    Database,
    ref,
    set,
    push,
    DatabaseReference,
    get,
    query,
    equalTo,
    orderByValue,
    orderByChild,
    orderByKey,
    child
} from "firebase/database";
import axios from "axios";
import {
    GeoAdministrativeSelectionProps,
    onChangeEventAutoCompleteTypes
} from "./index.types.ts";
import {GeoAdministrativeDefaultConfig, GeoAdministrativeDefaultConfigURL} from "./index.config.ts";
import {GeoAdministrativeType} from "./index.enum.ts";
import {eq, merge} from "lodash";


const GeoAdministrative: FC<GeoAdministrativeSelectionProps> = ({ onChange, defaultValue, config = GeoAdministrativeDefaultConfig}) => {


    const firebaseConfig = {
        apiKey: "AIzaSyBAlZaRBXUR-30us8PMEQ_UrB9Yscwto9g",
        authDomain: "dkacoreapis.firebaseapp.com",
        databaseURL: "https://dkacoreapis-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "dkacoreapis",
        storageBucket: "dkacoreapis.appspot.com",
        messagingSenderId: "166768200815",
        appId: "1:166768200815:web:7a2f152d2a4d7e3831519a",
        measurementId: "G-CLMMKJ6T7M"
    };


    const [IsMounted, setIsMounted] = useState(false);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment,@typescript-eslint/no-explicit-any
    const [DataListProvince, setDataListProvince] = useState<Array<any>>([]);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment,@typescript-eslint/no-explicit-any
    const [DataListRegencies, setDataListRegencies] = useState<Array<any>>([]);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment,@typescript-eslint/no-explicit-any
    const [DataListDistricts, setDataListDistricts] = useState<Array<any>>([]);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment,@typescript-eslint/no-explicit-any
    const [DataListVillages, setDataListVillages] = useState<Array<any>>([]);

    const [StateProvince] = useState<boolean>(true);
    const [StateRegencies, setStateRegencies] = useState<boolean>(false);
    const [StateDistricts, setStateDistricts] = useState<boolean>(false);
    const [StateVillages, setStateVillages] = useState<boolean>(false);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment,@typescript-eslint/no-explicit-any
    const [ValueProvince, setValueProvince] = React.useState<any>(null);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment,@typescript-eslint/no-explicit-any
    const [ValueRegencies, setValueRegencies] = React.useState<any>(null);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment,@typescript-eslint/no-explicit-any
    const [ValueDistricts, setValueDistricts] = React.useState<any>(null);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment,@typescript-eslint/no-explicit-any
    const [ValueVillages, setValueVillages] = React.useState<any>(null);

    const [ErrorProvinces, setErrorProvince] = React.useState<boolean>(true);
    const [ErrorRegencies, setErrorRegencies] = React.useState<boolean>(false);
    const [ErrorDistricts, setErrorDistricts] = React.useState<boolean>(false);
    const [ErrorVillages, setErrorVillages] = React.useState<boolean>(false);

    const [ErrorProvincesMessage, setErrorProvinceMessage] = React.useState<string>('');
    const [ErrorRegenciesMessage, setErrorRegenciesMessage] = React.useState<string>('');
    const [ErrorDistrictsMessage, setErrorDistrictsMessage] = React.useState<string>('');
    const [ErrorVillagesMessage, setErrorVillagesMessage] = React.useState<string>('');

    useEffect(() => {
        setIsMounted(true);
        return () => {
            setIsMounted(false);
        }
    }, []);


    const app = Firebase.initializeApp(firebaseConfig);
    const firebase = Firebase.firestore(app);
    const database = getDatabase(app);

    useEffect(() => {
        if (IsMounted) {
            //#########################
            switch (config.type) {
                case GeoAdministrativeType.LOCAL:
                    if (config.province !== undefined && Array.isArray(config.province)) {
                        setDataListProvince(config.province);
                    }
                    break;
                case GeoAdministrativeType.URL:
                    config = merge(GeoAdministrativeDefaultConfigURL, config);
                    axios({
                        url: `${config.host}${config.endpoint?.province}`,
                        method: "GET",
                        headers: {
                            'Cache-Control': 'no-cache'
                        }
                    }).then(async (response) => {
                        if (response.headers["content-type"] !== "application/json") {
                            setErrorProvinceMessage("[CODE:500] Illegal Format Response | JSON Format Header");
                            setErrorProvince(true);
                            return;
                        }
                        if (response.data.data === undefined) {
                            setErrorProvinceMessage("[CODE:400] Body Object Data Not Found");
                            setErrorProvince(true);
                            return;
                        }

                        if (Array.isArray(response.data.data) === false) {
                            setErrorProvinceMessage("[CODE:400] Body Object Data Not Array Format");
                            setErrorProvince(true);
                            return;
                        }

                        setDataListProvince(response.data.data);
                        setErrorProvince(false);

                    }).catch((error) => {
                        if (error.response) {
                            setErrorProvinceMessage(`${error.response.status} : ${error.response.data}. Check Error Log Console`);
                            console.error(error.response.data);
                        } else {
                            setErrorProvinceMessage(`${error.code} : ${error.message}. Check Error Log Console`);
                            console.error({code: error.code, message: error.message});
                        }
                        setErrorProvince(true);
                        /** Failover Default Roles Access TO Role Route**/
                    });
                    break;
                case GeoAdministrativeType.FIREBASE_FIRESTORE:
                    const Provinces = firebase.collection("BASE").doc("GEO_ADMINISTRATIVE").collection("PROVINCES");
                    Provinces
                        .get()
                        .then((querySnapshot) => {
                            setDataListProvince([]);
                            querySnapshot.forEach((doc) => {
                                setDataListProvince((prevState) => [...prevState, doc.data()]);
                            });
                            setErrorProvince(false);
                        })
                        .catch((error) => {
                            setErrorProvinceMessage(`[CODE:503] Error Get Data From Firebase. Check Error Log Console`);
                            setErrorProvince(true);
                            console.error(error);
                        });
                    break;
                case GeoAdministrativeType.FIREBASE_DATABASE:
                    const ProvinceDatabaseRef = child(ref(database), "BASE/GEO_ADMINISTRATIVE/PROVINCES");
                    get(ProvinceDatabaseRef)
                        .then((snapshot) => {
                            if (!snapshot.exists()) {
                                setErrorProvinceMessage(`[CODE:404]: Data Is Not Found `);
                                setErrorProvince(true);
                                return;
                            }
                            setDataListProvince([]);
                            if (Object.keys(snapshot.val()).length > 0){
                                Object.keys(snapshot.val()).map((key) => { setDataListProvince((prevState) => [...prevState, snapshot.val()[key]]) })
                                setErrorProvince(false);
                            }else{
                                setErrorProvinceMessage(`[CODE:404] Tidak Ada Data Ditemukan`);
                                setErrorProvince(true);
                            }

                        })
                        .catch((error) => {
                            setErrorProvinceMessage(`[CODE:503] Error Get Data From Firebase. Check Error Log Console`);
                            setErrorProvince(true);
                            console.error(error);
                        });
                    break;
            }
        }
    }, [IsMounted]);

    useEffect(() => {
        if (IsMounted && DataListProvince !== undefined && DataListProvince.length > 0) {
            if (defaultValue?.province !== undefined) onChangePronvice(undefined, defaultValue.province, "selectOption", null);
        }
    }, [IsMounted, DataListProvince]);
    useEffect(() => {
        if (IsMounted && DataListRegencies !== undefined && DataListRegencies.length > 0) {
            if (defaultValue?.regency !== undefined) onChangeRegencies(undefined, defaultValue.regency, "selectOption", null);
        }
    }, [IsMounted, DataListRegencies]);
    useEffect(() => {
        if (IsMounted && DataListDistricts !== undefined && DataListDistricts.length > 0) {
            if (defaultValue?.district !== undefined) onChangeDistricts(undefined, defaultValue.district, "selectOption", null);
        }
    }, [IsMounted, DataListDistricts]);
    useEffect(() => {
        if (IsMounted && DataListVillages !== undefined && DataListVillages.length > 0) {
            if (defaultValue?.village !== undefined) onChangeVillages(undefined, defaultValue.village, "selectOption", null);
        }
    }, [IsMounted, DataListVillages]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onChangePronvice: onChangeEventAutoCompleteTypes = (event, value, reason, details) => {
        switch (reason) {
            case "selectOption":
                //#########################
                setValueProvince(value);
                //########################
                setStateRegencies(false);
                setStateDistricts(false);
                setStateVillages(false);
                //################################
                setValueRegencies(null);
                setValueDistricts(null);
                setValueVillages(null)
                //#########################
                switch (config.type) {
                    case GeoAdministrativeType.LOCAL:
                        if (config.regency !== undefined && Array.isArray(config.regency)) {
                            setStateRegencies(true);
                            setDataListRegencies(config.regency.filter((data) => data.province_id === value.id));
                        }
                        onChange?.({
                            province: value,
                        })
                        break;
                    case GeoAdministrativeType.URL:
                        config = merge(GeoAdministrativeDefaultConfigURL, config);
                        axios({
                            url: `${config.host}${config.endpoint?.regency}`,
                            method: "GET",
                            headers: {
                                'Cache-Control': 'no-cache'
                            },
                            params: {
                                province_id: value.id
                            }
                        }).then(async (response) => {
                            if (response.headers["content-type"] !== "application/json") {
                                setErrorRegenciesMessage("[CODE:500] Illegal Format Response | JSON Format Header");
                                setErrorRegencies(true);
                                return;
                            }
                            if (response.data.data === undefined) {
                                setErrorRegenciesMessage("[CODE:400] Body Object Data Not Found");
                                setErrorRegencies(true);
                                return;
                            }

                            if (Array.isArray(response.data.data) === false) {
                                setErrorRegenciesMessage("[CODE:400] Body Object Data Not Array Format");
                                setErrorRegencies(true);
                                return;
                            }

                            setErrorRegencies(false);
                            setStateRegencies(true);
                            setDataListRegencies(response.data.data);
                        }).catch((error) => {
                            if (error.response) {
                                setErrorRegenciesMessage(`${error.response.status} : ${error.response.data}. Check Error Log Console`);
                                console.error(error.response.data);
                            } else {
                                setErrorRegenciesMessage(`${error.code} : ${error.message}. Check Error Log Console`);
                                console.error({code: error.code, message: error.message});
                            }
                            setErrorRegencies(true);
                        });
                        onChange?.({
                            province: value,
                        })
                        break;
                    case GeoAdministrativeType.FIREBASE_FIRESTORE:
                        const Regencies = firebase.collection("BASE").doc("GEO_ADMINISTRATIVE").collection("REGENCIES")
                            .where("province_id", "==", value.id);
                        Regencies
                            .get()
                            .then((querySnapshot) => {
                                setDataListRegencies([]);
                                querySnapshot.forEach((doc) => {
                                    setDataListRegencies((prevState) => [...prevState, doc.data()]);
                                });
                                setErrorRegencies(false);
                                setStateRegencies(true);
                            })
                            .catch((error) => {
                                setErrorRegenciesMessage(`[CODE:503] Error Get Data From Firebase. Check Error Log Console`);
                                setErrorRegencies(true);
                                console.error(error);
                            });
                        onChange?.({
                            province: value,
                        });
                        break;
                    case GeoAdministrativeType.FIREBASE_DATABASE:
                        const RegenciesRef = ref(database, "BASE/GEO_ADMINISTRATIVE/REGENCIES");
                        const RegenciesChild = query(RegenciesRef, orderByChild("province_id"), equalTo(value.id));
                        get(RegenciesChild)
                            .then((snapshot) => {
                                if (!snapshot.exists()) {
                                    setErrorRegenciesMessage(`[CODE:404]: Data Is Not Found `);
                                    setErrorRegencies(true);
                                    return;
                                }
                                setDataListRegencies([]);
                                const RegienciesJSON = Object.values(snapshot.val());
                                if (RegienciesJSON.length > 0 ){
                                    RegienciesJSON.map((data) => { setDataListRegencies((prevState) => [...prevState, data])})
                                    setErrorRegencies(false);
                                    setStateRegencies(true);
                                }else{
                                    setErrorRegenciesMessage(`[CODE:404] Data Tidak Ditemukan`);
                                    setErrorRegencies(true);
                                }
                            })
                            .catch((error) => {
                                setErrorRegenciesMessage(`[CODE:503] Error Get Data From Firebase. Check Error Log Console`);
                                setErrorRegencies(true);
                                console.error(error);
                            });
                        onChange?.({
                            province: value,
                        });
                        break;
                }
                break;
            default :
                setStateRegencies(false);
                setStateDistricts(false);
                setStateVillages(false);
                //################################
                setErrorRegencies(false);
                setErrorDistricts(false);
                setErrorVillages(false);
                //################################
                setValueRegencies(null);
                setValueDistricts(null);
                setValueVillages(null);

                onChange?.({
                    province: undefined
                })
                break;
        }
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment,@typescript-eslint/no-unused-vars
    const onChangeRegencies: onChangeEventAutoCompleteTypes = (event, value, reason, details) => {
        switch (reason) {
            case "selectOption":
                //########################
                setValueRegencies(value)
                //################################
                setStateDistricts(false);
                setStateVillages(false);
                setValueDistricts(null);
                setValueVillages(null)
                //#########################
                switch (config.type) {
                    case GeoAdministrativeType.LOCAL:
                        if (config.district !== undefined && Array.isArray(config.district)) {
                            setStateDistricts(true)
                            setDataListDistricts(config.district.filter((item) => item.regency_id === value.id));
                        }
                        onChange?.({
                            province: ValueProvince,
                            regency: value,
                        })
                        break;
                    case GeoAdministrativeType.URL:
                        config = merge(GeoAdministrativeDefaultConfigURL, config);
                        axios({
                            url: `${config.host}${config.endpoint?.district}`,
                            method: "GET",
                            headers: {
                                'Cache-Control': 'no-cache'
                            },
                            params: {
                                regency_id: value.id
                            }
                        }).then(async (response) => {
                            if (response.headers["content-type"] !== "application/json") {
                                setErrorDistrictsMessage("[CODE:500] Illegal Format Response | JSON Format Header");
                                setErrorDistricts(true);
                                return;
                            }

                            if (response.data.data === undefined) {
                                setErrorDistrictsMessage("[CODE:400] Body Object Data Not Found");
                                setErrorDistricts(true);
                                return;
                            }

                            if (Array.isArray(response.data.data) === false) {
                                setErrorDistrictsMessage("[CODE:400] Body Object Data Not Array Format");
                                setErrorDistricts(true);
                                return;
                            }

                            setErrorDistricts(false);
                            setStateDistricts(true);
                            setDataListDistricts(response.data.data);

                        }).catch((error) => {
                            if (error.response) {
                                setErrorDistrictsMessage(`${error.response.status} : ${error.response.data}. Check Error Log Console`);
                                console.error(error.response.data);
                            } else {
                                setErrorDistrictsMessage(`${error.code} : ${error.message}. Check Error Log Console`);
                                console.error({code: error.code, message: error.message});
                            }
                            setErrorDistricts(true);
                        });
                        onChange?.({
                            province: ValueProvince,
                            regency: value,
                        })
                        break;
                    case GeoAdministrativeType.FIREBASE_FIRESTORE:
                        const Districts = firebase.collection("BASE").doc("GEO_ADMINISTRATIVE").collection("DISTRICTS").where("regency_id", "==", value.id);
                        Districts.get().then((querySnapshot) => {
                            setDataListDistricts([]);
                            querySnapshot.forEach((doc) => { setDataListDistricts((prevState) => [...prevState, doc.data()]) });
                            setErrorDistricts(false);
                            setStateDistricts(true);
                        }).catch((error) => {
                            setErrorDistrictsMessage(`[CODE:503] Error Get Data From Firebase. Check Error Log Console`);
                            setErrorDistricts(true);
                            console.error(error);
                        });
                        onChange?.({
                            province: ValueProvince,
                            regency: value,
                        })
                        break;
                    case GeoAdministrativeType.FIREBASE_DATABASE:
                        const DistrictRef = ref(database, "BASE/GEO_ADMINISTRATIVE/DISTRICTS");
                        const DistrictQuery = query(DistrictRef, orderByChild("regency_id"), equalTo(value.id));
                        get(DistrictQuery)
                            .then((snapshot) => {
                                if (!snapshot.exists()) {
                                    setErrorDistrictsMessage(`[CODE:404]: Data Is Not Found `);
                                    setErrorDistricts(true);
                                    return;
                                }
                                setDataListDistricts([]);
                                const DistrictsJSON = Object.values(snapshot.val());
                                if (DistrictsJSON.length > 0){
                                    DistrictsJSON.map((data) => { setDataListDistricts((prevState) => [...prevState, data]) })
                                    setErrorDistricts(false);
                                    setStateDistricts(true);
                                }else{
                                    setErrorDistrictsMessage(`[CODE:404] Data Tidak Ditemukan`);
                                    setErrorDistricts(true);
                                }
                            })
                            .catch((error) => {
                                setErrorDistrictsMessage(`[CODE:503] Error Get Data From Firebase. Check Error Log Console`);
                                setErrorDistricts(true);
                                console.error(error);
                        });
                        onChange?.({
                            province: ValueProvince,
                            regency: value,
                        })
                        break;
                }
                break;
            default :
                setStateDistricts(false);
                setStateVillages(false);
                //###############################
                setErrorDistricts(false);
                setErrorVillages(false);
                //################################
                setValueDistricts(null);
                setValueVillages(null);
                //********************
                onChange?.({
                    province: ValueProvince,
                    regency: undefined,
                })
                break;
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onChangeDistricts: onChangeEventAutoCompleteTypes = (event, value, reason, details) => {
        switch (reason) {
            case "selectOption":
                //########################
                setValueDistricts(value)
                //################################
                setStateVillages(false);
                setValueVillages(null)
                //#########################
                switch (config.type) {
                    case GeoAdministrativeType.LOCAL:
                        if (config.village !== undefined && Array.isArray(config.village)) {
                            setDataListVillages(config.village.filter((item) => item.district_id === value.id));
                            setStateVillages(true)
                        }
                        onChange?.({
                            province: ValueProvince,
                            regency: ValueRegencies,
                            district: value
                        })
                        break;
                    case GeoAdministrativeType.URL:
                        config = merge(GeoAdministrativeDefaultConfigURL, config);
                        axios({
                            url: `${config.host}${config.endpoint?.village}`,
                            method: "GET",
                            headers: {
                                'Cache-Control': 'no-cache'
                            },
                            params: {
                                district_id: value.id
                            }
                        }).then(async (response) => {

                            if (response.headers["content-type"] !== "application/json") {
                                setErrorVillagesMessage("[RESPONSE FROM SERVER] Not JSON Format Header");
                                setErrorVillages(true);
                                return;
                            }

                            if (response.data.data === undefined) {
                                setErrorVillagesMessage("[RESPONSE FROM SERVER] Body Object Data Not Found");
                                setErrorVillages(true);
                                return;
                            }

                            if (Array.isArray(response.data.data) === false) {
                                setErrorVillagesMessage("[RESPONSE FROM SERVER] Body Object Data Not Array Format");
                                setErrorVillages(true);
                                return;
                            }

                            setErrorVillages(false);
                            setStateVillages(true);
                            setDataListVillages(response.data.data);

                        }).catch((error) => {

                            if (error.response) {
                                setErrorVillagesMessage(`${error.response.status} : ${error.response.data}. Check Error Log Console`);
                                console.error(error.response.data);
                            } else {
                                setErrorVillagesMessage(`${error.code} : ${error.message}. Check Error Log Console`);
                                console.error({code: error.code, message: error.message});
                            }
                            setErrorVillages(true);
                        });
                        onChange?.({
                            province: ValueProvince,
                            regency: ValueRegencies,
                            district: value
                        })
                        break;
                    case GeoAdministrativeType.FIREBASE_FIRESTORE:
                        const Villages = firebase.collection("BASE").doc("GEO_ADMINISTRATIVE").collection("VILLAGES").where("district_id", "==", value.id);
                        Villages
                            .get()
                            .then((querySnapshot) => {
                                setDataListVillages([]);
                                querySnapshot.forEach((doc) => {
                                    setDataListVillages((prevState) => [...prevState, doc.data()]);
                                });
                                setErrorVillages(false);
                                setStateVillages(true);
                            })
                            .catch((error) => {
                                setErrorVillagesMessage(`[CODE:503] Error Get Data From Firebase. Check Error Log Console`);
                                setErrorVillages(true);
                                console.error(error);
                            });
                            onChange?.({
                                province: ValueProvince,
                                regency: ValueRegencies,
                                district: value
                            });

                        break;
                    case GeoAdministrativeType.FIREBASE_DATABASE:
                        const VillagesRef = ref(database, "BASE/GEO_ADMINISTRATIVE/VILLAGES");
                        const VillagesQuery = query(VillagesRef, orderByChild("district_id"), equalTo(value.id));
                        get(VillagesQuery)
                            .then((snapshot) => {
                                if (!snapshot.exists()) {
                                    setErrorVillagesMessage(`[CODE:404]: Data Is Not Found `);
                                    setErrorVillages(true);
                                    return;
                                }
                                setDataListVillages([]);
                                const VillagesJSON = Object.values(snapshot.val());
                                if (VillagesJSON.length > 0){
                                    VillagesJSON.map((data) => { setDataListVillages((prevState) => [...prevState, data]) })
                                    setErrorVillages(false);
                                    setStateVillages(true);
                                }else{
                                    setErrorVillagesMessage(`[CODE:404] Data Tidak Ditemukan`);
                                    setErrorVillages(true);
                                }
                            })
                            .catch((error) => {
                                setErrorVillagesMessage(`[CODE:503] Error Get Data From Firebase. Check Error Log Console`);
                                setErrorVillages(true);
                                console.error(error);
                            });
                        onChange?.({
                            province: ValueProvince,
                            regency: ValueRegencies,
                            district: value
                        })
                        break;
                }
                break;
            default :
                setStateVillages(false);
                //################################
                setErrorVillages(false);
                //################################
                setValueVillages(null);
                onChange?.({
                    province: ValueProvince,
                    regency: ValueRegencies,
                    district: undefined
                })
                break;
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onChangeVillages: onChangeEventAutoCompleteTypes = (event, value, reason, details) => {
        switch (reason) {
            case "selectOption":
                //########################
                setValueVillages(value);
                onChange?.({
                    province: ValueProvince,
                    regency: ValueRegencies,
                    district: ValueDistricts,
                    village: value
                })
                //########################
                break;
            default :
                onChange?.({
                    province: ValueProvince,
                    regency: ValueRegencies,
                    district: ValueDistricts,
                    village: undefined
                })
                break
        }
    }

    return (
        <>
            <Grid container spacing={2} sx={{p: 2}}>
                <Grid item xs={12} md={3} lg={3}>
                    <Autocomplete
                        options={DataListProvince}
                        getOptionLabel={(option) => (option.name !== undefined && option.name !== null) ? option.name : ""}
                        filterSelectedOptions={true}
                        onChange={onChangePronvice}
                        disabled={!StateProvince}
                        value={ValueProvince}
                        size={"medium"}
                        renderInput={(params) => (
                            <TextField
                                label="Pilih Data Provinsi"
                                error={ErrorProvinces}
                                helperText={(ErrorProvinces) ? ErrorProvincesMessage : ""}
                                {...params}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={3} lg={3}>
                    <Autocomplete
                        options={DataListRegencies}
                        getOptionLabel={(option) => (option.name !== undefined && option.name !== null) ? option.name : ""}
                        filterSelectedOptions={true}
                        onChange={onChangeRegencies}
                        disabled={!StateRegencies}
                        value={ValueRegencies}
                        size={"medium"}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                error={ErrorRegencies}
                                helperText={(ErrorRegencies) ? ErrorRegenciesMessage : ""}
                                label="Pilih Data Kota / Kabupaten"
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={3} lg={3}>
                    <Autocomplete
                        options={DataListDistricts}
                        getOptionLabel={(option) => (option.name !== undefined && option.name !== null) ? option.name : ""}
                        filterSelectedOptions={true}
                        disabled={!StateDistricts}
                        onChange={onChangeDistricts}
                        value={ValueDistricts}
                        size={"medium"}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                error={ErrorDistricts}
                                helperText={(ErrorDistricts) ? ErrorDistrictsMessage : ""}
                                label="Pilih Data Kecamatan"
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={3} lg={3}>
                    <Autocomplete
                        options={DataListVillages}
                        getOptionLabel={(option) => (option.name !== undefined && option.name !== null) ? option.name : ""}
                        filterSelectedOptions={true}
                        disabled={!StateVillages}
                        value={ValueVillages}
                        onChange={onChangeVillages}
                        size={"medium"}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                error={ErrorVillages}
                                helperText={(ErrorVillages) ? ErrorVillagesMessage : ""}
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