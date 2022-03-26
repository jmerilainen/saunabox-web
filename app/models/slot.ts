interface SlotOrderData {
    phone: string;
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