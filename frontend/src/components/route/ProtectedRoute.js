import React, { Fragment } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
const ProtectedRoute = ( { isAdmin,component: Component, ...rest} ) => {
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
                    return <Component {...props} />
                }}/>
            )} 
        </Fragment>
    )
}

export default ProtectedRoute
