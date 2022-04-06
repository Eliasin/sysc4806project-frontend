import { HEROKU_URL } from '../globals';

export async function fetchApplicants(sessionToken: string): Promise<Array<Applicant>> {
    const response = await fetch(HEROKU_URL + '/rest/applicants',
    {
        method: 'GET',
        headers: {
            'X-Session-Token': sessionToken,
        }
    });
    return response.json();
}

export async function fetchApplicant(sessionToken: string, id: string): Promise<Applicant> {
    const response = await fetch(HEROKU_URL + '/rest/applicant?id=' + id,
    {
        method: 'GET',
        headers: {
            'X-Session-Token': sessionToken,
        },
    });
    return response.json();
}

export async function editApplicant(sessionToken: string, id: string, editApplicant: EditApplicant): Promise<void> {    
    await fetch(HEROKU_URL + '/rest/applicant?app_id=' + id, {
        method: 'PUT',
        body: JSON.stringify(editApplicant),
        headers: {
            'X-Session-Token': sessionToken,
        }
    }); 
}

export async function createApplicant(sessionToken: string, newApplicant: NewApplicant): Promise<void> {
    await fetch(HEROKU_URL + '/rest/applicant', {
        method: 'POST',
        body: JSON.stringify(newApplicant),
        headers: {
            'X-Session-Token': sessionToken,
        }
    });
}

export async function uploadApplicantCV(sessionToken: string, blob: Blob, applicantId: string): Promise<void> {
    await fetch(HEROKU_URL + '/rest/applicant/files/cv?applicant_id=' + applicantId,
    {
        method: 'POST',
        body: blob,
        headers: {
            'X-Session-Token': sessionToken,
        }
    }
    );
}

export async function uploadApplicantDiploma(sessionToken: string, blob: Blob, applicantId: string): Promise<void> {
    await fetch(HEROKU_URL + '/rest/applicant/files/diploma?applicant_id=' + applicantId,
    {
        method: 'POST',
        body: blob,
        headers: {
            'X-Session-Token': sessionToken,
        }
    }
    );
}

export async function uploadApplicantGradeAudit(sessionToken: string, blob: Blob, applicantId: string): Promise<void> {
    await fetch(HEROKU_URL + '/rest/applicant/files/grade-audit?applicant_id=' + applicantId,
    {
        method: 'POST',
        body: blob,
        headers: {
            'X-Session-Token': sessionToken,
        }
    }
    );
}

export async function applyToProfessor(sessionToken: string, applicantId: string, professorId: string) {
    const response = await fetch(HEROKU_URL + '/rest/applicant/applications?prof_id=' + professorId + '&applicant_id=' + applicantId,
    {
        method: 'POST',
        headers: {
            'X-Session-Token': sessionToken,
        }
    });
}

export async function removeApplication(sessionToken: string, applicantId: string, professorId: string) {
    const response = await fetch(HEROKU_URL + '/rest/applicant/applications?prof_id=' + professorId + '&applicant_id=' + applicantId,
    {
        method: 'DELETE',
        headers: {
            'X-Session-Token': sessionToken,
        }
    });
}

export async function fetchProfessorsAppliedTo(sessionToken: string, applicantId: string): Promise<Array<Professor>> {
    const response = await fetch(HEROKU_URL + '/rest/applicant/applications?applicant_id=' + applicantId,
    {
        method: 'GET',
        headers: {
            'X-Session-Token': sessionToken,
        }
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

export async function createApplicantLogin(sessionToken: string, applicantId: string, username: string, password: string): Promise<void> {
    await fetch(`${HEROKU_URL}/rest/login/applicant?applicant_id=${applicantId}`, {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: {
            'X-Session-Token': sessionToken,
        }
    });
}