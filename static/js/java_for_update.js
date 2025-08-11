document.getElementById("Update_form").addEventListener("submit",ManageUpdateSubmission)

function ManageUpdateSubmission(event){
    event.preventDefault();
    let name= document.getElementById("student_name").value;
    let roll_no= document.getElementById("roll").value;
    let batch = document.getElementById("batch").value;
    let department = document.getElementById("dept").value;

    if(name == "" || roll_no == "" || batch == "" || department == "")
    {
        alert("Please fill all fields..");
        return false;
    }
    fetch('/update_student',{
        method:"POST",
        headers:{"Content-Type":"application/x-www-form-urlencoded"},
        body:`student_name=${encodeURIComponent(name)}&roll=${encodeURIComponent(roll_no)}&batch=${encodeURIComponent(batch)}&dept=${encodeURIComponent(department)}`
    })
    .then(response => response.json())
    .then(data =>
    {
        if(data.error)
        {
            alert(`${data.error}`);
        }
        else{
            alert(`${data.message} for ${name}`);
            document.getElementById("Update_form").reset();
            document.getElementById("student_name").focus();
        }
    })
    .catch(error => 
        {
            console.error("Error: ",error)
            alert(`Something went wrong`)
        }
    );
}

document.getElementById("student_name").addEventListener("input", function(){
    if(this.value.length < 2)
    {
        this.style.borderColor="red";
    }
    else{
        this.style.borderColor="green";
    }
});

document.getElementById("roll").addEventListener("input",function(){
    if(this.value.length < 1 || this.value == "")
    {
        this.style.borderColor="red";
    }
    else
    {
        this.style.borderColor="green";
    }
});