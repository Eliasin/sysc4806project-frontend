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

                const editButton = createElement('button');
                editButton.onclick = goto(VERCEL_URL + '/professors/edit?id=' + id);
                li.appendChild(editButton);
                
                list.appendChild(li);
            });
        });
    })

    /*
    async function fetchEdit() {
        async () => {
            const response = await fetch(APP_URL + '/professors/edit?id=',
            {
                method: 'POST',
            });
            return response.json();
        }
    }
    */

    function doBack() {
        window.location.pathname = "/professors/";
    }

</script>

<body>
    <div class="professor-list-container">
        <button id="back-button" on:click={doBack}>Back</button>
        <ul id="professor-list" />
    </div>
</body>