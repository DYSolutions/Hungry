'use client'

import { cn } from "@/lib/utils";
import  Link  from "next/link";
import { useParams, usePathname } from "next/navigation";

const MainNav = ({ className, ...props }: React.HtmlHTMLAttributes<HTMLElement>) => {

    const pathName = usePathname()
    const params = useParams()

    const routes = [
        {
            href: `/${params.storeId}`,
            label: "Overview",
            active: pathName === `/${params.storeId}`
        },
        {
            href: `/${params.storeId}/billboards`,
            label: "Billboards",
            active: pathName === `/${params.storeId}/billboards`
        },
        {
            href: `/${params.storeId}/catagories`,
            label: "Catagories",
            active: pathName === `/${params.storeId}/catagories`
        },
        {
            href: `/${params.storeId}/kitchens`,
            label: "Kitchens",
            active: pathName === `/${params.storeId}/kitchens`
        },
        {
            href: `/${params.storeId}/settings`,
            label: "settings",
            active: pathName === `/${params.storeId}/settings`
        }
    ]
    return (
        <nav className={cn("flex items-center space-x-4 lg:space-x-6 pl-6")}>
            {routes.map((route) => (
                <Link key={route.href} className={cn("text-sm font-medium transition-colors hover:text-primary",
                    route.active
                        ? "text-black dark:text-white"
                        : "text-muted-foreground"
                )} href={route.href}>{route.label}</Link>
            ))}
        </nav>
    );
}

export default MainNav;