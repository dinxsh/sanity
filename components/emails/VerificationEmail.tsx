import Head from "next/head";
import React from "react";

interface VerificationEmailProps {
  username: string;
  otp: string;
}

export default function VerificationEmailProps({
  username,
  otp,
}: VerificationEmailProps) {
  return (
    <html lang="en" dir="ltr">
      <Head>
        <title>Verification Code</title>
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400&display=swap');
            body {
              font-family: 'Roboto', Verdana, sans-serif;
            }
          `}
        </style>
      </Head>
      <body>
        <section>
          <div>
            <h2>Hello {username},</h2>
          </div>
          <div>
            <p>
              Thank you for registering. Please use the following verification
              code to complete your registration:
            </p>
          </div>
          <div>
            <p>{otp}</p>
          </div>
          <div>
            <p>If you did not request this code, please ignore this email.</p>
          </div>
          {/* <div>
            <a href={`http://localhost:3000/verify/${username}`} style={{ color: '#61dafb' }}>
              Verify here
            </a>
          </div> */}
        </section>
      </body>
    </html>
  );
}
