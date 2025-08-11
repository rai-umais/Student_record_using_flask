document.getElementById("Student_form").addEventListener("submit",ManageSubmission)

function ManageSubmission(event){
    event.preventDefault();
    let name= document.getElementById("username").value;
    let roll_no= document.getElementById("roll_number").value;
    let batch = document.getElementById("batch").value;
    let department = document.getElementById("dept").value;

    if(name == "" || roll_no == "" || batch == "" || department == "")
    {
        alert("Please fill all fields..");
        return false;
    }
    fetch('/add_student',{
        method:"POST",
        headers:{"Content-Type":"application/x-www-form-urlencoded"},
        body:`username=${encodeURIComponent(name)}&roll_number=${encodeURIComponent(roll_no)}&batch=${encodeURIComponent(batch)}&dept=${encodeURIComponent(department)}`
    })
    .then(response => response.json())
    .then(data =>
    {
        if(data.error)
        {
            alert(`${data.error}`);
        }
        else{
            alert(`Record for ${data.username} was added sucessfully`);
            document.getElementById("Student_form").reset();
            document.getElementById("username").focus();
        }
    })
    .catch(error => 
        {
            console.error("Error: ",error)
            alert(`Something went wrong`)
        }
    );
}

document.getElementById("username").addEventListener("input", function(){
    if(this.value.length < 2)
    {
        this.style.borderColor="red";
    }
    else{
        this.style.borderColor="green";
    }
});

document.getElementById("roll_number").addEventListener("input",function(){
    if(this.value.length < 1 || this.value == "")
    {
        this.style.borderColor="red";
    }
    else
    {
        this.style.borderColor="green";
    }
});