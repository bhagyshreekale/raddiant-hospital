<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreNavigationLinkRequest;
use App\Http\Requests\UpdateNavigationLinkRequest;
use App\Models\NavigationLink;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class NavigationLinkController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $type = $request->input('type', 'header');

        $links = NavigationLink::forType($type)
            ->visible()
            ->ordered()
            ->get();

        return response()->json(['links' => $links]);
    }

    public function adminIndex(): Response
    {
        $headerLinks = NavigationLink::forType('header')->ordered()->get();
        $footerLinks = NavigationLink::forType('footer')->ordered()->get();

        return Inertia::render('admin/navigation-links', [
            'headerLinks' => $headerLinks,
            'footerLinks' => $footerLinks,
        ]);
    }

    public function store(StoreNavigationLinkRequest $request)
    {
        $maxOrder = NavigationLink::forType($request->type)->max('sort_order') ?? 0;

        NavigationLink::create([
            ...$request->validated(),
            'sort_order' => $maxOrder + 1,
        ]);

        return to_route('navigation-links.index');
    }

    public function update(UpdateNavigationLinkRequest $request, NavigationLink $navigationLink)
    {
        $navigationLink->update($request->validated());

        return to_route('navigation-links.index');
    }

    public function destroy(NavigationLink $navigationLink)
    {
        $navigationLink->delete();

        return to_route('navigation-links.index');
    }

    public function reorder(Request $request)
    {
        $request->validate([
            'links' => 'required|array',
            'links.*.id' => 'required|integer|exists:navigation_links,id',
            'links.*.sort_order' => 'required|integer',
        ]);

        DB::transaction(function () use ($request) {
            $type = NavigationLink::find($request->input('links.0.id'))?->type ?? 'header';
            $tempOffset = 1000;

            foreach ($request->input('links') as $linkData) {
                NavigationLink::where('id', $linkData['id'])
                    ->update(['sort_order' => $tempOffset + $linkData['sort_order']]);
            }

            foreach ($request->input('links') as $linkData) {
                $newOrder = $linkData['sort_order'];
                NavigationLink::where('id', $linkData['id'])
                    ->update(['sort_order' => $newOrder]);
            }
        });

        return to_route('navigation-links.index');
    }
}
