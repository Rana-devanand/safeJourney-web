-- 1. Searchable and paginated user device listing function
CREATE OR REPLACE FUNCTION get_users_with_devices_admin(
    page integer,
    page_size integer,
    search_query text DEFAULT ''
)
RETURNS TABLE (
    id uuid,
    full_name text,
    email text,
    profile_photo text,
    device_id text,
    created_at timestamp with time zone,
    total_count bigint
) 
SECURITY DEFINER
AS $$
BEGIN
    -- Security check: only allow if the person calling this is an admin
    IF (SELECT up.role FROM public.user_profiles up WHERE up.id = auth.uid()) = 'admin' THEN
        RETURN QUERY
        WITH filtered_users AS (
            SELECT 
                up.id,
                up.name::text AS full_name,
                au.email::text AS email,
                up.profile_photo::text AS profile_photo,
                up.device_id::text AS device_id,
                up.created_at
            FROM public.user_profiles up
            LEFT JOIN auth.users au ON up.id = au.id
            WHERE 
                search_query = '' 
                OR up.name ILIKE '%' || search_query || '%' 
                OR au.email ILIKE '%' || search_query || '%'
                OR up.device_id ILIKE '%' || search_query || '%'
        ),
        count_total AS (
            SELECT COUNT(*) AS total FROM filtered_users
        )
        SELECT 
            fu.id,
            fu.full_name::text,
            fu.email::text,
            fu.profile_photo::text,
            fu.device_id::text,
            fu.created_at,
            ct.total
        FROM filtered_users fu
        CROSS JOIN count_total ct
        ORDER BY fu.created_at DESC
        LIMIT page_size
        OFFSET (page - 1) * page_size;
    ELSE
        RAISE EXCEPTION 'Access denied: Admin privileges required.';
    END IF;
END;
$$ LANGUAGE plpgsql;

-- 2. Unlink device ID action function
CREATE OR REPLACE FUNCTION unlink_device_id_admin(
    p_user_id uuid
)
RETURNS TABLE (
    success boolean,
    message text
)
SECURITY DEFINER
AS $$
BEGIN
    -- Security check: only allow if the person calling this is an admin
    IF (SELECT up.role FROM public.user_profiles up WHERE up.id = auth.uid()) = 'admin' THEN
        UPDATE public.user_profiles
        SET device_id = NULL
        WHERE id = p_user_id;

        RETURN QUERY SELECT TRUE, 'Device ID unlinked successfully.'::text;
    ELSE
        RAISE EXCEPTION 'Access denied: Admin privileges required.';
    END IF;
END;
$$ LANGUAGE plpgsql;
