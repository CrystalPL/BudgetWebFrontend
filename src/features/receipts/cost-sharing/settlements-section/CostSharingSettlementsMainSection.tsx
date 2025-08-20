import React from 'react';
import {Avatar, Box, Card, Chip, Typography} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CardContent from "@mui/material/CardContent";
import {UserWhoPaid} from "../../api/ReceiptModel";
import {UserDebt} from "../CostSharingModel";

export interface CostSharingSettlementsMainSectionProps {
    userDebts: UserDebt[]
    whoPaid: UserWhoPaid
    selectedUserId: number | null
    toggleCardExpansion: (userId: number) => void
}

export default function CostSharingSettlementsMainSection(props: CostSharingSettlementsMainSectionProps) {
    return (<>
        <Typography variant="subtitle2" fontWeight="bold" gutterBottom color="text.primary">
            Wybierz rozliczenie:
        </Typography>
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 0.75,
            overflowY: 'auto',
            flex: 1,
            pr: 1,
            minHeight: '0',
            maxHeight: {
                xs: props.userDebts.length < 4 ? '400px' : '400px',
                md: '100%'
            }
        }}>
            {props.userDebts.map((userDebt) => (
                <Card
                    key={userDebt.user.userId}
                    elevation={props.selectedUserId === userDebt.user.userId ? 3 : 1}
                    sx={{
                        borderRadius: 1.25,
                        border: '1px solid',
                        borderColor: props.selectedUserId === userDebt.user.userId ? 'error.300' : 'error.100',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        flexShrink: 0
                    }}
                    onClick={() => props.toggleCardExpansion(userDebt.user.userId)}
                >
                    <CardContent sx={{
                        p: 1,
                        "&:last-child": {pb: 2}
                    }}>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <Box sx={{display: 'flex', alignItems: 'center', gap: 1.25}}>
                                <Avatar sx={{bgcolor: 'error.main', width: 30, height: 30}}>
                                    <Typography variant="body2" fontWeight="bold">
                                        {userDebt.user.userName.charAt(0).toUpperCase()}
                                    </Typography>
                                </Avatar>
                                <Box>
                                    <Typography variant="subtitle2" fontWeight="bold">
                                        {userDebt.user.userName}
                                    </Typography>
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 0.5
                                    }}>
                                        <Typography variant="caption" color="text.secondary">
                                            ma oddać
                                        </Typography>
                                        <ArrowForwardIcon sx={{fontSize: 11}} color="action"/>
                                        <Chip
                                            label={props.whoPaid.userName}
                                            size="small"
                                            color="info"
                                            variant="outlined"
                                            sx={{height: 16, fontSize: '0.6rem'}}
                                        />
                                    </Box>
                                </Box>
                            </Box>

                            <Box sx={{textAlign: 'right'}}>
                                <Typography variant="subtitle1" fontWeight="bold" color="error.main">
                                    {userDebt.totalDebt.toFixed(2)} zł
                                </Typography>
                                <Chip
                                    label={`${userDebt.items.length} ${userDebt.items.length === 1 ? 'produkt' : 'produktów'}`}
                                    size="small"
                                    color="warning"
                                    variant="filled"
                                    sx={{height: 16, fontSize: '0.6rem'}}
                                />
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            ))}
        </Box>
    </>);
}