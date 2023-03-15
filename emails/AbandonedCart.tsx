import React from "react";
import { MjmlSection, MjmlColumn, MjmlImage } from "mjml-react";
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
  imageUrls: string[];
};

const AccountCreated = ({
  subject,
  body,
  buttonText,
  buttonUrl,
  imageUrls,
}: AccountCreatedProps) => (
  <Base width={600}>
    <Header loose />
    <MjmlSection cssClass="gutter">
      <MjmlColumn>
        <Heading fontSize={fontSize.xl}>{subject}</Heading>
        <Text paddingTop={spacing.s7} paddingBottom={spacing.s7}>
          {body}
        </Text>
        <MjmlSection cssClass="lg-gutter" paddingBottom={spacing.s9}>
          {imageUrls &&
            imageUrls.length &&
            imageUrls.map((url, index) => (
              <MjmlColumn>
                <MjmlImage width={"200px"} src={url} key={index} />
              </MjmlColumn>
            ))}
        </MjmlSection>
        <Button href={buttonUrl}>{buttonText}</Button>
        <Text paddingTop={spacing.s7}>
          Enjoy!
          <br />
          testing store
        </Text>
      </MjmlColumn>
    </MjmlSection>
    <Footer />
  </Base>
);

export default AccountCreated;
