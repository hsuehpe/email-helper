import React from "react";
import { MjmlSection, MjmlColumn, MjmlImage } from "mjml-react";
import { Template } from "mailing-core";
import Button from "./components/Button";
import Header from "./components/Header";
import Heading from "./components/Heading";
import Footer from "./components/Footer";
import Base from "./layouts/Base";
import Text from "./components/Text";
import { spacing, fontSize } from "./theme";

type AccountCreatedProps = {
  subject: string;
  body: string;
  buttonText: string;
  buttonUrl: string;
};

const AccountCreated: Template<AccountCreatedProps> = ({
  subject,
  body,
  buttonText,
  buttonUrl,
}) => (
  <Base width={600}>
    <Header loose />
    <MjmlSection cssClass="lg-gutter" paddingBottom={spacing.s9}>
      <MjmlColumn>
        <MjmlImage
          align="left"
          src="https://s3.amazonaws.com/lab.campsh.com/bb-hero%402x.jpg"
        />
      </MjmlColumn>
    </MjmlSection>
    <MjmlSection cssClass="gutter">
      <MjmlColumn>
        <Heading fontSize={fontSize.xl}>{subject}</Heading>
        <Text paddingTop={spacing.s7} paddingBottom={spacing.s7}>
          {body}
        </Text>
        <Button href={buttonUrl}>{buttonText}</Button>
        <Text paddingTop={spacing.s7}>
          Enjoy!
          <br />
          testing store
        </Text>
      </MjmlColumn>
    </MjmlSection>
    <Footer includeUnsubscribe />
  </Base>
);

AccountCreated.subject = ({ subject }) => `${subject}`;

export default AccountCreated;
