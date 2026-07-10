<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash; //gotta encrypt the password using Hash inside the database

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validated = $request->validate([ //validations for registring
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = User::create([ //then inserts the new row into users table
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        $token = $user->createToken('auth_token')->plainTextToken; //this token proves who the user is and frontend sends it with every request

        return response()->json(['token' => $token], 201);
    }

    public function login(Request $request)
    {
        $validated = $request->validate([ //validations for login
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $validated['email'])->first(); //a query to select email and return first

        if (!$user || !Hash::check($validated['password'], $user->password)) { //check password from plaintext and password in database if they match good if not returns 401 (unauthorized)
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken; //same as above

        return response()->json(['token' => $token]); //return the token
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete(); //during logout delete the token

        return response()->json(['message' => 'Logged out']); //return a json message as "logged out"
    }
}
