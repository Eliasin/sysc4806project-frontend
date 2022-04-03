<svelte:head>
    <title>SYSC4806 Project - List Applicants</title>
</svelte:head>

<script lang="ts">
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { fetchApplicants } from '../../request/applicant';
    import { fetchResearchFields } from '../../request/research-field';

    let applicants: Array<Applicant> = [];
    let researchFields: Array<ResearchField> = []; 

    function doBack() {
        goto('/applicants/');
    }

    onMount(async () => {
        applicants = await fetchApplicants();
        researchFields = await fetchResearchFields();
    });
</script>

<body>
    <div class="applicant-list-container">
        <button id="back-button" on:click={doBack}>Back</button>
        <ul id="applicant-list">
            {#each applicants as applicant}
            <li class='applicant-list-item'>
                <span>{applicant.id}</span>
                <span>{applicant.desired_field_id}</span>
                <span>{applicant.name}</span>
                <span>{applicant.phone_number}</span>
                <span>{applicant.email}</span>
                <button on:click={() => goto('/applicants/edit?id=' + applicant.id)}>Edit</button>
            </li>
            {/each}
        </ul>
    </div>

    <style lang="scss">
        @import '../../styles/global.scss';
    </style>
</body>

