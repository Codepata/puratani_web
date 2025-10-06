'use client';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useUser } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useFirestore } from '@/firebase';

interface AdminContextType {
  isAdmin: boolean;
  isCheckingAdmin: boolean;
}

const AdminContext = createContext<AdminContextType>({
  isAdmin: false,
  isCheckingAdmin: true,
});

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const { user, isUserLoading } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCheckingAdmin, setIsCheckingAdmin] = useState(true);
  const firestore = useFirestore();

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (isUserLoading) {
        return;
      }
      
      if (!user) {
        setIsAdmin(false);
        setIsCheckingAdmin(false);
        return;
      }

      setIsCheckingAdmin(true);
      try {
        const adminRoleRef = doc(firestore, 'roles_admin', user.uid);
        const adminRoleDoc = await getDoc(adminRoleRef);
        
        if (adminRoleDoc.exists()) {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
      } catch (error) {
        console.error("Error checking admin status:", error);
        setIsAdmin(false);
      } finally {
        setIsCheckingAdmin(false);
      }
    };

    checkAdminStatus();
  }, [user, isUserLoading, firestore]);

  return (
    <AdminContext.Provider value={{ isAdmin, isCheckingAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);