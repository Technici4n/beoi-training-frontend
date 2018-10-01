import * as React from "react";
import { UserStatus, Problemset, State } from "../types";
import { connect } from "react-redux";
import { Table, TableHead, TableCell, TableRow, TableBody, Tooltip } from "@material-ui/core";

interface IProps {
    problemsets: Problemset[],
    userStatus: UserStatus[],
};

function mapStateToProps({ vjudge: { problemsets, userStatus } }: State): IProps {
    return { problemsets, userStatus };
}

function formatAcCount(ac: number, max: number, numeric: boolean = true, text: string = '') {
    return <TableCell className={ac >= max ? 'TopTable-fullAcCell' : ''} numeric={numeric}><span>{numeric ? ac : text}</span></TableCell>;
}

const ConnectedTopTable = (props: IProps) => {
    const { problemsets, userStatus } = props;
    const problemCount = problemsets.map(ps => ps.problems.length).reduce((x, v) => x + v, 0);
    return (
        <div id="TopTable">
            <h2>Top Contestants</h2>
            <Table className="TopTable-table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell numeric>AC</TableCell>
                        {(() => {
                            let i = 1;
                            return problemsets.map(p => <TableCell numeric><Tooltip title={p.title}><span>#{i++}</span></Tooltip></TableCell>)
                        })()}
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>Total</TableCell>
                        <TableCell numeric>{problemCount}</TableCell>
                        {problemsets.map(ps => <TableCell numeric>{ps.problems.length}</TableCell>)}
                    </TableRow>
                    {userStatus.map(us => {
                        let children = [];
                        children.push(formatAcCount(us.acCount, problemCount, false, us.user.name), formatAcCount(us.acCount, problemCount));
                        for (const p of problemsets) {
                            let solved = 0;
                            for (const pp of p.problems) {
                                if (pp.judge in us.resultMap && pp.name in us.resultMap[pp.judge]) {
                                    solved += us.resultMap[pp.judge][pp.name];
                                }
                            }
                            children.push(formatAcCount(solved, p.problems.length));
                        }
                        return <TableRow>{children}</TableRow>;
                    })}
                </TableBody>
            </Table>
        </div>
    )
}

const TopTable = connect(mapStateToProps)(ConnectedTopTable);
export default TopTable;