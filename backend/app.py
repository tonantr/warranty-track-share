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
from datetime import datetime


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
    user = db.session.get(User, user_id)

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
@jwt_required()
def product_add():
    try:
        user_id = get_jwt_identity()

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

        db.session.add(new_product)
        db.session.commit()

        product_id = new_product.id

        user = db.session.get(User, user_id)

        family_association = FamilyProductAssociation(
            family_id = user.family_id,
            product_id = product_id
        )

        db.session.add(family_association)
        db.session.commit()

        response = make_response({"message": "Successful", "id": product_id}, 201)
        return response
    except IntegrityError:
        response = make_response(
            {"message": "An error occurred while adding the product"}, 500
        )
        return response

@app.route("/productdel/<int:product_id>", methods=["DELETE"])
@jwt_required()
def product_delete(product_id):
    product = Product.query.get(product_id)

    if product:
        db.session.delete(product)
        db.session.commit()
        return make_response({"message": "Product deleted successfully"}, 200)
    else:
        return make_response({"message": "Item not found or deletion failed"}, 404)

@app.route("/productupd/<int:product_id>", methods=["PUT"])
@jwt_required()
def product_update(product_id):
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user:
        return make_response({"message": "User not authenticated"}, 401)
    
    product = db.session.query(Product).get(product_id)

    if not product:
        return make_response({"message": "Product not found"}, 404)
    
    family_association = FamilyProductAssociation.query.filter_by(product_id=product_id).first()
    
    if not family_association:
        return make_response({"message": "Unauthorized to update this product"}, 403)
    
    try:
        json_data = request.get_json()

        product.name = json_data.get("name", product.name)
        product.brand = json_data.get("brand", product.brand)
        product.model = json_data.get("model", product.model)
        product.serial_number = json_data.get("serial_number", product.serial_number)
        product.purchase_date = datetime.strptime(json_data.get("purchase_date", product.purchase_date), "%m-%d-%Y").date()
        product.warranty_expiration_date = datetime.strptime(json_data.get("warranty_expiration_date", product.warranty_expiration_date), "%m-%d-%Y").date()

        db.session.commit()

        response = make_response({"message": "Product updated successfully"}, 200)
        return response
    except Exception as e:
        db.session.rollback()
        error_message = f"An error occurred: {str(e)}"
        return make_response({"message": error_message}, 500)
    finally:
        db.session.close()

if __name__ == "__main__":
    app.run(port=5555, debug=True)
