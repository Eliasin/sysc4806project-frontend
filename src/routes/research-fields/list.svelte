<script lang="ts">
    import { createResearchField, deleteResearchField, fetchResearchFields } from "../../request/research-field";
    import { loginState, type LoginState } from "../../stores";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";

    let loginStateValue: LoginState = $loginState;
    let researchFields: Array<ResearchField> = [];

    async function requestDeleteResearchField(id: string) {
        await deleteResearchField(id);
    }

    async function requestCreateResearchField(e: MouseEvent) {
        e.preventDefault();

        let name = (document.getElementById('name') as HTMLInputElement).value;

        await createResearchField(name);

        researchFields = await fetchResearchFields();
    }

    onMount(async () => {
        researchFields = await fetchResearchFields();
    });
</script>

<body>
    <button on:click={() => goto('/')}>Back</button>
    {#if loginStateValue.kind !== 'not-logged-in'}
        <form>
            <label for="name">Name</label>
            <input id="name" type="text">
            <button on:click={requestCreateResearchField}>Create</button>
        </form>
        <ul>
        {#each researchFields as researchField}
        <li>
            <span>{researchField.id}</span>
            <span>{researchField.name}</span>
            <button on:click={() => requestDeleteResearchField(researchField.id.toString())}>Delete</button>
        </li>
        {/each}
        </ul>
    {/if}
</body>