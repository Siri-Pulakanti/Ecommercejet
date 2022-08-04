import React from "react";
import StarRatings from "react-star-ratings";
const Star = ({ starClick, numberOfStars }) => (
  <>
    <StarRatings
      changeRating={() => starClick(numberOfStars)}
      starDimension="20px"
      starSpacing="2px"
      starHoverColor="red"
      starEmptyColor="red"
      numberOfStars={numberOfStars}
    />
    <br />
  </>
);

export default Star;
