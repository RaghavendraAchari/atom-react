import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import LoadingWindow from "../../../components/LoadingWindow/LoadingWindow";
import {
  authenticate,
  USER_TOKEN,
  validateUser,
} from "../../../services/authService";


import "./Login.scss";
import { toast } from "react-toastify";

function Login(props) {
  const [error, setError] = useState("");
  const [signingIn, setSigningIn] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setSigningIn(true);

    const formData = new FormData(e.target);
    const username = formData.get("username");
    const password = formData.get("password");

    authenticate(username, password)
      .then((res) => {
        setSigningIn(false);

        if(res.status === 200){
          sessionStorage.setItem(USER_TOKEN, res.data.accessToken);
          toast.success("Logged in successfully");
        }
        else{
          setError(res.data.message);
          return;
        }

        navigate("/admin/operations");
      })
      .catch((res) => {
        setError(res.response.data.message);
        toast.error("Something went wrong while signing in.")

        setSigningIn(false);
      });
  }

  useEffect(() => {
    const token = sessionStorage.getItem(USER_TOKEN);
    if (token !== null && token !== undefined) {
      setSigningIn(true);
      validateUser(token)
        .then((res) => {
          if (res.status === 200) {
            navigate("/admin/operations");
            setSigningIn(false);
          }else{
            setError("Login again");
            setSigningIn(false);
          }
        })
        .catch((e) => {
          setError("Error in signing in");
          setSigningIn(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h4 className="border-bottom">Login </h4>
        <div className="group">
          <label htmlFor="username">Username :</label>
          <input type="text" name="username" id="username" />
        </div>

        <div className="group">
          <label htmlFor="password">Password :</label>
          <input type="password" name="password" id="password" />
        </div>
        {error !== "" && (
          <div className="group">
            <p className="error">*{error}</p>
          </div>
        )}

        <div className="group">
          <input
            disabled={signingIn}
            type="submit"
            className="button"
            id="submit-button"
            value="Submit"
          />
        </div>
        {signingIn === true && <LoadingWindow />}
      </form>
    </div>
  );
}

export default Login;
