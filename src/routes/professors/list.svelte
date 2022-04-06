<svelte:head>
    <title>SYSC4806 Project - List Professors</title>
</svelte:head>

<script lang="ts">
    import { goto } from '$app/navigation';
    import { loginState } from '../../stores';
    import { onMount } from 'svelte';
    import { deleteProfessor, fetchProfessors } from '../../request/professor';

    let professors: Array<Professor> = [];
    let sessionToken = null;
    $: if ($loginState.kind !== 'not-logged-in') {
        sessionToken = $loginState.token;
    }

    onMount(async () => {
        professors = await fetchProfessors(sessionToken);
    })

    function doBack() {
        goto('/professors/');
    }

    async function requestDeleteProfessor(id: string) {
        await deleteProfessor(sessionToken, id);
        professors = await fetchProfessors(sessionToken);
    }

</script>

<body class="spaced-column">
    <button id="back-button" on:click={doBack}>Back</button>
    <div id="professor-list-container">
        <ul id="professor-list">
        {#each professors as professor, i}
            {#if i == 0}
            <li class="applicant-list-item">
                <span class='list-title'>ID</span>
                <span class='list-title'>Name</span>
                <span class='list-title'>Action</span>
                <span class='list-title'>Action</span>
            {/if}
            <li class="professor-list-item">
                <span>{professor.id}</span>
                <span>{professor.name}</span>
                <button on:click={() => requestDeleteProfessor(professor.id.toString())}>Delete</button>
                <button on:click={() => goto('/professors/edit?id=' + professor.id)}>Edit</button>
            </li>
        {/each}
        </ul>
    </div>

    <style lang="scss">
        @import '../../styles/global.scss';
        @import '../../styles/professor.scss';
    </style>
</body>