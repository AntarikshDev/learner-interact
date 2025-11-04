import { useContext } from 'react';
import { TenantContext, TenantContextType } from '@/contexts/TenantContext';

/**
 * Custom hook to access tenant context
 * Provides institute_id, user info, and role for automatic tenant isolation
 * 
 * @example
 * const { instituteId, userRole, user } = useTenant();
 * 
 * // Use in API calls
 * const response = await fetch('/api/courses', {
 *   body: JSON.stringify({ instituteId, ...data })
 * });
 */
export const useTenant = (): TenantContextType => {
  const context = useContext(TenantContext);
  
  if (context === undefined) {
    throw new Error('useTenant must be used within a TenantProvider');
  }
  
  return context;
};
