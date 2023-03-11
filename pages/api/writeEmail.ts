import type { NextRequest, NextResponse } from "next/server";
import fs from "fs";

const handler = async (req: any, res: any) => {
  fs.writeFileSync("./emails/emails.json", JSON.stringify(req.body), "utf-8");

  res.status(200).json({ data: req.body });
};

export default handler;
