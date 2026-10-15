"use client";

import { useState } from "react";
import Image from "next/image";
import {
    MenuIcon,
    XIcon,
    LogInIcon,
    LogOutIcon,
    SaveIcon,
    DecimalsArrowLeftIcon,
    DecimalsArrowRightIcon,
    LanguagesIcon,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useTranslations } from "@/hooks/useTranslations";
import { useNumberFormat } from "@/hooks/useNumberFormat";
import { useBankProductList } from "@/hooks/useBankProductList";
import { Button } from "@/components/Button";

export const DrawerMenu = () => {
    const [open, setOpen] = useState(false);
    const [saving, setSaving] = useState(false);
    const [showSaved, setShowSaved] = useState(false);

    const { isAuthenticated, isAdmin, user, login, logout } = useAuth();
    const { t, language, setLanguage } = useTranslations();
    const { isRounded, setIsRounded } = useNumberFormat();
    const { items } = useBankProductList();

    const close = () => setOpen(false);

    const handleSave = async () => {
        setSaving(true);
        try {
            const banksData = items.map((item) => ({
                name: item.bankName,
                interestRate: item.interestRate,
                reservedAmount: item.reservationAmount,
            }));
            const response = await fetch("/api/banks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(banksData),
            });
            if (response.ok) {
                setShowSaved(true);
                setTimeout(() => setShowSaved(false), 2000);
            }
        } catch {
            // silent
        }
        setSaving(false);
    };

    return (
        <>
            <Button variant="ghost" onClick={() => setOpen(true)} title="Open menu">
                <MenuIcon className="size-5" />
            </Button>

            {open && (
                <div className="fixed inset-0 bg-black/60 z-40" onClick={close} />
            )}

            <div
                className={`fixed top-0 right-0 h-full w-80 bg-slate-950 border-l border-slate-800 z-50 flex flex-col transition-transform duration-300 ${
                    open ? "translate-x-0" : "translate-x-full"
                }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                        Menu
                    </span>
                    <Button variant="ghost" onClick={close} title="Close">
                        <XIcon className="size-5" />
                    </Button>
                </div>

                {/* User section */}
                <div className="px-4 pt-4">
                    {isAuthenticated && user ? (
                        <div className="flex items-center gap-4 bg-slate-900 rounded-2xl p-4 border border-slate-800">
                            {user.image && (
                                <Image
                                    src={user.image}
                                    alt={user.name ?? "User"}
                                    width={52}
                                    height={52}
                                    className="rounded-full ring-2 ring-slate-700 shrink-0"
                                />
                            )}
                            <div className="min-w-0">
                                <p className="text-white font-bold truncate">{user.name}</p>
                                <p className="text-slate-400 text-sm truncate">{user.email}</p>
                            </div>
                        </div>
                    ) : (
                        <button
                            onClick={login}
                            className="flex items-center gap-4 w-full bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-2xl px-5 py-4 transition-colors group"
                        >
                            <LogInIcon className="size-5 text-slate-400 group-hover:text-white transition-colors shrink-0" />
                            <span className="text-white font-bold">Sign in with GitHub</span>
                        </button>
                    )}
                </div>

                {/* Menu items */}
                <nav className="flex-1 px-4 pt-4 space-y-2 overflow-y-auto">
                    <MenuItem
                        icon={<LanguagesIcon className="size-5" />}
                        label={language === "tr" ? "English" : "Türkçe"}
                        badge={language.toUpperCase()}
                        onClick={() => setLanguage(language === "tr" ? "en" : "tr")}
                    />

                    <MenuItem
                        icon={
                            isRounded ? (
                                <DecimalsArrowRightIcon className="size-5" />
                            ) : (
                                <DecimalsArrowLeftIcon className="size-5" />
                            )
                        }
                        label="Rounding"
                        badge={isRounded ? "ON" : "OFF"}
                        onClick={() => setIsRounded(!isRounded)}
                    />

                    {isAdmin && (
                        <MenuItem
                            icon={<SaveIcon className="size-5" />}
                            label={showSaved ? "Saved!" : "Save changes"}
                            onClick={handleSave}
                            disabled={saving}
                            highlight={showSaved}
                        />
                    )}
                </nav>

                {/* Bottom: GitHub + Sign out */}
                <div className="px-4 pb-6 pt-2 border-t border-slate-800 mt-2 space-y-1">
                    <MenuLink
                        icon={<GithubIcon />}
                        label="View on GitHub"
                        href="https://github.com/webceyhan/interest-calc"
                    />
                    {isAuthenticated && (
                        <button
                            onClick={logout}
                            className="flex items-center gap-4 w-full px-5 py-4 rounded-xl hover:bg-slate-900 text-slate-500 hover:text-white transition-colors"
                        >
                            <LogOutIcon className="size-5 shrink-0" />
                            <span className="font-semibold">Sign out</span>
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};

function MenuItem({
    icon,
    label,
    badge,
    onClick,
    disabled,
    highlight,
}: {
    icon: React.ReactNode;
    label: string;
    badge?: string;
    onClick: () => void;
    disabled?: boolean;
    highlight?: boolean;
}) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className="flex items-center gap-4 w-full hover:bg-slate-900 rounded-xl px-5 py-4 transition-colors disabled:opacity-50 group"
        >
            <span className="text-slate-400 group-hover:text-white transition-colors shrink-0">
                {icon}
            </span>
            <span
                className={`flex-1 text-left font-semibold ${
                    highlight ? "text-green-400" : "text-white"
                }`}
            >
                {label}
            </span>
            {badge && (
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    {badge}
                </span>
            )}
        </button>
    );
}

function MenuLink({
    icon,
    label,
    href,
}: {
    icon: React.ReactNode;
    label: string;
    href: string;
}) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 w-full hover:bg-slate-900 rounded-xl px-5 py-4 transition-colors group"
        >
            <span className="text-slate-400 group-hover:text-white transition-colors shrink-0">
                {icon}
            </span>
            <span className="flex-1 text-left text-white font-semibold">{label}</span>
        </a>
    );
}

function GithubIcon() {
    return (
        <svg className="size-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
    );
}
