import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const params = new URLSearchParams();
    const allow = [
      "search",
      "location",
      "jobType",
      "salaryMin",
      "salaryMax",
    ] as const;
    allow.forEach((k) => {
      const v = searchParams.get(k);
      if (v) params.set(k, v);
    });
    const upstream = await fetch(
      `${process.env.BACKEND_URL}/jobs${params.toString() ? `?${params.toString()}` : ""
      }`,
      {
        cache: "no-store",
      }
    );
    const data = await upstream.json();
    return NextResponse.json(data, { status: upstream.status });
  } catch (e: unknown) {
    return NextResponse.json(
      {
        error: "Upstream error",
        message: e instanceof Error ? e.message : String(e ?? "")
      },
      { status: 500 }
    );
  }

}

export async function POST(req: Request) {
  try {
    const originalBody = await req.json();

    const body = {
      ...originalBody,
      requirements: "1-3 Exp",
      responsibilities: "responsibilities",
    };

    const upstream = await fetch(`${process.env.BACKEND_URL}/jobs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await upstream.json();

    return NextResponse.json(data, { status: upstream.status });
  } catch (e: unknown) {
    let message = "Unknown error";
    if (e instanceof Error) {
      message = e.message;
    }
    return NextResponse.json(
      { error: "Upstream error", message },
      { status: 500 }
    );
  }

}
