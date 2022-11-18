import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@mui/material/Button";
import AuthRequired from "../../components/auth/AuthRequired";
import ChatBody from "../../components/chatbody/ChatBody";
import ApiEndpoints from "../../api/apiEndpoints";
import CommonUtil from "../../util/commonUtil";
import Constants from "../../lib/constants";

const ChatScreen = (props) => {
  const [currentChattingMember, setCurrentChattingMember] = useState({});
  const [onlineUserList, setOnlineUserList] = useState([]);
  // let urlParts = location.href.split("/");
  let { urlParts } = useParams();

  return (
    <main className="content">
      <div className="container-fluid p-0">
        <div className="container-fluid">
          <div className="row">
            <span>
              <strong>{ currentChattingMember.name }</strong>
            </span>
          </div>
          <div className="row g-0">
          <Link
            to={`/`}
            className={
              "pl-1 list-group-item list-group-item-action border-0 "
            }
            key={currentChattingMember.id}
          >
            <Button variant="contained">
              Back
            </Button>
          </Link>
          </div>
          <div className="row g-0">
            { currentChattingMember.id }
            <ChatBody
              setOnlineUserList={setOnlineUserList}
              currentChattingMember={currentChattingMember}
              {...props}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default AuthRequired(ChatScreen);
