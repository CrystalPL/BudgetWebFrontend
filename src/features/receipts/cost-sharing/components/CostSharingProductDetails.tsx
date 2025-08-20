import {Avatar, Box, Chip, Typography} from "@mui/material";
import React from "react";

import {UserDebt} from "../CostSharingModel";

export interface CostSharingProductDetails {
    userDebts: UserDebt[]
    selectedUserId: number | null
}

export default function CostSharingProductDetails(props: CostSharingProductDetails) {
    return (
        <Box sx={{flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, maxHeight: '100%'}}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom color="text.primary">
                Szczegóły produktów:
            </Typography>
            <Box sx={{
                border: '1px solid',
                borderColor: 'grey.200',
                borderRadius: 2,
                p: 1,
                flex: 1,
                bgcolor: 'grey.50',
                display: 'flex',
                flexDirection: 'column',
                minHeight: 0
            }}>
                {props.selectedUserId === null ? (
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 1,
                        textAlign: 'center'
                    }}>
                        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                            Wybierz rozliczenie
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Kliknij na użytkownika po lewej stronie, aby zobaczyć szczegóły produktów
                        </Typography>
                    </Box>
                ) : (
                    <Box sx={{flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0}}>
                        {props.userDebts
                            .filter(userDebt => userDebt.user.userId === props.selectedUserId)
                            .map(userDebt => (
                                <Box key={userDebt.user.userId}
                                     sx={{flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0}}>
                                    <Typography variant="subtitle2" fontWeight="bold" gutterBottom
                                                sx={{mb: 0.75}}>
                                        Produkty dla: {userDebt.user.userName}
                                    </Typography>
                                    <Box sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 0.75,
                                        overflowY: 'auto',
                                        flex: 1,
                                        pr: 1
                                    }}>
                                        {userDebt.items.map((item, index) => (
                                            <>
                                                <Box
                                                    key={index}
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center',
                                                        p: 1,
                                                        borderRadius: 1,
                                                        bgcolor: 'white',
                                                        border: '1px solid',
                                                        borderColor: 'grey.200',
                                                        flexShrink: 0,
                                                        '&:hover': {
                                                            bgcolor: 'grey.100',
                                                            borderColor: 'primary.200'
                                                        }
                                                    }}
                                                >
                                                    <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                                        <Avatar sx={{
                                                            width: 24,
                                                            height: 24,
                                                            bgcolor: 'primary.main',
                                                            fontSize: '0.75rem'
                                                        }}>
                                                            {item.quantity}
                                                        </Avatar>
                                                        <Typography variant="body2" fontWeight="medium">
                                                            {item.productName}
                                                        </Typography>
                                                    </Box>
                                                    <Chip
                                                        label={`${item.moneyDividing?.toFixed(2)} zł`}
                                                        size="small"
                                                        color="error"
                                                        variant="outlined"
                                                        sx={{height: 20, fontSize: '0.65rem'}}
                                                    />
                                                </Box>
                                                <Box
                                                    key={index}
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center',
                                                        p: 1,
                                                        borderRadius: 1,
                                                        bgcolor: 'white',
                                                        border: '1px solid',
                                                        borderColor: 'grey.200',
                                                        flexShrink: 0,
                                                        '&:hover': {
                                                            bgcolor: 'grey.100',
                                                            borderColor: 'primary.200'
                                                        }
                                                    }}
                                                >
                                                    <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                                        <Avatar sx={{
                                                            width: 24,
                                                            height: 24,
                                                            bgcolor: 'primary.main',
                                                            fontSize: '0.75rem'
                                                        }}>
                                                            {item.quantity}
                                                        </Avatar>
                                                        <Typography variant="body2" fontWeight="medium">
                                                            {item.productName}
                                                        </Typography>
                                                    </Box>
                                                    <Chip
                                                        label={`${item.moneyDividing?.toFixed(2)} zł`}
                                                        size="small"
                                                        color="error"
                                                        variant="outlined"
                                                        sx={{height: 20, fontSize: '0.65rem'}}
                                                    />
                                                </Box>
                                                <Box
                                                    key={index}
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center',
                                                        p: 1,
                                                        borderRadius: 1,
                                                        bgcolor: 'white',
                                                        border: '1px solid',
                                                        borderColor: 'grey.200',
                                                        flexShrink: 0,
                                                        '&:hover': {
                                                            bgcolor: 'grey.100',
                                                            borderColor: 'primary.200'
                                                        }
                                                    }}
                                                >
                                                    <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                                        <Avatar sx={{
                                                            width: 24,
                                                            height: 24,
                                                            bgcolor: 'primary.main',
                                                            fontSize: '0.75rem'
                                                        }}>
                                                            {item.quantity}
                                                        </Avatar>
                                                        <Typography variant="body2" fontWeight="medium">
                                                            {item.productName}
                                                        </Typography>
                                                    </Box>
                                                    <Chip
                                                        label={`${item.moneyDividing?.toFixed(2)} zł`}
                                                        size="small"
                                                        color="error"
                                                        variant="outlined"
                                                        sx={{height: 20, fontSize: '0.65rem'}}
                                                    />
                                                </Box>
                                            </>
                                        ))}
                                    </Box>
                                </Box>
                            ))}
                    </Box>
                )}
            </Box>
        </Box>
    )
}