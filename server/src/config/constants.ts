import type { IChurch } from '..';

export const STATES = [
  'AL',
  'AK',
  'AS',
  'AZ',
  'AR',
  'CA',
  'CO',
  'CT',
  'DE',
  'DC',
  'FM',
  'FL',
  'GA',
  'GU',
  'HI',
  'ID',
  'IL',
  'IN',
  'IA',
  'KS',
  'KY',
  'LA',
  'ME',
  'MH',
  'MD',
  'MA',
  'MI',
  'MN',
  'MS',
  'MO',
  'MT',
  'NE',
  'NV',
  'NH',
  'NJ',
  'NM',
  'NY',
  'NC',
  'ND',
  'MP',
  'OH',
  'OK',
  'OR',
  'PW',
  'PA',
  'PR',
  'RI',
  'SC',
  'SD',
  'TN',
  'TX',
  'UT',
  'VT',
  'VI',
  'VA',
  'WA',
  'WV',
  'WI',
  'WY',
];

export const DAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export const DENOMINATIONS = [
  'Acts 29',
  'Anglican',
  'Baptist',
  'Evangelical Free Church of America',
  'Episcopal',
  'Lutheran',
  'Methodist',
  'Non-Denominational',
  'Pentecostal',
  'Presbyterian',
  'Protestant',
  'Seventh-Day Adventist',
  'Church of Christ',
];

export const SERVICE_CATEGORIES = [
  'Early Sunday Morning',
  'Late Sunday Morning',
  'Sunday Afternoon',
  'Saturday',
];

export const WORSHIP = ['Modern', 'Traditional', 'Mix'];

export const PREACHING = ['Passage-Based', 'Verse-By-Verse', 'Theme-Based'];

export const MINISTRY = [
  'Married Young Adult',
  "Men's College",
  'Small Groups',
  "Women's College",
];

export const VIBE = ['Modern', 'Traditional', 'Mix'];

export const ATTENDANCE = [
  'Very Small',
  'Small',
  'Medium',
  'Large',
  'Very Large',
];

export const ROLES = ['user', 'church', 'admin'];

export const ACCEPTED_EXTENSIONS = ['image/png', 'image/jpg', 'image/jpeg'];

export const SUBJECTS = ['Business', 'Media', 'Miscellaneous'];

export const SEARCH_FIELDS: Array<keyof IChurch> = [
  'name',
  'pastorName',
  'denomination',
  'ministry',
  'preaching',
  'city',
];

export const CONTACT_TYPE = ['known', 'unknown', 'student'];

export const emailTemplates = {
  passwordReset: {
    subject: 'Password Reset Request for [Your Account]',
    text: `
Hello,

We have received a request to reset the password for your account. To ensure the security of your account, we are providing you with the necessary instructions to reset your password.

If you did not initiate this request, please disregard this email. Your account remains secure, and no further action is required.

To proceed with the password reset, please follow the steps below:

1. Click on the link below to access the password reset page: 

2. You will be redirected to a secure page where you can enter your new password. For security purposes, please choose a strong and unique password.

3. After submitting your new password, you will receive a confirmation email to verify the password reset.

If you encounter any issues or have any questions related to the password reset process, please do not hesitate to contact our support team at this email.

To ensure the safety of your account, we recommend that you avoid sharing your login credentials with anyone and regularly update your password.
Thank you for your prompt attention to this matter. If you did not request a password reset, kindly inform us immediately to investigate further.

Reset Password Link: [Password Reset Link]

Best regards,

ChurchSearch
hello@churchsearch.me
    `,
  },
  churchKnownConnect: {
    subject: 'Action Required: New Student from ChurchSearch Wants To Connect!',
    text: `
Hi [Church Name]!

A new student from ChurchSearch wants to connect with your church:

[Student Name]
[Student Email]

Please reach out to them and give them a warm welcome! You can answer their questions, connect them with other students at your church, or assist them however you would like. We look forward to connecting you with more students!

Best,
The ChurchSearch Team`,
  },
  churchUnknownConnect: {
    subject:
      "We're UT students helping students find churches. Does your church want to help?",
    text: `
Hi [Church Name]!

We are ChurchSearch, a website built by UT students that connects other students to
churches in Austin. A new student from ChurchSearch wants to learn more about your church:

[Student Name]
[Student Email]

Please feel free to reach out to them and give them a warm welcome! You can answer their
questions, connect them with other students at your church, or assist them however you would
like.

If you would like to get connected with more students like this one, please let us know!

Best,
The ChurchSearch Team`,
  },
  studentConnect: {
    subject: 'Action Required: New Student From ChurchSearch Wants To Connect!',
    text: `
Hi ChurchSearch Buddy!

A new student from ChurchSearch wants to connect with you:

[Student Name]
[Student Email]

Please reach out to them and introduce yourself! You can answer their questions, offer to sit with them at church, or assist them however you would like.

Thank you very much for playing an important part in fulfilling our mission!

Best,
The ChurchSearch Team`,
  },
  contactRequest: {
    subject: 'Contact Request: [name]',
    text: `
Name: [name]

Email: [email]

Company: [company]

Subject: [subject]

Message: [message]
`,
  },
  websiteFeedback: {
    subject: 'ChurchSearch Feedback',
    text: `
Email: [email]

Navigation: [navigation]

Filters: [filters]

Testimonials: [testimonials]

Recommendations: [recommendations]

General Feedback: [feedback]
`,
  },
  addChurchRequest: {
    subject: 'Add Church Request: [church]',
    text: `
Name: [name]

Email: [email]

Church: [church]

Message: [message]
`,
  },
  signUp: {
    subject: 'Thanks for joining the ChurchSearch Family!',
    text: `
Hi [User First Name],

We’re excited to help you find your perfect church home! Feel free to browse our filters and learn more about the in-person experience at each church by reading testimonials from other students and church staff.

When you’re interested in connecting with a church, click the “Connect” button and we’ll send your contact info to the church or student just like that!

Happy searching,

The ChurchSearch Team`,
  },
};
