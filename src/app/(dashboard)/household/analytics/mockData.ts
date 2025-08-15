// Dane przykładowe dla komponentu analytics

export const settlementsData = {
    optimized: [
        {
            id: 1,
            from: "Kasia",
            to: "Piotr",
            amount: "250,17 zł",
            status: "pending",
            receipts: [
                {id: 'P001', description: 'Shell - tankowanie', amount: '295,60 zł', date: '2024-02-01'},
                {id: 'P008', description: 'Pub "Złoty Lew" - wieczór', amount: '125,50 zł', date: '2024-01-28'}
            ]
        },
        {
            id: 2,
            from: "Anna",
            to: "Piotr",
            amount: "24,53 zł",
            status: "pending",
            receipts: [
                {id: 'P015', description: 'H&M - koszulki', amount: '89,99 zł', date: '2024-01-18'}
            ]
        }
    ],
    all: [
        {
            id: 1,
            from: "Kasia",
            to: "Anna",
            amount: "137,33 zł",
            reason: "Żywność - wspólne zakupy",
            status: "pending",
            receipts: [
                {id: 'R001', description: 'Biedronka - zakupy tygodniowe', amount: '245,30 zł', date: '2024-01-15'},
                {id: 'R001', description: 'Biedronka - zakupy tygodniowe', amount: '245,30 zł', date: '2024-01-15'},
                {id: 'R001', description: 'Biedronka - zakupy tygodniowe', amount: '245,30 zł', date: '2024-01-15'},
                {id: 'R001', description: 'Biedronka - zakupy tygodniowe', amount: '245,30 zł', date: '2024-01-15'},
                {id: 'R001', description: 'Biedronka - zakupy tygodniowe', amount: '245,30 zł', date: '2024-01-15'},
                {id: 'R001', description: 'Biedronka - zakupy tygodniowe', amount: '245,30 zł', date: '2024-01-15'},
                {id: 'R001', description: 'Biedronka - zakupy tygodniowe', amount: '245,30 zł', date: '2024-01-15'},
                {id: 'R001', description: 'Biedronka - zakupy tygodniowe', amount: '245,30 zł', date: '2024-01-15'},
                {id: 'R001', description: 'Biedronka - zakupy tygodniowe', amount: '245,30 zł', date: '2024-01-15'},
                {id: 'R006', description: 'Lidl - owoce i nabiał', amount: '95,40 zł', date: '2024-02-05'}
            ]
        },
        {
            id: 2,
            from: "Kasia",
            to: "Piotr",
            amount: "162,84 zł",
            reason: "Rozrywka - wspólne wyjścia",
            status: "pending",
            receipts: [
                {id: 'P008', description: 'Pub "Złoty Lew" - wieczór', amount: '125,50 zł', date: '2024-01-28'},
                {id: 'P010', description: 'Bowling - gra z przyjaciółmi', amount: '85,30 zł', date: '2024-02-08'}
            ]
        },
        {
            id: 3,
            from: "Anna",
            to: "Piotr",
            amount: "87,33 zł",
            reason: "Transport - wspólne przejazdy",
            status: "settled",
            receipts: [
                {id: 'P003', description: 'Bolt - przejazd na lotnisko', amount: '78,40 zł', date: '2024-02-10'},
                {id: 'P002', description: 'Uber - przejazd do centrum', amount: '35,80 zł', date: '2024-01-25'}
            ]
        },
        {
            id: 35,
            from: "Anna",
            to: "Piotr",
            amount: "87,33 zł",
            reason: "Transport - wspólne przejazdy",
            status: "settled",
            receipts: [
                {id: 'P003', description: 'Bolt - przejazd na lotnisko', amount: '78,40 zł', date: '2024-02-10'},
                {id: 'P002', description: 'Uber - przejazd do centrum', amount: '35,80 zł', date: '2024-01-25'}
            ]
        },
        {
            id: 12,
            from: "Anna",
            to: "Piotr",
            amount: "87,33 zł",
            reason: "Transport - wspólne przejazdy",
            status: "settled",
            receipts: [
                {id: 'P003', description: 'Bolt - przejazd na lotnisko', amount: '78,40 zł', date: '2024-02-10'},
                {id: 'P002', description: 'Uber - przejazd do centrum', amount: '35,80 zł', date: '2024-01-25'}
            ]
        },
        {
            id: 13,
            from: "Anna",
            to: "Piotr",
            amount: "87,33 zł",
            reason: "Transport - wspólne przejazdy",
            status: "settled",
            receipts: [
                {id: 'P003', description: 'Bolt - przejazd na lotnisko', amount: '78,40 zł', date: '2024-02-10'},
                {id: 'P002', description: 'Uber - przejazd do centrum', amount: '35,80 zł', date: '2024-01-25'}
            ]
        },
        {
            id: 4,
            from: "Kasia",
            to: "Anna",
            amount: "45,20 zł",
            reason: "Rachunki - prąd",
            status: "pending",
            receipts: [
                {id: 'R016', description: 'Prąd - PGE', amount: '145,30 zł', date: '2024-01-15'}
            ]
        },
        {
            id: 5,
            from: "Anna",
            to: "Piotr",
            amount: "62,40 zł",
            reason: "Odzież - wspólne zakupy",
            status: "settled",
            receipts: [
                {id: 'P015', description: 'H&M - koszulki', amount: '89,99 zł', date: '2024-01-18'},
                {id: 'P017', description: 'Zalando - kurtka', amount: '89,99 zł', date: '2024-02-08'}
            ]
        }
    ]
};

