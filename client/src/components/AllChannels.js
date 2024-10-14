import React, { useEffect, useState } from "react";
import SingleChannel from "./SingleChannel";
import axios from "axios";

const AllChannels = ({ channels }) => {
  const [channelsa, setChannels] = useState([]);

  return (
    <div>
      <h1 className="heading-channels">All Channels</h1>
      <div className="channels-container">
        {channels.map((item, index) => (
          <SingleChannel channel={item} />
        ))}
      </div>
    </div>
  );
};

export default AllChannels;
