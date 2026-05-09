import type { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <img
            src="/rph.png"
            alt="RPH"
            className="size-7 object-contain dark:invert"
            {...props}
        />
    );
}
