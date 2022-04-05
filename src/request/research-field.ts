import { HEROKU_URL } from "../globals";

export async function fetchResearchFields(): Promise<Array<ResearchField>> {
    const response = await fetch(HEROKU_URL + '/rest/research-fields',
    {
        method: 'GET',
    });
    return response.json();
}

export async function createResearchField(name: string): Promise<void> {
    await fetch(`${HEROKU_URL}/rest/research-field`, {
        method: 'POST',
        body: JSON.stringify({ name }),
    });
}

export async function deleteResearchField(id: string): Promise<void> {
    await fetch(`${HEROKU_URL}/rest/research-fields?id=${id}`, {
        method: 'DELETE',
    });
}