import Link from 'next/link';
import { HeartHandshake, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-card border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <HeartHandshake className="h-8 w-8 text-accent" />
              <span className="font-headline text-2xl font-bold">Puratani</span>
            </Link>
            <p className="text-sm text-muted-foreground">A nostalgia for a better world.</p>
            <div className="flex space-x-4 mt-4">
              <Link href="#" className="text-muted-foreground hover:text-accent">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-accent">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-accent">
                <Instagram size={20} />
              </Link>
            </div>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="font-headline text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-accent">About Us</Link></li>
              <li><Link href="/causes" className="text-sm text-muted-foreground hover:text-accent">Causes</Link></li>
              <li><Link href="/blog" className="text-sm text-muted-foreground hover:text-accent">Blog</Link></li>
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-accent">Contact</Link></li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="font-headline text-lg font-semibold mb-4">Get Involved</h3>
            <ul className="space-y-2">
              <li><Link href="/donate" className="text-sm text-muted-foreground hover:text-accent">Donate</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-accent">Volunteer</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-accent">Events</Link></li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="font-headline text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-accent">Privacy Policy</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-accent">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Puratani. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
