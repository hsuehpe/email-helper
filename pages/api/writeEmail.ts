import type { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import { join, relative } from "path";
import { render } from "mjml-react";
import AccountCreated from "../../emails/Basic";
import Welcome from "../../emails/Welcome";
import AbandonedCart from "../../emails/AbandonedCart";

const DIST_DIR = join(process.cwd(), "previews_html");
const TEMPLATES: {
  [key: string]: any;
} = {
  Welcome: Welcome,
  AbandonedCart: AbandonedCart,
};

const handler = async (req: any, res: any) => {
  fs.writeFileSync("./emails/emails.json", JSON.stringify(req.body), "utf-8");
  if (!fs.existsSync(DIST_DIR)) fs.mkdirSync(DIST_DIR);
  const { generatedDescs } = req.body;
  console.log(generatedDescs);
  const { category, title, content, buttonUrl, buttonText, imageUrls } =
    JSON.parse(generatedDescs);
  const template = TEMPLATES[category] || AccountCreated;

  try {
    const { html } = render(
      template({ title, content, buttonUrl, buttonText, imageUrls }),
      {
        validationLevel: "soft",
      }
    );

    const htmlPath = join(DIST_DIR, `${category ?? "others"}.html`);
    fs.writeFileSync(htmlPath, html, "utf-8");

    res.status(200).json({ data: req.body });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

export default handler;
