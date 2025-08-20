import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    // Test the connection by checking if we can access the auth
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      return NextResponse.json({
        status: 'error',
        message: 'Supabase connection failed',
        error: error.message
      }, { status: 500 });
    }

    return NextResponse.json({
      status: 'success',
      message: 'Supabase connection working',
      hasSession: !!data.session,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      message: 'Connection test failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
