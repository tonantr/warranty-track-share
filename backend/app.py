from flask import request, session
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

from config import app, db, api, bcrypt
from models import User, Product, Family, FamilyProductAssociation


class Login(Resource):
    def post(self):
        json_data = request.get_json()
        username = json_data.get("username")
        password = json_data.get("password")

        user = User.query.filter_by(username=username).first()

        if user and user.check_password(password):
            session["user_id"] = user.id
            return {"message": "Login successful", "username": user.username}, 200
        else:
            return {"message": "Invalid username or password"}, 401

class Signup(Resource):
    def post(self):
        json_data = request.get_json()
        username = json_data.get("username")
        password = json_data.get("password")
        name = json_data.get("name")
        email = json_data.get("email")
        family_id = json_data.get("family_id")

        existing_user = User.query.filter_by(username=username).first()
        existing_email = User.query.filter_by(email=email).first()

        if existing_user:
            return {"message": "Username already exists."}, 400
        if existing_email:
            return {"message": "Email already in use."}, 400
        
        new_user = User(
            username,
            password,
            name,
            email,
            family_id
        )

        try:
            db.session.add(new_user)
            db.session.commit()
            return {"message": "User registration Successful"}, 201
        except IntegrityError:
            return {"message": "An error occurred during registration."}, 500
        

api.add_resource(Login, "/login", endpoint="login")
api.add_resource(Signup, "/signup", endpoint="signup")

if __name__ == "__main__":
    app.run(port=5555, debug=True)
