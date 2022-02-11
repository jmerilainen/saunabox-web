export interface Sauna {
    slug: string;
    name: string;
}

export async function getAllSaunas(): Promise<Sauna[]> {
    const res = await fetch('http://localhost/api/v1/saunas');

    return await res.json();
}

export async function getSauna(slug: Sauna['slug']): Promise<Sauna | null> {
    const saunas = await getAllSaunas();

    return saunas.find(item => item.slug === slug) ?? null;
}