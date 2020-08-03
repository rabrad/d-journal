const config = require('config');
const sgMail = require('@sendgrid/mail');

const sendGridApiKey = config.get('SENDGRID_API_KEY');
sgMail.setApiKey(sendGridApiKey);

const template = (name, firstText, linkPath, secondText, linkText) => {
  return `
  <html lang="en">
  <head>
    <style>
      .container {
        width: 50%;
        margin: 0 auto;
      }
      .header-wrapper {
        background: #1b4161;
        color: #fff;
        padding: 0.1rem 0;
        text-align: center;
        font-family: sans-serif;
        border-radius: 10px 10px 0 0;
      }
      .display-4 {
        font-size: 30px;
        letter-spacing: 0.1rem;
      }
      h4 {
        font-family: sans-serif;
        font-size: large;
      }

      .message-container {
        background: #f0efef;
        padding: 1rem 3rem;
        border-radius: 0 0 10px 10px;
      }
      p {
        font-size: 16px;
        font-family: sans-serif;
      }
      a.btn {
        display: inline-block;
        text-decoration: none;
        padding: 0.4rem 1.3rem;
        font-size: 1rem;
        border: none;
        cursor: pointer;
        margin-right: 0.5rem;
        transition: opacity 0.2s ease-in;
        outline: none;
        background: #d68101;
        color: #fff;
        border-radius: 6px;
      }
      .second-text {
        font-size: 12px;
        margin-top: 1.5rem;
      }
    </style>
    <title>Dev Journal App</title>
  </head>

  <body>
    <div class="container">
      <div class="header-wrapper">
        <p class="display-4 text-center">Dev Journal</p>
      </div>
      <section style="height: 40vh;">
        <div class="message-container">
          <h4>Hello ${name}</h4>
          <p>
            ${firstText}
          </p>
          <a href="${linkPath}" class="btn btn-dark">${linkText}</a>

          <p class="second-text">
            ${secondText}
          </p>
        </div>
      </section>
    </div>
  </body>
</html>

  `;
};

const forgetPasswordEmail = async (name, email, link) => {
  const mailOptions = {
    to: email,
    from: 'rabeerd@gmail.com',
    name: 'Dev Journal',
    subject: 'Password change request',
    html: template(
      name,
      `Please click on the following link to reset your password.`,
      link,
      ` If you did not request this, please ignore this email and your password will remain unchanged.`,
      `Change Your Password`
    ),
    text: `Hello ${name} \n
       Please click on the following link ${link} to reset your password. \n\n
       If you did not request this, please ignore this email and your password will remain unchanged.\n`,
  };
  try {
    await sgMail.send(mailOptions);
  } catch (error) {
    console.error(error.message);
  }
};

const resetPasswordEmail = async (name, email, link) => {
  const mailOptions = {
    to: email,
    from: 'rabeerd@gmail.com',
    name: 'DevJournal',
    subject: 'Your password has been changed',
    html: template(
      name,
      `This is a confirmation that the password for your account ${email} has just been changed.`,

      `${link}`,
      ` `,
      `Back to your journal`
    ),
    text: `Hello ${name} \n
          This is a confirmation that the password for your account ${email} has just been changed.\n`,
  };
  try {
    await sgMail.send(mailOptions);
  } catch (error) {
    // throw error.message;
    console.error(error.message);
  }
};

const reminderNote = async (name, email, title, reminder, link) => {
  const mailOptions = {
    to: email,
    from: 'aboal7anan@gmail.com',
    name: 'DevJournal',
    subject: 'Note reminder',
    html: template(
      name,
      `This is a reminder of your <strong> ${title}</strong> note for this date ${reminder}.\n
      Please click the button below  to review your note`,
      link,
      '',
      'Review'
    ),
    text: `Hello ${name} \n
    This is a reminder of your note ${title} for this data ${reminder}.
    Please click the button below ${link} to review your note`,
  };
  try {
    await sgMail.send(mailOptions);
  } catch (error) {
    // throw error.message;
    console.error(error.message);
  }
};

module.exports = {
  forgetPasswordEmail,
  resetPasswordEmail,
  reminderNote,
};
