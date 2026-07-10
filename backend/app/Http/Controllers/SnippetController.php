<?php

namespace App\Http\Controllers;

use App\Models\Snippet;
use Illuminate\Http\Request; // to request the class (incoming http) all that comes from the user. (headers, body, and auth)

class SnippetController extends Controller //obv
{
    public function index(Request $request) //checks current authenticated user
    {
        return response()->json($request->user()->snippets()->latest()->get()); //(snippets) checks the relationship, (latest) orders descedning, newest first. executes query, and returns resultsas json,
    }

    public function store(Request $request)
    {
        $validated = $request->validate([ //validates, if not pass = 422 error
            'title' => 'required|string|max:255', //string field that has max of 255
            'content' => 'required|string',
        ]);

        $snippet = $request->user()->snippets()->create($validated); //after validation the new snippet is saved

        return response()->json($snippet, 201); //shows 201 on success (201 meaning created)
    }

    public function destroy(Request $request, Snippet $snippet) //laravel checks the record from database using the id from the url.
    {
        if ($snippet->user_id !== $request->user()->id) { // check if the current user is owner of selected snippet by validating id
            return response()->json(['message' => 'Forbidden'], 403); // obv
        }

        $snippet->delete(); //if everything is good, delete snippet

        return response()->json(['message' => 'Deleted'], 200); //then show that it was deleted successfully (200 means OK)
    }
}
