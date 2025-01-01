import os
from flask import Flask, render_template, jsonify, request, redirect, url_for
from wordcloud import WordCloud
import matplotlib.pyplot as plt
from io import BytesIO
import base64
import firebase_admin
from firebase_admin import credentials, firestore, auth
import json

# Initialize Flask app
app = Flask(__name__)

# Load Firebase configuration from Render environment secret
firebase_key_json = os.getenv("FIREBASE_KEY")
if not firebase_key_json:
    raise ValueError("FIREBASE_KEY environment variable is not set.")

firebase_key = json.loads(firebase_key_json)

# Initialize Firebase Admin SDK
cred = credentials.Certificate(firebase_key)
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
        name = request.form.get('name')
        email = request.form.get('email')
        password = request.form.get('password')
        confirm_password = request.form.get('confirm-password')
        role = request.form.get('role')

        # Validate input
        if not all([name, email, password, confirm_password, role]):
            return "All fields are required!", 400

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
                return redirect(url_for('admin_dashboard'))
            elif role == 'Resort Owner':
                return redirect(url_for('owner_dashboard'))
            elif role == 'Tourism Officer':
                return redirect(url_for('tourism_officer_dashboard'))
            else:
                return "Invalid role specified.", 400

        except firebase_admin.exceptions.FirebaseError as firebase_error:
            return f"Firebase Error: {firebase_error}", 500
        except Exception as e:
            return f"Unexpected Error: {str(e)}", 500

    # Render the signup form on GET requests
    return render_template('sign-up.html')

@app.route("/admin-dashboard")
def admin_dashboard():
    return render_template("admin-dashboard.html")

@app.route("/sentimentanalysis")
def sentiment_analysis():
    return render_template("tourist.html")

@app.route("/resort-owner-dashboard")
def owner_dashboard():
    return render_template("resort-owner-dashboard.html")

@app.route("/tourism-officer-dashboard")
def tourism_officer_dashboard():
    return render_template("tourism-officer-dashboard.html")

if __name__ == '__main__':
    debug_mode = os.getenv("FLASK_DEBUG", "True").lower() == "true"
    app.run(debug=debug_mode)
