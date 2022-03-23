<script>
    import { APP_URL } from '../../globals';

    async function deleteProfessor () {
        const professorJSON = JSON.stringify({
            name: document.getElementById('name').value,
        })
        
        if (professorJSON.includes('""')) {
            return;
        }
        
        await fetch(APP_URL + '/rest/appprofesor', {
            method: 'POST',
            body: professorJSON,
        });
    
        window.location.href = APP_URL + '/professors/';
    }
</script>

<body>
    <div class="applicant-form-container">
        <form id="applicant-form">
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" class="form-control" id="name" placeholder="Enter name">
            </div>
            <button type="submit" class="btn btn-primary" onclick="createApplicant()">Submit</button>
        </form>
    </div>
</body>