export const cardsData = [
    {
        title: "Całkowite wydatki",
        value: "4250,67 zł",
        change: "+12% od poprzedniego miesiąca",
        changeType: "increase",
        color: "#dc3545"
    },
    {
        title: "Całkowite przychody",
        value: "5800,00 zł",
        change: "+5% od poprzedniego miesiąca",
        changeType: "increase",
        color: "#28a745"
    },
    {
        title: "Największa kategoria",
        value: "Żywność",
        subtitle: "1250,90 zł w tym miesiącu",
        color: "#6c757d"
    },
    {
        title: "Nieuregulowane paragony",
        value: "3",
        subtitle: "Wymagają uwagi",
        color: "#fd7e14"
    },
    {
        title: "Rozliczenia",
        value: "2",
        subtitle: "Do rozliczenia",
        color: "#007bff"
    }
];

// Nowe dane statystyk rozliczeń
export const settlementsStatsData = [
    {
        title: "Wszystkie rozliczenia",
        value: "5",
        subtitle: "Łącznie w systemie",
        color: "#007bff",
        icon: "Assessment"
    },
    {
        title: "Oczekujące",
        value: "2",
        subtitle: "Do rozliczenia",
        color: "#856404",
        icon: "Schedule"
    },
    {
        title: "Rozliczone",
        value: "3",
        subtitle: "Zakończone",
        color: "#28a745",
        icon: "CheckCircle"
    },
    {
        title: "Do rozliczenia",
        value: "387,50 zł",
        subtitle: "Łączna kwota",
        color: "#28a745",
        icon: "Euro"
    }
];

export const budgetData = [
    {
        category: "Żywność",
        planned: "1200,00 zł",
        actual: "1250,50 zł",
        percentage: 104,
        status: "exceeded"
    },
    {
        category: "Transport",
        planned: "800,00 zł",
        actual: "850,30 zł",
        percentage: 106,
        status: "exceeded"
    },
    {
        category: "Rozrywka",
        planned: "700,00 zł",
        actual: "650,20 zł",
        percentage: 93,
        status: "normal"
    }
];

