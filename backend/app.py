from flask import request, session, make_response
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
            response = make_response({"message": "login successful", "username": user.username}, 200)
            response.headers['Access-Control-Allow-Origin'] = '*' 
            return response
        else:
            response = make_response({"message": "Invalid username or password"}, 401)
            response.headers['Access-Control-Allow-Origin'] = '*'
            return response

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
            response = make_response({"message": "Username already exists."}, 400)
            response.headers['Access-Control-Allow-Origin'] = '*' 
            return response
        if existing_email:
            response = make_response({"message": "Email already in use."}, 400)
            response.headers['Access-Control-Allow-Origin'] = '*'
            return response
        
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
            response = make_response({"message": "User registration Successful"}, 201)
            response.headers['Access-Control-Allow-Origin'] = '*'
            return response
        except IntegrityError:
            response = make_response({"message": "An error occurred during registration."}, 500)
            response.headers['Access-Control-Allow-Origin'] = '*'
            return response
        

api.add_resource(Login, "/login", endpoint="login")
api.add_resource(Signup, "/signup", endpoint="signup")

if __name__ == "__main__":
    app.run(port=5555, debug=True)
