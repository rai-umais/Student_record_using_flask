from flask import Flask,request,render_template   
#Tools and modules for the 
#userstouse FLASKand its features
app = Flask(__name__)  #Tells code that what is being used: Here Flask

@app.route("/",methods=['GET','POST'])  # Routes that tell what will run on using them
def home():
    if request.method  == 'GET':
        return render_template("name.html")   #Render_template  is used to add html, CSS and other things
    elif request.method == 'POST':
        name = request.form['username']
        return render_template("main.html",name=name)
@app.route("/feedback",methods=["GET","POST"])
def take_feedback():
    if request.method == "GET":
        return render_template("feedback.html")
    
    elif request.method == "POST":
        name = request.form['username']
        return render_template("thank.html",name= name)


if __name__ == "__main__":
    app.run(debug = True)