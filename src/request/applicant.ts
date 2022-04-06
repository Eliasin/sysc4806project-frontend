import { HEROKU_URL } from '../globals';

export async function fetchApplicants(): Promise<Array<Applicant>> {
    const response = await fetch(HEROKU_URL + '/rest/applicants',
    {
        method: 'GET',
    });
    return response.json();
}

export async function fetchApplicant(id: string): Promise<Applicant> {
    const response = await fetch(HEROKU_URL + '/rest/applicant?id=' + id,
    {
        method: 'GET',
    });
    return response.json();
}

export async function editApplicant(id: string, editApplicant: EditApplicant): Promise<void> {    
    await fetch(HEROKU_URL + '/rest/applicant?app_id=' + id, {
        method: 'PUT',
        body: JSON.stringify(editApplicant),
    }); 
}

export async function createApplicant(newApplicant: NewApplicant): Promise<void> {
    await fetch(HEROKU_URL + '/rest/applicant', {
        method: 'POST',
        body: JSON.stringify(newApplicant),
    });
}

export async function uploadApplicantCV(blob: Blob, applicantId: string): Promise<void> {
    await fetch(HEROKU_URL + '/rest/applicant/files/cv?applicant_id=' + applicantId,
    {
        method: 'POST',
        body: blob
    }
    );
}

export async function uploadApplicantDiploma(blob: Blob, applicantId: string): Promise<void> {
    await fetch(HEROKU_URL + '/rest/applicant/files/diploma?applicant_id=' + applicantId,
    {
        method: 'POST',
        body: blob
    }
    );
}

export async function uploadApplicantGradeAudit(blob: Blob, applicantId: string): Promise<void> {
    await fetch(HEROKU_URL + '/rest/applicant/files/grade-audit?applicant_id=' + applicantId,
    {
        method: 'POST',
        body: blob
    }
    );
}

export async function applyToProfessor(applicantId: string, professorId: string) {
    const response = await fetch(HEROKU_URL + '/applicant/applications?prof_id=' + professorId + '&applicant_id=' + applicantId,
    {
        method: 'POST',
    });
}

export async function removeApplication(applicantId: string, professorId: string) {
    const response = await fetch(HEROKU_URL + '/applicant/applications?prof_id=' + professorId + '&applicant_id=' + applicantId,
    {
        method: 'DELETE',
    });
}

export async function fetchProfessorsAppliedTo(applicantId: string): Promise<Array<Professor>> {
    const response = await fetch(HEROKU_URL + '/applicant/applications?applicant_id=' + applicantId,
    {
        method: 'GET',
    });
    return response.json();
}

export async function getResearchField(applicantId: string): Promise<ResearchField> {
    const response = await fetch(HEROKU_URL + '/research-field?id=' + applicantId,
    {
        method: 'GET',
    });
    return response.json();
}

export function getApplicantCVUrl(applicantId: string): string {
    return `${HEROKU_URL}/rest/applicant/files/cv?applicant_id=${applicantId}`;
}

export function getApplicantDiplomaUrl(applicantId: string): string {
    return `${HEROKU_URL}/rest/applicant/files/diploma?applicant_id=${applicantId}`;
}

export function getApplicantGradeAuditUrl(applicantId: string): string {
    return `${HEROKU_URL}/rest/applicant/files/grade-audit?applicant_id=${applicantId}`;
}