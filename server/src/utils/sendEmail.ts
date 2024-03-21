import sgClient from '../config/sendGridClient';
import { emailTemplates } from '../config/constants';

const SENDGRID_EMAIL = process.env.SENDGRID_EMAIL as string;
const PRODUCTION_URL = process.env.PRODUCTION_URL as string;

async function passwordReset(
  email: string,
  routeParameter: string
): Promise<void> {
  const resetLink = `${PRODUCTION_URL}/reset-password/${routeParameter}`;

  await sgClient.send({
    to: email,
    from: SENDGRID_EMAIL,
    subject: emailTemplates.passwordReset.subject.replaceAll(
      '[Your Account]',
      email
    ),
    text: emailTemplates.passwordReset.text
      .replaceAll('[Your Account Name]', email)
      .replaceAll('[Password Reset Link]', resetLink),
  });
}

async function churckKnownConnect(
  email: string,
  churchName: string,
  userName: string,
  userEmail: string
): Promise<void> {
  await sgClient.send({
    to: email,
    from: SENDGRID_EMAIL,
    subject: emailTemplates.churchKnownConnect.subject,
    text: emailTemplates.churchKnownConnect.text
      .replaceAll('[Church Name]', churchName)
      .replaceAll('[Student Name]', userName)
      .replaceAll('[Student Email]', userEmail),
  });

  // Send copy to ChurchSearch Email
  await sgClient.send({
    to: SENDGRID_EMAIL,
    from: SENDGRID_EMAIL,
    subject: emailTemplates.churchKnownConnect.subject,
    text: emailTemplates.churchKnownConnect.text
      .replaceAll('[Church Name]', churchName)
      .replaceAll('[Student Name]', userName)
      .replaceAll('[Student Email]', userEmail),
  });
}

async function churchUnknownConnect(
  email: string,
  churchName: string,
  userName: string,
  userEmail: string
): Promise<void> {
  await sgClient.send({
    to: email,
    from: SENDGRID_EMAIL,
    subject: emailTemplates.churchUnknownConnect.subject,
    text: emailTemplates.churchUnknownConnect.text
      .replaceAll('[Church Name]', churchName)
      .replaceAll('[Student Name]', userName)
      .replaceAll('[Student Email]', userEmail),
  });

  // Send Copy to ChurchSearch Email
  await sgClient.send({
    to: email,
    from: SENDGRID_EMAIL,
    subject: emailTemplates.churchUnknownConnect.subject,
    text: emailTemplates.churchUnknownConnect.text
      .replaceAll('[Church Name]', churchName)
      .replaceAll('[Student Name]', userName)
      .replaceAll('[Student Email]', userEmail),
  });
}

async function studentConnect(
  email: string,
  userName: string,
  userEmail: string
): Promise<void> {
  await sgClient.send({
    to: email,
    from: SENDGRID_EMAIL,
    subject: emailTemplates.studentConnect.subject,
    text: emailTemplates.studentConnect.text
      .replaceAll('[Student Name]', userName)
      .replaceAll('[Student Email]', userEmail),
  });

  // Send Copy to ChurchSearch Email
  await sgClient.send({
    to: SENDGRID_EMAIL,
    from: SENDGRID_EMAIL,
    subject: emailTemplates.studentConnect.subject,
    text: emailTemplates.studentConnect.text
      .replaceAll('[Student Name]', userName)
      .replaceAll('[Student Email]', userEmail),
  });
}

async function contactRequest(
  name: string,
  email: string,
  subject: string,
  message: string
): Promise<void> {
  await sgClient.send({
    to: SENDGRID_EMAIL,
    from: SENDGRID_EMAIL,
    subject: emailTemplates.contactRequest.subject.replaceAll('[name]', name),
    text: emailTemplates.contactRequest.text
      .replaceAll('[name]', name)
      .replaceAll('[email]', email)
      .replaceAll('[subject]', subject)
      .replaceAll('[message]', message),
  });
}

async function websiteFeedback(
  email: string,
  navigation: string,
  filters: string,
  testimonials: string,
  recommendations: string,
  feedback: string
): Promise<void> {
  await sgClient.send({
    to: SENDGRID_EMAIL,
    from: SENDGRID_EMAIL,
    subject: emailTemplates.websiteFeedback.subject,
    text: emailTemplates.websiteFeedback.text
      .replaceAll('[email]', email)
      .replaceAll('[navigation]', navigation)
      .replaceAll('[filters]', filters)
      .replaceAll('[testimonials]', testimonials)
      .replaceAll('[recommendations]', recommendations)
      .replaceAll('[feedback]', feedback),
  });
}

async function addChurchRequest(
  name: string,
  email: string,
  church: string,
  message: string
): Promise<void> {
  await sgClient.send({
    to: SENDGRID_EMAIL,
    from: SENDGRID_EMAIL,
    subject: emailTemplates.addChurchRequest.subject.replaceAll(
      '[church]',
      church
    ),
    text: emailTemplates.addChurchRequest.text
      .replaceAll('[name]', name)
      .replaceAll('[email]', email)
      .replaceAll('[church]', church)
      .replaceAll('[message]', message),
  });
}

async function signUp(first: string, email: string): Promise<void> {
  await sgClient.send({
    to: email,
    from: SENDGRID_EMAIL,
    subject: emailTemplates.signUp.subject,
    text: emailTemplates.signUp.text.replaceAll('[User First Name]', first),
  });
}

export default {
  signUp,
  addChurchRequest,
  websiteFeedback,
  contactRequest,
  churchUnknownConnect,
  churckKnownConnect,
  studentConnect,
  passwordReset,
};
