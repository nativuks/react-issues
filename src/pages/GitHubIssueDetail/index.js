import React from "react";
import { useParams, useNavigate } from "react-router-dom";

import { BASE_URL, HEADERS } from "../../utils/ApiUtils";
import { useAppContext } from "../../hooks/useAppContext";
import useKey from "../../hooks/useKey";
import { fetchData } from "../../services/api";
import "./style.scss";

export function GitHubIssueDetail() {
  const { useEffect, useState, useContext } = React;
  const navigate = useNavigate();
  const [issue, setIssue] = useState({});
  let params = useParams();
  const { dataApp } = useAppContext();

  const goHome = () => {
    navigate(`/`);
  };

  function handleBack() {
    goHome();
    console.log("Pres BAck!!");
  }

  useKey("Backspace", handleBack);

  const fetchIssue = async () => {
    const url = `${BASE_URL}${dataApp.filter}/${params.issueId}`;
    const response = await fetchData(url, HEADERS);
    setIssue(response.data);
  };

  useEffect(() => {
    fetchIssue();
  }, []);
  return (
    <div>
      <h1 className="back" onClick={goHome}>
        {" "}
        Regresar
      </h1>

      <div className="row1-container">
        <div className="box red">
          <h2>{issue?.title}</h2>
          <p>{issue?.body}</p>
          <div>
            <div className="status">{issue?.state}</div>
            <div className="user-info">
              Reported by: {issue?.user?.login}
              <img src={issue?.user?.avatar_url} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
