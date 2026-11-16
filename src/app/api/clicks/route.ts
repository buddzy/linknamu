import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { profile } from "@/data/profile";

export const dynamic = "force-dynamic";

type ClickDoc = { _id: string; count: number };

const linkIds = new Set(profile.links.map((link) => link.id));

// 링크별 클릭 수 조회: { github: 3, blog: 1, ... }
export async function GET() {
  const db = await getDb();
  if (!db) return NextResponse.json({});

  const docs = await db.collection<ClickDoc>("clicks").find().toArray();
  const counts = Object.fromEntries(docs.map((doc) => [doc._id, doc.count]));
  return NextResponse.json(counts);
}

// 링크 클릭 1회 기록: body { id: "github" }
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const id = body?.id;
  if (typeof id !== "string" || !linkIds.has(id)) {
    return NextResponse.json({ error: "알 수 없는 링크입니다." }, { status: 400 });
  }

  const db = await getDb();
  if (!db) {
    return NextResponse.json({ error: "MONGODB_URI가 설정되지 않았습니다." }, { status: 503 });
  }

  const result = await db
    .collection<ClickDoc>("clicks")
    .findOneAndUpdate(
      { _id: id },
      { $inc: { count: 1 } },
      { upsert: true, returnDocument: "after" },
    );
  return NextResponse.json({ id, count: result?.count ?? 1 });
}
