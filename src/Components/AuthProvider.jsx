import React from 'react';
import AuthContext from '../Context/AuthContext';

function AuthProvider({children}) {


    return (
        
        <AuthContext.Provider value={null} >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;