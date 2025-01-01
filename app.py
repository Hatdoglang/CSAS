from flask import Flask, render_template, jsonify, request, redirect, url_for
from wordcloud import WordCloud
import matplotlib.pyplot as plt
from io import BytesIO
import base64
import firebase_admin
from firebase_admin import credentials, firestore, auth

app = Flask(__name__)

# Initialize Firebase Admin SDK
cred = credentials.Certificate("C:/Users/Febrieh Malaza/Documents/feb files/CSAS/firebase-key.json")  
firebase_admin.initialize_app(cred)
db = firestore.client()

@app.route('/')
def home():
    return render_template('index.html')

@app.route("/login-owner-manager")
def owner_manager_login():
    return render_template("loginpage-owner-manager.html")

@app.route("/login-tourism-officer")
def tourism_officer_login():
    return render_template("loginpage-tourism-officer.html")

@app.route("/login-admin")
def admin_login():
    return render_template("loginpage-admin.html")

@app.route('/sign-up', methods=['GET', 'POST'])
def sign_up():
    if request.method == 'POST':
        # Retrieve form data
        name = request.form['name']
        email = request.form['email']
        password = request.form['password']
        confirm_password = request.form['confirm-password']
        role = request.form['role']

        # Validate passwords
        if password != confirm_password:
            return "Passwords do not match!", 400
        
        try:
            # Create user in Firebase Authentication
            user = auth.create_user(
                email=email,
                password=password,
                display_name=name
            )
            user_id = user.uid  # Firebase-generated user ID

            # Save additional user data to Firestore
            user_data = {
                "name": name,
                "email": email,
                "role": role
            }
            db.collection("Users").document(user_id).set(user_data)

            # Redirect based on user role
            if role == 'Administrator':
                return redirect('/admin-dashboard')
            elif role == 'Resort Owner':
                return redirect('/resort-owner-dashboard')
            elif role == 'Tourism Officer':
                return redirect('/tourism-officer-dashboard')
            else:
                return "Invalid role", 400
        
        except Exception as e:
            return f"Error saving user: {str(e)}", 500

    # Render the signup form on GET requests
    return render_template('sign-up.html')

@app.route("/admin-dashboard")
def admin_dashboard():
    return render_template("admin-dashboard.html")

@app.route("/sentimentanalysis")
def tourist():
    return render_template("tourist.html")

@app.route("/resort-owner-dashboard")
def owner_dashboard():
    return render_template("resort-owner-dashboard.html")

@app.route("/tourism-officer-dashboard")
def tourism_officer_dashboard():
    return render_template("tourism-officer-dashboard.html")

if __name__ == '__main__':
    app.run(debug=True)
