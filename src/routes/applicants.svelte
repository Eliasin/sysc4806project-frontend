<svelte:head>
    <title>SYSC4806 Project - Applicants</title>
</svelte:head>

<script>
    import { goto } from "$app/navigation";
</script>

<body>
    <button on:click={() => goto('/')}>Back</button>
    <div class="selection">
        <div id="selection-a">
            <button class="select" on:click={() => goto('/applicants/new')}>
                Create Applicant
            </button>
        </div>
        <div id="selection-b">
            <h2 class="selection-header">
            </h2>
            <button class="select" on:click={() => goto('/applicants/list')}>
                List Applicants
            </button>
        </div>
    </div>

    <style lang="scss">
        @import '../styles/global.scss';
    </style>
</body>
