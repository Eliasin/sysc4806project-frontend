<script lang="ts">
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { editApplicant, getApplicantCVUrl, getApplicantDiplomaUrl, getApplicantGradeAuditUrl, uploadApplicantCV, uploadApplicantDiploma, uploadApplicantGradeAudit } from '../../request/applicant';
    import { applyToProfessor, removeApplication, fetchProfessorsAppliedTo, getResearchField } from '../../request/applicant';
    import { fetchProfessorResearchFields, fetchProfessors } from '../../request/professor';
    import { createOptionNoEmpty, getNone } from '../../request/util';
    import { fetchResearchFields } from '../../request/research-field';

    export let applicantId: string;
    let researchFields: Array<ResearchField> = [];
    let professors: Array<Professor> = [];
    let professorsAppliedTo: Array<Professor> = [];

    $: applicantCVUrl = getApplicantCVUrl(applicantId); 
    $: applicantDiplomaUrl = getApplicantDiplomaUrl(applicantId);
    $: applicantGradeAuditUrl = getApplicantGradeAuditUrl(applicantId);
    
    let applicantResearchFieldId: number | null = null;

    $: getResearchField(applicantId).then(researchField => applicantResearchFieldId = researchField.id);
    let validProfessors: Array<Professor> = [];

    $: getValidProfessors(professors).then(validProfs => validProfessors = validProfs);

    async function getValidProfessors(professors: Array<Professor>): Promise<Array<Professor>> {
        return professors.filter(async (professor: Professor) => {
            let researchFields = await fetchProfessorsResearchFields(professor.id);
            researchFields.forEach(async researchField => {
                if (researchField.id === applicantResearchFieldId) {
                    return professor;
                }
            });
        });
    }

    async function requestEditApplicant(e: MouseEvent) {
        e.preventDefault();

        const nameCandidate = (document.getElementById('name') as HTMLInputElement).value;
        const phoneNumberCandidate = (document.getElementById('phone_number') as HTMLInputElement).value;
        const desiredFieldIdCandidate = (document.getElementById('desired_field_id') as HTMLInputElement).value;
        const emailCandidate = (document.getElementById('email') as HTMLInputElement).value;

        const editApplicantRequest: EditApplicant = {
            id: parseInt(applicantId),
            desired_field_id: createOptionNoEmpty(desiredFieldIdCandidate),
            name: createOptionNoEmpty(nameCandidate),
            phone_number: createOptionNoEmpty(phoneNumberCandidate),
            email: createOptionNoEmpty(emailCandidate),
            cv_blob_id: getNone(),
            diploma_blob_id: getNone(),
            grade_audit_blob_id: getNone(),
        };
        
        await editApplicant(applicantId, editApplicantRequest);
    
        goto('/applicants/list');
    }

    async function uploadFiles(e: MouseEvent) {
        e.preventDefault();
 
        const cvFile = document.getElementById('cv-file') as HTMLInputElement;
        if(cvFile.files.length) {
            await uploadApplicantCV(cvFile.files[0], applicantId);
        }

        const diplomaFile = document.getElementById('diploma-file') as HTMLInputElement;
        if(diplomaFile.files.length) {
            await uploadApplicantDiploma(diplomaFile.files[0], applicantId);
        }

        const gradeAuditFile = document.getElementById('grade-audit-file') as HTMLInputElement;
        if(gradeAuditFile.files.length) {
            await uploadApplicantGradeAudit(gradeAuditFile.files[0], applicantId);
        }

        window.location.reload();
    }

    onMount(async () => {
        researchFields = await fetchResearchFields();
        professors = await fetchProfessors();
        professorsAppliedTo = await fetchProfessorsAppliedTo(applicantId);
        validProfessors = await getValidProfessors(professors);
    });
</script>

<body>
    <div class="applicant-form-container">
        <form id="applicant-form">
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" class="form-control" id="name" placeholder="Enter name">
            </div>
            <div class="form-group">
                <label for="phone_number">Phone Number</label>
                <input type="text" class="form-control" id="phone_number" placeholder="Enter phone number">
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="text" class="form-control" id="email" placeholder="Enter email">
            </div>
            <div class="form-group">
                <label for="desired_field_id">Desired Field</label>
                <select class="form-control" id="desired_field_id">
                    {#each researchFields as researchField}
                    <option value={researchField.id}>{researchField.name}</option>
                    {/each}
                </select>
            </div>
            <button type="submit" class="btn btn-primary" on:click={requestEditApplicant}>Submit</button>
        </form>
        <form id="file-form">
            <input type="file" name="cv-file" id="cv-file" />
            <input type="file" name="diploma-file" id="diploma-file" />
            <input type="file" name="grade-audit-file" id="grade-audit-file" />
            <input type="button" value="Submit" on:click={uploadFiles}/>
        </form>
        <div class="applicant-images">
            <img alt="Applicant CV" class="applicant-cv" src={applicantCVUrl}>
            <img alt="Applicant Diploma" class="applicant-diploma" src={applicantDiplomaUrl}>
            <img alt="Applicant Grade Audit" class="applicant-grade-audit" src={applicantGradeAuditUrl}>
        </div>
        <label for="apply-to-professors">Available Professors for Application</label>
            <ul id="apply-to-professors">
                {#each validProfessors as professor}
                <li>
                    <span>{professor.id}</span>
                    <option value={professor.id}>{professor.name}</option>
                    <button on:click={async (e) => {
                        e.preventDefault();
                        applyToProfessor(professor.id, applicantId);

                        professorsAppliedTo = await fetchProfessorsAppliedTo(applicantId);
                    }}>Apply</button>
                </li>
                {/each}
            </ul>
            <label for="applied-to-professors">Professors Applied For</label>
            <ul id="applied-to-professors">
                {#each professorsAppliedTo as professor}
                <li>
                    <span>{professor.id}</span>
                    <option value={professor.id}>{professor.name}</option>
                    <button on:click={async (e) => {
                        e.preventDefault();
                        removeApplication(professor.id, applicantId);

                        professorsAppliedTo = await fetchProfessorsAppliedTo(applicantId);
                    }}>Remove</button>
                </li>
                {/each}
            </ul>

    <style lang="scss">
        @import '../../styles/global.scss';
    </style>
</body>