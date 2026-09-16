import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Account & Orders",
  description:
    "Manage your SHOP.CO account profile, track active shipments, review past orders, and configure payment methods.",
  alternates: {
    canonical: "/account",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
