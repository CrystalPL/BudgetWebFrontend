import {Alert, Snackbar} from "@mui/material";
import Button from "@mui/material/Button";
import React, {useEffect, useState} from "react";
import {isEmailChangingWaitingToConfirm} from "../../account/AccountService";

export default function EmailToConfirmAlert() {
    const [result, setResult] = useState<boolean>()
    useEffect(() => {
        const fetchInfo = async () => {
            const data: boolean = await isEmailChangingWaitingToConfirm()
            setResult(data)
        };

        fetchInfo();
    }, []);

    return <Snackbar
        open={result}
        anchorOrigin={{vertical: 'top', horizontal: 'center'}}
    >
        <Alert variant="filled" severity="warning"
               action={
                   <Button color="inherit" size="small">
                       Wyślij ponownie
                   </Button>
               }
               sx={{
                   '.MuiAlert-action': {
                       paddingTop: 0
                   }
               }}
        >
            Potwierdź zmiane adresu email klikając na link, który do Ciebie wysłaliśmy.
        </Alert>
    </Snackbar>
}
