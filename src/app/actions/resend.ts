'use server';
import {
  ContactConfirmationTemplate,
  ContactInternalTemplate,
} from '@/components/resend-templates/contact-us';
import { VendorEmailTemplate } from '@/components/resend-templates/product-order';
import {
  TicketUserConfirmation,
  TicketVendorAlert,
} from '@/components/resend-templates/submit-ticket';
import { Resend } from 'resend';

export async function handleOrderEmail(body: any) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const response = await resend.emails.send({
      from: 'New Order <info@techstudio.com.bd>',
      to: ['shaikhrijon22@gmail.com'],
      subject: `New Order Received (#${body.orderId})`,
      react: VendorEmailTemplate(body),
    });

    if (response.data) {
      return response.data;
    } else {
      return response.error;
    }

    // return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

export async function handleContacEmail(body: any) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const response = await resend.batch.send([
      {
        from: 'TechStudio <info@techstudio.com.bd>',
        to: [body.email],
        subject: `Thank you for contacting us, ${body.name}!`,
        react: ContactConfirmationTemplate(body),
      },
      {
        from: 'New Contact Form <info@techstudio.com.bd>',
        to: ['shaikhrijon22@gmail.com'],
        subject: `New Contact Form Submission: ${body.subject}`,
        react: ContactInternalTemplate(body),
      },
    ]);

    if (response.data) {
      return response.data;
    } else {
      return response.error;
    }

    // return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

export async function handleSubmitTicketEmail(body: any) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const response = await resend.batch.send([
      {
        from: 'TechStudio <info@techstudio.com.bd>',
        to: [body.email],
        subject: `Ticket Received: ${body.subject}`,
        react: TicketUserConfirmation(body),
      },
      {
        from: 'New Ticket <info@techstudio.com.bd>',
        to: ['shaikhrijon22@gmail.com'],
        subject: `New ${body?.category} Ticket`,
        react: TicketVendorAlert(body),
      },
    ]);

    if (response.data) {
      return response.data;
    } else {
      return response.error;
    }

    // return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
