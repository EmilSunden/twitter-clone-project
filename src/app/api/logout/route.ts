import { NextRequest, NextResponse } from "next/server";
import { createSSRClient } from "@/utils/supabase/server";

export async function DELETE(req: NextRequest) {
  try {
    // Create Supabase client
    const supabase = createSSRClient();

    // Attempt to sign out the user
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Logout error:", error);
      return new NextResponse(
        JSON.stringify({
          message: "Error during user logout",
          error: error.message,
        }),
        { status: 500 }
      );
    }

    // If logout is successful
    return new NextResponse(
      JSON.stringify({ message: "User logged out successfully" }),
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Logout error:", error);
    // Handle the error properly
    if (error instanceof Error) {
      return new NextResponse(
        JSON.stringify({
          message: "Internal server error",
          error: error.message,
        }),
        { status: 500 }
      );
    } else {
      return new NextResponse(
        JSON.stringify({ message: "Internal server error" }),
        { status: 500 }
      );
    }
  }
}
