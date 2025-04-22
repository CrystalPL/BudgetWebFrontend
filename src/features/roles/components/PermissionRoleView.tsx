'use client'
import {Typography} from "@mui/material";
import Button from "@mui/material/Button";
import * as React from "react";
import Box from "@mui/material/Box";
import {useRouter} from "next/navigation";

interface Props {
    content: string;
}

export default function PermissionRoleView(props: Props) {
    const router = useRouter();

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            marginTop="20px"
        >
            <Typography
                variant="h5"
                gutterBottom
                sx={{color: 'teal', fontWeight: 'bold'}}
            >
                {props.content}
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={() => router.push('/household/roles')}
                sx={{padding: '12px 24px', fontSize: '18px', borderRadius: '8px'}}
            >
                Powrót
            </Button>
        </Box>
    );
}