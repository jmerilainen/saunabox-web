export interface Slot {
    id: number | string;
    from: Date;
    to: Date;
    stock: number;
    token: string;
}

interface SlotOrderData {
    phone: string;
}

export async function getAllSlotsForSauna(slug: string): Promise<Slot[]> {
    const res = await fetch(`http://localhost/api/v1/saunas/${slug}/slots`);

    const data = await res.json();

    return data.map((item: any) => {
        return {
            id: parseInt(item.id),
            from: new Date(item.from),
            to: new Date(item.to),
            stock: parseInt(item.stock),
        } as Slot;
    });
}

export async function orderSlot(id: number, data: SlotOrderData) {
    const res = await fetch(`http://localhost/api/v1/slots/${id}/reserve`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    return res.json();
}