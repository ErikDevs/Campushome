import React from "react";

import { useGoogleRecaptcha } from "google-recaptcha-v3";

const RecaptchaProvider = ({ children }: { children: React.ReactNode }) => {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  if (!siteKey) {
    throw new Error(
      "NEXT_PUBLIC_RECAPTCHA_SITE_KEY is not defined in the environment variables."
    );
  }
  const action = "submit";
  useGoogleRecaptcha(siteKey, action);

  return <div>{children}</div>;
};

export default RecaptchaProvider;
