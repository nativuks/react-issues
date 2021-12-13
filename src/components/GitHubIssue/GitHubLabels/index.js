import React from "react";
import { invertColor } from "../../../utils/UtilColors";
import "./style.scss";

export default function GitHubLabels({ labels }) {
  return (
    <>
      {labels &&
        labels.map((gitLabel, index) => {
          return (
            <span
              key={index}
              style={{
                backgroundColor: "#" + gitLabel.color,
                color: invertColor("#" + gitLabel.color, true),
              }}
              className={"tag " + (gitLabel.length === 0 ? "is-hidden" : "")}
            >
              {gitLabel?.name}{" "}
            </span>
          );
        })}
    </>
  );
}
