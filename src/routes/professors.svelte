<svelte:head>
    <title>SYSC4806 Project - Professors</title>
</svelte:head>

<script>
    import { goto } from "$app/navigation";
</script>

<body>
    <button on:click={() => goto('/')}>Back</button>
    <div class="selection">
        <div id="selection-a">
            <button class="select" on:click={() => goto('/professors/new')}>
                Create Professor
            </button>
        </div>
        <div id="selection-b">
            <h2 class="selection-header">
            </h2>
            <button class="select" on:click={() => goto('/professors/list')}>
                List Professors
            </button>
        </div>
    </div>

    <style lang="scss">
        @import '../styles/global.scss';
    </style>
</body>
