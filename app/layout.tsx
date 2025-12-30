import { type Metadata } from 'next';
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
import './globals.css';
import Logo from './components/Logo';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Link Shortener - Shorten Links, Amplify Reach',
  description: 'Transform long URLs into short, memorable links. Track performance, manage campaigns, and share with confidence.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <body className="antialiased">
          <header className="flex justify-between items-center p-4 gap-4 h-16">
            <Logo />
            <div className="flex items-center gap-4">
              <SignedOut>
                <SignInButton />
                <SignUpButton>
                  <Button className="bg-[#6c47ff] text-white rounded-full">
                    Sign Up
                  </Button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </header>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
