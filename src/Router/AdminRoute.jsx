import React, { useContext } from 'react';
import useRole from '../hooks/UseRole';
import { AuthContext } from '../Context/AuthContext';

const AdminRoute = ({ children }) => {
    const { loading } = useContext(AuthContext);
    const { role, roleLoading } = useRole()

    if (loading || roleLoading) {
        return <div>loading..</div>
    }

    if (role !== 'admin') {
        return <div>Error.. cannot admin match</div>
    }

    return children;
};

export default AdminRoute;