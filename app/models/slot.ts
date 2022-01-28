export interface Slot {
    id: number | string;
    time: string;
    isAvilable: boolean;
}

export function getAllSlotsForSauna(id: number = 0) {
    const all: Slot[] = [
        {
            id: 100,
            time: '09:00',
            isAvilable: true,
        },
        {
            id: 3453,
            time: '10:00',
            isAvilable: true,
        },
        {
            id: 24,
            time: '11:00',
            isAvilable: true,
        },
        {
            id: 453,
            time: '12:00',
            isAvilable: false,
        },
        {
            id: 346,
            time: '13:00',
            isAvilable: true,
        },
        {
            id: 456,
            time: '14:00',
            isAvilable: false,
        },
        {
            id: 757,
            time: '15:00',
            isAvilable: false,
        },
        {
            id: 96845,
            time: '16:00',
            isAvilable: false,
        },
        {
            id: 2048,
            time: '17:00',
            isAvilable: true,
        },
        {
            id: 3065,
            time: '18:00',
            isAvilable: true,
        },
    ];

    return all;
}