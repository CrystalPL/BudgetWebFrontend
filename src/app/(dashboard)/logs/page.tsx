'use client'
import React, {useEffect, useState} from 'react';
import {
    Avatar,
    Box,
    Button,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Paper,
    TextField,
    Typography
} from '@mui/material';
import {Chat, Fullscreen, FullscreenExit, Remove, Send} from '@mui/icons-material';
import Divider from "@mui/material/Divider";

// Definicja typu wiadomości
interface Message {
    id: number;
    text: string;
    time: string;
    avatarUrl?: string; // Avatar is optional for user messages
    isUser: boolean; // Zmienna wskazująca, czy wiadomość jest od użytkownika
    nickname?: string; // Nickname of the sender
    readBy?: { user: string; readTime: string; avatarUrl: string }[]
}

function ChatOverlay() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: "Cześć! Jak mogę p123123213123omóc?",
            time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
            avatarUrl: 'https://i.pravatar.cc/300', // Awatar bota
            isUser: false, // To jest wiadomość od bota
            nickname: 'Bot1',
            readBy: [{user: 'bot1', readTime: 'dzisiaj', avatarUrl: 'https://i.pravatar.cc/300'}, {
                user: 'bot3',
                readTime: 'dzisiaj',
                avatarUrl: 'https://i.pravatar.cc/301'
            }]
        },
        {
            id: 2,
            text: "Cześć! Jak mogę pomóc?",
            time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
            avatarUrl: 'https://i.pravatar.cc/300', // Awatar bota
            isUser: false, // To jest wiadomość od bota
            readBy: [{user: 'bot3', readTime: 'dzisiaj', avatarUrl: 'https://i.pravatar.cc/301'}]
        },
        {
            id: 3,
            text: "Cześć! Jak mogę pomóc?",
            time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
            avatarUrl: 'https://i.pravatar.cc/300', // Awatar bota
            isUser: false, // To jest wiadomość od bota
            nickname: 'Bot3', // Nickname for the bot
            readBy: [{user: 'bot3', readTime: 'dzisiaj', avatarUrl: 'https://i.pravatar.cc/301'}]
        },
        {
            id: 4,
            text: "Cześć! Jak mogę pomóc?",
            time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
            avatarUrl: 'https://i.pravatar.cc/300', // Awatar bota
            isUser: false, // To jest wiadomość od bota
            readBy: [{user: 'bot3', readTime: 'dzisiaj', avatarUrl: 'https://i.pravatar.cc/301'}]
        }
    ]);
    const [newMessage, setNewMessage] = useState<string>('');
    const [isChatOpen, setIsChatOpen] = useState<boolean>(true);

    const handleSend = () => {
        if (newMessage.trim() === '') return;

        const messageData: Message = {
            id: messages.length + 1,
            text: newMessage,
            time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
            isUser: true, // Użytkownik wysyła wiadomość
            nickname: 'juzer'
        };

        setMessages([...messages, messageData]);
        setNewMessage(''); // Czyści pole po wysłaniu wiadomości
    };

    const shouldDisplayTime = (index: number): boolean => {
        if (index === messages.length - 1) return true; // Ostatnia wiadomość zawsze wyświetla godzinę
        const currentMessage = messages[index];
        const nextMessage = messages[index + 1];

        // Wyświetl czas, jeśli następna wiadomość pochodzi od innego nadawcy lub ma inny czas
        return currentMessage.time !== nextMessage.time || currentMessage.nickname !== nextMessage.nickname;
    };

    const shouldDisplayNickname = (index: number): boolean => {
        if (index === 0) return true; // Wyświetl czas dla pierwszej wiadomości
        const currentMessage = messages[index];
        const previousMessage = messages[index - 1];

        // Wyświetl czas, jeśli nadawca jest inny niż poprzedni
        return currentMessage.nickname !== previousMessage.nickname
    }

    const currentUser = 'juzer';

    const getLastReadMessageForUsers = () => {
        const lastReadByUser: { [user: string]: number } = {};

        messages.forEach((message) => {
            message.readBy?.forEach((reader) => {
                lastReadByUser[reader.user] = message.id; // Zapisz ID ostatniej wiadomości, którą przeczytał dany użytkownik
            });
        });

        return lastReadByUser;
    };

    const lastReadByUser = getLastReadMessageForUsers();


    const markMessageAsRead = (messageId: number, user: string) => {
        setMessages(prevMessages =>
            prevMessages.map(message => {
                if (message.id === messageId) {
                    const alreadyRead = message.readBy?.some(reader => reader.user === user);

                    if (!alreadyRead) {
                        const newReadBy = {
                            user: user,
                            readTime: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
                            avatarUrl: 'https://i.pravatar.cc/300' // tutaj można dodać avatar dla konkretnego użytkownika
                        };

                        return {
                            ...message,
                            readBy: [...(message.readBy || []), newReadBy],
                        };
                    }
                }
                return message;
            })
        );
    };


    const [botTurn, setBotTurn] = useState<boolean>(true);
    useEffect(() => {
        const botInterval = setInterval(() => {
            const botMessage: Message = {
                id: messages.length + 1,
                text: botTurn
                    ? "To wiadomość od Bot1, wysyłana automatycznie co 10 minut."
                    : "To wiadomość od Bot2, wysyłana automatycznie co 10 minut.",
                time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
                avatarUrl: botTurn
                    ? 'https://i.pravatar.cc/300?u=bot1' // Awatar Bot1
                    : 'https://i.pravatar.cc/300?u=bot2', // Awatar Bot2
                isUser: false,
                nickname: botTurn ? 'Bot1' : 'Bot2' // Zmiana nadawcy
            };

            const botMessage2: Message = {
                id: messages.length + 2,
                text: botTurn
                    ? "To wiadomość od Bot1, wysyłvana aa automana auta automana auta automana auta automana auta automana aututomana automana automana automatycznie co 10 minut."
                    : "To wiadomość od Bot2, wysyłana automatycznie co 10 minut.",
                time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
                avatarUrl: botTurn
                    ? 'https://i.pravatar.cc/300?u=bot1' // Awatar Bot1
                    : 'https://i.pravatar.cc/300?u=bot2', // Awatar Bot2
                isUser: false,
                nickname: botTurn ? 'Bot1' : 'Bot2' // Zmiana nadawcy
            };

            setMessages((prevMessages) => [...prevMessages, botMessage]);
            setMessages((prevMessages) => [...prevMessages, botMessage2]);
            setBotTurn(!botTurn); // Zmienia botTurn na przeciwny, aby następny bot wysłał wiadomość
        }, 3 * 1000); // 10 minut = 10 * 60 * 1000 ms

        // Czyszczenie interwału przy odmontowaniu komponentu
        return () => clearInterval(botInterval);
    }, [messages, botTurn]);

    const handleScroll = (event: React.UIEvent<HTMLUListElement, UIEvent>) => {
        const element = event.currentTarget;

        // Jeśli przewinięto na górę (scrollTop == 0)
        if (element.scrollTop === 0) {
            // loadOlderMessages(); // Przykład ładowania starszych wiadomości

            // Dodanie wiadomości do początku
            const botMessage2: Message = {
                id: messages.length + 2,
                text: "Załadowano starsze wiadomości...",
                time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
                avatarUrl: 'https://i.pravatar.cc/300',
                isUser: false,
                nickname: 'BotLoader',
                readBy: [{user: 'bot2', readTime: 'dzisiaj', avatarUrl: 'https://i.pravatar.cc/300'}]
            };

            setMessages((prevMessages) => [botMessage2, ...prevMessages]);
        }

        messages.forEach(message => markMessageAsRead(message.id, currentUser)); // Zaznacz, że obecny użytkownik przeczytał wiadomość
    };

    return (
        <Box tabIndex={0} onFocus={() => console.log("uzyskano fokus")}>
            {/* Przycisk otwierający czat */}
            <IconButton
                sx={{
                    position: 'fixed',
                    bottom: 20,
                    right: 20,
                    zIndex: 22,
                }}
                onClick={() => setIsChatOpen(!isChatOpen)}
            >
                <Chat fontSize="large"/>
            </IconButton>

            {isChatOpen && (
                <Box
                    sx={{
                        position: 'fixed',
                        bottom: 0,
                        right: 20,
                        width: '1200px',
                        zIndex: 24,
                    }}
                >
                    <Paper elevation={4} sx={{height: '700px'}}>
                        <Box p={2} sx={{
                            position: 'sticky',
                            backgroundColor: 'white',
                            top: 0,
                            zIndex: 23,
                            height: '60px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <Typography variant="h6">
                                Czat gospodarstwa domowego
                            </Typography>
                            <Box>
                                <IconButton>
                                    <Fullscreen fontSize="medium"/>
                                </IconButton>
                                <IconButton>
                                    <FullscreenExit fontSize="medium"/>
                                </IconButton>
                                <IconButton>
                                    <Remove fontSize="medium"/>
                                </IconButton>
                            </Box>
                        </Box>
                        <Divider></Divider>
                        <List sx={{height: 'calc(100% - 60px)', overflowY: 'auto'}} onScroll={handleScroll}>
                            {messages.map((message, index) => (
                                <ListItem key={message.id}
                                          sx={{
                                              justifyContent: message.isUser ? 'flex-end' : 'flex-start',
                                              alignItems: 'flex-end',
                                              pt: 0,
                                              pb: 0,
                                              pl: !message.isUser && shouldDisplayTime(index) ? '15px' : '65px'
                                          }}>

                                    {!message.isUser && shouldDisplayTime(index) && (
                                        <Avatar src={message.avatarUrl} sx={{marginRight: '10px', mb: '39px'}}/>
                                    )}
                                    <Box sx={{
                                        marginRight: message.isUser ? '0' : '10px',
                                        width: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: message.isUser ? 'flex-end' : 'flex-start',
                                    }}>
                                        {shouldDisplayNickname(index) && !message.isUser && (
                                            <Typography variant="caption" color="textSecondary"
                                                        sx={{fontWeight: 'bold'}}>
                                                {message.nickname}
                                            </Typography>
                                        )}
                                        <Box sx={{
                                            maxWidth: '80%',
                                            marginLeft: message.isUser ? '10px' : '0'
                                        }}>
                                            <ListItemText
                                                primary={message.text}
                                                sx={{
                                                    textAlign: 'left',
                                                    borderRadius: '10px',
                                                    padding: '5px 10px',
                                                    whiteSpace: 'normal',
                                                    border: '1px solid',
                                                    borderColor: '#ccc',
                                                    marginBottom: '0px',
                                                    mt: '2px'
                                                }}
                                            />
                                            {shouldDisplayTime(index) && (
                                                <Box
                                                    sx={{
                                                        width: '100%',
                                                        textAlign: message.isUser ? 'left' : 'right',
                                                        paddingRight: message.isUser ? '0px' : '3px',
                                                        paddingLeft: message.isUser ? '3px' : '0px',
                                                        mb: '15px'
                                                    }}
                                                >
                                                    <Typography variant="caption" color="textSecondary"
                                                                sx={{fontWeight: 'bold'}}>
                                                        {message.time}
                                                    </Typography>
                                                </Box>
                                            )}
                                        </Box>
                                    </Box>
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'flex-end',
                                    }}>

                                        {message.readBy?.filter(reader => reader.user !== currentUser).filter(reader => lastReadByUser[reader.user] === message.id).map(reader => (
                                            <Avatar
                                                key={reader.user}
                                                src={reader.avatarUrl}
                                                title={reader.readTime}
                                                sx={{width: 24, height: 24}}
                                            />
                                        ))}
                                    </Box>
                                </ListItem>
                            ))}
                        </List>
                    </Paper>

                    <Box sx={{
                        display: 'flex',
                        padding: '10px',
                        backgroundColor: 'white',
                        borderTop: '1px solid #ccc',
                        zIndex: 23,
                    }}>
                        <TextField
                            variant="outlined"
                            size="small"
                            placeholder="Wpisz wiadomość..."
                            fullWidth
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{marginLeft: 1}}
                            onClick={handleSend}
                        >
                            <Send/>
                        </Button>
                    </Box>
                </Box>
            )}
        </Box>
    );
}

function App() {
    return <ChatOverlay/>;
}

export default App;
