import React from "react";
import Welcome from "../Welcome";
import emailJson from "../emails.json";

export async function welcome() {
  const { generatedDescs } = emailJson;
  const { subject, body, buttonUrl, buttonText } = JSON.parse(generatedDescs);
  return (
    <Welcome
      subject={subject}
      body={body}
      buttonText={buttonText}
      buttonUrl={buttonUrl}
    />
  );
}
