import React, { useState } from "react";
import { OnOffControl, register } from "./firebaseConfig";
import { ToastContainer,toast } from "react-toastify";
import { useEffect } from 'react';
import { getDatabase, ref, onValue,get} from 'firebase/database';

function App() {
  const [username, setUsername] = useState("");
  const [showButtons, setShowButtons] = useState(false);
  const [autor, setAuto] = useState([]);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleButtonClick = () => {
    const db = getDatabase();
    const usersRef = ref(db, 'users/');
    
    // Check if the username exists
    get(usersRef)
      .then((snapshot) => {
        let usernameExists = false;
  
        snapshot.forEach((childSnapshot) => {
          const userData = childSnapshot.val();
          if (userData.username === username) {
            usernameExists = true;
            return;
          }
        });
  
        if (usernameExists) {
          // Username exists, perform login
          setShowButtons(true);
          toast.success('Login successful');
        } else {
          // Username does not exist
          toast.error('Username does not exist');
        }
      })
      .catch((error) => {
        console.error('Error checking username:', error);
        toast.error('Error checking username');
      });
  };
  

  
  


  const handleButtonAction = (buttonNumber,flag) => {
    let id = "D" + buttonNumber;
    OnOffControl(id, flag?0:1);
  };


  useEffect(() => {
    const dbb = getDatabase();
    const AutoRef = ref(dbb, 'Relay/');

    const unsubscribe = onValue(AutoRef, (snapshot) => {
      const AutoData = snapshot.val();
      setAuto(AutoData);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="container">
      <div className="alert alert-success text-center mt-4" role="alert">
        <h4>Home Automation Control</h4>
      </div>
      

      {!showButtons ? (
        <div className="card mt-4 alert alert-success shadow-lg p-3 mb-5 rounded">
          <div className="card-body">
            <div className="form-group">
              <label htmlFor="usernameInput">Username:</label>
              <input
                type="text"
                className="form-control"
                id="usernameInput"
                placeholder="Secret Key"
                value={username}
                onChange={handleUsernameChange}
              />
            </div>
            <button
              className="btn btn-primary btn-block"
              onClick={handleButtonClick}
            >
              Login
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h3 className="mt-4">
            <i className="bi bi-person-fill"></i> Welcome, {username}! 
          </h3>

   
            <div className="row mt-4 shadow-lg p-3 mb-5 rounded">
            
            <div className="col-6 col-md-4 mb-3">
              <button
                className={`btn btn-lg ${
                  autor.D1 === 1 ? "btn-info" : "btn-light"
                } btn-block`}

                onClick={() => handleButtonAction(1, autor.D1)}
              
              >
                <i className="bi bi-lightbulb"></i> Light 1{" "}
                {autor.D1 === 1 ? "On" : "Off"}
              </button>
            </div>

            <div className="col-6 col-md-4 mb-3">
              <button
                className={`btn btn-lg ${
                  autor.D2 === 1 ? "btn-info" : "btn-light"
                } btn-block`}
                onClick={() => handleButtonAction(2, autor.D2)}
              >
                <i className="bi bi-lightbulb"></i> Light 2{" "}
                {autor.D2 === 1 ? "On" : "Off"}
              </button>
            </div>

            <div className="col-6 col-md-4 mb-3">
              <button
                className={`btn btn-lg ${
                  autor.D3 === 1 ? "btn-warning" : "btn-light"
                } btn-block`}
                onClick={() => handleButtonAction(3, autor.D3)}
              >
                <i className="bi bi-lightbulb"></i> Warm{" "}
                {autor.D3 === 1 ? "On" : "Off"}
              </button>
            </div>

            <div className="col-6 col-md-4 mb-3">
              <button
                className={`btn btn-lg ${
                  autor.D4 === 1 ? "btn-danger" : "btn-light"
                } btn-block`}
                onClick={() => handleButtonAction(4, autor.D4)}
              >
                <i className="bi bi-lightbulb"></i> Party{" "}
                {autor.D4 === 1 ? "On" : "Off"}
              </button>
            </div>

            <div className="col-6 col-md-4 mb-3">
              <button
                className={`btn btn-lg ${
                  autor.D5 === 1 ? "btn-success" : "btn-light"
                } btn-block`}
                onClick={() => handleButtonAction(5, autor.D5)}
              >
                <i className="bi bi-wind"></i> Fan  <br></br>{" "}
                {autor.D5 === 1 ? "On" : "Off"}
              </button>
            </div>

            <div className="col-6 col-md-4 mb-3">
              <button
                className={`btn btn-lg ${
                  autor.D6 === 1 ? "btn-primary" : "btn-light"
                } btn-block`}
                onClick={() => handleButtonAction(6, autor.D6)}
              >
                <i className="bi bi-lightbulb"></i> Center{" "}
                {autor.D6 === 1 ? "On" : "Off"}
              </button>
            </div>

            <div className="col-8 col-md-8 mb-3">
              <button
                className={`btn btn-lg ${
                  autor.D7 === 1 ? "btn-warning" : "btn-light"
                } btn-block`}
                onClick={() => handleButtonAction(7, autor.D7)}
              >
                <i className="bi bi-lightbulb"></i> Warm-Focus{" "}
                {autor.D7 === 1 ? "On" : "Off"}
              </button>
            </div>
            </div>
       
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
