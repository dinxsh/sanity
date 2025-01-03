const ContactEmailTemplate = ({ username, message, fromEmail }) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px; background-color: #f9fafb;">
      <h1 style="font-size: 24px; color: #1f2937; text-align: center; margin-bottom: 20px;">
        New Contact Message
      </h1>
    
      <p style="font-size: 16px; color: #374151; margin-bottom: 10px;">
        Hello,
      </p>
      <p style="font-size: 16px; color: #374151; margin-bottom: 20px;">
        You have received a new message from your website's contact form:
      </p>
      <div style="padding: 15px; border: 1px solid #d1d5db; border-radius: 6px; background-color: #ffffff;">
        <p style="font-size: 16px; color: #111827; margin: 0;">
          <strong>Name:</strong> ${username}
        </p>
        <p style="font-size: 16px; color: #111827; margin: 0;">
          <strong>From:</strong> ${fromEmail}
        </p>
        <p style="font-size: 16px; color: #111827; margin: 0; margin-top: 10px;">
          <strong>Message:</strong>
        </p>
        <p style="font-size: 16px; color: #111827; margin: 0; margin-top: 5px;">
          ${message}
        </p>
      </div>
      <p style="font-size: 14px; color: #6b7280; margin-top: 20px; text-align: center;">
        This email was sent from your website's contact form.
      </p>
    </div>`;
};

export default ContactEmailTemplate;
