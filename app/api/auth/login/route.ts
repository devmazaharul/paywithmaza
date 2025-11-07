import axios from 'axios';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const { email, pin } = body;

        // ✅ Input Validation
        if (!email || !pin) {
            return NextResponse.json(
                { success: false, message: 'Email & Pin required' },
                { status: 400 },
            );
        }

        // ✅ Backend API Call
        const response = await axios.post('https://mazapayserver.onrender.com/api/access', body);
        
        // Backend return validation
        if (response.status !== 200) {
            return NextResponse.json(
                { success: false, message: 'Authentication failed' },
                { status: 401 },
            );
        }

        const token = response.data?.item?.token;
        if (!token) {
            return NextResponse.json(
                { success: false, message: 'Token not returned from backend' },
                { status: 500 },
            );
        }

        // ✅ Set Cookie Securely
        (await cookies()).set({
            name: 'mpay_token',
            value: token,
            httpOnly: true,
            secure: true, // Always true for production HTTPS
            sameSite: 'strict', // Because frontend & backend separate domains
            path: '/',
            maxAge: 7 * 24 * 60 * 60, // 7 Days
        });

        return NextResponse.json(
            { success: true, message: response.data.message, user: response.data.item },
            { status: 200 },
        );
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            return NextResponse.json(
                { success: false, message: error.response.data?.message || 'Server error' },
                { status: error.response.status },
            );
        }

        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 },
        );
    }
};
