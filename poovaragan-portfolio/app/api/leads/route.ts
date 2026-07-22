import { NextRequest, NextResponse } from "next/server";
import { leadSchema } from "@/lib/validations";
import { getDb } from "@/lib/mongodb";
import { sendLeadNotification } from "@/lib/email";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = leadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const lead = parsed.data;
    const db = await getDb();

    const result = await db.collection("leads").insertOne({
      ...lead,
      status: "new",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    sendLeadNotification({
      name: lead.name,
      email: lead.email,
      company: lead.company,
      projectDetails: lead.projectDetails,
      source: lead.source,
    }).catch((err) => console.error("Lead email notification failed:", err));

    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (err) {
    console.error("Leads route error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
