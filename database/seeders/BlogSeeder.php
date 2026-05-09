<?php

namespace Database\Seeders;

use App\Models\Blog;
use Illuminate\Database\Seeder;

class BlogSeeder extends Seeder
{
    public function run(): void
    {
        $blogs = [
            [
                'title' => 'Understanding Heart Health: A Complete Guide',
                'category' => 'Cardiology',
                'description' => 'Learn about the fundamentals of heart health, common cardiac conditions, and preventive measures you can take to maintain a healthy heart. Discover the latest advancements in cardiac care and how regular check-ups can save lives.',
                'read_time' => '5 min read',
                'image' => '/images/blog/heart-health.jpg',
            ],
            [
                'title' => 'Joint Replacement: What to Expect',
                'category' => 'Orthopedics',
                'description' => 'A comprehensive guide to joint replacement surgery, from pre-operative preparation to post-surgery rehabilitation. Learn about the recovery process and tips for getting back to your active lifestyle.',
                'read_time' => '7 min read',
                'image' => '/images/blog/joint-replacement.jpg',
            ],
            [
                'title' => 'Prenatal Care: A Healthy Start',
                'category' => 'Maternity',
                'description' => 'Essential tips for a healthy pregnancy. Understanding prenatal check-ups, nutrition, and lifestyle choices that ensure the best start for both mother and baby.',
                'read_time' => '6 min read',
                'image' => '/images/blog/prenatal-care.jpg',
            ],
            [
                'title' => 'Managing Stress for Better Health',
                'category' => 'Wellness',
                'description' => 'Explore the connection between stress and health, and learn practical techniques to manage stress effectively for improved overall well-being.',
                'read_time' => '4 min read',
                'image' => '/images/blog/stress-management.jpg',
            ],
            [
                'title' => 'Nutrition for Recovery',
                'category' => 'Nutrition',
                'description' => 'Understanding the role of proper nutrition in recovery and healing. Expert advice on diet modifications for different medical conditions.',
                'read_time' => '5 min read',
                'image' => '/images/blog/nutrition.jpg',
            ],
        ];

        foreach ($blogs as $blog) {
            Blog::firstOrCreate(['title' => $blog['title']], $blog);
        }
    }
}
