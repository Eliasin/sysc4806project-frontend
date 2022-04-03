<script lang="ts">
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { editApplicant, uploadApplicantCV, uploadApplicantDiploma, uploadApplicantGradeAudit } from '../../request/applicant';
    import { createOptionNoEmpty, getNone } from '../../request/util';
    import { fetchResearchFields } from '../../request/research-field';

    let applicantId: string = $page.url.searchParams.get('id');
    let researchFields: Array<ResearchField> = [];
    page.subscribe(currentPage => { applicantId = currentPage.url.searchParams.get('id'); });

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

        let formData = new FormData();
        
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
    }

    onMount(async () => {
        researchFields = await fetchResearchFields();
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
    </div>

    <style lang="scss">
        @import '../../styles/global.scss';
    </style>
</body>