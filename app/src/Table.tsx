import React, { Component } from "react";

import rawData from "./metacritic.json";

interface MetaCriticDataRecord {
  title: string;
  meta_score: number;
  user_score: number;
  release_date: string;
}

const fullData = rawData as Array<MetaCriticDataRecord>;

function renderTableHeader() {
  let header = Object.keys(fullData[0]);
  return header.map((key, index) => {
    return <th key={index}>{key.toUpperCase()}</th>;
  });
}

function renderTableRow(data: MetaCriticDataRecord) {
  return (
    <tr key={data.title}>
      <td>{data.title}</td>
      <td>{data.meta_score}</td>
      <td>{data.user_score}</td>
      <td>{data.release_date}</td>
    </tr>
  );
}

function renderTableRows(data: Array<MetaCriticDataRecord>) {
  return <tbody>{data.map(s => renderTableRow(s))}</tbody>;
}

const firstRows = fullData.slice(0, 100);

class Table extends Component {
  render() {
    return (
      <table id="metacritic-table">
        {renderTableHeader()}
        {renderTableRows(firstRows)}
      </table>
    );
  }
}
export default Table;
