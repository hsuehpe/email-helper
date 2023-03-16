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
import parse from "html-react-parser";

type WelcomeProps = {
  title: string;
  content: string;
  buttonText: string;
  buttonUrl: string;
};

const Welcome = ({ title, content, buttonText, buttonUrl }: WelcomeProps) => (
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
        <Heading fontSize={fontSize.xl}>{title ?? ""}</Heading>
        <Text paddingTop={spacing.s7} paddingBottom={spacing.s7}>
          {parse(content) ?? ""}
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

export default Welcome;
