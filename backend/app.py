from flask import request, session, make_response
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

from config import app, db, api, bcrypt
from models import User, Product, Family, FamilyProductAssociation

import pdb


class Login(Resource):
    def post(self):
        json_data = request.get_json()
        username = json_data.get("username")
        password = json_data.get("password")

        user = User.query.filter_by(username=username).first()

        if user and user.check_password(password):
            session["user_id"] = user.id
            response = make_response(
                {"message": "Successful", "username": user.username}, 200
            )
            response.headers["Access-Control-Allow-Origin"] = "*"
            return response
        else:
            response = make_response({"message": "Invalid username or password"}, 401)
            response.headers["Access-Control-Allow-Origin"] = "*"
            return response


class FamilySignup(Resource):
    def post(self):
        json_data = request.get_json()

        name = json_data.get("name")

        existing_name = Family.query.filter_by(name=name).first()

        if existing_name:
            response = make_response({"message": "Name already exists."}, 400)
            response.headers["Access-Control-Allow-Origin"] = "*"
            return response

        new_family = Family(name)

        try:
            db.session.add(new_family)
            db.session.commit()
            # pdb.set_trace()
            family_id = new_family.id
            family_name = new_family.name

            response = make_response(
                {
                    "message": "Successful",
                    "family_id": family_id,
                    "family_name": family_name,
                },
                201,
            )
            response.headers["Access-Control-Allow-Origin"] = "*"
            return response
        except IntegrityError:
            response = make_response(
                {"message": "An error occurred during registration."}, 500
            )
            response.headers["Access-Control-Allow-Origin"] = "*"
            return response


class UserSignup(Resource):
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
            response.headers["Access-Control-Allow-Origin"] = "*"
            return response
        if existing_email:
            response = make_response({"message": "Email already in use."}, 400)
            response.headers["Access-Control-Allow-Origin"] = "*"
            return response

        new_user = User(username, password, name, email, family_id)

        try:
            db.session.add(new_user)
            db.session.commit()
            response = make_response({"message": "Successful"}, 201)
            response.headers["Access-Control-Allow-Origin"] = "*"
            return response
        except IntegrityError:
            response = make_response(
                {"message": "An error occurred during registration."}, 500
            )
            response.headers["Access-Control-Allow-Origin"] = "*"
            return response


class FamilySearch(Resource):
    def post(self):
        name = request.get_json().get("name")

        family = Family.query.filter_by(name=name).first()

        if family:
            response_data = {"message": "Exist", "name": family.name, "id": family.id}
        else:
            response_data = {"message": "Name does not exist"}

        response = make_response(response_data, 200)
        response.headers["Access-Control-Allow-Origin"] = "*"
        return response


class ProductList(Resource):
    def get(self):
        product_list = []
        products = Product.query.all()

        for product in products:
            product_dict = {
                "id": product.id,
                "name": product.name,
                "brand": product.brand,
                "model": product.model,
                "serial_number": product.serial_number,
                "purchase_date": product.purchase_date.strftime("%m-%d-%Y"),
                "warranty_expiration_date": product.warranty_expiration_date.strftime(
                    "%m-%d-%Y"
                ),
            }
            product_list.append(product_dict)

        response = make_response({"products": product_list}, 200)
        response.headers["Access-Control-Allow-Origin"] = "*"
        return response

api.add_resource(Login, "/login", endpoint="login")
api.add_resource(FamilySignup, "/familysignup", endpoint="familysignup")
api.add_resource(UserSignup, "/usersignup", endpoint="usersignup")
api.add_resource(FamilySearch, "/familysearch", endpoint="familysearch")
api.add_resource(ProductList, "/productlist", endpoint="productlist")

if __name__ == "__main__":
    app.run(port=5555, debug=True)
