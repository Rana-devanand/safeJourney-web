import { supabase } from '../lib/supabase-auth';

/**
 * Centered helper function to execute authenticated Supabase queries.
 * Ensures the admin user session is active and valid before executing.
 */
async function authGuard(): Promise<void> {
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();
  if (sessionError || !session) {
    throw new Error('Unauthorized: No active admin session found.');
  }
}

export interface DashboardStats {
  totalUsers: number;
  activeJourneys: number;
  premiumUsers: number;
  totalCircles: number;
  recentUsers: any[];
  recentJourneys: any[];
  recentLogs: any[];
  monthlyPings: any[];
}

/**
 * Centralized authenticated API calls for the Admin Dashboard.
 * All data queries use SECURITY DEFINER RPCs that bypass RLS.
 */
export const adminApi = {
  /**
   * Fetch all dashboard stats in a single RPC call.
   * Uses the SECURITY DEFINER function `get_admin_dashboard_stats`
   * which bypasses RLS and returns all counts + recent data.
   */
  getDashboardStats: async (): Promise<DashboardStats> => {
    await authGuard();
    const { data, error } = await supabase.rpc('get_admin_dashboard_stats');
    if (error) throw error;
    const d = data as Record<string, any>;
    return {
      totalUsers: d.totalUsers ?? 0,
      activeJourneys: d.activeJourneys ?? 0,
      premiumUsers: d.premiumUsers ?? 0,
      totalCircles: d.totalCircles ?? 0,
      recentUsers: (d.recentUsers || []).map((u: any) => ({ ...u, full_name: u.name, email: 'Hidden for privacy' })),
      recentJourneys: d.recentJourneys || [],
      recentLogs: d.recentLogs || [],
      monthlyPings: d.monthlyPings || [],
    };
  },

  /**
   * Paginated users list for the User Management page.
   * Uses the SECURITY DEFINER function `get_extended_users_admin`.
   */
  getAllUsers: async (page: number = 1, pageSize: number = 10): Promise<{ users: any[]; total: number }> => {
    await authGuard();
    const { data, error } = await supabase.rpc('get_extended_users_admin', { page, page_size: pageSize });
    if (error) throw error;
    const users = (data || []).map((u: any) => ({
      ...u,
      full_name: u.full_name || u.name,
      active: !u.is_banned
    }));
    const total = data?.[0]?.total_count ?? 0;
    return { users, total };
  },

  /**
   * Block (ban) or unblock (unban) a user.
   * Uses the SECURITY DEFINER function `block_user`.
   */
  blockUser: async (userId: string, block: boolean): Promise<{ success: boolean; message: string }> => {
    await authGuard();
    const { data, error } = await supabase.rpc('block_user', { p_user_id: userId, p_block: block });
    if (error) throw error;
    return data as { success: boolean; message: string };
  },

  /**
   * Permanently delete a user and all associated data.
   * Uses the SECURITY DEFINER function `delete_user`.
   */
  deleteUser: async (userId: string): Promise<{ success: boolean; message: string }> => {
    await authGuard();
    const { data, error } = await supabase.rpc('delete_user', { p_user_id: userId });
    if (error) throw error;
    return data as { success: boolean; message: string };
  },

  /**
   * Fetch paginated system logs for administrative dashboard.
   * Uses the SECURITY DEFINER function `get_system_logs_admin`.
   */
  getSystemLogs: async (page: number = 1, pageSize: number = 10): Promise<{ logs: any[]; total: number }> => {
    await authGuard();
    const { data, error } = await supabase.rpc('get_system_logs_admin', { page, page_size: pageSize });
    if (error) throw error;
    const total = data?.[0]?.total_count ?? 0;
    return { logs: data || [], total };
  },

  /**
   * Fetch paginated user subscriptions for administrative dashboard.
   * Uses the SECURITY DEFINER function `get_user_subscriptions_admin`.
   */
  getSubscriptions: async (page: number = 1, pageSize: number = 10): Promise<{ subscriptions: any[]; total: number }> => {
    await authGuard();
    const { data, error } = await supabase.rpc('get_user_subscriptions_admin', { page, page_size: pageSize });
    if (error) throw error;
    const total = data?.[0]?.total_count ?? 0;
    return { subscriptions: data || [], total };
  },

  /**
   * Fetch paginated journeys and completed statistics for administrative dashboard.
   * Uses the SECURITY DEFINER function `get_journeys_admin`.
   */
  getJourneys: async (page: number = 1, pageSize: number = 10): Promise<{ journeys: any[]; total: number }> => {
    await authGuard();
    const { data, error } = await supabase.rpc('get_journeys_admin', { page, page_size: pageSize });
    if (error) throw error;
    const total = data?.[0]?.total_count ?? 0;
    return { journeys: data || [], total };
  },
};