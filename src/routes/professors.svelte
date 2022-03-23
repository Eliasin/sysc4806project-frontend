<svelte:head>
    <title>SYSC4806 Project - Professors</title>
</svelte:head>

<script>
    function selectCreate() {
        window.location.pathname = "/professors/new/";
    }
    function selectView() {
        window.location.pathname = "/professors/list/";
    }
</script>

<body>
    <div class="selection">
        <div id="selection-a">
            <button class="select" on:click={selectCreate}>
                Create Professor
            </button>
        </div>
        <div id="selection-b">
            <h2 class="selection-header">
            </h2>
            <button class="select" on:click={selectView}>
                List Professors
            </button>
        </div>
    </div>
</body>
