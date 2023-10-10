from flask import request, session
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

from config import app, db, api, bcrypt
from models import User, Product, Family, FamilyProductAssociation


class Index(Resource):
    def get(self):
        return {"message": "Welcome!"}


api.add_resource(Index, "/")

if __name__ == "__main__":
    app.run(port=5555, debug=True)