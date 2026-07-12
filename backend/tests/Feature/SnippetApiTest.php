<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Snippet;
use Illuminate\Foundation\Testing\RefreshDatabase; //Each test should start with a clean database to prevent one test from affecting another
use Tests\TestCase;

class SnippetApiTest extends TestCase
{
    use RefreshDatabase; // RefreshDatabase resets the database state between tests.

    public function test_user_can_register()
    {
        $response = $this->postJson('/api/register', [ //
            'name' => 'Hazhir',
            'email' => 'hazhir@test.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ]);

        $response->assertStatus(201)->assertJsonStructure(['token']);
    }

    public function test_user_can_login()
    {
        $user = User::factory()->create([
            'password' => bcrypt('password123'),
        ]);

        $response = $this->postJson('/api/login', [
            'email' => $user->email,
            'password' => 'password123',
        ]);

        $response->assertStatus(200)->assertJsonStructure(['token']);
    }

    public function test_unauthenticated_user_cannot_access_snippets()
    {
        $response = $this->getJson('/api/snippets');
        $response->assertStatus(401);
    }

    public function test_user_can_create_snippet()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->postJson('/api/snippets', [
            'title' => 'Test Snippet',
            'content' => 'This is test content.',
        ]);

        $response->assertStatus(201)->assertJsonFragment(['title' => 'Test Snippet']);
    }

    public function test_user_can_fetch_their_snippets()
    {
        $user = User::factory()->create();
        Snippet::factory()->create(['user_id' => $user->id]);

        $response = $this->actingAs($user)->getJson('/api/snippets');

        $response->assertStatus(200)->assertJsonCount(1);
    }

    public function test_user_can_delete_their_snippet()
    {
        $user = User::factory()->create();
        $snippet = Snippet::factory()->create(['user_id' => $user->id]);

        $response = $this->actingAs($user)->deleteJson("/api/snippets/{$snippet->id}");

        $response->assertStatus(200);
        $this->assertDatabaseMissing('snippets', ['id' => $snippet->id]);
    }

    public function test_user_cannot_delete_another_users_snippet()
    {
        $user1 = User::factory()->create();
        $user2 = User::factory()->create();
        $snippet = Snippet::factory()->create(['user_id' => $user1->id]);

        $response = $this->actingAs($user2)->deleteJson("/api/snippets/{$snippet->id}");

        $response->assertStatus(403);
    }
}
