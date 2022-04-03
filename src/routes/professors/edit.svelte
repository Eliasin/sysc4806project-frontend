<script lang="ts">
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { editProfessorName, fetchProfessor, fetchProfessorResearchFields, removeProfessorResearchField } from '../../request/professor';

    let professorId = $page.url.searchParams.get('id');
    let professor: Professor | null = null;
    let researchFields: Array<ResearchField> = [];

    async function requestEditProfessorName() {
        let name = (document.getElementById('name') as HTMLInputElement).value;
        await editProfessorName(professorId, name);
    }

    onMount(async () => {
        professor = await fetchProfessor(professorId);
        researchFields = await fetchProfessorResearchFields(professorId);
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
            <label for="field_id">Fields</label>
            <ul id="field-list">
                {#each researchFields as researchField }
                <li>
                    <span>{researchField.id}</span>
                    <option value={researchField.id}>{researchField.name}</option>
                    <button on:click={() => removeProfessorResearchField(professorId, researchField.id)}>Delete</button>
                </li>
                {/each}
            </ul>
            <button type="submit" class="btn btn-primary" on:click={requestEditProfessorName}>Submit</button>
        </form>
    </div>
    <button id="back-button" on:click={doBack}>Back</button>
</body>

<style>
    
</style>