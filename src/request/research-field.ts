import { HEROKU_URL } from "../globals";

export async function fetchResearchFields(sessionToken: string): Promise<Array<ResearchField>> {
    const response = await fetch(HEROKU_URL + '/rest/research-fields',
    {
        method: 'GET',
        headers: {
            'X-Session-Token': sessionToken,
        }
    });
    return response.json();
}

export async function createResearchField(sessionToken: string, name: string): Promise<void> {
    await fetch(`${HEROKU_URL}/rest/research-field`, {
        method: 'POST',
        body: JSON.stringify({ name }),
        headers: {
            'X-Session-Token': sessionToken,
        }
    });
}

export async function deleteResearchField(sessionToken: string, id: string): Promise<void> {
    await fetch(`${HEROKU_URL}/rest/research-fields?id=${id}`, {
        method: 'DELETE',
        headers: {
            'X-Session-Token': sessionToken,
        }
    });
}

export async function getResearchField(sessionToken: string, researchFieldId: string): Promise<ResearchField | null> {
    const response = await fetch(HEROKU_URL + '/rest/research-field?id=' + researchFieldId,
    {
        method: 'GET',
        headers: {
            'X-Session-Token': sessionToken,
        }
    });

    if (response.status === 200) {
        return response.json();
    }

    return null;
}