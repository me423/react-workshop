import React, {Component} from 'react';
import {searchUsers} from '../action/searchUsers';
import {getUser} from '../action/getUser';
import Users from '../components/Users';
import PropTypes from 'prop-types';
import style from 'styled-components';
import Pagination from '../components/Pagination';
const Wrap = style.div`
  .search {
    margin-left: 600px;
    height:30px;
    width: 200px;
    border:2px solid #acd4ed;

  }

`;
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      name: null,
      page: 1
    };
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleUserInfo = this.handleUserInfo.bind(this);
    this.handleNextPage = this.handleNextPage(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }
  handleChangeInput(e) {
    const {value} = e.target;

    if (!value) {
      return;
    }
    this.setState({
      name: value
    });
    searchUsers(value, this.state.page)
      .then(res => {
        this.setState({
          data: res
        });
      });
  }
  componentDidMount() {
    if (this.props.match.params) {
      searchUsers(this.props.match.params.query, this.props.match.params.page)
        .then(res => {
          this.setState({
            data: res,
            page: this.props.match.params.page
          });
        });
    }
  }

  handleUserInfo(name) {
    getUser(name)
      .then(res => {
        this.setState({
          userInfo: res
        });
      });
  }
  handleNextPage() {
    const next = this.state.page + 1;
    console.log(next);
    /* if (!value) {
      return;
    }
    this.setState({
      name: value
    });
    searchUsers(value, this.state.page)
      .then(res => {
        this.setState({
          data: res
        });
      }); */
  }
  handlePageChange(pageNumber) {
    this.setState({page: pageNumber});
    searchUsers(this.state.name, pageNumber)
      .then(res => {
        this.setState({
          data: res
        });
      });
  }
  render() {
    const data = this.state.data;
    const count = Object.assign({}, data);
    console.log(count.total_count);
    return (
      <Wrap>
        <div className="wrap">
        <input className="search" type="text" placeholder="Search..." onChange={this.handleChangeInput}/>
        </div>
        <Pagination className="pagination"
          margin={2}
          page={this.state.page}
          count={count.total_count>1000?30:Math.floor(count.total_count/30)}
          onPageChange={this.handlePageChange}
         />
        <Users data={data} onUserInfo={this.handleUserInfo}/>
      </Wrap>
    );
  }
}

Search.propTypes = {
  match: PropTypes.object
};
export default Search;
