import './App.css';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect } from 'react';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import BuyorSell from './Components/BuyorSell/BuyorSell'
import Header from './Components/Header/Header'
import Buy from './Components/Buy/Buy'
import Checkout from './Components/Checkout/Checkout'
import Payment from './Components/Payment/Payment'
import Orders from './Components/Orders/Orders'
import Sell from './Components/Sell/Sell'
import SellingItem from './Components/SellingItem/SellingItem'
import Home from './Components/Home/Home';
// import CustomerRegistration from './Components/Register/customerregistration'; // Import customer registration
// import RegistrationOptions from './Components/RegistrationOptions'; // Import registration options
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const promise = loadStripe("pk_test_51HlsqsEJTBWipWhA6UIua1R9qKRQREaPlfN3LAXzfGVgQsUS0ih6E88edf3Fwd1uvAouB6KI7W1shuN5bg8xDedO00jTJMiHMh");

function App() {
  // useEffect(() => {
  //   const checkTidioAPI = () => {
  //     if (window.tidioChatApi) {
  //       console.log("Tidio API is available.");

  //       // Check if the clear method is available
  //       if (typeof window.tidioChatApi.reset === 'function') {
  //         console.log("Resetting Tidio Chatbot...");
  //         window.tidioChatApi.reset(); // Clear the chatbot conversation
  //       } else {
  //         console.log("clear() method is not available.");
  //       }

  //       // Clear the interval since the API is available
  //       clearInterval(timer);
  //     } else {
  //       console.log("Tidio API is not available yet.");
  //     }
  //   };

  //   // Check for Tidio API availability every second
  //   const timer = setInterval(checkTidioAPI, 1000);

  //   // Cleanup the interval on unmount
  //   return () => clearInterval(timer);
  // }, []);

  const [{ basket, user }, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if (authUser) {
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      } else {
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  }, [])

  return (
    <Router>
      <div className="App">
        <Switch>
          {
            (user) ? (
              <>

                <Route exact path="/">
                  <Home />
                </Route>

                <Route exact path="/login">
                  <Login />
                </Route>

                <Route exact path="/register">
                  <Register />
                </Route>
                {/* added here something */}
                {/* <Route exact path="/customerregistration">
                  <CustomerRegistration />
                </Route>
                <Route exact path="/registration-options">
                  <RegistrationOptions />
                </Route> */}

{/* till here */}
                <Route exact path="/buyorsell">
                  <BuyorSell />
                </Route>

                <Route exact path="/buy">
                  <Header />
                  <Buy />
                </Route>

                <Route exact path="/checkout">
                  <Header />
                  <Checkout />
                </Route>

                <Route exact path="/payment">
                  <Elements stripe={promise}>
                    <Payment />
                  </Elements>
                </Route>

                <Route exact path="/Orders">
                  <Header />
                  <Orders />
                </Route>

                <Route exact path="/sell">
                  <Sell />
                </Route>

                <Route exact path="/sellingItem">
                  <SellingItem />
                </Route>

              </>
            ) : (
              <>

                <Route exact path="/">
                  <Home />
                </Route>

                <Route exact path="/login">
                  <Login />
                </Route>

                <Route exact path="/register">
                  <Register />
                </Route>

                <Route exact path="/buy">
                  <Header />
                  <Buy />
                </Route>
              </>
            )
          }

        </Switch>
      </div>
    </Router>
  );
}

export default App;
