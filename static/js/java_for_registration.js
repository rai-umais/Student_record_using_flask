document.getElementById("registration_form").addEventListener("submit",manageLoginSubmission)

function manageLoginSubmission(event)
{
    event.preventDefault();
    let name=document.getElementById('username').value;
    let pass=document.getElementById('new_pass').value;
    let cnic=document.getElementById('CNIC').value;

    fetch('/registration',{
        method:'POST',
        headers:{'Content-Type':'application/x-www-form-urlencoded'},
        body:`username=${encodeURIComponent(name)}&new_pass=${encodeURIComponent(pass)}&CNIC=${encodeURIComponent(cnic)}`
    })
    .then(response => response.json())
    .then(data => {
        if(data.error)
        {
            alert(`Error: ${data.error}`);
            document.getElementById("registration_form").reset();
            document.getElementById("username").style.borderColor="red";
            document.getElementById("new_pass").style.borderColor="red";
        }
        else{
            alert(`message: ${data.message}`)
            document.getElementById('registration_form').reset();
        }
    })
    .catch(error => 
    {
        console.error(error);
        alert(`Error: ${error}`);
    }
    );
}