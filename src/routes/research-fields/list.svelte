<script lang="ts">
    import { createResearchField, deleteResearchField, fetchResearchFields } from "../../request/research-field";
    import { loginState, type LoginState } from "../../stores";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";

    let researchFields: Array<ResearchField> = [];

    let sessionToken = null;
    $: if ($loginState.kind !== 'not-logged-in') {
        sessionToken = $loginState.token;
    }

    async function requestDeleteResearchField(id: string) {
        await deleteResearchField(sessionToken, id);
    }

    async function requestCreateResearchField(e: MouseEvent) {
        e.preventDefault();

        let name = (document.getElementById('name') as HTMLInputElement).value;

        await createResearchField(sessionToken, name);

        researchFields = await fetchResearchFields(sessionToken);
    }

    onMount(async () => {
        researchFields = await fetchResearchFields(sessionToken);
    });
</script>

<body>
    <button on:click={() => goto('/')}>Back</button>
    {#if $loginState.kind !== 'not-logged-in'}
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