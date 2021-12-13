import React from "react";

export default function GitHubDetail({ issue }) {
  return (
    <div className="github-detail">
      <span>#{issue.id}</span>
    </div>
  );
}
