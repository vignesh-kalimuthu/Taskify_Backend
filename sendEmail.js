export const sendResetEmail = async (toEmail, token) => {
  const resetURL = `${process.env.FRONTEND_URL}/reset-password/${token}`;

  const mailOptions = {
    from: process.env.SMTP_FROM,
    to: toEmail,
    subject: "Reset Your Password",
    html: `
      <h2>Password Reset</h2>
      <p>Click the link below to reset your password:</p>
      <a href="${resetURL}">Reset Password</a>
      <p>If you didn’t request this, ignore this email.</p>
    `,
  };

  await mailTransporter.sendMail(mailOptions);
};
