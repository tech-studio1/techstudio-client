// User Confirmation Template
interface TicketProps {
  ticketId: string;
  name: string;
  email: string;
  subject: string;
  category: string;
  description: string;
}

export const TicketUserConfirmation: React.FC<Readonly<TicketProps>> = ({
  ticketId,
  name,
  subject,
  category,
  description,
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
      Ticket Received: {subject} (#{ticketId})
    </h2>

    <div style={{ margin: '20px 0' }}>
      <h3 style={{ color: '#555' }}>Ticket Details</h3>
      <div
        style={{
          backgroundColor: '#f8f9fa',
          padding: '15px',
          borderRadius: '5px',
          marginTop: '10px',
        }}
      >
        <p>
          <strong>Name:</strong> {name}
        </p>
        <p>
          <strong>Category:</strong> {category}
        </p>
        <p>
          <strong>Description:</strong>
        </p>
        <pre
          style={{
            whiteSpace: 'pre-wrap',
            fontFamily: 'inherit',
            margin: 0,
          }}
        >
          {description}
        </pre>
      </div>
    </div>

    <div style={{ margin: '20px 0' }}>
      <p>Our {category} support team will respond within 24-48 hours.</p>
    </div>

    <footer style={{ marginTop: '30px', color: '#666', fontSize: '0.9em' }}>
      <p>
        Best regards,
        <br />
        TechStudio Support Team
      </p>
    </footer>
  </div>
);

// Vendor Notification Template
export const TicketVendorAlert: React.FC<Readonly<TicketProps>> = ({
  ticketId,
  name,
  subject,
  category,
  description,
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
        color: '#fff',
        backgroundColor: '#2563eb',
        padding: '15px',
        borderRadius: '5px',
        marginBottom: '20px',
      }}
    >
      New {category} Ticket: #{ticketId}
    </h2>

    <div style={{ margin: '20px 0' }}>
      <h3 style={{ color: '#555' }}>Customer Details</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li>
          <strong>Name:</strong> {name}
        </li>
        <li>
          <strong>Subject:</strong> {subject}
        </li>
        <li>
          <strong>Priority:</strong>{' '}
          {category === 'technical' ? 'High' : 'Normal'}
        </li>
      </ul>
    </div>

    <div style={{ margin: '20px 0' }}>
      <h3 style={{ color: '#555' }}>Issue Description</h3>
      <div
        style={{
          backgroundColor: '#fff5f5',
          padding: '15px',
          borderRadius: '5px',
          border: '1px solid #fed7d7',
        }}
      >
        <pre
          style={{
            whiteSpace: 'pre-wrap',
            fontFamily: 'inherit',
            margin: 0,
          }}
        >
          {description}
        </pre>
      </div>
    </div>

    <div
      style={{
        margin: '20px 0',
        padding: '15px',
        backgroundColor: '#f0fdfa',
        borderRadius: '5px',
        border: '1px solid #99f6e4',
      }}
    >
      <h4 style={{ color: '#0d9488', marginTop: 0 }}>Action Required</h4>
      <p>
        Please respond to this ticket within 24 hours via our vendor portal:
      </p>
      {/* <a
        href="https://vendor.techstudio.com.bd/tickets/${ticketId}"
        style={{
          display: 'inline-block',
          padding: '10px 20px',
          backgroundColor: '#2563eb',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '5px',
          marginTop: '10px',
        }}
      >
        View Ticket in Dashboard
      </a> */}
    </div>

    <footer style={{ marginTop: '30px', color: '#666', fontSize: '0.9em' }}>
      <p>This ticket was generated from TechStudio.com.bd</p>
    </footer>
  </div>
);
