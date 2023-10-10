from random import randint, choice
from faker import Faker
from datetime import datetime

from app import app
from models import db, User, Family, Product, FamilyProductAssociation


fake = Faker()


def seed_database():
    db.session.query(FamilyProductAssociation).delete()
    db.session.query(User).delete()
    db.session.query(Product).delete()
    db.session.query(Family).delete()
    db.session.commit()

    families = []
    for _ in range(5):
        family = Family(name=fake.last_name())
        families.append(family)

    db.session.add_all(families)
    db.session.commit()


    users = []
    for _ in range(10):
        first_name = fake.first_name()
    
        email = f"{first_name.lower()}@gmail.com"

        existing_user = User.query.filter_by(email=email).first()

        if existing_user is None:
            user = User(
                username=fake.user_name(),
                password="password",
                name=fake.name(),
                email=email,
                family_id=choice(families).id,
            )
            users.append(user)
        else:
            print(f"Email {email} already exists in the database. Skipping...")

    db.session.add_all(users)
    db.session.commit()


    products = []

    for _ in range(20):
        purchase_date_str = fake.date_between(start_date="-2y", end_date="+3y").strftime("%m-%d-%Y")
        warranty_date_str = fake.date_between(start_date="today", end_date="+3y").strftime("%m-%d-%Y")

        product = Product(
            name=fake.word(),
            brand=fake.company(),
            model=fake.random_element(elements=("A", "B", "C", "D")),
            serial_number=fake.uuid4(),
            purchase_date=purchase_date_str,
            warranty_expiration_date=warranty_date_str
        )
        products.append(product)

    db.session.add_all(products)
    db.session.commit()

    family_product = []
    for family in families:
        for _ in range(randint(1, 5)):
            product = choice(products)
            association = FamilyProductAssociation(
                family_id=family.id, product_id=product.id
            )
            family_product.append(association)

    db.session.add_all(family_product)
    db.session.commit()


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
        seed_database()
