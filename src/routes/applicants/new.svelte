<script>
    import { APP_URL } from '../../globals';

    async function createApplicant () {
        const applicantJSON = JSON.stringify({
            name: document.getElementById('name').value,
            phone_number: document.getElementById('phone_number').value,
            email: document.getElementById('email').value,
            cv_path: document.getElementById('cv_path').value,
            diploma_path: document.getElementById('diploma_path').value,
            grade_audit_path: document.getElementById('grade_audit_path').value,
            desired_field_id: document.getElementById('desired_field_id').value,
        })
        
        if (applicantJSON.includes('""')) {
            return;
        }
        
        await fetch(APP_URL + '/rest/applicant', {
            method: 'POST',
            body: applicantJSON,
        });
    
        window.location.href = APP_URL + '/applicants/';
    }

    async function fetchResearchFields() {
        const response = await fetch(APP_URL + '/rest/research_fields',
        {
            method: 'GET',
        });
        return response.json();
    }

    fetchResearchFields().then(data => {
        const select = document.getElementById('desired_field_id');
        data.forEach(field => {
            const option = document.createElement('option');
            option.value = field.id;
            option.text = field.name;
            select.appendChild(option);
        });
    });
</script>

<body>
    <div class="applicant-form-container">
        <form id="applicant-form">
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" class="form-control" id="name" placeholder="Enter name">
            </div>
            <div class="form-group">
                <label for="phone_number">Phone Number</label>
                <input type="text" class="form-control" id="phone_number" placeholder="Enter phone number">
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="text" class="form-control" id="email" placeholder="Enter email">
            </div>
            <div class="form-group">
                <label for="cv_path">CV Path</label>
                <input type="text" class="form-control" id="cv_path" placeholder="Enter CV path">
            </div>
            <div class="form-group">
                <label for="diploma_path">Diploma Path</label>
                <input type="text" class="form-control" id="diploma_path" placeholder="Enter diploma path">
            </div>
            <div class="form-group">
                <label for="grade_audit_path">Grade Audit Path</label>
                <input type="text" class="form-control" id="grade_audit_path" placeholder="Enter grade audit path">
            </div>
            <div class="form-group">
                <label for="desired_field_id">Desired Field</label>
                <select class="form-control" id="desired_field_id" />
            </div>
            <button type="submit" class="btn btn-primary" onclick="createApplicant()">Submit</button>
        </form>
    </div>
</body>

<style>
    
</style>