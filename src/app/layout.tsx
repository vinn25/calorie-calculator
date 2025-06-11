import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ReduxProvider } from '@/redux/provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'NutriTrack',
    description: 'Track your calorie intake',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <link rel="icon" href="/" sizes="any" />
            <body className={`${inter.className} text-black`}>
                <ReduxProvider>{children}</ReduxProvider>
            </body>
        </html>
    );
}
