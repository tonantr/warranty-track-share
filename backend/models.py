from sqlalchemy_serializer import SerializerMixin
from validation import is_valid_email, is_valid_name, is_valid_username

from config import db, bcrypt


class User(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)

    family_id = db.Column(db.Integer, db.ForeignKey("family.id"), nullable=False)

    def __init__(self, username, password, name, email):
        is_valid_username(username)
        self.username = username

        self.password = bcrypt.generate_password_hash(password).decode("utf-8")

        is_valid_name(name)
        self.name = name
        
        valid_email = is_valid_email(email)
        if valid_email == None:
            raise ValueError("Invalid email address.")
        self.email = valid_email

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password, password)

    def __repr__(self):
        return f"User(id={self.id}, username={self.username}, name={self.name}, email={self.email})"


class Family(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)

    users = db.relationship("User", backref="family", lazy=True)

    def __repr__(self):
        return f"Family(id={self.id}, name={self.name})"


class Product(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    brand = db.Column(db.String(100))
    model = db.Column(db.String(100))
    serial_number = db.Column(db.String(100))
    purchase_date = db.Column(db.Date)
    warranty_expiration_date = db.Column(db.Date)

    def __repr__(self):
        return (
            f"Product("
            f"id={self.id}, "
            f"name={self.name}, "
            f"brand={self.brand}, "
            f"model={self.model}, "
            f"serial_number={self.serial_number}, "
            f"purchase_date={self.purchase_date}, "
            f"warranty_expiration_date={self.warranty_expiration_date}"
            f")"
        )


class FamilyProductAssociation(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key=True)
    family_id = db.Column(db.Integer, db.ForeignKey("family.id"))
    product_id = db.Column(db.Integer, db.ForeignKey("product.id"))
    family = db.relationship("Family", backref="product_associations")
    product = db.relationship("Product", backref="family_associations")
