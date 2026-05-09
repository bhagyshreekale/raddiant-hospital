import { Link } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useCurrentUrl } from '@/hooks/use-current-url';
import type { NavItem } from '@/types';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const { isCurrentUrl } = useCurrentUrl();

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel className="text-xs font-medium text-muted-foreground/70 uppercase tracking-wider">
                Menu
            </SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                            asChild
                            isActive={isCurrentUrl(item.href)}
                            className={cn(
                                'transition-all duration-200',
                                isCurrentUrl(item.href) &&
                                    'bg-sidebar-accent border-l-2 border-primary font-medium'
                            )}
                            tooltip={{ children: item.title }}
                        >
                            <Link href={item.href} prefetch>
                                {item.icon && (
                                    <item.icon
                                        className={cn(
                                            'w-4 h-4',
                                            isCurrentUrl(item.href)
                                                ? 'text-primary'
                                                : 'text-muted-foreground'
                                        )}
                                    />
                                )}
                                <span
                                    className={cn(
                                        isCurrentUrl(item.href)
                                            ? 'text-primary'
                                            : ''
                                    )}
                                >
                                    {item.title}
                                </span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
