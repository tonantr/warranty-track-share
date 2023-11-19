from sqlalchemy_serializer import SerializerMixin
from validation import (
    is_valid_email,
    is_valid_name,
    is_valid_username,
    is_valid_family_name,
    is_valid_product_name,
    is_valid_product_brand,
    is_valid_product_model,
    validate_purchase_date,
    validate_warranty_expiration_date,
)
from datetime import datetime

from config import db, bcrypt


class User(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)

    family_id = db.Column(db.Integer, db.ForeignKey("family.id"), nullable=False)
    family = db.relationship("Family", backref="family_users", lazy=True)

    def __init__(self, username, password, name, email, family_id):
        is_valid_username(username)
        self.username = username

        self.password = bcrypt.generate_password_hash(password).decode("utf-8")

        is_valid_name(name)
        self.name = name

        valid_email = is_valid_email(email)
        if valid_email == None:
            raise ValueError("Invalid email address." + email)
        self.email = valid_email

        self.family_id = family_id

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password, password)

    def __repr__(self):
        return f"User(id={self.id}, username={self.username}, password={self.password}, name={self.name}, email={self.email})"


class Family(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)

    users = db.relationship("User", backref="family_users", lazy=True)

    def __init__(self, name):
        is_valid_family_name(name)
        self.name = name

    def __repr__(self):
        return f"Family(id={self.id}, name={self.name})"


class Product(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    brand = db.Column(db.String(100), nullable=False)
    model = db.Column(db.String(100), nullable=False)
    serial_number = db.Column(db.String(100))
    purchase_date = db.Column(db.Date, nullable=False)
    warranty_expiration_date = db.Column(db.Date, nullable=False)

    def __init__(
        self,
        name,
        brand,
        model,
        purchase_date,
        warranty_expiration_date,
        serial_number=None,
    ):
        is_valid_product_name(name)
        self.name = name

        is_valid_product_brand(brand)
        self.brand = brand

        is_valid_product_model(model)
        self.model = model

        self.serial_number = serial_number

        validate_purchase_date(purchase_date)
        self.purchase_date = datetime.strptime(purchase_date, "%m-%d-%Y").date()

        validate_warranty_expiration_date(warranty_expiration_date)
        self.warranty_expiration_date = datetime.strptime(
            warranty_expiration_date, "%m-%d-%Y"
        ).date()

    def __repr__(self):
        return (
            f"Product(id={self.id}, "
            f"name={self.name}, "
            f"brand={self.brand}, "
            f"model={self.model}, "
            f"serial_number={self.serial_number}, "
            f"purchase_date={self.purchase_date}, "
            f"warranty_expiration_date={self.warranty_expiration_date}"
        )


class FamilyProductAssociation(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key=True)
    family_id = db.Column(db.Integer, db.ForeignKey("family.id"))
    product_id = db.Column(db.Integer, db.ForeignKey("product.id"))
    family = db.relationship("Family", backref="product_associations")
    product = db.relationship("Product", backref="family_associations")
