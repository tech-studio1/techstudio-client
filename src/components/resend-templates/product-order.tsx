import * as React from 'react';

export const VendorEmailTemplate: React.FC<Readonly<any>> = ({
  orderId,
  clientInfo,
  orderItems,
  order_cost,
}) => (
  <div
    style={{
      fontFamily: 'Arial, sans-serif',
      maxWidth: '600px',
      margin: '0 auto',
    }}
  >
    <h2
      style={{
        color: '#333',
        borderBottom: '2px solid #eee',
        paddingBottom: '10px',
      }}
    >
      New Order Received (#{orderId})
    </h2>

    <div style={{ margin: '20px 0' }}>
      <h3 style={{ color: '#555' }}>Payment Method</h3>
      <p>{clientInfo.paymentMethod}</p>
    </div>

    <div style={{ margin: '20px 0' }}>
      <h3 style={{ color: '#555' }}>Shipping Address</h3>
      <p>
        {clientInfo.shippingAddress.firstName}{' '}
        {clientInfo.shippingAddress.lastName}
        <br />
        {clientInfo.shippingAddress.address}
        <br />
        {clientInfo.shippingAddress.area}, {clientInfo.shippingAddress.city}
        <br />
        {clientInfo.shippingAddress.district}
        <br />
        Phone: {clientInfo.shippingAddress.mobile}
      </p>
    </div>

    <h3 style={{ color: '#555' }}>Order Items</h3>
    <table
      style={{ width: '100%', borderCollapse: 'collapse', margin: '20px 0' }}
    >
      <thead>
        <tr style={{ backgroundColor: '#f5f5f5' }}>
          <th style={{ padding: '10px', textAlign: 'left' }}>Product</th>
          <th style={{ padding: '10px', textAlign: 'left' }}>Color</th>
          <th style={{ padding: '10px', textAlign: 'left' }}>Quantity</th>
          <th style={{ padding: '10px', textAlign: 'left' }}>Price</th>
        </tr>
      </thead>
      <tbody>
        {orderItems.map((item: any, index: any) => (
          <tr key={index} style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '10px' }}>
              {item.id.split(':').pop()?.toUpperCase()}
            </td>
            <td style={{ padding: '10px' }}>{item.variantInfo.color_name}</td>
            <td style={{ padding: '10px' }}>{item.quantity}</td>
            <td style={{ padding: '10px' }}>
              ৳{(item.costPerItem.price * item.quantity).toFixed(2)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    <div style={{ marginTop: '20px', textAlign: 'right' }}>
      <p>Subtotal: ৳{order_cost.items_cost.toFixed(2)}</p>
      <p>Shipping: ৳{order_cost.shipping.toFixed(2)}</p>
      <h4 style={{ fontSize: '1.2em', marginTop: '10px' }}>
        Total: ৳{order_cost.total_cost.toFixed(2)}
      </h4>
    </div>

    <footer style={{ marginTop: '30px', color: '#666', fontSize: '0.9em' }}>
      <p>Please prepare the order for shipping within 24 hours.</p>
      <p>
        Best regards,
        <br />
        Your Store Team
      </p>
    </footer>
  </div>
);
