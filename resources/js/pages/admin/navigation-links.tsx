"use client";

import { Form, router, usePage } from "@inertiajs/react";
import { useState } from "react";
import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Plus,
    Pencil,
    Trash2,
    GripVertical,
    ChevronUp,
    ChevronDown,
    Check,
    X,
    LinkIcon,
} from "lucide-react";

interface NavigationLink {
    id: number;
    type: string;
    label: string;
    url: string;
    is_visible: boolean;
    sort_order: number;
}

interface Props {
    headerLinks: NavigationLink[];
    footerLinks: NavigationLink[];
}

export default function NavigationLinksPage({
    headerLinks = [],
    footerLinks = [],
}: Props) {
    const [activeTab, setActiveTab] = useState<"header" | "footer">("header");
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);

    const links = activeTab === "header" ? headerLinks : footerLinks;

    const [newLink, setNewLink] = useState({ label: "", url: "/", is_visible: true });
    const [editData, setEditData] = useState({ label: "", url: "", is_visible: true });

    const startEdit = (link: NavigationLink) => {
        setEditingId(link.id);
        setEditData({ label: link.label, url: link.url, is_visible: link.is_visible });
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditData({ label: "", url: "", is_visible: true });
    };

    const handleReorder = (linkId: number, direction: "up" | "down") => {
        const currentLinks = [...links];
        const index = currentLinks.findIndex((l) => l.id === linkId);

        if (direction === "up" && index === 0) return;
        if (direction === "down" && index === currentLinks.length - 1) return;

        const newIndex = direction === "up" ? index - 1 : index + 1;
        [currentLinks[index], currentLinks[newIndex]] = [currentLinks[newIndex], currentLinks[index]];

        const reordered = currentLinks.map((link, i) => ({
            id: link.id,
            sort_order: i + 1,
        }));

        router.post("/admin/navigation-links/reorder", { links: reordered });
    };

    const handleDelete = (id: number) => {
        if (!confirm("Are you sure you want to delete this link?")) return;
        router.delete(`/admin/navigation-links/${id}`);
    };

    const handleSaveNew = () => {
        if (!newLink.label.trim()) return;

        router.post("/admin/navigation-links", {
            type: activeTab,
            ...newLink,
        });

        setNewLink({ label: "", url: "/", is_visible: true });
        setShowAddForm(false);
    };

    const handleUpdate = (id: number) => {
        router.put(`/admin/navigation-links/${id}`, editData);
        setEditingId(null);
    };

    const handleToggle = (link: NavigationLink) => {
        router.put(`/admin/navigation-links/${link.id}`, {
            is_visible: !link.is_visible,
        });
    };

    return (
        <div className="mx-auto max-w-4xl space-y-6 p-8">
            <div>
                <Heading
                    title="Navigation Links"
                    description="Manage header and footer navigation links"
                />
            </div>

            {/* Tabs */}
            <div className="flex gap-1 border-b">
                <button
                    type="button"
                    onClick={() => {
                        setActiveTab("header");
                        setShowAddForm(false);
                        setEditingId(null);
                    }}
                    className={`px-4 py-2 text-sm font-medium transition-colors relative ${
                        activeTab === "header"
                            ? "text-primary"
                            : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                    Header Links
                    {activeTab === "header" && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                    )}
                </button>
                <button
                    type="button"
                    onClick={() => {
                        setActiveTab("footer");
                        setShowAddForm(false);
                        setEditingId(null);
                    }}
                    className={`px-4 py-2 text-sm font-medium transition-colors relative ${
                        activeTab === "footer"
                            ? "text-primary"
                            : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                    Footer Links
                    {activeTab === "footer" && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                    )}
                </button>
            </div>

            {/* Actions */}
            <div className="flex justify-end">
                <Button onClick={() => setShowAddForm(!showAddForm)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Link
                </Button>
            </div>

            {/* Add Form */}
            {showAddForm && (
                <Card>
                    <CardHeader>
                        <CardTitle>Add New {activeTab === "header" ? "Header" : "Footer"} Link</CardTitle>
                        <CardDescription>
                            Create a new navigation link for the {activeTab} menu
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="new-label">Label</Label>
                                    <Input
                                        id="new-label"
                                        value={newLink.label}
                                        onChange={(e) =>
                                            setNewLink({ ...newLink, label: e.target.value })
                                        }
                                        placeholder="e.g., About Us"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="new-url">URL</Label>
                                    <Input
                                        id="new-url"
                                        value={newLink.url}
                                        onChange={(e) =>
                                            setNewLink({ ...newLink, url: e.target.value })
                                        }
                                        placeholder="/about"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="new-visible"
                                    checked={newLink.is_visible}
                                    onChange={(e) =>
                                        setNewLink({
                                            ...newLink,
                                            is_visible: e.target.checked,
                                        })
                                    }
                                    className="h-4 w-4"
                                />
                                <Label htmlFor="new-visible">Visible</Label>
                            </div>
                            <div className="flex gap-2">
                                <Button type="button" onClick={handleSaveNew}>
                                    <Check className="mr-2 h-4 w-4" />
                                    Save Link
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setShowAddForm(false)}
                                >
                                    <X className="mr-2 h-4 w-4" />
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Links List */}
            <Card>
                <CardHeader>
                    <CardTitle>
                        {activeTab === "header" ? "Header" : "Footer"} Links
                    </CardTitle>
                    <CardDescription>
                        {links.length} link
                        {links.length !== 1 ? "s" : ""} in the {activeTab} menu
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {links.length === 0 ? (
                        <div className="py-8 text-center text-muted-foreground">
                            <LinkIcon className="mx-auto h-12 w-12 opacity-50" />
                            <p className="mt-2">No links found</p>
                            <p className="text-sm">
                                Add your first {activeTab} link to get started
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {links.map((link, index) => (
                                <div
                                    key={link.id}
                                    className={`flex items-center gap-4 rounded-lg border p-4 ${
                                        editingId === link.id
                                            ? "border-primary bg-muted/50"
                                            : "bg-background"
                                    }`}
                                >
                                    {/* Reorder Controls */}
                                    <div className="flex flex-col">
                                        <button
                                            type="button"
                                            onClick={() => handleReorder(link.id, "up")}
                                            disabled={index === 0}
                                            className="p-1 hover:bg-muted rounded disabled:opacity-50"
                                        >
                                            <ChevronUp className="h-4 w-4" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleReorder(link.id, "down")}
                                            disabled={index === links.length - 1}
                                            className="p-1 hover:bg-muted rounded disabled:opacity-50"
                                        >
                                            <ChevronDown className="h-4 w-4" />
                                        </button>
                                    </div>

                                    {/* Edit Form */}
                                    {editingId === link.id ? (
                                        <div className="flex-1 space-y-4">
                                            <div className="grid gap-4 sm:grid-cols-2">
                                                <Input
                                                    value={editData.label}
                                                    onChange={(e) =>
                                                        setEditData({
                                                            ...editData,
                                                            label: e.target.value,
                                                        })
                                                    }
                                                    placeholder="Label"
                                                />
                                                <Input
                                                    value={editData.url}
                                                    onChange={(e) =>
                                                        setEditData({
                                                            ...editData,
                                                            url: e.target.value,
                                                        })
                                                    }
                                                    placeholder="URL"
                                                />
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    id={`edit-visible-${link.id}`}
                                                    checked={editData.is_visible}
                                                    onChange={(e) =>
                                                        setEditData({
                                                            ...editData,
                                                            is_visible: e.target
                                                                .checked,
                                                        })
                                                    }
                                                    className="h-4 w-4"
                                                />
                                                <Label
                                                    htmlFor={`edit-visible-${link.id}`}
                                                >
                                                    Visible
                                                </Label>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button
                                                    size="sm"
                                                    onClick={() =>
                                                        handleUpdate(link.id)
                                                    }
                                                >
                                                    <Check className="mr-2 h-4 w-4" />
                                                    Save
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={cancelEdit}
                                                >
                                                    <X className="mr-2 h-4 w-4" />
                                                    Cancel
                                                </Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            {/* Link Info */}
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium">
                                                        {link.label}
                                                    </span>
                                                    {!link.is_visible && (
                                                        <span className="text-xs text-muted-foreground">
                                                            (hidden)
                                                        </span>
                                                    )}
                                                </div>
                                                <span className="text-sm text-muted-foreground">
                                                    {link.url}
                                                </span>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    checked={link.is_visible}
                                                    onChange={() =>
                                                        handleToggle(link)
                                                    }
                                                    className="h-4 w-4"
                                                    title={
                                                        link.is_visible
                                                            ? "Hide link"
                                                            : "Show link"
                                                    }
                                                />
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => startEdit(link)}
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="destructive"
                                                    onClick={() =>
                                                        handleDelete(link.id)
                                                    }
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}