<?php

namespace Database\Seeders;

use App\Models\InsurancePartner;
use Illuminate\Database\Seeder;

class InsurancePartnerSeeder extends Seeder
{
    public function run(): void
    {
        $partners = [
            ['name' => 'Star Health Insurance', 'category' => 'tpa'],
            ['name' => 'Bharti AXA', 'category' => 'tpa'],
            ['name' => 'ICICI Lombard', 'category' => 'tpa'],
            ['name' => 'HDFC ERGO', 'category' => 'tpa'],
            ['name' => 'Manipal Cigna', 'category' => 'tpa'],
            ['name' => 'Aditya Birla', 'category' => 'private'],
            ['name' => 'Bajaj Allianz', 'category' => 'tpa'],
            ['name' => 'Reliance General', 'category' => 'tpa'],
        ];

        foreach ($partners as $partner) {
            InsurancePartner::firstOrCreate(['name' => $partner['name']], $partner);
        }
    }
}
