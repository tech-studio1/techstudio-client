interface ContactConfirmationProps {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const ContactConfirmationTemplate: React.FC<
  Readonly<ContactConfirmationProps>
> = ({ name, email, subject, message }) => (
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
      Thank you for contacting us, {name}!
    </h2>

    <div style={{ margin: '20px 0' }}>
      <h3 style={{ color: '#555' }}>{`We've received your message:`}</h3>
      <div
        style={{
          backgroundColor: '#f8f9fa',
          padding: '15px',
          borderRadius: '5px',
          marginTop: '10px',
        }}
      >
        <p>
          <strong>Subject:</strong> {subject}
        </p>
        <p>
          <strong>Your Message:</strong>
        </p>
        <p style={{ whiteSpace: 'pre-wrap' }}>{message}</p>
      </div>
    </div>

    <div style={{ margin: '20px 0' }}>
      <p>
        We&apos;ll respond to <strong>{email}</strong> within 24-48 hours.
      </p>
    </div>

    <footer style={{ marginTop: '30px', color: '#666', fontSize: '0.9em' }}>
      <p>
        Best regards,
        <br />
        TechStudio Team
      </p>
    </footer>
  </div>
);

// Internal notification email for contact form submission
export const ContactInternalTemplate: React.FC<
  Readonly<ContactConfirmationProps>
> = ({ name, email, subject, message }) => (
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
      New Contact Form Submission: {subject}
    </h2>

    <div style={{ margin: '20px 0' }}>
      <h3 style={{ color: '#555' }}>Contact Details</h3>
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
          <strong>Email:</strong> <a href={`mailto:${email}`}>{email}</a>
        </p>
        <p>
          <strong>Subject:</strong> {subject}
        </p>
        <p>
          <strong>Message:</strong>
        </p>
        <p style={{ whiteSpace: 'pre-wrap' }}>{message}</p>
      </div>
    </div>

    <div style={{ margin: '20px 0' }}>
      <p style={{ color: '#dc3545', fontWeight: 'bold' }}>
        Please respond within 24 hours
      </p>
    </div>

    <footer style={{ marginTop: '30px', color: '#666', fontSize: '0.9em' }}>
      <p>This message was sent via website contact form</p>
    </footer>
  </div>
);
