import PropTypes from "prop-types";
import React, { Component } from "react";
import Button from "./components/Button";

class Pagination extends Component {
  render() {
    const {
      loading,
      currentPage,
      totalNumberOfPages,
      hasPrevPage,
      handlePrevPage,
      hasNextPage,
      handleNextPage,
    } = this.props;

    if (
      totalNumberOfPages < 2 ||
      !(hasNextPage || hasPrevPage) ||
      Number.isNaN(totalNumberOfPages)
    )
      return null;

    return (
      <div className="o-layout o-layout--gutter-base o-layout--align-middle">
        <div className="o-layout__cell o-layout__cell--fit">
          <Button
            label="Previous"
            onClick={handlePrevPage}
            disabled={!hasPrevPage || loading}
          />
        </div>
        <div className="o-layout__cell o-layout__cell--fit">
          <Button
            label="Next"
            onClick={handleNextPage}
            disabled={!hasNextPage || loading}
          />
        </div>
        <div className="o-layout__cell o-layout__cell--fit">
          <span className="u-color-gray-600 u-text-small u-text-bold">
            Page {currentPage} of {totalNumberOfPages}
          </span>
        </div>
      </div>
    );
  }
}

Pagination.propTypes = {
  loading: PropTypes.bool.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalNumberOfPages: PropTypes.number.isRequired,
  hasPrevPage: PropTypes.bool.isRequired,
  handlePrevPage: PropTypes.func.isRequired,
  hasNextPage: PropTypes.bool.isRequired,
  handleNextPage: PropTypes.func.isRequired,
};

export default Pagination;
