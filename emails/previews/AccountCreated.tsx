import React from "react";
import AccountCreated from "../AccountCreated";
import emailJson from "../emails.json";

export async function accountCreated() {
  const { generatedDescs } = emailJson;
  console.log(generatedDescs, typeof generatedDescs);
  const { subject, body } = JSON.parse(generatedDescs);
  return <AccountCreated subject={subject} body={body} />;
}
