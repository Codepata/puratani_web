'use client';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useAuth, useFirestore, errorEmitter, FirestorePermissionError } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';

interface AdminContextType {
  isAdmin: boolean;
  isCheckingAdmin: boolean;
}

const AdminContext = createContext<AdminContextType>({
  isAdmin: false,
  isCheckingAdmin: true,
});

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const auth = useAuth();
  const [user, setUser] = useState(auth.currentUser);
  const [isUserLoading, setIsUserLoading] = useState(true);
  
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCheckingAdmin, setIsCheckingAdmin] = useState(true);
  const firestore = useFirestore();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setIsUserLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);


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
      const adminRoleRef = doc(firestore, 'roles_admin', user.uid);
      
      try {
        const adminRoleDoc = await getDoc(adminRoleRef);
        setIsAdmin(adminRoleDoc.exists());
      } catch (serverError) {
        const permissionError = new FirestorePermissionError({
          path: adminRoleRef.path,
          operation: 'get',
        });
        errorEmitter.emit('permission-error', permissionError);
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
