document.getElementById("login_form").addEventListener("submit",manageLoginSubmission)

function manageLoginSubmission(event)
{
    event.preventDefault();
    let name=document.getElementById('username').value;
    let pass=document.getElementById('password').value;

    fetch('/',{
        method:'POST',
        headers:{'Content-Type':'application/x-www-form-urlencoded'},
        body:`username=${encodeURIComponent(name)}&password=${encodeURIComponent(pass)}`
    })
    .then(response => response.json())
    .then(data => {
        if(data.success)
        {
            if(data.redirect){
                window.location.href=data.redirect;
            }
        }
        else
        {
            alert(`Error: ${data.error}`)
            document.getElementById("login_form").reset();
            document.getElementById("username").style.borderColor="red";
            document.getElementById("password").style.borderColor="red";

        }

            })
    .catch(error => 
    {
        console.error(error);
        alert(`Error: ${error}`);
    }
    );
}