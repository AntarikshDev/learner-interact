/**
 * EXAMPLE: How to use TenantContext in your components
 * 
 * This file shows various use cases for the tenant context.
 * Delete this file once you understand the usage.
 */

import { useTenant } from '@/hooks/useTenant';

// Example 1: Basic usage - Get current tenant/institute information
export const ExampleComponent1 = () => {
  const { instituteId, user, userRole, isAuthenticated } = useTenant();

  return (
    <div>
      <p>Institute ID: {instituteId}</p>
      <p>User: {user?.name}</p>
      <p>Role: {userRole}</p>
      <p>Authenticated: {isAuthenticated ? 'Yes' : 'No'}</p>
    </div>
  );
};

// Example 2: Making API calls with automatic tenant_id
export const ExampleComponent2 = () => {
  const { instituteId } = useTenant();

  const fetchCourses = async () => {
    // Automatically include instituteId in API calls
    const response = await fetch('/api/courses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        instituteId, // Automatically included from context
        // other params...
      })
    });
    return response.json();
  };

  const createTransaction = async (amount: number, userId: string) => {
    // All transactions automatically scoped to current institute
    const response = await fetch('/api/transactions', {
      method: 'POST',
      body: JSON.stringify({
        instituteId, // Tenant isolation
        userId,
        amount,
      })
    });
    return response.json();
  };

  return <div>Check console for API examples</div>;
};

// Example 3: Role-based UI rendering
export const ExampleComponent3 = () => {
  const { userRole } = useTenant();

  return (
    <div>
      {userRole === 'institute_admin' && (
        <button>Admin Only Action</button>
      )}
      {(userRole === 'institute_admin' || userRole === 'sub_admin') && (
        <button>Admin/Sub-Admin Action</button>
      )}
      {userRole === 'instructor' && (
        <button>Instructor Action</button>
      )}
    </div>
  );
};

// Example 4: Setting tenant information (typically done in auth/login)
export const ExampleLoginComponent = () => {
  const { setUser, setInstitute, setUserRole } = useTenant();

  const handleLogin = async (email: string, password: string) => {
    // After successful authentication:
    setUser({
      id: 'user-123',
      email: 'admin@example.com',
      name: 'John Admin',
      phone: '+1234567890'
    });

    setInstitute({
      id: 'inst-456',
      name: 'Tech Academy',
      subdomain: 'techacademy',
      logo: '/logo.png'
    });

    setUserRole('institute_admin');
  };

  return <button onClick={() => handleLogin('', '')}>Login Example</button>;
};

// Example 5: Logout
export const ExampleLogoutComponent = () => {
  const { logout } = useTenant();

  const handleLogout = () => {
    logout(); // Clears all tenant data
  };

  return <button onClick={handleLogout}>Logout</button>;
};
