import type { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import { join, relative } from "path";
import { render } from "mjml-react";
import Basic from "../../emails/Basic";
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
  let { generatedDescs } = req.body;
  if (!generatedDescs || typeof generatedDescs !== "string")
    return res.status(400).json({ error: "No data" });
  if (generatedDescs[0] !== "{") generatedDescs = "{" + generatedDescs;
  const { category, title, content, buttonUrl, buttonText, imageUrls } =
    JSON.parse(generatedDescs);
  const template = TEMPLATES[category] || Basic;

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
