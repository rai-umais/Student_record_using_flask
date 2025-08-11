document.getElementById("Deletion_form").addEventListener("submit",ManageDelSubmission)
function ManageDelSubmission(event)
{
    event.preventDefault();
    let name=document.getElementById("student_name").value;
    let roll=document.getElementById("Roll_num").value;

    if(roll == "" || name == "")
    {
        alert(`Empty fields`);
        return false;
    }

    fetch('/Delete',
        {
            method:`POST`,
            headers:{'Content-Type': 'application/x-www-form-urlencoded'},
            body:`student_name=${encodeURIComponent(name)}&Roll_num=${encodeURIComponent(roll)}`
        })
    .then(response=>response.json())
    .then(data => 
    {
        if(data)
        {
            alert(`${data.message} for ${data.Student_name}`)
            document.getElementById("Deletion_form").reset();
            document.getElementById("student_name").focus();
        }
        else 
        {
           alert(`${data.error}`);
        }
    })
    .catch(error => 
        {
            console.error(error);
            alert(`Something went wrong`)
        })
};
 document.getElementById("student_name").addEventListener("input", function(){
    if(this.value.length < 2)
    {
        this.style.borderColor="red";
    }
    else
    {
        this.style.borderColor="green";
    }
 });

document.getElementById("Roll_num").addEventListener("input",function(){
    if(this.value.length < 1)
    {
        this.style.borderColor="red";
    }
    else
    {
        this.style.borderColor="green";
    }
});