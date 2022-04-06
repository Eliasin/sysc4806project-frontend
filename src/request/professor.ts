import { HEROKU_URL } from "../globals";

export async function editProfessorName(sessionToken: string, id: string, newName: string): Promise<void> {    
    await fetch(HEROKU_URL + '/rest/professor?prof_id=' + id, {
        method: 'PUT',
        body: JSON.stringify({ name: newName }),
        headers: {
            'X-Session-Token': sessionToken,
        }
    });
}

export async function fetchProfessor(sessionToken: string, id: string): Promise<Professor> {
    const response = await fetch(HEROKU_URL + '/rest/professor?id=' + id,
    {
        method: 'GET',
        headers: {
            'X-Session-Token': sessionToken,
        }
    });
    return response.json();
}

export async function fetchProfessorResearchFields(sessionToken: string, id: string): Promise<Array<ResearchField>> {
    const response = await fetch(HEROKU_URL + '/rest/professor/research-field?prof_id=' + id,
    {
        method: 'GET',
        headers: {
            'X-Session-Token': sessionToken,
        }
    });
    return response.json();
}

export async function removeProfessorResearchField(sessionToken: string, professorId: string, researchFieldId: number) {
    const response = await fetch(HEROKU_URL + '/rest/professor/research-field?prof_id=' + professorId + '&field_id=' + researchFieldId,
    {
        method: 'DELETE',
        headers: {
            'X-Session-Token': sessionToken,
        }
    });
}

export async function addResearchedFieldToProfessor(sessionToken: string, professorId: string, researchFieldId: number) {
    const response = await fetch(HEROKU_URL + '/rest/professor/research-field?prof_id=' + professorId + '&field_id=' + researchFieldId,
    {
        method: 'POST',
        headers: {
            'X-Session-Token': sessionToken,
        }
    });
}

export async function deleteProfessor(sessionToken: string, id: string): Promise<void> {
    const response = await fetch(HEROKU_URL + '/rest/professor?id=' + id,
    {
        method: 'DELETE',
        headers: {
            'X-Session-Token': sessionToken,
        }
    });
}

export async function fetchProfessors(sessionToken: string): Promise<Array<Professor>> {
    const response = await fetch(HEROKU_URL + '/rest/professors',
    {
        method: 'GET',
        headers: {
            'X-Session-Token': sessionToken,
        }
    });
    return response.json();
}

export async function createProfessor(sessionToken: string, name: string) {
    await fetch(HEROKU_URL + '/rest/professor', {
        method: 'POST',
        body: JSON.stringify({
            name,
        }),
        headers: {
            'X-Session-Token': sessionToken,
        }
    });
}

type ApplicationStatus = 'PENDING' | 'ACCEPTED' | 'DENIED';

export async function fetchApplicantsForProfessor(sessionToken: string, professorId: number, status: ApplicationStatus): Promise<Array<Applicant>> {
    const response = await fetch(HEROKU_URL + '/rest/professor/applicants?id=' + professorId + '&status=' + status,
    {
        method: 'GET',
        headers: {
            'X-Session-Token': sessionToken,
        }
    });
    return response.json();
}

export async function acceptApplication(sessionToken: string, professorId: number, applicantId: number) {
    const response = await fetch(HEROKU_URL + '/rest/professor/application/accept?applicant_id=' + applicantId + '&professor_id=' + professorId,
    {
        method: 'POST',
        headers: {
            'X-Session-Token': sessionToken,
        }
    });
}

export async function denyApplication(sessionToken: string, professorId: number, applicantId: number) {
    const response = await fetch(HEROKU_URL + '/rest/professor/application/deny?applicant_id=' + applicantId + '&professor_id=' + professorId,
    {
        method: 'POST',
        headers: {
            'X-Session-Token': sessionToken,
        }
    });
}

export async function createProfessorLogin(sessionToken: string, professorId: string, username: string, password: string): Promise<void> {
    await fetch(`${HEROKU_URL}/rest/login/professor?professor_id=${professorId}`, {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: {
            'X-Session-Token': sessionToken,
        }
    });
}