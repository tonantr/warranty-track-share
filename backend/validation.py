from email_validator import validate_email, EmailNotValidError
from datetime import datetime


def is_valid_email(email):
    try:
        valid = validate_email(email)
        return valid.email
    except EmailNotValidError:
        return None


def is_valid_name(name):
    if not name:
        raise ValueError("Name cannot be empty.")


def is_valid_username(username):
    if not username:
        raise ValueError("Username cannot be empty.")


def is_valid_family_name(name):
    if not name:
        raise ValueError("Name cannot be empty.")


def is_valid_product_name(name):
    if not name:
        raise ValueError("Name cannot be empty.")


def is_valid_product_model(model):
    if not model:
        raise ValueError("Model cannot be empty.")


def is_valid_product_brand(brand):
    if not brand:
        raise ValueError("Brand cannot be empty.")


def validate_purchase_date(purchase_date):
    try:
        parsed_date = datetime.strptime(purchase_date, "%m-%d-%Y")
        if parsed_date.strftime("%m-%d-%Y") != purchase_date:
            raise ValueError("Invalid purchase date format.")
    except ValueError:
        raise ValueError("Invalid purchase date format.")


def validate_warranty_expiration_date(warranty_expiration_date):
    try:
        parsed_date = datetime.strptime(warranty_expiration_date, "%m-%d-%Y")
        if parsed_date.strftime("%m-%d-%Y") != warranty_expiration_date:
            raise ValueError("Invalid warranty expiration date format.")
    except ValueError:
        raise ValueError("Invalid warranty expiration date format.")
