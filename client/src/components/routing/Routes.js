import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CreateNote from "../../components/note/CreateNote";
import LandingPage from "../../components/layout/LandingPage";
import Navbar from "../../components/layout/Navbar";
import Alert from "../layout/Alert";
import PrivateComponent from "./PrivateComponent";
import Notes from "../../components/note/Notes";
import ForgetPassword from "../auth/ForgetPassword";
import ResetPassword from "../../components/auth/ResetPassword";
import ReviewNote from "../note/ReviewNote";
import Note from "../note/Note";
import DeleteAccount from "../auth/DeleteAccount";

const Routes = () => {
  return (
    <Router>
      <Navbar />
      <Alert />
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <PrivateComponent exact path="/me" component={DeleteAccount} />
        <Route exact path="/forgetpassword" component={ForgetPassword} />
        <Route exact path="/resetpassword/:token" component={ResetPassword} />
        <PrivateComponent exact path="/createNote" component={CreateNote} />
        <PrivateComponent exact path="/notes" component={Notes} />
        <PrivateComponent exact path="/note/:id" component={Note} />
        <PrivateComponent exact path="/reviewNote" component={ReviewNote} />
        <PrivateComponent exact path="/note/:id" component={Note} />
      </Switch>
    </Router>
  );
};

export default Routes;
