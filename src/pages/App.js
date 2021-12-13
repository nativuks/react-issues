import React from "react";
import "./App.css";

import {
  SegmentedControl,
  SegmentedControlOption,
} from "@leafygreen-ui/segmented-control";
import ReactPaginate from "react-paginate";

import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import SearchInput from "../components/SearchInput";
import useKey from "../hooks/useKey";

import GitHubIssue from "../components/GitHubIssue";

import { encodeQueryString, parseLinkHeader } from "../utils/ParserUtils";
import { BASE_URL, HEADERS } from "../utils/ApiUtils";
import { fetchData } from "../services/api";
import { useAppContext } from "../hooks/useAppContext";

const params = encodeQueryString({
  state: "open",
  //since: 0,
  page: 1,
  per_page: 10,
  sort: "stars",
  order: "desc",
});

function App() {
  const { useEffect, useState, useRef } = React;

  const { dataApp, setDataApp } = useAppContext();

  const [url, setURL] = useState(BASE_URL);

  const [searchText, setSearchText] = useState("");
  const [issues, SetIssues] = useState([]);
  const [kind, setKind] = useState("issues");

  const dataList = useRef(null);

  const [offset, setOffset] = useState(0);
  const [data, setData] = useState([]);
  const [perPage] = useState(10);
  const [pageCount, setPageCount] = useState(0);

  function handleIssues() {
    onChangeFilter("issues");
  }

  function handlePulls() {
    onChangeFilter("pulls");
  }

  function handleScape() {
    setSearchText("");
    setDataApp({});
    SetIssues([]);
  }

  useKey("KeyI", handleIssues);
  useKey("KeyP", handlePulls);
  useKey("Escape", handleScape);

  const fetchIssues = async (value) => {
    let linkHeaders = {};
    const url1 = `${url}${value}?q=${searchText}${params}`;
    const response = await fetchData(url1, HEADERS);
    console.log("Response", response);
    //if (response.headers.link != undefined) {
    //  linkHeaders = parseLinkHeader(response.headers.link);
    //}
    SetIssues(response.data);
    setData(response.data);
    setPageCount(response.data.length);
    setPageCount(Math.ceil(response.data.length / perPage));
  };
  useEffect(() => {
    if (dataApp.filter != "") {
      console.log("criteria", dataApp.criteria);
      setSearchText(dataApp.criteria);
    }
    if (dataApp.criteria != "") {
      setKind(dataApp.filter);
    }
    setDataApp({
      numberIssue: -1,
      numberPage: -1,
      filter: dataApp.criteria,
      criteria: searchText,
    });
  }, []);

  useEffect(() => {
    if (searchText) {
      console.log("SearchText:::::::", searchText);
      setDataApp({
        numberIssue: -1,
        numberPage: -1,
        filter: kind,
        criteria: searchText,
      });
      SetIssues([]);
      fetchIssues(kind);
    } else {
      SetIssues([]);
    }
  }, [searchText]);

  function onChangeFilter(value) {
    if (kind != value) {
      setKind(value);
      setDataApp({
        numberIssue: -1,
        numberPage: -1,
        filter: value,
        criteria: searchText,
      });
      SetIssues([]);
      fetchIssues(value);
    }
  }

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage + 1);
  };

  return (
    <div className="App container-fluid">
      <h1>Facebook Issues</h1>
      <SegmentedControl
        name="FacebookIssues"
        size={"default"}
        darkMode={false}
        value={kind}
        followFocus={true}
        defaultValue={kind}
        onChange={(value) => {
          onChangeFilter(value);
        }}
      >
        <SegmentedControlOption value="issues">Issues</SegmentedControlOption>
        <SegmentedControlOption value="pulls">
          Pull Request
        </SegmentedControlOption>
      </SegmentedControl>

      <SearchInput
        value={searchText}
        onChange={(searchText) => setSearchText(searchText)}
      />
      {searchText && issues.length == 0 && <span>Loading..</span>}
      <div ref={dataList}>
        {issues.length > 0 && (
          <>
            <GitHubIssue data={issues} />
            <ReactPaginate
              previousLabel={"prev"}
              nextLabel={"next"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
