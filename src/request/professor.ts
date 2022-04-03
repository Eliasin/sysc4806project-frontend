import { HEROKU_URL } from "../globals";

export async function editProfessorName(id: string, newName: string): Promise<void> {    
    await fetch(HEROKU_URL + '/rest/professor?prof_id=' + id, {
        method: 'PUT',
        body: JSON.stringify({ name: newName }),
    });
}

export async function fetchProfessor(id: string): Promise<Professor> {
    const response = await fetch(HEROKU_URL + '/rest/professor?id=' + id,
    {
        method: 'GET',
    });
    return response.json();
}

export async function fetchProfessorResearchFields(id: string): Promise<Array<ResearchField>> {
    const response = await fetch(HEROKU_URL + '/rest/professor/research-field?prof_id=' + id,
    {
        method: 'GET',
    });
    return response.json();
}

export async function removeProfessorResearchField(professorId: string, researchFieldId: number) {
    const response = await fetch(HEROKU_URL + '/rest/professor/research-field?prof_id=' + professorId + '&field_id=' + researchFieldId,
    {
        method: 'DELETE',
    });
}
export async function deleteProfessor(id: string): Promise<void> {
    const response = await fetch(HEROKU_URL + '/rest/professor?id=' + id,
    {
        method: 'DELETE',
    });
}

export async function fetchProfessors(): Promise<Array<Professor>> {
    const response = await fetch(HEROKU_URL + '/rest/professors',
    {
        method: 'GET',
    });
    return response.json();
}

export async function createProfessor(name: string) {
    await fetch(HEROKU_URL + '/rest/professor', {
        method: 'POST',
        body: JSON.stringify({
            name,
        }),
    });
}