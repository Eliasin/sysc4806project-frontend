<svelte:head>
    <title>SYSC4806 Project - List Applicants</title>
</svelte:head>

<script lang="ts">
    import { goto } from '$app/navigation';
    import { loginState } from '../../stores';
    import { onMount } from 'svelte';
    import { fetchApplicants } from '../../request/applicant';
    import { fetchResearchFields } from '../../request/research-field';

    let applicants: Array<Applicant> = [];
    let researchFields: Array<ResearchField> = []; 

    let sessionToken = null;
    $: if ($loginState.kind !== 'not-logged-in') {
        sessionToken = $loginState.token;
    }

    function doBack() {
        goto('/applicants/');
    }

    onMount(async () => {
        applicants = await fetchApplicants(sessionToken);
        researchFields = await fetchResearchFields(sessionToken);
    });
</script>

<body class="spaced-column">
    <button id="back-button" on:click={doBack}>Back</button>
    <div id="applicant-list-container">
        <ul id="applicant-list-titles">
            <li class="applicant-list-item">
                <span class='list-title'>ID</span>
                <span class='list-title'>Research Field</span>
                <span class='list-title'>Name</span>
                <span class='list-title'>Phone Number</span>
                <span class='list-title'>Email</span>
                <span class='list-title'>Edit</span>
            </li>
        </ul>
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
        @import '../../styles/applicant.scss';
    </style>
</body>

