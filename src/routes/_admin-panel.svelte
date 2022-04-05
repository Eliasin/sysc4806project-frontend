<script>
    import { goto } from "$app/navigation";

    function selectCreate() {
        window.location.pathname = "/applicants/new/";
    }
    function selectView() {
        window.location.pathname = "/applicants/list/";
    }
</script>

<body>
    <button on:click={() => goto('/')}>Back</button>
    <div class="selection">
        <div id="selection-a">
            <button class="select" on:click={selectCreate}>
                Create Applicant
            </button>
        </div>
        <div id="selection-b">
            <h2 class="selection-header">
            </h2>
            <button class="select" on:click={selectView}>
                List Applicants
            </button>
        </div>
    </div>

    <style lang="scss">
        @import '../styles/global.scss';
    </style>
</body>
