import { HEROKU_URL } from "../globals";

export async function fetchResearchFields(): Promise<Array<ResearchField>> {
    const response = await fetch(HEROKU_URL + '/rest/research-fields',
    {
        method: 'GET',
    });
    return response.json();
}