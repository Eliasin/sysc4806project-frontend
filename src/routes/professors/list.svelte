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

<body>
    <div class="professor-list-container">
        <button id="back-button" on:click={doBack}>Back</button>
        <ul id="professor-list">
        {#each professors as professor}
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
    </style>
</body>