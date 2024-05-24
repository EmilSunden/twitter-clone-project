// pages/api/tweets.ts

import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import {
  Tweets,
  Like,
  Profile,
  likes,
  profiles,
  tweets,
  tweetsReplies,
} from "@/lib/db/schema";
import { desc, eq, exists, and } from "drizzle-orm";
import { NextResponse, NextRequest } from "next/server";

// export async function GET(req: NextRequest, res: NextResponse) {

// }

// export async function PATCH(req: NextRequest, res: NextResponse) {

// }
