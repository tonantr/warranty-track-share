from email_validator import validate_email, EmailNotValidError


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
