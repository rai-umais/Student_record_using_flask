from flask import Flask,request,render_template,jsonify
app = Flask(__name__)

user_credentials={
    'Name':None,
    'Pass':None
    }
students={}

@app.route('/',methods=['GET','POST'])
def name():
   if request.method == 'GET':
    return render_template("name.html")
   
   elif request.method == 'POST':
    login_check = False
    name=request.form.get('username')
    password=request.form.get('password')
    if name in user_credentials:
        if user_credentials[name]['Pass'] == password:
            login_check=True
        else:
            error="Incorrect password"
            return jsonify({'success':False,'error':error})
    else:
        return jsonify({'success':False,'error':'No account with such credentials'})
    if login_check:
            return jsonify({'success':True,'redirect':'/welcome'})
    
@app.route('/registration',methods=['POST','GET'])
def create_account():
    if request.method == 'POST':
        name=request.form.get('username')
        cnic=request.form.get('CNIC')
        password= request.form.get('new_pass')
        user_credentials[name] = {}
        user_credentials[name]['Pass'] = password
        user_credentials[name]['Cnic'] = cnic
        return jsonify({'message':'Account created sucessfully',
                        'Admin':{
                            'name':name,
                            "cnic":cnic,
                            'pass':password
                            }})
    else:
        return render_template("account_creation.html")


@app.route('/welcome',methods=['GET','POST'])
def welcome():
    if request.method=='POST':
        name = request.form.get('username')
        return render_template('welcome.html',name = name)
    else:
        return render_template('welcome.html', name=" Boss")

@app.route('/add_student',methods=['GET','POST'])
def add_student():
    if request.method == 'GET':
        return render_template("add_student.html")
    elif request.method == 'POST':
        rollno = request.form.get('roll_number')
        name=request.form.get('username')
        batch=request.form.get('batch')
        dept=request.form.get('dept')
        students[rollno]={}
        students[rollno]["Name"] = name
        students[rollno]["Batch"] = batch
        students[rollno]["Department"] = dept
        if not name or not rollno or not batch or not dept:
            return jsonify({'error':'Please fill all Fields'}),400
        return jsonify({'username':name , 'batch':batch,'Roll_no':rollno , 'Department' : dept})

@app.route('/Delete',methods=['GET','POST'])
def delete_std():
    if request.method == 'GET':
        return render_template("del_student.html")
    else:
        name=request.form.get("student_name")
        roll=request.form.get("Roll_num")
        if not name or not roll:
            return jsonify({'error':'Please fill all fields'})
        else:
                if roll in students:
                    if students[roll]["Name"] == name:
                        del students[roll]
                        return jsonify({'message':'Student Record was deleted Sucessfully',
                                        'Student_name':name,
                                        'Student_roll':roll})
                    else:
                        return jsonify({'error':'Name does not matches'})
                else:
                    return jsonify({'error':'No such record exists!'})
                
@app.route('/update_student',methods=['POST','GET'])
def update_std():
    if request.method == 'GET':
        return render_template('update_student.html')
    elif request.method == 'POST':
        rollno = request.form.get('roll')
        name=request.form.get('student_name')
        batch=request.form.get('batch')
        dept=request.form.get('dept')

        if not rollno or not name or not batch or not dept:
            return jsonify({'error':'Please fill all fields'})
        else:
            if rollno in students:
                students[rollno]['Name']=name
                students[rollno]['Batch']=batch
                students[rollno]['Department']=dept
                return jsonify({'message':'Record updated sucesfully'})

@app.route('/get_students')
def print_students():
    students_list=[]
    for key,value in students.items():
        students_list.append({
            "Roll_num":key,
            "Name":value['Name'],
            "Batch":value['Batch'],
            "Department":value["Department"]})
    
    return render_template("print.html",students=students_list)

if __name__ == "__main__":
    app.run(debug=True)