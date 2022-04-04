<script lang="ts">
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { editProfessorName, fetchProfessor, fetchProfessorResearchFields, removeProfessorResearchField, addResearchedFieldToProfessor } from '../../request/professor';
    import { fetchResearchFields } from '../../request/research-field';

    let professorId = $page.url.searchParams.get('id');

    let professor: Professor | null = null;
    let professorResearchFields: Array<ResearchField> = [];
    let researchFields: Array<ResearchField> = [];

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
            <button class="btn btn-primary" on:click={requestEditProfessorName}>Submit</button>
        </form>
    </div>
    <button id="back-button" on:click={doBack}>Back</button>
</body>

<style>
    
</style>