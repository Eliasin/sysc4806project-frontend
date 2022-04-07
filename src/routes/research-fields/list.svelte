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

<body class="spaced-column">
    <button id="back-button" on:click={() => goto('/')}>Back</button>
    {#if $loginState.kind !== 'not-logged-in'}
    <div id="research-field-creation">
        <span>Create Research Field</span>
        <form id="research-field-creation-form" class="form-group">
            <label for="name">Name</label>
            <input id="name" type="text">
        </form>
        <button on:click={requestCreateResearchField}>Create</button>
    </div>
    <div id="research-field-list-container">
        <ul id="research-field-list-titles">
            <li class="research-field-item">
                <span class='list-title'>ID</span>
                <span class='list-title'>Name</span>
                <span class='list-title'>Delete</span>
            </li>
        </ul>
        <ul id="research-field-list">
            {#each researchFields as researchField}
            <li class="research-field-item">
                <span>{researchField.id}</span>
                <span>{researchField.name}</span>
                <button on:click={() => requestDeleteResearchField(researchField.id.toString())}>Delete</button>
            </li>
            {/each}
        </ul>
    </div>
    {/if}

    <style lang="scss">
        @import '../../styles/global.scss';
        @import '../../styles/research-fields.scss';
    </style>
</body>