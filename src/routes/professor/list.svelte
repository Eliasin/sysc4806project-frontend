<svelte:head>
    <title>SYSC4806 Project - List Professors</title>
</svelte:head>

<script>
    import { APP_URL } from '../../globals';

    async function fetchProfessors() {
        const response = await fetch(APP_URL + '/rest/professors',
        {
            method: 'GET',
        });
        return response.json();
    }

    fetchProfessors().then(data => {
        const list = document.getElementById('professor-list');

        data.forEach(professor => {
            const li = document.createElement('li');
            li.class = 'professor-list-item';
            
            const id = document.createElement('span');
            id.innerText = professor.id;
            li.appendChild(id);
            
            const name = document.createElement('span');
            name.innerText = professor.name;
            li.appendChild(name);
            
            list.appendChild(li);
        });
    });

    function doBack() {
        goto(VERCEL_URL + '/professors/');
    }

</script>

<body>
    <div class="professor-list-container">
        <button id="back-button" on:click={doBack}>Back</button>
        <ul id="professor-list" />
        <button id="edit-button" on:click={() => {
                 window.location.href = window.location.origin + '/professor/';
        }}>Edit</button>
    </div>
</body>