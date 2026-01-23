import CryptoJS from 'crypto-js';
import { useNavigate } from 'react-router-dom';

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const shippingAddress = JSON.parse(localStorage.getItem('shippingAddress')) || {};
  const itemsPrice = cartItems.reduce((acc,item)=>acc+item.price*item.qty,0);
  const taxPrice = Number((0.13*itemsPrice).toFixed(2));
  const totalAmount = Number((itemsPrice+taxPrice).toFixed(2));

  const payWithEsewa = () => {
  const path = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";
  const secretKey = "8gBm/:&EnhH.1/q"; 
  const productCode = "EPAYTEST";
  const transactionUuid = `ORD-${Date.now()}`;

  // 1. Ensure math is strictly two decimal places
  const totalAmt = Number(totalAmount.toFixed(2));

  // 2. BUILD THE SIGNATURE STRING CAREFULLY
  // Note: NO spaces allowed after commas!
  const signatureString = `total_amount=${totalAmt},transaction_uuid=${transactionUuid},product_code=${productCode}`;
  
  // 3. GENERATE HASH
  const hash = CryptoJS.HmacSHA256(signatureString, secretKey);
  const signature = CryptoJS.enc.Base64.stringify(hash);

  // 4. PREPARE PARAMETERS
  const params = {
    amount: itemsPrice,
    tax_amount: taxPrice,
    total_amount: totalAmt,
    transaction_uuid: transactionUuid,
    product_code: productCode,
    product_service_charge: 0,
    product_delivery_charge: 0,
    success_url: "http://localhost:5173/esewa_payment_success",
    failure_url: "http://localhost:5173/esewa_payment_failed",
    signed_field_names: "total_amount,transaction_uuid,product_code",
    signature: signature,
  };

  // 5. POST FORM
  const form = document.createElement("form");
  form.setAttribute("method", "POST");
  form.setAttribute("action", path);

  for (let key in params) {
    const hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", key);
    hiddenField.setAttribute("value", params[key]);
    form.appendChild(hiddenField);
  }

  document.body.appendChild(form);
  form.submit();
};

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-bold mb-4 border-b pb-2">Shipping Information</h2>
            <p className="text-gray-700">
              <strong>Address:</strong> {shippingAddress.address}, {shippingAddress.city}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-bold mb-4 border-b pb-2">Order Items</h2>
            {cartItems.map((item, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b last:border-0">
                <span>{item.name} (x{item.qty})</span>
                <span className="font-semibold">${(item.qty * item.price).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl border shadow-sm h-fit">
          <h2 className="text-xl font-bold mb-6">Order Summary</h2>
          <div className="space-y-3">
            <div className="flex justify-between text-gray-600">
              <span>Items Subtotal:</span>
              <span>${itemsPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Tax (13% VAT):</span>
              <span>${taxPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-4 mt-4">
              <span>Total Amount:</span>
              <span className="text-green-600">${totalAmount.toFixed(2)}</span>
            </div>
          </div>

          <button 
            onClick={payWithEsewa}
            className="w-full mt-8 bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition-colors"
          >
            Pay with eSewa
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;