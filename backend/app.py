from flask import request, make_response
from flask_jwt_extended import (
    jwt_required,
    create_access_token,
    get_jwt_identity,
    unset_jwt_cookies,
)
from sqlalchemy.exc import IntegrityError
from config import app, db, api, bcrypt
from models import User, Product, Family, FamilyProductAssociation


@app.route("/login", methods=["POST"])
def login():
    json_data = request.get_json()
    username = json_data.get("username")
    password = json_data.get("password")

    user = User.query.filter_by(username=username).first()

    if user and user.check_password(password):
        access_token = create_access_token(identity=user.id)

        response = make_response(
            {
                "message": "successful",
                "username": user.username,
                "access_token": access_token,
            },
            200,
        )
        return response
    else:
        response = make_response({"message": "Invalid username or password"}, 401)
        return response


@app.route("/logout", methods=["POST"])
@jwt_required()
def logout():
    response = make_response({"message": "Successful logout"}, 200)
    unset_jwt_cookies(response)
    return response


@app.route("/familysignup", methods=["POST"])
def family_signup():
    json_data = request.get_json()

    name = json_data.get("name")

    existing_name = Family.query.filter_by(name=name).first()

    if existing_name:
        response = make_response({"message": "Name already exists."}, 400)
        return response

    new_family = Family(name)

    try:
        db.session.add(new_family)
        db.session.commit()
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
        return response
    except IntegrityError:
        response = make_response(
            {"message": "An error occurred during registration."}, 500
        )
        return response


@app.route("/usersignup", methods=["POST"])
def user_signup():
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
        return response
    if existing_email:
        response = make_response({"message": "Email already in use."}, 400)
        return response

    new_user = User(username, password, name, email, family_id)

    try:
        db.session.add(new_user)
        db.session.commit()
        response = make_response({"message": "Successful"}, 201)
        return response
    except IntegrityError:
        response = make_response(
            {"message": "An error occurred during registration."}, 500
        )
        return response


@app.route("/familysearch", methods=["POST"])
def family_search():
    name = request.get_json().get("name")

    family = Family.query.filter_by(name=name).first()

    if family:
        response_data = {"message": "Exist", "name": family.name, "id": family.id}
    else:
        response_data = {"message": "Name does not exist"}

    response = make_response(response_data, 200)
    return response


@app.route("/productlist", methods=["GET"])
@jwt_required()
def product_list():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if user:
        family = user.family

        product_list = []
        products = (
            db.session.query(Product)
            .join(FamilyProductAssociation)
            .filter(FamilyProductAssociation.family_id == family.id)
            .all()
        )

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
        return response
    else:
        response = make_response({"message": "User not authenticated"}, 401)
        return response


@app.route("/productadd", methods=["POST"])
def product_add():
    json_data = request.get_json()

    name = json_data.get("name")
    brand = json_data.get("brand")
    model = json_data.get("model")
    serial_number = json_data.get("serial_number")
    purchase_date = json_data.get("purchase_date")
    warranty_expiration_date = json_data.get("warranty_expiration_date")

    new_product = Product(
        name=name,
        brand=brand,
        model=model,
        serial_number=serial_number,
        purchase_date=purchase_date,
        warranty_expiration_date=warranty_expiration_date,
    )

    try:
        db.session.add(new_product)
        db.session.commit()
        product_id = new_product.id
        response = make_response({"message": "Successful", "id": product_id}, 201)
        return response
    except IntegrityError:
        response = make_response(
            {"message": "An error occurred while adding the product"}, 500
        )
        return response


if __name__ == "__main__":
    app.run(port=5555, debug=True)
