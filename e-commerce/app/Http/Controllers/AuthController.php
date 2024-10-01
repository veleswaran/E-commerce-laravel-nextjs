<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use App\Models\User;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        // Validate request
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8'], 
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422); 
        }

        // Create user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Generate token
        $token = auth('api')->attempt($request->only('email', 'password'));
        if (!$token) {
            return response()->json(['errors' => 'Unauthorized'], 401);
        }

        // Return token and user info
        return response()->json([
            'token' => $token,
            'user' => $user,
        ]);
    }

    public function login(Request $request)
    {
        try {
            // Get credentials
            $credentials = $request->only('email', 'password');
    
            // Attempt to generate token
            if (!$token = auth('api')->attempt($credentials)) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }
    
            Log::info('Generated JWT Token: ' . $token);
            $user = auth('api')->user();
    
            // Return token and user info
            return response()->json([
                'token' => $token,
                'user' => $user,
            ]);
        } catch (\Exception $e) {
            // Log the error for debugging purposes
            Log::error('Login Error: ' . $e->getMessage());
    
            // Return a generic error response
            return response()->json(['errors' => 'An error occurred while attempting to log in. Please try again.'], 500);
        }
    }

    public function logout()
    {
        // Get the current token
        $token = auth('api')->getToken();

        // Invalidate the token
        auth('api')->invalidate($token);

        // Return response
        return response()->json(['message' => 'Successfully logged out']);
    }
}
