import { useState, useEffect } from 'react';
import { Building2 } from 'lucide-react';

export default function AppLogo() {
    const [expanded, setExpanded] = useState(true);

    useEffect(() => {
        const updateState = () => {
            const sidebar = document.querySelector('[data-sidebar="root"]');
            if (sidebar) {
                const isExpanded = sidebar.getAttribute('data-state') === 'expanded';
                setExpanded(isExpanded);
            }
        };
        updateState();
        const observer = new MutationObserver(updateState);
        const sidebar = document.querySelector('[data-sidebar="root"]');
        if (sidebar) {
            observer.observe(sidebar, { attributes: true, attributeFilter: ['data-state'] });
        }
        return () => observer.disconnect();
    }, []);

    return (
        <div className="flex flex-1 items-center justify-center">
            {expanded ? (
                <span className="text-sm font-semibold">RPH</span>
            ) : (
                <Building2 className="h-5 w-5" />
            )}
        </div>
    );
}