export const householdData = [
    {
        name: "Anna",
        spent: "2100,50 zł",
        should: "2125,00 zł",
        balance: "-24,50 zł",
        type: "negative",
        categories: {
            "Żywność": {
                amount: "850,30 zł",
                color: "#28a745",
                products: [
                    {
                        id: 1,
                        date: '2024-01-15',
                        description: 'Biedronka - zakupy tygodniowe',
                        amount: '245,30 zł',
                        receiptId: 'R001'
                    },
                    {
                        id: 2,
                        date: '2024-01-18',
                        description: 'Piekarnia - chleb i bułki',
                        amount: '28,50 zł',
                        receiptId: 'R002'
                    },
                    {
                        id: 3,
                        date: '2024-01-20',
                        description: 'Kaufland - mięso i warzywa',
                        amount: '156,80 zł',
                        receiptId: 'R003'
                    },
                    {
                        id: 4,
                        date: '2024-01-25',
                        description: 'Żabka - przekąski',
                        amount: '45,20 zł',
                        receiptId: 'R004'
                    },
                    {
                        id: 5,
                        date: '2024-01-28',
                        description: 'Restauracja "U Marka"',
                        amount: '185,60 zł',
                        receiptId: 'R005'
                    },
                    {
                        id: 6,
                        date: '2024-02-05',
                        description: 'Lidl - owoce i nabiał',
                        amount: '95,40 zł',
                        receiptId: 'R006'
                    },
                    {id: 7, date: '2024-02-08', description: 'McDonald\'s', amount: '42,80 zł', receiptId: 'R007'},
                    {
                        id: 8,
                        date: '2024-02-10',
                        description: 'Auchan - zakupy miesięczne',
                        amount: '50,30 zł',
                        receiptId: 'R008'
                    }
                ]
            },
            "Transport": {
                amount: "420,80 zł",
                color: "#007bff",
                products: [
                    {
                        id: 9,
                        date: '2024-01-15',
                        description: 'Tankowanie BP',
                        amount: '280,50 zł',
                        receiptId: 'R009'
                    },
                    {
                        id: 10,
                        date: '2024-01-20',
                        description: 'Bilet miesięczny MPK',
                        amount: '120,00 zł',
                        receiptId: 'R010'
                    },
                    {
                        id: 11,
                        date: '2024-02-05',
                        description: 'Parking w centrum',
                        amount: '20,30 zł',
                        receiptId: 'R011'
                    }
                ]
            },
            "Rozrywka": {
                amount: "320,40 zł",
                color: "#ffc107",
                products: [
                    {
                        id: 12,
                        date: '2024-01-16',
                        description: 'Cinema City - bilety',
                        amount: '65,00 zł',
                        receiptId: 'R012'
                    },
                    {
                        id: 13,
                        date: '2024-01-22',
                        description: 'Netflix - abonament',
                        amount: '43,99 zł',
                        receiptId: 'R013'
                    },
                    {
                        id: 14,
                        date: '2024-02-12',
                        description: 'Teatr Wielki - spektakl',
                        amount: '180,00 zł',
                        receiptId: 'R014'
                    },
                    {
                        id: 15,
                        date: '2024-02-22',
                        description: 'Klub fitness - karnet',
                        amount: '31,41 zł',
                        receiptId: 'R015'
                    }
                ]
            },
            "Rachunki": {
                amount: "289,50 zł",
                color: "#dc3545",
                products: [
                    {id: 16, date: '2024-01-15', description: 'Prąd - PGE', amount: '145,30 zł', receiptId: 'R016'},
                    {
                        id: 17,
                        date: '2024-02-01',
                        description: 'Telefon - Play',
                        amount: '65,00 zł',
                        receiptId: 'R017'
                    },
                    {id: 18, date: '2024-02-05', description: 'Woda - MPWiK', amount: '79,20 zł', receiptId: 'R018'}
                ]
            },
            "Inne": {
                amount: "219,50 zł",
                color: "#6c757d",
                products: [
                    {
                        id: 19,
                        date: '2024-01-20',
                        description: 'Apteka - leki',
                        amount: '45,80 zł',
                        receiptId: 'R019'
                    },
                    {id: 20, date: '2024-01-25', description: 'Fryzjer', amount: '85,00 zł', receiptId: 'R020'},
                    {
                        id: 21,
                        date: '2024-02-05',
                        description: 'Rossmann - kosmetyki',
                        amount: '67,45 zł',
                        receiptId: 'R021'
                    },
                    {
                        id: 22,
                        date: '2024-02-15',
                        description: 'Opłata za pakiet',
                        amount: '21,25 zł',
                        receiptId: 'R022'
                    }
                ]
            }
        },
        receipts: [
            {
                id: 'R001',
                date: '2024-01-15',
                shop: 'Biedronka',
                total: '245,30 zł',
                products: ['Mleko 3,5%', 'Chleb pszenny', 'Masło', 'Jajka', 'Banany', 'Pomidory', 'Kurczak']
            },
            {
                id: 'R002',
                date: '2024-01-18',
                shop: 'Piekarnia',
                total: '28,50 zł',
                products: ['Chleb żytni', 'Bułki kajzerki', 'Rogalik']
            },
            {
                id: 'R003',
                date: '2024-01-20',
                shop: 'Kaufland',
                total: '156,80 zł',
                products: ['Wołowina 0,5kg', 'Marchew', 'Ziemniaki 2kg', 'Cebula', 'Papryka']
            },
            {
                id: 'R009',
                date: '2024-01-15',
                shop: 'BP Station',
                total: '280,50 zł',
                products: ['Benzyna 95 - 45L']
            },
            {
                id: 'R012',
                date: '2024-01-16',
                shop: 'Cinema City',
                total: '65,00 zł',
                products: ['Bilet normalny x2', 'Popcorn średni']
            }
        ]
    },
    {
        name: "Piotr",
        spent: "1850,30 zł",
        should: "2125,00 zł",
        balance: "+274,70 zł",
        type: "positive",
        categories: {
            "Transport": {
                amount: "650,40 zł",
                color: "#007bff",
                products: [
                    {
                        id: 1,
                        date: '2024-02-01',
                        description: 'Shell - tankowanie',
                        amount: '295,60 zł',
                        receiptId: 'P001'
                    },
                    {
                        id: 2,
                        date: '2024-01-25',
                        description: 'Uber - przejazd do centrum',
                        amount: '35,80 zł',
                        receiptId: 'P002'
                    },
                    {
                        id: 3,
                        date: '2024-02-10',
                        description: 'Bolt - przejazd na lotnisko',
                        amount: '78,40 zł',
                        receiptId: 'P003'
                    },
                    {
                        id: 4,
                        date: '2024-02-15',
                        description: 'Myjnia samochodowa',
                        amount: '15,00 zł',
                        receiptId: 'P004'
                    },
                    {
                        id: 5,
                        date: '2024-02-20',
                        description: 'Parking centrum handlowe',
                        amount: '25,60 zł',
                        receiptId: 'P005'
                    },
                    {
                        id: 6,
                        date: '2024-02-25',
                        description: 'Autostrady - opłaty',
                        amount: '45,00 zł',
                        receiptId: 'P006'
                    },
                    {
                        id: 7,
                        date: '2024-02-28',
                        description: 'Serwis samochodowy',
                        amount: '155,00 zł',
                        receiptId: 'P007'
                    }
                ]
            },
            "Rozrywka": {
                amount: "580,90 zł",
                color: "#ffc107",
                products: [
                    {
                        id: 8,
                        date: '2024-01-28',
                        description: 'Pub "Złoty Lew" - wieczór',
                        amount: '125,50 zł',
                        receiptId: 'P008'
                    },
                    {
                        id: 9,
                        date: '2024-02-03',
                        description: 'Spotify Premium',
                        amount: '19,99 zł',
                        receiptId: 'P009'
                    },
                    {
                        id: 10,
                        date: '2024-02-08',
                        description: 'Bowling - gra z przyjaciółmi',
                        amount: '85,30 zł',
                        receiptId: 'P010'
                    },
                    {
                        id: 11,
                        date: '2024-02-18',
                        description: 'Steam - gry komputerowe',
                        amount: '89,99 zł',
                        receiptId: 'P011'
                    },
                    {
                        id: 12,
                        date: '2024-02-22',
                        description: 'PlayStation Store',
                        amount: '120,00 zł',
                        receiptId: 'P012'
                    },
                    {
                        id: 13,
                        date: '2024-02-25',
                        description: 'Kino IMAX - premiera',
                        amount: '85,00 zł',
                        receiptId: 'P013'
                    },
                    {
                        id: 14,
                        date: '2024-02-28',
                        description: 'Koncert w Tauron Arena',
                        amount: '55,12 zł',
                        receiptId: 'P014'
                    }
                ]
            },
            "Odzież": {
                amount: "415,20 zł",
                color: "#6f42c1",
                products: [
                    {
                        id: 15,
                        date: '2024-01-18',
                        description: 'H&M - koszulki',
                        amount: '89,99 zł',
                        receiptId: 'P015'
                    },
                    {
                        id: 16,
                        date: '2024-01-25',
                        description: 'CCC - buty zimowe',
                        amount: '159,00 zł',
                        receiptId: 'P016'
                    },
                    {
                        id: 17,
                        date: '2024-02-08',
                        description: 'Zalando - kurtka',
                        amount: '89,99 zł',
                        receiptId: 'P017'
                    },
                    {
                        id: 18,
                        date: '2024-02-15',
                        description: 'Decathlon - odzież sportowa',
                        amount: '76,22 zł',
                        receiptId: 'P018'
                    }
                ]
            },
            "Rachunki": {
                amount: "203,80 zł",
                color: "#dc3545",
                products: [
                    {
                        id: 19,
                        date: '2024-01-20',
                        description: 'Internet - Orange',
                        amount: '89,00 zł',
                        receiptId: 'P019'
                    },
                    {id: 20, date: '2024-01-25', description: 'Gaz - PGNiG', amount: '95,60 zł', receiptId: 'P020'},
                    {
                        id: 21,
                        date: '2024-02-10',
                        description: 'Ubezpieczenie OC',
                        amount: '19,20 zł',
                        receiptId: 'P021'
                    }
                ]
            }
        },
        receipts: [
            {
                id: 'P001',
                date: '2024-02-01',
                shop: 'Shell',
                total: '295,60 zł',
                products: ['Benzyna 98 - 42L', 'Płyn do spryskiwaczy']
            },
            {
                id: 'P008',
                date: '2024-01-28',
                shop: 'Pub Złoty Lew',
                total: '125,50 zł',
                products: ['Piwo Żywiec x4', 'Kiełbaski z grilla', 'Frytki']
            },
            {
                id: 'P015',
                date: '2024-01-18',
                shop: 'H&M',
                total: '89,99 zł',
                products: ['T-shirt basic x2', 'Skarpety x3']
            },
            {id: 'P016', date: '2024-01-25', shop: 'CCC', total: '159,00 zł', products: ['Buty zimowe Nike']}
        ]
    },
    {
        name: "Kasia",
        spent: "1825,13 zł",
        should: "2125,00 zł",
        balance: "-299,87 zł",
        type: "negative",
        categories: {
            "Żywność": {
                amount: "520,60 zł",
                color: "#28a745",
                products: [
                    {
                        id: 1,
                        date: '2024-01-30',
                        description: 'Tesco - artykuły spożywcze',
                        amount: '289,50 zł',
                        receiptId: 'K001'
                    },
                    {id: 2, date: '2024-02-02', description: 'Bar mleczny', amount: '35,00 zł', receiptId: 'K002'},
                    {
                        id: 3,
                        date: '2024-02-10',
                        description: 'Auchan - zakupy miesięczne',
                        amount: '76,60 zł',
                        receiptId: 'K003'
                    },
                    {
                        id: 4,
                        date: '2024-02-15',
                        description: 'Delikatesy - produkty bio',
                        amount: '89,50 zł',
                        receiptId: 'K004'
                    },
                    {
                        id: 5,
                        date: '2024-02-20',
                        description: 'Kawiarnia - lunch',
                        amount: '30,00 zł',
                        receiptId: 'K005'
                    }
                ]
            },
            "Odzież": {
                amount: "480,15 zł",
                color: "#6f42c1",
                products: [
                    {
                        id: 6,
                        date: '2024-02-02',
                        description: 'Reserved - spodnie',
                        amount: '125,50 zł',
                        receiptId: 'K006'
                    },
                    {
                        id: 7,
                        date: '2024-02-08',
                        description: 'Zara - bluzka',
                        amount: '89,99 zł',
                        receiptId: 'K007'
                    },
                    {
                        id: 8,
                        date: '2024-02-12',
                        description: 'Pull&Bear - sukienka',
                        amount: '149,99 zł',
                        receiptId: 'K008'
                    },
                    {
                        id: 9,
                        date: '2024-02-18',
                        description: 'Stradivarius - dodatki',
                        amount: '67,45 zł',
                        receiptId: 'K009'
                    },
                    {
                        id: 10,
                        date: '2024-02-25',
                        description: 'House - kurtka przejściowa',
                        amount: '47,22 zł',
                        receiptId: 'K010'
                    }
                ]
            },
            "Rozrywka": {
                amount: "289,90 zł",
                color: "#ffc107",
                products: [
                    {
                        id: 11,
                        date: '2024-02-05',
                        description: 'SPA - dzień relaksu',
                        amount: '180,00 zł',
                        receiptId: 'K011'
                    },
                    {
                        id: 12,
                        date: '2024-02-12',
                        description: 'Książki - empik',
                        amount: '45,90 zł',
                        receiptId: 'K012'
                    },
                    {
                        id: 13,
                        date: '2024-02-20',
                        description: 'Kino - film z przyjaciółkami',
                        amount: '32,00 zł',
                        receiptId: 'K013'
                    },
                    {id: 14, date: '2024-02-25', description: 'Escape room', amount: '32,00 zł', receiptId: 'K014'}
                ]
            },
            "Inne": {
                amount: "534,48 zł",
                color: "#6c757d",
                products: [
                    {
                        id: 15,
                        date: '2024-02-01',
                        description: 'Prezent urodzinowy',
                        amount: '120,00 zł',
                        receiptId: 'K015'
                    },
                    {
                        id: 16,
                        date: '2024-02-10',
                        description: 'Lekarz prywatny',
                        amount: '200,00 zł',
                        receiptId: 'K016'
                    },
                    {
                        id: 17,
                        date: '2024-02-15',
                        description: 'Dentista - przegląd',
                        amount: '150,00 zł',
                        receiptId: 'K017'
                    },
                    {
                        id: 18,
                        date: '2024-02-20',
                        description: 'Kurs języka angielskiego',
                        amount: '64,48 zł',
                        receiptId: 'K018'
                    }
                ]
            }
        },
        receipts: [
            {
                id: 'K001',
                date: '2024-01-30',
                shop: 'Tesco',
                total: '289,50 zł',
                products: ['Ryż basmati', 'Oliwa z oliwek', 'Ser pleśniowy', 'Wino białe', 'Orzechy włoskie']
            },
            {
                id: 'K006',
                date: '2024-02-02',
                shop: 'Reserved',
                total: '125,50 zł',
                products: ['Spodnie eleganckie', 'Pasek skórzany']
            },
            {
                id: 'K011',
                date: '2024-02-05',
                shop: 'SPA Relax',
                total: '180,00 zł',
                products: ['Masaż relaksacyjny 60min', 'Sauna']
            },
            {id: 'K015', date: '2024-02-01', shop: 'Jubiler', total: '120,00 zł', products: ['Naszyjnik srebrny']}
        ]
    }
];

