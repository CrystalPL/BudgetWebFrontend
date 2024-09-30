import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import CardContent from "@mui/material/CardContent";
import {Stack} from "@mui/material";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import * as React from "react";
import {FormEventHandler, PropsWithChildren} from "react";

interface BasicFormProps extends PropsWithChildren {
    title: string;
    onSubmit: FormEventHandler<HTMLFormElement>;
}

export default function BasicForm(props: BasicFormProps) {
    return <Card component="form" onSubmit={props.onSubmit} noValidate>
        <CardHeader title={props.title}/>
        <Divider/>
        <CardContent>
            <Stack spacing={1}>
                {props.children}
            </Stack>
        </CardContent>
        <Divider/>
        <CardActions sx={{justifyContent: 'flex-end'}}>
            <Button type="submit" variant="contained">Zapisz zmiany</Button>
        </CardActions>
    </Card>
}

