<script lang="ts">
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { editProfessorName, fetchProfessor, fetchProfessorResearchFields, removeProfessorResearchField, addResearchedFieldToProfessor, fetchApplicantsForProfessor, acceptApplication, denyApplication } from '../../request/professor';
    import { fetchResearchFields } from '../../request/research-field';
    import { getApplicantCVUrl, getApplicantDiplomaUrl, getApplicantGradeAuditUrl } from '../../request/applicant';

    export let professorId;

    let professor: Professor | null = null;
    let professorResearchFields: Array<ResearchField> = [];
    let researchFields: Array<ResearchField> = [];
    let pendingApplicants: Array<Applicant> = [];
    let approvedApplicants: Array<Applicant> = [];
    let rejectedApplicants: Array<Applicant> = [];

    $: professorResearchFieldIds = professorResearchFields.map(field => field.id);
    $: fieldsNotResearched = researchFields.filter(field => !professorResearchFieldIds.includes(field.id));

    async function requestEditProfessorName(e: MouseEvent) {
        e.preventDefault();

        let name = (document.getElementById('name') as HTMLInputElement).value;
        await editProfessorName(professorId, name);

        professor = await fetchProfessor(professorId);
    }

    onMount(async () => {
        professor = await fetchProfessor(professorId);
        professorResearchFields = await fetchProfessorResearchFields(professorId);
        researchFields = await fetchResearchFields();
        pendingApplicants = await fetchApplicantsForProfessor(professorId, 'PENDING');
        approvedApplicants = await fetchApplicantsForProfessor(professorId, 'ACCPETED');
        rejectedApplicants = await fetchApplicantsForProfessor(professorId, 'DENIED');
    });

    function doBack() {
        goto('/professors/list');
    }

</script>

<body>
    {#if professor !== null}
    <div>Professor: {professor.name}</div>
    {/if}
    <div class="professor-form-container">
        <form id="professor-form">
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" class="form-control" id="name" placeholder="Enter name">
            </div>
            <label for="researched-field-list">Researched Fields</label>
            <ul id="researched-field-list">
                {#each professorResearchFields as researchField}
                <li>
                    <span>{researchField.id}</span>
                    <option value={researchField.id}>{researchField.name}</option>
                    <button on:click={async (e) => {
                        e.preventDefault();
                        await removeProfessorResearchField(professorId, researchField.id)

                        professorResearchFields = await fetchProfessorResearchFields(professorId);
                    }}>Delete</button>
                </li>
                {/each}
            </ul>
            <label for="field-list">Other Fields</label>
            <ul id="field-list">
                {#each fieldsNotResearched as researchField}
                <li>
                    <span>{researchField.id}</span>
                    <option value={researchField.id}>{researchField.name}</option>
                    <button on:click={async (e) => {
                        e.preventDefault();
                        await addResearchedFieldToProfessor(professorId, researchField.id);

                        professorResearchFields = await fetchProfessorResearchFields(professorId);
                    }}>Add</button>
                </li>
                {/each}
            </ul>
            <label for="pending-application">Pending Applications</label>
            <ul id="pending-applications">
                {#each pendingApplicants as applicant}
                <li button type="button" class="collapsible">
                    <div>{applicant.name}</div>
                    <div>{applicant.email}</div>
                    <button on:click={async (e) => {
                        e.preventDefault();
                        await acceptApplication(professorId, applicant.id);

                        pendingApplicants = await fetchApplicantsForProfessor(professorId, 'PENDING');
                        approvedApplicants = await fetchApplicantsForProfessor(professorId, 'ACCEPTED');
                    }}>Approve</button>
                    <button on:click={async (e) => {
                        e.preventDefault();
                        await denyApplication(professorId, applicant.id);

                        pendingApplicants = await fetchApplicantsForProfessor(professorId, 'PENDING');
                        rejectedApplicants = await fetchApplicantsForProfessor(professorId, 'DENIED');
                    }}>Reject</button>
                </li>
                <div class="content">
                    <div>{getApplicantGradeAuditUrl(applicant.id)}</div>
                    <div>{getApplicantDiplomaUrl(applicant.id)}</div>
                    <div>{getApplicantCVUrl(applicant.id)}</div>
                </div>
                <style>
                    li {
                        background-color: #eee;
                        color: #444;
                        cursor: pointer;
                        padding: 18px;
                        width: 100%;
                        border: none;
                        text-align: left;
                        outline: none;
                        font-size: 15px;
                    }
                </style>
                {/each}
            </ul>
            <label for="approved-application">Approved Applications</label>
            <ul id="approved-applications">
                {#each approvedApplicants as applicant}
                <li button type="button" class="collapsible">{applicant.name, applicant.email}</li>
                <div class="content">
                    <div>{getApplicantGradeAuditUrl(applicant.id)}</div>
                    <div>{getApplicantDiplomaUrl(applicant.id)}</div>
                    <div>{getApplicantCVUrl(applicant.id)}</div>
                </div>
                <style>
                    li {
                        background-color: #eee;
                        color: #444;
                        cursor: pointer;
                        padding: 18px;
                        width: 100%;
                        border: none;
                        text-align: left;
                        outline: none;
                        font-size: 15px;
                    }
                </style>
                {/each}
            </ul>
            <label for="rejected-application">Rejected Applications</label>
            <ul id="rejected-applications">
                {#each rejectedApplicants as applicant}
                <li button type="button" class="collapsible">{applicant.name, applicant.email}</li>
                <div class="content">
                    <div>{getApplicantGradeAuditUrl(applicant.id)}</div>
                    <div>{getApplicantDiplomaUrl(applicant.id)}</div>
                    <div>{getApplicantCVUrl(applicant.id)}</div>
                </div>
                <style>
                    li {
                        background-color: #eee;
                        color: #444;
                        cursor: pointer;
                        padding: 18px;
                        width: 100%;
                        border: none;
                        text-align: left;
                        outline: none;
                        font-size: 15px;
                    }
                </style>
                {/each}
            </ul>
            <button class="btn btn-primary" on:click={requestEditProfessorName}>Submit</button>
        </form>
    </div>
    <button id="back-button" on:click={doBack}>Back</button>
</body>

<style>
    
</style>