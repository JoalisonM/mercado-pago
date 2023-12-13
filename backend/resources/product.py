import os
import uuid
import mercadopago
from dotenv import load_dotenv
from flask_restful import Resource, reqparse, marshal

from helpers.log import logger
from model.message import Message, msgFields
from model.product import preferenceFields, paymentFields

load_dotenv()

parser = reqparse.RequestParser()

parser.add_argument("id", type=int, help="Id não informado", required=False)
parser.add_argument("title", type=str, help="Título não informado", required=False)
parser.add_argument("unit_price", type=float, help="Preço unitário não informado", required=False)
parser.add_argument("success_url", type=str, help="URL de sucesso não informada", required=False)
parser.add_argument("failure_url", type=str, help="URL de falha não informada", required=False)
parser.add_argument("payment_data", type=dict, help="payment_data não informado", required=False)

class ProductPreference(Resource):
  def __init__(self):
    self.mercadoPagoKey = os.getenv("MERCADO_PAGO_SECRET_KEY")
    self.sdk = mercadopago.SDK(self.mercadoPagoKey)

  def post(self):
    try:
      args = parser.parse_args()

      preference_data = {
        "items": [
          {
            "id": args["id"],
            "quantity": 1,
            "title": args["title"],
            "unit_price": args["unit_price"],
            "currency_id": "BRL",
            "category_id": "others",
          }
        ],
        "back_urls": {
          "success": args["success_url"],
          "failure": args["failure_url"],
        }
      }

      preference_response = self.sdk.preference().create(preference_data)
      preference = preference_response["response"]

      return (marshal(preference, preferenceFields), 200)
    except:
      codigo = Message(2, "Erro ao criar preferência")
      return marshal(codigo, msgFields), 400

class ProductPayment(Resource):
  def __init__(self):
    self.mercadoPagoKey = os.getenv("MERCADO_PAGO_SECRET_KEY")
    self.sdk = mercadopago.SDK(self.mercadoPagoKey)
    self.request_options = mercadopago.config.RequestOptions()
    self.request_options.custom_headers = {
        'x-idempotency-key': str(uuid.uuid4())
    }


  def post(self):
    args = parser.parse_args()
    payment_response = self.sdk.payment().create(args["payment_data"], self.request_options)
    payment = payment_response["response"]

    if(payment["status"] == "success"):
      pass

    return (payment, 200)
