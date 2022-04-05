<script>
    import { goto } from "$app/navigation";
</script>

<body>
    <div class="selection">
        <div id="selection-a">
            <button class="select" on:click={() => goto('/applicants')}>
                Manage Applicants
            </button>
        </div>
        <div id="selection-b">
            <h2 class="selection-header">
            </h2>
            <button class="select" on:click={() => goto('/professors')}>
                Manage Professors
            </button>
        </div>
        <div id="selection-c">
            <h2 class="selection-header">
            </h2>
            <button class="select" on:click={() => goto('/research-fields/list')}>
                Manage Research Fields
            </button>
        </div>
    </div>

    <style lang="scss">
        @import '../styles/global.scss';
    </style>
</body>
