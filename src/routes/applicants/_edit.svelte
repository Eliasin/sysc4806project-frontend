<script lang="ts">
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { createApplicantLogin, editApplicant, fetchApplicant, getApplicantCVUrl, getApplicantDiplomaUrl, getApplicantGradeAuditUrl, uploadApplicantCV, uploadApplicantDiploma, uploadApplicantGradeAudit } from '../../request/applicant';
    import { applyToProfessor, removeApplication, fetchProfessorsAppliedTo } from '../../request/applicant';
    import { fetchProfessorResearchFields, fetchProfessors } from '../../request/professor';
    import { createOptionNoEmpty, getNone } from '../../request/util';
    import { fetchResearchFields, getResearchField } from '../../request/research-field';
    import { loginState } from '../../stores';

    export let applicantId: string;
    export let noBack: boolean = false;
    let researchFields: Array<ResearchField> = [];
    let professors: Array<Professor> = [];
    let professorsAppliedTo: Array<Professor> = [];
    let applicant: Applicant | null = null;
    let professorsNotAppliedTo: Array<Professor> = [];
    
    $: professorsNotAppliedTo = professors.filter(prof => !professorsAppliedTo.map(prof => prof.id).includes(prof.id));

    let sessionToken = null;
    $: if ($loginState.kind !== 'not-logged-in') {
        sessionToken = $loginState.token;
    }

    $: applicantCVUrl = getApplicantCVUrl(applicantId); 
    $: applicantDiplomaUrl = getApplicantDiplomaUrl(applicantId);
    $: applicantGradeAuditUrl = getApplicantGradeAuditUrl(applicantId);
    
    let applicantResearchFieldId: number | null = null;

    $: if (applicant !== null) {
            getResearchField(sessionToken, applicant.desired_field_id.toString()).then(researchField => {
            if (researchField !== null) {
                applicantResearchFieldId = researchField.id
            }
        });
    }

    let validProfessors: Array<Professor> = [];

    $: getValidProfessors().then(validProfs => validProfessors = validProfs);

    async function getValidProfessors(): Promise<Array<Professor>> {
        return professorsNotAppliedTo.filter(async (professor: Professor) => {
            let researchFields = await fetchProfessorResearchFields(sessionToken, professor.id.toString());
            researchFields.forEach(async researchField => {
                if (researchField.id === applicantResearchFieldId) {
                    return professor;
                }
            });
        });
    }

    async function requestEditApplicant() {
        const nameCandidate = (document.getElementById('name') as HTMLInputElement).value;
        const phoneNumberCandidate = (document.getElementById('phone_number') as HTMLInputElement).value;
        const desiredFieldIdCandidate = parseInt((document.getElementById('desired_field_id') as HTMLInputElement).value);
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
        
        await editApplicant(sessionToken, applicantId, editApplicantRequest);
    
        goto('/applicants/list');
    }

    async function requestCreateApplicantLogin() {
        let username = (document.getElementById('username') as HTMLInputElement).value;
        let password = (document.getElementById('password') as HTMLInputElement).value;

        await createApplicantLogin(sessionToken, applicantId, username, password);
    }

    async function uploadFiles() { 
        const cvFile = document.getElementById('cv-file') as HTMLInputElement;
        if(cvFile.files.length) {
            await uploadApplicantCV(sessionToken, cvFile.files[0], applicantId);
        }

        const diplomaFile = document.getElementById('diploma-file') as HTMLInputElement;
        if(diplomaFile.files.length) {
            await uploadApplicantDiploma(sessionToken, diplomaFile.files[0], applicantId);
        }

        const gradeAuditFile = document.getElementById('grade-audit-file') as HTMLInputElement;
        if(gradeAuditFile.files.length) {
            await uploadApplicantGradeAudit(sessionToken, gradeAuditFile.files[0], applicantId);
        }

        window.history.go(-1);
    }

    function doBack() {
        goto('/applicants/list');
    }

    onMount(async () => {
        researchFields = await fetchResearchFields(sessionToken);
        professors = await fetchProfessors(sessionToken);
        professorsAppliedTo = await fetchProfessorsAppliedTo(sessionToken, applicantId);
        validProfessors = await getValidProfessors();
        applicant = await fetchApplicant(sessionToken, applicantId);
    });
</script>

<body class="spaced-column">
    {#if !noBack}
    <button id="back-button" on:click={doBack}>Back</button>
    {/if}
    <div id="applicant-form-container">
        {#if applicant !== null}
        <div id="applicant-name">Applicant: {applicant.name}</div>
        {/if}
        <form id="applicant-form">
            <span>Modify Applicant</span>
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
                <select class="form-control dropdown" id="desired_field_id">
                    {#each researchFields as researchField}
                    <option class="form-option" value={researchField.id}>{researchField.name}</option>
                    {/each}
                </select>
            </div>
            <button type="submit" class="btn btn-primary" on:click|preventDefault={requestEditApplicant}>Submit</button>
        </form>
        {#if $loginState.kind === 'admin'}
        <div id="account-creation">
            <form id="account-creation-form" class="form-group">
                <span>Create Login For Applicant</span>
                <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" id="username" name="username" placeholder="Enter username">    
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" placeholder="Enter password">    
                </div>
                <button on:click|preventDefault={requestCreateApplicantLogin}>Create Login</button>
            </form>
        </div>
        {/if}
        <form id="file-form">
            <span>Upload Documents</span>
            <input type="file" name="cv-file" id="cv-file" />
            <a class="applicant-cv" href={applicantCVUrl} download="applicant_cv" target="_blank"><button>Download CV</button></a>
            <input type="file" name="diploma-file" id="diploma-file" />
            <a class="applicant-diploma" href={applicantDiplomaUrl} download="applicant_diploma" target="_blank"><button>Download Diploma</button></a>
            <input type="file" name="grade-audit-file" id="grade-audit-file" />
            <a class="applicant-grade-audit" href={applicantGradeAuditUrl} download="applicant_aduit" target="_blank"><button>Download Audit</button></a>
            <input type="button" value="Submit" on:click|preventDefault={uploadFiles}/>
        </form>
        <div class="labeled-list">
            <label for="apply-to-professors">Available Professors for Application</label>
            <ul id="apply-to-professors">
                {#each validProfessors as professor}
                <li class="professor-selection">
                    <option value={professor.id}>{professor.name}</option>
                    <button on:click|preventDefault={async () => {
                        await applyToProfessor(sessionToken, applicantId, professor.id.toString());

                        professorsAppliedTo = await fetchProfessorsAppliedTo(sessionToken, applicantId);
                    }}>Apply</button>
                </li>
                {/each}
            </ul>
        </div>
        <div class="labeled-list">
            <label for="applied-to-professors">Professors Applied For</label>
            <ul id="applied-to-professors">
                {#each professorsAppliedTo as professor}
                <li class="professor-selection">
                    <option value={professor.id}>{professor.name}</option>
                    <button on:click|preventDefault={async () => {
                        await removeApplication(sessionToken, applicantId, professor.id.toString());
    
                        professorsAppliedTo = await fetchProfessorsAppliedTo(sessionToken, applicantId);
                    }}>Remove</button>
                </li>
                {/each}
            </ul>
        </div>
        

    <style lang="scss">
        @import '../../styles/global.scss';
        @import '../../styles/applicant.scss';
    </style>
</body>