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

export async function addResearchedFieldToProfessor(professorId: string, researchFieldId: number) {
    const response = await fetch(HEROKU_URL + '/rest/professor/research-field?prof_id=' + professorId + '&field_id=' + researchFieldId,
    {
        method: 'POST',
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

type ApplicationStatus = 'PENDING' | 'ACCEPTED' | 'DENIED';

export async function fetchApplicantsForProfessor(professorId: number, status: ApplicationStatus): Promise<Array<ResearchField>> {
    const response = await fetch(HEROKU_URL + '/rest/professor/applicants?id=' + professorId + '&status=' + status,
    {
        method: 'GET',
    });
    return response.json();
}

export async function acceptApplication(professorId: number, applicantId: number) {
    const response = await fetch(HEROKU_URL + '/professor/application/accept?applicant_id=' + applicantId + '&professor_id=' + professorId,
    {
        method: 'POST',
    });
}

export async function denyApplication(professorId: number, applicantId: number) {
    const response = await fetch(HEROKU_URL + '/professor/application/deny?applicant_id=' + applicantId + '&professor_id=' + professorId,
    {
        method: 'POST',
    });
}