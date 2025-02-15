import React, { Fragment } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
const ProtectedRoute = ( { isAdmin, isSeller,component: Component, ...rest} ) => {
    const { user, loading, isAuthenticated } = useSelector(state => state.auth)
    return (
        <Fragment>
            {!loading && (
                <Route {...rest} render={props => {
                    if(isAuthenticated === false){
                        return <Redirect to="/login" />
                    }
                    if(isAdmin === true && user.role !== 'admin'){
                        return <Redirect to="/" />
                    }

                    if(isSeller === true && user.role !== 'seller'){
                        return <Redirect to="/" />
                    }

                    return <Component {...props} />
                }}/>
            )} 
        </Fragment>
    )
}

export default ProtectedRoute
