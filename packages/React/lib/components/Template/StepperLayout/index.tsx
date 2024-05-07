import React, { FC, useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import Check from '@mui/icons-material/Check';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import {StepperLayoutConfig} from "./index.types.ts";

const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 10,
        left: 'calc(-50% + 16px)',
        right: 'calc(50% + 16px)',
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: '#784af4',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: '#784af4',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
        borderTopWidth: 3,
        borderRadius: 1,
    },
}));
const QontoStepIconRoot = styled('div')<{ ownerState: { active?: boolean } }>(
    ({ theme, ownerState }) => ({
        color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
        display: 'flex',
        height: 22,
        alignItems: 'center',
        ...(ownerState.active && {
            color: '#784af4',
        }),
        '& .QontoStepIcon-completedIcon': {
            color: '#784af4',
            zIndex: 1,
            fontSize: 18,
        },
        '& .QontoStepIcon-circle': {
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: 'currentColor',
        },
    }),
);
function QontoStepIcon(props: StepIconProps) {
    const { active, completed, className } = props;

    return (
        <QontoStepIconRoot ownerState={{ active }} className={className}>
            {completed ? (
                <Check className="QontoStepIcon-completedIcon" />
            ) : (
                <div className="QontoStepIcon-circle" />
            )}
        </QontoStepIconRoot>
    );
}
const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        backgroundColor:
            theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
        borderRadius: 1,
    },
}));
const ColorlibStepIconRoot = styled('div')<{ ownerState: { completed?: boolean; active?: boolean } }>(({ theme, ownerState }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
        backgroundImage:
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {
        backgroundImage:
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    }),
}));
const StepperLayout : FC<StepperLayoutConfig> = (config) => {

    const [ IsMounted, setIsMounted] = useState(false);
    const [ activeState, setActiveState ] = useState<number>(0);
    const [ LayoutContainer, setLayoutContainer ] = useState<React.JSX.Element>(<></>);
    const [ NextButtonText, setNextButtonText ] = useState<string>("Selanjutnya");
    const [ BackButtonEnabled, setBackButtonEnabled ] = useState<boolean>(false);
    const [ BackButtonText, setBackButtonText ] = useState<string>("Kembali");


    useEffect(() => {
        setIsMounted(true);
        return () => {
            setIsMounted(false);
        }
    }, [IsMounted]);

    useEffect(() => {
        if (IsMounted) {

        }
    },[IsMounted]);

    useEffect(() => {
        if (IsMounted){
            if (activeState < config.item.length - 1) setNextButtonText("Selanjutnya");
            if (activeState === config.item.length - 1) setNextButtonText("Selesai");
            if (activeState === 0) setBackButtonEnabled(false);
            if (activeState > 0) setBackButtonEnabled(true);
        }
    },[IsMounted, activeState]);

    useEffect(() => {
        if (IsMounted){
            setLayoutContainer(config.item[activeState].children);
        }
    },[IsMounted, activeState]);
    function ColorlibStepIcon(props: StepIconProps) {
        const { active, completed, className } = props;
        return (
            <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
                {config.item[Number(props.icon) - 1].icon}
            </ColorlibStepIconRoot>
        );
    }

    const onBackOnClick : React.MouseEventHandler<HTMLButtonElement> = (event) => {
        if (activeState > 0) config.item[activeState].onBack?.();
        if (activeState > 0) return setActiveState((prevState) => prevState - 1);
    }

    const onNextClick : React.MouseEventHandler<HTMLButtonElement> = (event) => {
        if (activeState >= 0) config.item[activeState].onNext?.();
        if (activeState < config.item.length - 1) return setActiveState((prevState) => prevState + 1);
        if (activeState === config.item.length - 1) return config.onFinish?.();
    }


    return (
        <Paper sx={{ p : 2, m : 2}}>
            <Stepper alternativeLabel activeStep={activeState} connector={<ColorlibConnector />}>
                { config.item.map((item, index) => (
                    <Step key={index}>
                        <StepLabel StepIconComponent={ColorlibStepIcon}>{item.title}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <React.Suspense  fallback={<div>Loading...</div>}>
                { LayoutContainer }
            </React.Suspense>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button sx={{ mr: 1 }} disabled={!BackButtonEnabled} onClick={onBackOnClick}>{BackButtonText}</Button>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={onNextClick}>{NextButtonText}</Button>
            </Box>
        </Paper>
    )
}

export default StepperLayout;