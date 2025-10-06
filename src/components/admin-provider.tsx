'use client';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useUser, useFirestore, errorEmitter, FirestorePermissionError } from '@/firebase';
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
      const adminRoleRef = doc(firestore, 'roles_admin', user.uid);
      
      getDoc(adminRoleRef)
        .then((adminRoleDoc) => {
            setIsAdmin(adminRoleDoc.exists());
        })
        .catch((serverError) => {
            // Create a rich, contextual error.
            const permissionError = new FirestorePermissionError({
              path: adminRoleRef.path,
              operation: 'get',
            });
            // Emit the error to be caught by the global error listener.
            errorEmitter.emit('permission-error', permissionError);
            setIsAdmin(false);
        })
        .finally(() => {
            setIsCheckingAdmin(false);
        });
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
