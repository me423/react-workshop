import React from 'react';
import {Link} from 'react-router-dom';
import style from 'styled-components';
import PropTypes from 'prop-types';
const Wrapper = style.div`
  height: 800px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: stretch;
  align-content: stretch;
  .user-info-box {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 10px;
    margin: 0 10px 10px 0;
    border: 2px solid #acd4ed;
    border-radius: 6px;
    transition: all ease .1s;
    &:hover { border: 2px solid #0391bb; }
    &:active { border: 2px solid #0391bb; }
    & img {
      width: 50px;
      height: 42px;
      opacity: .7;
      z-index: -2;
    }
    &:hover img, &:hover p { opacity: 1; }
    &:active img, &:active p { opacity: 1; }
    & p {
      padding: 0 0 0 8px;
      margin: 0;
      text-align: center;
      font-size: 18px;
      opacity: .7;
      z-index: -2;
    }
  }


`;

const Users = props => {
  return (
    <Wrapper>
      {props.data && props.data.items && props.data.items.map(({id, login, avatar_url}) => {
        return (<Link to={`/about/${login}`} key={id}>
          <div
            className="user-info-box" key={id} onClick={() => {
              console.log('hello');
            }}
          >
            <img src={avatar_url} alt={`${login}'s avatar`}/>
            <p>{login}</p>
          </div></Link>);
      })}
    </Wrapper>
  );
};
Users.propTypes = {
  data: PropTypes.object,
  onUserInfo: PropTypes.func
};

export default Users;
