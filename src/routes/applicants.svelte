<svelte:head>
    <title>SYSC4806 Project - Applicants</title>
</svelte:head>

<script>
    function selectCreate() {
        window.location.pathname = "/applicants/new/";
    }
    function selectView() {
        window.location.pathname = "/applicants/list/";
    }
</script>

<body>
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
