'use client';
import { useAdmin } from '@/components/admin-provider';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { LayoutDashboard, Newspaper, HeartHandshake, LogOut, Shield } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/firebase';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const { isAdmin, isCheckingAdmin } = useAdmin();
  const router = useRouter();
  const auth = useAuth();

  useEffect(() => {
    if (!isCheckingAdmin && !isAdmin) {
      router.push('/login');
    }
  }, [isAdmin, isCheckingAdmin, router]);

  const isActive = (path: string) => pathname === path;

  if (isCheckingAdmin || !isAdmin) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 animate-spin" />
            <p>Verifying access...</p>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    auth.signOut();
    router.push('/');
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
            <div className="flex items-center justify-between p-2">
                <div className="flex items-center gap-2">
                    <HeartHandshake className="h-6 w-6 text-accent" />
                    <span className="font-headline text-xl font-bold">Admin</span>
                </div>
                <Button variant="ghost" size="icon" onClick={handleLogout} className="text-muted-foreground">
                    <LogOut className="h-5 w-5" />
                </Button>
            </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/admin')}>
                  <Link href="/admin">
                    <LayoutDashboard />
                    Dashboard
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/admin/blog')}>
                  <Link href="/admin/blog">
                    <Newspaper />
                    Blog Posts
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/admin/causes')}>
                  <Link href="/admin/causes">
                    <HeartHandshake />
                    Causes
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
         <div className="p-4 md:p-8">
          <div className="md:hidden mb-4 flex justify-between items-center">
             <SidebarTrigger />
             <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
            </Button>
          </div>
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminLayout;