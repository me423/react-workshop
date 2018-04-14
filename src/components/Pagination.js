import React, {Component} from 'react';
import classnames from 'classnames';
import style from 'styled-components';

const Wrapper = style.div`
  display: flex;
  justify-content: center;
  margin:5px;
#pagination {
  display: flex;
  color: #505050;
}
#pagination-list {
  display: flex;
  list-style: none;
  margin: 0 0 0 10px;
  padding: 0;
}
.pagination-button {
  display: flex;
  height: 50px;
  width: 50px;
  border: 2px solid #acd4ed;
  border-radius: 6px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.pagination-list-item {
  margin-right: 10px;
  &.active {
    background: #0391bb;
    color: white;
  }
}

.pagination-go-first {
  margin-right: 40px;
  position: relative;
  margin-left: 10px;
  &:before {
    position: absolute;
    content: '...';
    right: -33px;
  }
}

.pagination-go-last {
  margin-left: 40px;
  position: relative;
  margin-right: 10px;
  &:before {
    position: absolute;
    content: '...';
    left: -33px;
  }
}

`;

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onPageChange = this.onPageChange.bind(this);
    this.goFirstPage = this.goFirstPage.bind(this);
    this.goLastPage = this.goLastPage.bind(this);
    this.goPrevPage = this.goPrevPage.bind(this);
    this.goNextPage = this.goNextPage.bind(this);
  }
  componentWillReceiveProps(newProps) {
    if (newProps === this.props) {
      return;
    }
    const {margin, page, count} = newProps;
    const startPage = page > margin ? page - margin : 1;
    const endPage = page + margin > count ? count : page + margin;
    this.setState({startPage, endPage, count});
  }

  onPageChange(event) {
    const index =
      Array.prototype.indexOf.call(event.target.parentNode.children, event.target);
    this.props.onPageChange(index + this.state.startPage);
  }

  goFirstPage() {
    this.props.onPageChange(1);
  }

  goLastPage() {
    this.props.onPageChange(this.state.count);
  }

  goPrevPage() {
    this.props.onPageChange(this.props.page - 1);
  }

  goNextPage() {
    this.props.onPageChange(this.props.page + 1);
  }

  render() {
    const {startPage, endPage, count} = this.state;
    const {page, margin} = this.props;
    const pages = [];
    const firstPage = page - margin > 1 ?
      (<div
        className="pagination-button pagination-go-first"
        onClick={this.goFirstPage}
            >1</div>) :
      null;
    const lastPage = page + margin < count ?
      (<div
        className="pagination-button pagination-go-last"
        onClick={this.goLastPage}
            >{count}</div>) :
      null;
    const prevPage = page === 1 ? null :
      (<div
        className="pagination-button"
        onClick={this.goPrevPage}
            >prev</div>);
    const nextPage = page === count ? null :
      (<div
        className="pagination-button"
        onClick={this.goNextPage}
            >next</div>);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <li
          key={i}
          onClick={this.onPageChange}
          className={classnames('pagination-list-item', 'pagination-button', {
            active: i === this.props.page
          })}
        >
          {i}
        </li>
      );
    }

    return (
      <Wrapper>
        <div id="pagination">
          {prevPage}
          {firstPage}
          <ul id="pagination-list">
            {pages}
          </ul>
          {lastPage}
          {nextPage}
        </div>
      </Wrapper>
    );
  }
}

export default Pagination;
