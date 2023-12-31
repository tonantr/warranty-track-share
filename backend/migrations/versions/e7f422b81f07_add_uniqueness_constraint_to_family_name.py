"""Add uniqueness constraint to family name

Revision ID: e7f422b81f07
Revises: 1cee31df1adf
Create Date: 2023-10-22 23:57:21.536823

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e7f422b81f07'
down_revision = '1cee31df1adf'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('family', schema=None) as batch_op:
        batch_op.create_unique_constraint("uq_family_name", ["name"])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('family', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='unique')

    # ### end Alembic commands ###
