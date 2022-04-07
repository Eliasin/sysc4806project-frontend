<script lang="ts">
    import { goto } from '$app/navigation';
    import { loginState } from '../../stores';
    import { onMount } from 'svelte';
    import { editProfessorName, fetchProfessor, fetchProfessorResearchFields, removeProfessorResearchField, addResearchedFieldToProfessor, fetchApplicantsForProfessor, acceptApplication, denyApplication, createProfessorLogin, type ApplicantNameIdFieldEmail } from '../../request/professor';
    import { fetchResearchFields } from '../../request/research-field';
    import ApplicantFiles from './_applicant-files.svelte';
import Applicants from '../applicants.svelte';

    export let professorId: string;;
    export let noBack: boolean = false;
    let professor: Professor | null = null;
    let professorResearchFields: Array<ResearchField> = [];
    let researchFields: Array<ResearchField> = [];
    let pendingApplicants: Array<ApplicantNameIdFieldEmail> = [];
    let approvedApplicants: Array<ApplicantNameIdFieldEmail> = [];
    let rejectedApplicants: Array<ApplicantNameIdFieldEmail> = [];
    let sessionToken = null;
    $: if ($loginState.kind !== 'not-logged-in') {
        sessionToken = $loginState.token;
    }

    $: professorResearchFieldIds = professorResearchFields.map(field => field.id);
    $: fieldsNotResearched = researchFields.filter(field => !professorResearchFieldIds.includes(field.id));

    async function requestEditProfessorName(e: MouseEvent) {
        e.preventDefault();

        let name = (document.getElementById('name') as HTMLInputElement).value;
        await editProfessorName(sessionToken, professorId, name);

        professor = await fetchProfessor(sessionToken, professorId);
    }

    async function requestCreateProfessorLogin() {
        let username = (document.getElementById('username') as HTMLInputElement).value;
        let password = (document.getElementById('password') as HTMLInputElement).value;

        await createProfessorLogin(sessionToken, professorId, username, password);
    }

    onMount(async () => {
        professor = await fetchProfessor(sessionToken, professorId);
        professorResearchFields = await fetchProfessorResearchFields(sessionToken, professorId);
        researchFields = await fetchResearchFields(sessionToken);
        pendingApplicants = await fetchApplicantsForProfessor(sessionToken, professorId, 'PENDING');
        approvedApplicants = await fetchApplicantsForProfessor(sessionToken, professorId, 'ACCEPTED');
        rejectedApplicants = await fetchApplicantsForProfessor(sessionToken, professorId, 'DENIED');
    });

    function doBack() {
        goto('/professors/list');
    }

</script>

<body class="spaced-column">
    {#if !noBack}
    <button id="back-button" on:click={doBack}>Back</button>
    {/if}
    <div id="professor-form-container">
        {#if professor !== null}
        <div id="professor-name">Professor: {professor.name}</div>
        {/if}
        <div id="professor-info">
            <form id="professor-form">
                <span>Modify Professor</span>
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" class="form-control" id="name" placeholder="Enter name">
                </div>
                <button class="btn btn-primary" on:click={requestEditProfessorName}>Submit</button>
            </form>
            {#if $loginState.kind === 'admin'}
            <div id="account-creation" class="labeled-list">
                <form id="account-creation-form" class="form-group">    
                    <span>Create Login For Professor</span>
                    <div class="form-group">
                        <label for="username">Username:</label>
                        <input type="text" id="username" name="username">
                    </div>
                    <div class="form-group">
                        <label for="password">Password:</label>
                        <input type="password" id="password" name="password">
                    </div>
                    <button on:click|preventDefault={requestCreateProfessorLogin}>Create Login</button>
                </form>
                </div>
            {/if}
        </div>
        <div id="research-lists">
            <div id="researched-list" class="labeled-list">
                <label for="researched-field-list">Researched Fields</label>
                <ul id="researched-field-list">
                    {#each professorResearchFields as researchField}
                    <li>
                        <div>{researchField.name}</div>
                        <button on:click={async (e) => {
                            e.preventDefault();
                            await removeProfessorResearchField(sessionToken, professorId, researchField.id);

                            professorResearchFields = await fetchProfessorResearchFields(sessionToken, professorId);
                        }}>Delete</button>
                    </li>
                    {/each}
                </ul>
            </div>
            <div id="research-list" class="labeled-list">
                <label for="field-list">Other Fields</label>
                <ul id="field-list">
                    {#each fieldsNotResearched as researchField}
                    <li>
                        <div>{researchField.name}</div>
                        <button on:click={async (e) => {
                            e.preventDefault();
                            await addResearchedFieldToProfessor(sessionToken, professorId, researchField.id);

                            professorResearchFields = await fetchProfessorResearchFields(sessionToken, professorId);
                        }}>Add</button>
                    </li>
                    {/each}
                </ul>
            </div>
        </div>
        <div id="pending-list" class="labeled-list">
            <label for="pending-application">Pending Applications</label>
            <ul id="pending-applications">
                {#each pendingApplicants as applicant}
                <li type="button" class="collapsible">
                    <div>{applicant.name}</div>
                    <div>{applicant.email}</div>
                    <div>{applicant.desired_field}</div>
                    <div id="approval-buttons">
                        <button on:click={async (e) => {
                            e.preventDefault();
                            await acceptApplication(sessionToken, professorId, applicant.id);

                            pendingApplicants = await fetchApplicantsForProfessor(sessionToken, professorId, 'PENDING');
                            approvedApplicants = await fetchApplicantsForProfessor(sessionToken, professorId, 'ACCEPTED');
                        }}>Approve</button>
                        <button on:click={async (e) => {
                            e.preventDefault();
                            await denyApplication(sessionToken, professorId, applicant.id);

                            pendingApplicants = await fetchApplicantsForProfessor(sessionToken, professorId, 'PENDING');
                            rejectedApplicants = await fetchApplicantsForProfessor(sessionToken, professorId, 'DENIED');
                        }}>Reject</button>
                    </div>
                    <div id="applicant-downloads">
                        <ApplicantFiles applicantId={applicant.id.toString()}/>
                    </div>
                </li>
                {/each}
            </ul>
        </div>
        <div id="approved-list" class="labeled-list">
            <label for="approved-application">Approved Applications</label>
            <ul id="approved-applications">
                {#each approvedApplicants as applicant}
                <li type="button" class="collapsible">
                    <div>{applicant.name}</div>
                    <div>{applicant.email}</div>
                    <div>{applicant.desired_field}</div>
                    <div id="applicant-downloads">
                        <ApplicantFiles applicantId={applicant.id.toString()}/>
                    </div>
                </li>
                {/each}
            </ul>
        </div>
        <div id="rejected-list" class="labeled-list">
            <label for="rejected-application">Rejected Applications</label>
            <ul id="rejected-applications">
                {#each rejectedApplicants as applicant}
                <li type="button" class="collapsible">
                    <div>{applicant.name}</div>
                    <div>{applicant.email}</div>
                    <div>{applicant.desired_field}</div>
                    <div id="applicant-downloads">
                        <ApplicantFiles applicantId={applicant.id.toString()}/>
                    </div>
                </li>
                {/each}
            </ul>
        </div>
    </div>

    <style lang="scss">
        @import '../../styles/global.scss';
        @import '../../styles/professor.scss';
    </style>
</body>