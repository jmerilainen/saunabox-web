export interface Sauna {
    id: number;
    slug: string;
    title: string;
}

export function getAllSaunas() {
    const all: Sauna[] = [
        {
            id: 100,
            slug: 'westend',
            title: 'Westend',
        },
        {
            id: 101,
            slug: 'haukilahti',
            title: 'Haukilahti',
        },
        {
            id: 102,
            slug: 'toppelund',
            title: 'Toppelund',
        },
        {
            id: 103,
            slug: 'matinkyla',
            title: 'Matinkylä',
        },
    ];

    return all;
}

export function getSauna(slug: Sauna['slug']): Sauna | null {
    const saunas = getAllSaunas();

    return saunas.find(item => item.slug === slug) ?? null;
}