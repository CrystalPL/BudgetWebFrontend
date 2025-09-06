import * as React from "react";
import {useState} from "react";
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from 'dayjs';
import 'dayjs/locale/pl';
import {ErrorOutline} from "@mui/icons-material";
import {FormHelperText} from "@mui/material";
import FormControl from "@mui/material/FormControl";

type DateChooserComponentProps = {
    date: Date | null
    setDate: (date: Date | null) => void;
    disabled?: boolean;
    errorHandling?: boolean
};

dayjs.locale('pl');

export default function DateChooserComponent({disabled, date, setDate, errorHandling}: DateChooserComponentProps) {
    const [dateError, setDateError] = useState<string>()

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pl">
            <FormControl fullWidth error={dateError !== ''}>
                <DatePicker
                    disabled={disabled}
                    label="Wybierz datę"
                    format="DD/MM/YYYY"
                    value={date ? dayjs(date) : null}
                    onChange={event => setDate(event?.toDate() || null)}
                    sx={{
                        width: "100%",
                    }}
                    slotProps={{
                        textField: {
                            size: 'small'
                        },
                        day: {
                            sx: {
                                "&:hover": {
                                    backgroundColor: "rgba(75,187,71,0.2)",
                                },
                                "&.MuiPickersDay-root.Mui-selected": {
                                    backgroundColor: 'primary'
                                },
                            }
                        }
                    }}
                />
                <GetErrorLabel errorHandling={errorHandling} dateError={dateError}/>
            </FormControl>
        </LocalizationProvider>
    )
}

interface GetErrorLabelProps {
    errorHandling: boolean | undefined
    dateError: string | undefined
}

function GetErrorLabel(props: GetErrorLabelProps) {
    if (typeof props.errorHandling !== "undefined" && !props.errorHandling) {
        return <></>
    }

    return (
        <FormHelperText
            sx={{
                color: 'red',
                display: 'flex',
                alignItems: 'center',
                visibility: props.dateError ? 'visible' : 'hidden',
            }}
        >
            <ErrorOutline fontSize="small" sx={{mr: 0.5}}/>
            {props.dateError}
        </FormHelperText>
    )
}