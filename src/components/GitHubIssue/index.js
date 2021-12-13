import React from "react";

import { useNavigate } from "react-router-dom";

import GitHubDetail from "./GitHubDetail";
import GitHubLabels from "./GitHubLabels";

import useKey from "../../hooks/useKey";
import { useAppContext } from "../../hooks/useAppContext";

import "./style.scss";

export default function GitHubIssue({ sendkey, data }) {
  const { useState, useContext } = React;

  const [active, setActive] = useState(0);
  const [issues, setIssues] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);

  const { dataApp, setDataApp } = useAppContext();

  const navigate = useNavigate();

  function handlePressUP() {
    console.log("Press ArrowUp");
    return active - 1 === data.length ? null : setActive(active + 1);
  }

  function handlePressDown() {
    console.log("Press ArrowDown");
    return active === 0 ? null : setActive(active - 1);
  }

  function handleEnter() {
    console.log("Press Enter");
    setActive(0);
    //setIsShow(false);
  }

  function handleEscape() {
    setActive(0);
    setIsShow(false);
    setIssues([]);
  }

  function handleOnTab() {
    setActive(0);
  }

  function handleGoToIssue() {
    navigate(`/issues/${data[active].number}`);
    console.log("Send Issue", data[active]);
  }
  useKey("ArrowUp", handlePressUP);
  useKey("ArrowDown", handlePressDown);
  useKey("Enter", handleGoToIssue);
  useKey("Escape", handleEscape);
  useKey("KeyG", handleGoToIssue);

  useKey("Tab", handleOnTab);

  function onItemClick(e, issue) {
    e.preventDefault();
    console.log("Item clicked", issue);
  }
  return (
    <div>
      <ul className="autocomplete">
        {data &&
          data.map((issue, index) => {
            let className;
            if (index === active) {
              className = "active";
            }
            return (
              <li
                key={index}
                className={className}
                onClick={(e) => onItemClick(e, issue)}
              >
                {issue.title}
                {"  "}
                {issue.labels && <GitHubLabels labels={issue.labels} />}
                <GitHubDetail issue={issue} />
              </li>
            );
          })}
      </ul>
    </div>
  );
}
