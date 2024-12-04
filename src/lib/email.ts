import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID = 'default_service';
const EMAILJS_TEMPLATE_ID = 'template_verification';
const EMAILJS_PUBLIC_KEY = 'your_public_key';

interface SendVerificationEmailParams {
  email: string;
  name: string;
  verificationToken: string;
}

export const sendVerificationEmail = async ({
  email,
  name,
  verificationToken,
}: SendVerificationEmailParams) => {
  try {
    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        to_email: email,
        to_name: name,
        verification_link: `${window.location.origin}/verify/${verificationToken}`,
      },
      EMAILJS_PUBLIC_KEY
    );
  } catch (error) {
    console.error('Failed to send verification email:', error);
    throw new Error('Failed to send verification email');
  }
};