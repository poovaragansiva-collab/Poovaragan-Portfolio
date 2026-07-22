import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";
import { getDb } from "@/lib/mongodb";
import { sendContactNotification } from "@/lib/email";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, message } = parsed.data;
    const db = await getDb();

    await db.collection("contact_submissions").insertOne({
      name,
      email,
      message,
      createdAt: new Date(),
      notified: false,
    });

    sendContactNotification({ name, email, message }).catch((err) =>
      console.error("Contact email notification failed:", err)
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
