from flask_restful import fields
from helpers.database import db

itemsFields = {
  "id": fields.Integer,
  "title": fields.String,
  "currency_id": fields.String,
  "quantity": fields.Integer,
  "unit_price": fields.Float,
}

backUrlsFields = {
  "success": fields.String,
  "failure": fields.String,
}

payerFields = {
  "id": fields.String,
  "email": fields.String,
  "identification": fields.Nested({
    "number": fields.String,
    "type": fields.String
  }),
  "type": fields.String
}

preferenceFields = {
  "id": fields.String,
  "collector_id": fields.String,
  "date_created": fields.String,
  "items": fields.Nested(itemsFields),
  "back_urls": fields.Nested(backUrlsFields),
}

paymentFields = {
  "id": fields.String,
  "date_created": fields.String,
  "date_approved": fields.String,
  "status": fields.String,
  "currency_id": fields.String,
  "payer": fields.Nested(payerFields),
}