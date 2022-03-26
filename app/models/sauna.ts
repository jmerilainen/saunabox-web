export interface Sauna {
    id: number;
    slug: string;
    name: string;
    location: Coordinate;
    slots: Slot[];
}

interface Coordinate {
    latitude: number;
    longitude: number;
}


export interface Slot {
    slug: string;
    from: Date;
    to: Date;
    sku: number;
    available: boolean;
}

const API_BASE_URL = process.env.API_BASE_URL;

export const api = {
    async request<R = any>(endpoint: string, options = {}): Promise<R> {
        const url  = `${API_BASE_URL}${endpoint}`;
        const result =  await fetch(url, {
            headers: {
                'Accept': 'application/json',
            },
            ...options
        });

        if (result.status === 404) {
            throw new Error(`API route [${url}] not found.`);
        }

        if (result.status !== 200) {
            throw new Error('API Error: ' + endpoint);
        }

        return result.json();
    },


    async saunas() {
        return this.request<Sauna[]>('/api/saunas');
    },

    async sauna(slug: string) {
        return this.request<Sauna>(`/api/saunas/${slug}`);
    },

    async slots(slug: string, date: string) {
        return this.request<Slot[]>(`/api/saunas/${slug}/slots/${date}`);
    },

    async reserve(data: any) {
        return this.request<any>('/api/purchase', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    }
}
