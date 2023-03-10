import type { NextRequest, NextResponse } from "next/server";

const handler = async (req: NextRequest, res: NextResponse) => {
  res.status(200).json({ name: "John Doe" });
};

export default handler;
