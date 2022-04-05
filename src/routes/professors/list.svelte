<svelte:head>
    <title>SYSC4806 Project - List Professors</title>
</svelte:head>

<script lang="ts">
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { deleteProfessor, fetchProfessors } from '../../request/professor';

    let professors: Array<Professor> = [];

    onMount(async () => {
        professors = await fetchProfessors();
    })

    function doBack() {
        goto('/professors/');
    }

    async function requestDeleteProfessor(id: string) {
        await deleteProfessor(id);
        professors = await fetchProfessors();
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