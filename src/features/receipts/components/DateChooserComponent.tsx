import * as React from "react";
import {useState} from "react";
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, {Dayjs} from 'dayjs';
import 'dayjs/locale/pl';

type DateChooserComponentProps = {
    defaultValue?: Date;
    onChange?: (value: Date | undefined) => void;
    disabled?: boolean;
};

dayjs.locale('pl');

export default function DateChooserComponent({defaultValue, onChange, disabled}: DateChooserComponentProps) {
    const [date, setDate] = useState<Date | undefined>(defaultValue);
    const [dateError, setDateError] = useState<string>()

    const validate = (value: Date) => {
        return ""
    }

    const setNewDate = (value: Dayjs | null) => {
        if (!value) {
            setDate(undefined);
            onChange?.(undefined);
        } else {
            const newDate = value.toDate()
            setDate(newDate);
            onChange?.(newDate);
        }
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pl">
            <DatePicker
                disabled={disabled}
                label="Wybierz datę"
                format="DD/MM/YYYY"
                value={date ? dayjs(date) : null}
                onChange={event => setNewDate(event)}
                sx={{
                    width: '100%'
                }}
                slotProps={{
                    day: {
                        sx: {
                            "&:hover": {
                                backgroundColor: "rgba(75,187,71,0.2)",
                            },
                            "&.MuiPickersDay-root.Mui-selected": {
                                backgroundColor: 'primary'
                            }
                        }
                    }
                }}
            />
        </LocalizationProvider>
    )
}