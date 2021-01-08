import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-dom'
import ProductView from './components/ProductView';
import OrderView from './components/OrderView';
import UnorderView from './components/UnorderView';
import AuthView from './components/AuthView';

export default function App() {

  const [activeTab, setActiveTab]: [string, any] = useState('product')
  const [token, setToken]: [string, any] = useState('')
  const [user, setUser]: [any, any] = useState(null)

  const handleAuth = (token: string, user: any) => {
    setUser(user)
    setToken(token)
  }

  const handleLogOut = () => {
    setToken('')
    setUser(null)
  }

  const handleNavItemClick = (tab: string) => {
      setActiveTab(tab)
  }
  return (
    <Router>
      
      <Redirect to={"/" + (token === '' ? "auth" : activeTab) } />
      <Switch>
        <Route path="/auth">
          <AuthView
            handleAuth={handleAuth} />
        </Route>

        <Route path="/">
          

          <div className="container-fluid">
            <div className="row d-flex align-items-center justify-content-between bg-primary text-light header pl-3 pr-3">
              <h3>The Best Admin of the Best Shop</h3>
              <div className="d-flex align-items-center">
                <div className="mr-3">{user ? user.name: null}</div>
                <button 
                  type="button" 
                  className="btn btn-danger"
                  onClick={() => {handleLogOut()}}
                >Log Out</button>
              </div>
            </div>
            <nav className="row nav bg-primary nav-tabs nav-fill">
              <Link className={"text-dark nav-item nav-link " + (activeTab === "product" ? "active" : '')} to="/product" onClick={() => {handleNavItemClick('product')}}>Product</Link>
              <Link className={"text-dark nav-item nav-link " + (activeTab === "unorder" ? "active" : '')} to="/unorder" onClick={() => {handleNavItemClick('unorder')}}>Unreleased Order</Link>
              <Link className={"text-dark nav-item nav-link " + (activeTab === "order" ? "active" : '')} to="/order" onClick={() => {handleNavItemClick('order')}}>Order</Link>
            </nav>
      
            <Route path="/product">
              <ProductView token={token}/>
            </Route>
            <Route path="/unorder">
              <UnorderView token={token} />
            </Route>
            <Route path="/order">
              <OrderView token={token} />
            </Route>

          </div>
        </Route>
      </Switch>
    </Router>
  );
}
