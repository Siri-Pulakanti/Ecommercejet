import React from "react";
import { Card, Skeleton } from "antd";

const LoadingCard = ({ count }) => {
  const cards = () => {
    let totalCards = [];

    for (let i = 0; i < count; i++) {
      totalCards.push(
        <span className="col-md-4 my-3" key={i}>
          {" "}
          <Card className="px-3">
            <Skeleton active></Skeleton>
          </Card>
        </span>
      );
    }

    return totalCards;
  };

  return <div className="row pb-5">{cards()}</div>;
};

export default LoadingCard;
