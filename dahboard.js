import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "../services/AuthService";
import ContentService from "../services/ContentService"
import Subscribe from "./Subscribe";

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: AuthService.getCurrentUser(),
      content: [],
      userSubscription :[],
      defaultCategory :["ML/AL","Big Data","Micro-service"]
    };
  }

  componentDidMount() {
    this.reloadAllcontent();
    this.reloadUserSub()
  }

  reloadAllcontent() {
    ContentService.getPublicContent()
      .then((res) => {
        this.setState({ content: res.data.object })
      });
  }

  reloadUserSub() {
    AuthService.getUserSubscribe()
      .then((res) => {
        this.setState({ userSubscription: res })
      });
  }

  render() {
    const { currentUser } = this.state;
    const { content } = this.state;
    const{userSubscription} = this.state;
    const{defaultCategory} = this.state;
    
    
    return (
      <div class="container-fluid">

        <p>
          <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
            Do Subscription
          </button>
        </p>
        <div class="collapse" id="collapseExample">
          <div class="card card-body">
            {
          
              defaultCategory.map(item =>
                userSubscription.includes(item)?
              
                <Subscribe name={item} status="UnSubscribe" colour ="btn btn-secondary sub-button" />
                :
                <Subscribe name={item} status="Subscribe" colour="btn btn-danger sub-button"/>)
            }

          </div>
        </div>

        {currentUser.profileCompleted ?

          <Link to="/dashboard/uploadcontent">
            <button type="button" class="btn btn-outline-dark float-right">Upload Content</button>
          </Link>

          :
          <Link to="/dashboard/completeprofile">
            <button type="button" class="btn btn-outline-dark float-right">Complete Profile</button>
          </Link>
        }

        <br />
        <br />
        <div class="row">
          {content.map(con =>


            <div class="col-sm-6">
              <div class="card mb-4">
                <div class="card-header">
                  {con.title}
                </div>
                <div class="card-body">
                  <blockquote class="blockquote mb-0">
                    <p>{con.summary}</p>
                    <Link to={`/dashboard/viewcontent/${con.id}`}>
                      <button type="button" class="btn btn-outline-info">View more</button>
                    </Link>

                    <footer class="blockquote-footer"> Published date <cite title=" Content">  {new Date(con.publishedDate).toString()}</cite></footer>
                  </blockquote>
                </div>
              </div>


            </div>)}
        </div>
      </div>
    );
  }
};

export default Dashboard;