<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;
use App\Models\User;
use App\Models\Picture;

class PictureTest extends TestCase
{
    /**
     * Get recent pictures test on homepage.
     */
    public function test_homepage_recent_pictures_are_displayed(): void
    {
        $user = User::factory()->create();

        $response = $this
                ->actingAs($user)
                ->get('/home')
                    ->assertInertia(fn (Assert $page) => $page
                    ->has('pictures'));
                
        $response->assertOk();
    }


    public function test_pictures_on_user_profile_are_displayed(): void
    {

        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->get("/profile/{$user->id}");

        $response
            ->assertInertia(fn (Assert $page) => $page
                ->component('Profile'));

        
        $response->assertOk();
    }

    public function test_user_can_upload_picture(): void
    {
        $user = User::factory()->create();
        
        
        // Fake directory
        Storage::fake('local');


        // Create a temporary file
        $image = UploadedFile::fake()->image('image.jpg');

        $response = $this
            ->actingAs($user)
            ->post('/profile', [
                'image' => $image,
                'description' => 'Test photo 📸',
                'tags' => ['test']
            ]);
        
        Storage::disk('local')->assertExists('public/images/'.$image->getClientOriginalName());

    }



}
