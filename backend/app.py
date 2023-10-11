from flask import request, session
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

from config import app, db, api, bcrypt
from models import User, Product, Family, FamilyProductAssociation


class Index(Resource):
    def get(self):
        return {"message": "Welcome!"}

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


api.add_resource(Index, "/")
api.add_resource(Login, "/login", endpoint="login")

if __name__ == "__main__":
    app.run(port=5555, debug=True)