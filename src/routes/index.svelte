<svelte:head>
    <title>SYSC4806 Project - Index</title>
</svelte:head>

<script>
    function selectApplicants() {
        window.location.pathname = "/applicants/";
    }
    function selectProfessors() {
        window.location.pathname = "/professors/";
    }
</script>

<body>
    <div class="selection">
        <div id="selection-a">
            <button class="select" on:click={selectApplicants}>
                Manage Applicants
            </button>
        </div>
        <div id="selection-b">
            <h2 class="selection-header">
            </h2>
            <button class="select" on:click={selectProfessors}>
                Manage Professors
            </button>
        </div>
    </div>

    <style lang="scss">
        @import '../styles/global.scss';
        
        button {
            color: blue;
        }
    </style>
</body>
