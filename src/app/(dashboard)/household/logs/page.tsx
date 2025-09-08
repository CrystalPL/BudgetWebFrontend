'use client'
import React from 'react';
import {
    Timeline,
    TimelineConnector,
    TimelineContent,
    TimelineItem,
    timelineOppositeContentClasses,
    TimelineSeparator
} from '@mui/lab';
import {Paper, Typography} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";

const HouseholdTimeline = () => {
    const events = [
        {
            date: '2024-10-02 12:45',
            type: 'Stworzenie',
            title: 'Stworzenie gospodarstwa domowego',
            description: 'Gospodarstwo domowe zostało utworzone przez użytkownika user1@example.com.',
        },
        {
            date: '2024-10-03 09:15',
            type: 'Zaproszenie',
            title: 'Zaproszenie do gospodarstwa',
            description: 'Użytkownik user1@example.com zaprosił user2@example.com.',
        },
        {
            date: '2024-10-03 10:00',
            type: 'Dołączenie',
            title: 'Dołączenie do gospodarstwa',
            description: 'Użytkownik user2@example.com dołączył do gospodarstwa domowego.',
        }
    ];


    return (
        <Timeline sx={{
            [`& .${timelineOppositeContentClasses.root}`]: {
                flex: 0.2,
            },
            mt: 10,
            maxWidth: '1300px'
        }}>
            {/*<Stack spacing={3}>*/}
            {events.map((event, index) => (
                <TimelineItem key={index} sx={{height: {xs: '150px', sm: '110px', md: '100px', lg: '100px'}}}>
                    <TimelineOppositeContent
                        sx={{m: 'auto 0'}}
                        align="right"
                        variant="body2"
                        color="text.secondary"
                    >
                        {event.date}
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                        <TimelineConnector/>
                        <TimelineDot
                            color={event.type === 'Stworzenie' ? 'primary' : event.type === 'Zaproszenie' ? 'secondary' : 'success'}>
                            {event.type === 'Stworzenie' && <HomeIcon fontSize="large"/>}
                            {event.type === 'Zaproszenie' && <PersonAddIcon fontSize="large"/>}
                            {event.type === 'Dołączenie' && <GroupAddIcon fontSize="large"/>}
                        </TimelineDot>
                        <TimelineConnector/>
                    </TimelineSeparator>
                    <TimelineContent sx={{m: 'auto 0', pb: 0}}>
                        <Paper elevation={3} sx={{padding: '6px 16px'}}>
                            <Typography variant="h6" component="span">
                                {event.title}
                            </Typography>
                            <Typography>{event.description}</Typography>
                        </Paper>
                    </TimelineContent>
                </TimelineItem>
            ))}
            {/*</Stack>*/}
        </Timeline>
    );
};

export default HouseholdTimeline;
