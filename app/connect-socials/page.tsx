import React from "react";
import XFeed from "./(overview)/X";
import Instagram from "./(overview)/Instagram";
import FaceBook from "./(overview)/FaceBook";

const ConnectSocialsPage: React.FC = () => {
  return (
    <div className="grid grid-cols-3 gap-4 bg-gray-100">
      <div className="col-span-1">
        <XFeed />
      </div>
      <div className="col-span-1">
        <Instagram grid={true} />
      </div>
      <div className="col-span-1">
        <FaceBook />
      </div>
    </div>
  );
};

export default ConnectSocialsPage;
