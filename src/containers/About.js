import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {getUser} from '../action/getUser';
import style from 'styled-components';

const Wrapper = style.div`
margin:50px;
.user-info {
  position: fixed;
  display: flex;
  align-items: center;
  border: 2px solid #0391bb;
  border-radius: 6px;
  padding: 20px;
  & p {
    margin: 0;
    padding: 0;
  }
  & ul {
    margin: 0 0 0 25px;
    padding: 0;
    list-style: none;
  }
  & li {
    padding: 2px 0;
    &:firstchild {
      padding-top: 0;
    }
    &:lastchild {
      padding-bottom: 0;
    }
  }
}

.user-avatar {
  text-align: center;
  & img {
    width: 160px;
    height: 160px;
    border-radius: 50%;
    border: 2px solid #acd4ed;
  }
}

.user-data span {
  font-weight: bold;
}

`;

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {}
    };
  }
  componentDidMount() {
    console.log(this.props.match.params.username.length);
    if (this.props.match.params.username) {
      getUser(this.props.match.params.username)
        .then(res => {
          console.log(res);
          this.setState({
            userInfo: res
          });
        });
    }
    console.log(this.props.match.params);
  }
  render() {
    const data = this.state.userInfo;
    return (<Wrapper><div className="user-info">
      <div className="user-avatar">
        <img src={data.avatar_url} alt={`${data.login}'s avatar`}/>
      </div>
      <ul className="user-data">
        <li><span>Name:</span> {data.name ? data.name : undefined}</li>
        <li><span>E-mail:</span> {data.email} </li>
        <li><span>Company:</span> {data.company} </li>
        <li><span>Location:</span> {data.location ? data.location : undefined}</li>
        <li><span>GitHub:</span> <a href={data.html_url} target="_blank">{data.login}</a></li>
        <li><span>Blog:</span> {data.blog} </li>
        <li><span>Followers:</span> {data.followers}</li>
        <li><span>Following:</span> {data.following}</li>
        <li><span>Repos:</span> {data.public_repos}</li>
        <li><span>Created-at:</span> {data.created_at}</li>
      </ul>
    </div></Wrapper>);
  }
}
About.propTypes = {
  match: PropTypes.object
};

export default About;
