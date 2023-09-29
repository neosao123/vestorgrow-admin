import React from 'react'
import Pagination from "react-bootstrap/Pagination";
import { Link } from 'react-router-dom'

export default function Table({ date, thead, tdata, items }) {
    return (
        <div className="users_table">
            <div className="current_courses_table table-responsive">
                <table className="main_table w-100">
                    <thead>
                        <tr>
                            {thead.map((h, i) => {
                                return <TableHeadItem className={i == 0 ? "course_id" : ""} key={i} item={h} />;
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {tdata.map((item) => {
                            return <TableRow key={item.id} data={item.items} />;
                        })}
                    </tbody>

                </table>
                <div className="users_table_footer d-flex ">
                    <Pagination size="sm">{items}</Pagination>
                </div>
            </div>
        </div>
    )
}

const TableHeadItem = ({ item }) => {
    return (
        <th title={item}>
            {item}
        </th>
    );
};

const TableRow = ({ data }) => {
    return (
        <tr>
            {data.map((item, i) => {
                return <td key={i}>{item}</td>;
            })}
        </tr>
    );
};