export const categoriesData = [
    {
        name: "Żywność",
        amount: "1250,90 zł",
        percentage: 29.4,
        color: "#28a745",
        products: [
            {id: 1, date: '2024-01-15', description: 'Biedronka - zakupy tygodniowe', amount: '245,30 zł'},
            {id: 2, date: '2024-01-18', description: 'Piekarnia - chleb i bułki', amount: '28,50 zł'},
            {id: 3, date: '2024-01-20', description: 'Kaufland - mięso i warzywa', amount: '156,80 zł'},
            {id: 4, date: '2024-01-25', description: 'Żabka - przekąski', amount: '45,20 zł'},
            {id: 5, date: '2024-01-28', description: 'Restauracja "U Marka"', amount: '185,60 zł'},
            {id: 6, date: '2024-01-30', description: 'Tesco - artykuły spożywcze', amount: '289,50 zł'},
            {id: 7, date: '2024-02-02', description: 'Bar mleczny', amount: '35,00 zł'},
            {id: 8, date: '2024-02-05', description: 'Lidl - owoce i nabiał', amount: '95,40 zł'},
            {id: 9, date: '2024-02-08', description: 'McDonald\'s', amount: '42,80 zł'},
            {id: 10, date: '2024-02-10', description: 'Auchan - zakupy miesięczne', amount: '126,90 zł'}
        ]
    },
    {
        name: "Transport",
        amount: "850,30 zł",
        percentage: 20.0,
        color: "#007bff",
        products: [
            {id: 1, date: '2024-01-15', description: 'Tankowanie BP', amount: '280,50 zł'},
            {id: 2, date: '2024-01-20', description: 'Bilet miesięczny MPK', amount: '120,00 zł'},
            {id: 3, date: '2024-01-25', description: 'Uber - przejazd do centrum', amount: '35,80 zł'},
            {id: 4, date: '2024-02-01', description: 'Shell - tankowanie', amount: '295,60 zł'},
            {id: 5, date: '2024-02-05', description: 'Parking w centrum', amount: '25,00 zł'},
            {id: 6, date: '2024-02-10', description: 'Bolt - przejazd na lotnisko', amount: '78,40 zł'},
            {id: 7, date: '2024-02-15', description: 'Myjnia samochodowa', amount: '15,00 zł'}
        ]
    },
    {
        name: "Rozrywka",
        amount: "650,20 zł",
        percentage: 15.3,
        color: "#ffc107",
        products: [
            {id: 1, date: '2024-01-16', description: 'Cinema City - bilety', amount: '65,00 zł'},
            {id: 2, date: '2024-01-22', description: 'Netflix - abonament', amount: '43,99 zł'},
            {id: 3, date: '2024-01-28', description: 'Pub "Złoty Lew" - wieczór', amount: '125,50 zł'},
            {id: 4, date: '2024-02-03', description: 'Spotify Premium', amount: '19,99 zł'},
            {id: 5, date: '2024-02-08', description: 'Bowling - gra z przyjaciółmi', amount: '85,30 zł'},
            {id: 6, date: '2024-02-12', description: 'Teatr Wielki - spektakl', amount: '180,00 zł'},
            {id: 7, date: '2024-02-18', description: 'Steam - gry komputerowe', amount: '89,99 zł'},
            {id: 8, date: '2024-02-22', description: 'Klub fitness - karnet', amount: '40,43 zł'}
        ]
    },
    {
        name: "Rachunki",
        amount: "620,45 zł",
        percentage: 14.6,
        color: "#dc3545",
        products: [
            {id: 1, date: '2024-01-15', description: 'Prąd - PGE', amount: '145,30 zł'},
            {id: 2, date: '2024-01-20', description: 'Internet - Orange', amount: '89,00 zł'},
            {id: 3, date: '2024-01-25', description: 'Gaz - PGNiG', amount: '95,60 zł'},
            {id: 4, date: '2024-02-01', description: 'Telefon - Play', amount: '65,00 zł'},
            {id: 5, date: '2024-02-05', description: 'Woda - MPWiK', amount: '78,25 zł'},
            {id: 6, date: '2024-02-10', description: 'Ubezpieczenie OC', amount: '147,30 zł'}
        ]
    },
    {
        name: "Odzież",
        amount: "480,15 zł",
        percentage: 11.3,
        color: "#6f42c1",
        products: [
            {id: 1, date: '2024-01-18', description: 'H&M - koszulki', amount: '89,99 zł'},
            {id: 2, date: '2024-01-25', description: 'CCC - buty zimowe', amount: '159,00 zł'},
            {id: 3, date: '2024-02-02', description: 'Reserved - spodnie', amount: '125,50 zł'},
            {id: 4, date: '2024-02-08', description: 'Zalando - kurtka', amount: '89,99 zł'},
            {id: 5, date: '2024-02-15', description: 'Decathlon - odzież sportowa', amount: '15,67 zł'}
        ]
    },
    {
        name: "Inne",
        amount: "393,67 zł",
        percentage: 9.4,
        color: "#6c757d",
        products: [
            {id: 1, date: '2024-01-20', description: 'Apteka - leki', amount: '45,80 zł'},
            {id: 2, date: '2024-01-25', description: 'Fryzjer', amount: '85,00 zł'},
            {id: 3, date: '2024-02-01', description: 'Prezent urodzinowy', amount: '120,00 zł'},
            {id: 4, date: '2024-02-05', description: 'Rossmann - kosmetyki', amount: '67,45 zł'},
            {id: 5, date: '2024-02-10', description: 'Lekarz prywatny', amount: '200,00 zł'},
            {id: 6, date: '2024-02-15', description: 'Opłata za pakiet', amount: '25,42 zł'}
        ]
    }
];
