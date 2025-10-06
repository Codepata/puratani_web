"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HeartHandshake, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAuth } from '@/firebase';
import { useRouter } from 'next/navigation';
import type { User } from 'firebase/auth';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/causes', label: 'Causes' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

const getInitials = (name: string | null | undefined) => {
    if (!name) return '';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
};


export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const auth = useAuth();
  const { user } = useAuth();
  const router = useRouter();


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);
  
  const handleLogout = async () => {
    await auth.signOut();
    router.push('/');
  };


  const NavLink = ({ href, label, icon: Icon }: { href: string; label: string; icon?: React.ElementType }) => {
    const isActive = (pathname === '/' && href === '/') || (href !== '/' && pathname.startsWith(href));
    return (
      <Link
        href={href}
        onClick={() => setIsMobileMenuOpen(false)}
        className={cn(
          "text-sm font-medium transition-colors hover:text-accent flex items-center gap-2 relative",
          isActive ? "text-accent" : "text-foreground/80"
        )}
      >
        {label}
         {isActive && <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent"></span>}
      </Link>
    );
  };
  
  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        isScrolled ? 'border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-md' : 'bg-transparent'
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <HeartHandshake className="h-6 w-6 text-accent" />
          <span className="font-headline text-xl font-bold">Puratani</span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </nav>
        <div className="flex items-center gap-4">
           {user ? (
             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.photoURL || ''} alt={user.displayName || 'User'} />
                      <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.displayName}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                       <Link href="/profile">Profile</Link>
                    </DropdownMenuItem>
                     <DropdownMenuItem asChild>
                       <Link href="/admin">Dashboard</Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
           ) : (
             <Button asChild variant="outline">
                <Link href="/login">Login</Link>
            </Button>
           )}
          <Button asChild className="hidden md:flex" style={{backgroundColor: "var(--accent)", color: "var(--accent-foreground)"}}>
            <Link href="/donate">Donate Now</Link>
          </Button>
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="p-4">
                <div className="flex justify-between items-center mb-8">
                   <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                      <HeartHandshake className="h-6 w-6 text-accent" />
                      <span className="font-headline text-xl font-bold">Puratani</span>
                    </Link>
                    <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                      <X className="h-5 w-5"/>
                    </Button>
                </div>
                <nav className="flex flex-col gap-6">
                  {navLinks.map((link) => (
                    <NavLink key={link.href} {...link} />
                  ))}
                  <Button asChild size="lg" className="mt-4" style={{backgroundColor: "var(--accent)", color: "var(--accent-foreground)"}}>
                     <Link href="/donate">Donate Now</Link>
                  </Button>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
