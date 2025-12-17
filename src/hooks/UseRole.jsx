


import { useQuery } from '@tanstack/react-query';

import useAxiosSecure from './useAxiosSecure';

const useRole = (user) => {
    
    const axiosSecure = useAxiosSecure();
   console.log(user)
    const { isLoading: roleLoading, data} = useQuery({
        queryKey: ['user-role', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}/role`);
            console.log(res.data)
            return res.data || 'user';
        }
    })
//   axiosSecure.get(`/users/${user?.email}/role`).then(data =>console.log(data))
    return { data, roleLoading };
};

export default useRole;