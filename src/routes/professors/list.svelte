<svelte:head>
    <title>SYSC4806 Project - List Professors</title>
</svelte:head>

<script>
    import { HEROKU_URL } from '../../globals';
    import { browser } from '$app/env';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';

    async function fetchProfessors() {
        const response = await fetch(HEROKU_URL + '/rest/professor',
        {
            method: 'GET',
        });
        return response.json();
    }

    async function fetchDelete(id) {
        async () => {
            const response = await fetch(VERCEL_URL + '/rest/professor?id=' + id,
            {
                method: 'DELETE',
            });
            return response.json();
        }
    }

    function doBack() {
        goto(VERCEL_URL + '/professors/');
    }

    onMount(() => {
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

                const deleteButton = document.createElement('button');
                deleteButton.onClick = fetchDelete();
                li.appendChild(deleteButton);
                
                list.appendChild(li);
            });
        });
    })
</script>

<body>
    <div class="professor-list-container">
        <button id="back-button" on:click={doBack}>Back</button>
        <ul id="professor-list" />
    </div>
</body>