<script>
    import { page } from '$app/stores';
    import { HEROKU_URL, VERCEL_URL } from '../../globals';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';

    let professorId;
    page.subscribe(currentPage => { professorId = currentPage.url.searchParams.get('id'); });

    async function editProfessor () {
        const professorJSON = JSON.stringify({
            name: document.getElementById('name').value,
        })
        
        await fetch(HEROKU_URL + '/rest/professor?prof_id=' + professorId, {
            method: 'PUT',
            body: professorJSON,
        });
    
        goto(VERCEL_URL + '/professors/list');
    }

    async function fetchProfessor() {
        const response = await fetch(HEROKU_URL + '/rest/professor?id=' + professorId,
        {
            method: 'GET',
        });
        return response.json();
    }
    
    async function fetchResearchFields() {
        const response = await fetch(HEROKU_URL + '/rest/professor/research-field?prof_id=' + professorId,
        {
            method: 'GET',
        });
        return response.json();
    }

    onMount(() => {
        fetchProfessor().then(data => {
            const select = document.getElementById(professorId);
            data.forEach(professor => {
                const option = document.createElement('option');
                option.value = professor.id;
                option.text = professor.name;
                select.appendChild(option);
            });
        });

        fetchResearchFields().then(data => {
            const select = document.getElementById('field_id');
            data.forEach(field => {
                const option = document.createElement('option');
                option.value = field.id;
                option.text = field.name;
                select.appendChild(option);
            });
        });

        fetchProfessorsResearchFields().then(data => {
            const list = document.getElementById('field-list');

            data.forEach(field => {
                const li = document.createElement('li');
                li.class = 'field-list-item';
                
                const id = document.createElement('span');
                id.innerText = field.id;
                li.appendChild(id);
                
                const name = document.createElement('span');
                name.innerText = field.name;
                li.appendChild(name);

                const deleteButton = document.createElement('button');
                deleteButton.onclick = fetchDelete(professor.id);
                deleteButton.textContent = 'Delete';
                li.appendChild(deleteButton);
                
                list.appendChild(li);
            });
        });
    })

    function doBack() {
        goto(VERCEL_URL + '/professors/list');
    }

</script>

<body>
    <div class="professor-form-container">
        <form id="professor-form">
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" class="form-control" id="name" placeholder="Enter name">
            </div>
            <label for="field_id">Fields</label>
            <ul id="field-list" />
            <button type="submit" class="btn btn-primary" onclick="editProfessor()">Submit</button>
        </form>
    </div>
    <button id="back-button" on:click={doBack}>Back</button>
</body>

<style>
    
</style>