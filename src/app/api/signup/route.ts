import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';  // Adjust the path as necessary

export async function POST(req: NextRequest) {
    try {
        // Manually parse the JSON body
        const body = await req.json();
        const { email, password, username, full_name } = body;

        // Ensure all required fields are provided
        if (!email || !password || !username || !full_name) {
            return new NextResponse(JSON.stringify({ message: 'Missing required fields' }), { status: 400 });
        }

        const supabase = createClient();

        // Create user in Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                full_name,
                username
              }
            }
        });

        if (authError) {
            console.error('Signup error:', authError);
            return new NextResponse(JSON.stringify({ message: 'Error during user signup', error: authError.message }), { status: 500 });
        }

        if (!authData.user) {
            return new NextResponse(JSON.stringify({ message: 'User not created successfully.' }), { status: 404 });
        }

        console.log(authData.user)

        // Update the profile entry for the newly created user
        const { error: profileError } = await supabase
            .from('profiles')
            .update({
                username: username,
                full_name: full_name,  // Make sure full_name is taken from the API input
                email,
                updated_at: new Date().toISOString()  // Update the timestamp
            })
            .eq('id', authData.user.id)
            
            

        if (profileError) {
            console.error('Error updating profile:', profileError);
            return new NextResponse(JSON.stringify({ message: 'Error updating user profile', error: profileError.message }), { status: 500 });
        }

        // If everything is successful
        return new NextResponse(JSON.stringify({ message: 'User created successfully', user: { id: authData.user.id, username, full_name } }), { status: 201 });

    } catch (error: unknown) {
        console.error('Signup error:', error);
        // Handle the error properly
        if (error instanceof Error) {
            return new NextResponse(JSON.stringify({ message: 'Internal server error', error: error.message }), { status: 500 });
        } else {
            return new NextResponse(JSON.stringify({ message: 'Internal server error' }), { status: 500 });
        }
    }
}
