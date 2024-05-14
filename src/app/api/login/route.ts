import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const {email, password} = body;

        // Ensure email and password are provided
        if(!email || !password) {
            return new Response(JSON.stringify({ message: 'Email and password are required' }), {status: 400})
        }

        const supabase = createClient();

        // Attempt to log in the user with Supabase Auth;
        const { data: authData, error: authError} = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if(authError) {
            console.error('Login error:', authError);
            return new NextResponse(JSON.stringify({ message: 'Error during user login', error: authError.message }), { status: 500 })
        }

        if(!authData.session) {
            return new NextResponse(JSON.stringify({ message: 'Login unsuccessful. Check credentials' }), { status: 404 })
        }
        
        const session = authData.session

        console.log(authData);
        console.log('Session: ',session);
        // If everything is successful
        return new NextResponse(JSON.stringify({ message: 'User logged in successfully', session}), { status: 200 })
    } catch (error: unknown) {
        console.error('Login error:', error);
        // Handle the error properly
        if (error instanceof Error) {
            return new NextResponse(JSON.stringify({ message: 'Internal server error', error: error.message }), { status: 500 });
        } else {
            return new NextResponse(JSON.stringify({ message: 'Internal server error' }), { status: 500 });
        }
    }
}