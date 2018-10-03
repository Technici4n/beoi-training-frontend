import * as React from 'react'
import { connect } from 'react-redux';
import { State, Problemset, UserStatus, ProblemMap, Problem } from '../types';
import { ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails, withStyles, Table, TableHead, TableBody, TableRow, TableCell, Tooltip } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = (theme: any) => ({
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
});

interface IProps {
    problems: ProblemMap,
    problemsets: Problemset[],
    userStatus: UserStatus[],
};

function mapStateToProps({ vjudge: { problems, problemsets, userStatus } }: State): IProps {
    return { problems, problemsets, userStatus };
}

function formatAcCount(ac: number, max: number, numeric: boolean = true, text: string = '') {
    return <TableCell className={ac >= max ? 'TopTable-fullAcCell' : ''} numeric={numeric}><span>{numeric ? ac : text}</span></TableCell>;
}

function openTab(url: string) {
    window.open(url, "_blank");
}

const ConnectedProblemList = (props: IProps) => {
    const { problems, problemsets, userStatus } = props;

    let problemsetData: any[][] = [];
    for (const p of problemsets) {
        let data = [];
        for (const us of userStatus) {
            let acCount = 0;
            let resultArr = [];
            for (const pp of p.problems) {
                if (pp.judge in us.resultMap && pp.name in us.resultMap[pp.judge]) {
                    acCount += us.resultMap[pp.judge][pp.name];
                    resultArr.push(us.resultMap[pp.judge][pp.name]);
                } else {
                    resultArr.push(0);
                }
            }
            data.push({ acCount, resultArr, user: us.user });
        }
        data.sort((a, b) => b.acCount - a.acCount || (b.user.name < a.user.name ? 1 : -1));
        problemsetData.push(data);
    }

    let i = 0;
    return (
        <div id="ProblemList">
            <h2>Problem List</h2>
            {problemsets.map(p => (
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}><Typography>#{++i}: {p.title}</Typography></ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Table className="ProblemList-table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell numeric>AC</TableCell>
                                    {(() => {
                                        let j = 1;
                                        return p.problems.map(pp => <TableCell numeric onClick={openTab.bind(undefined, Problem.getLink(pp.judge, pp.name))}><Tooltip title={problems[pp.judge][pp.name].title}><span className="ProblemList-problem-cell">#{j++}</span></Tooltip></TableCell>)
                                    })()}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {problemsetData[i-1].map(us => {
                                    let children = [];
                                    children.push(formatAcCount(us.acCount, p.problems.length, false, us.user.name), formatAcCount(us.acCount, p.problems.length));
                                    children.push(...us.resultArr.map((r:any) => formatAcCount(r, 1)));
                                    return <TableRow>{children}</TableRow>;
                                })}
                            </TableBody>
                        </Table>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            ))}
        </div>
    );
}

const ProblemList = connect(mapStateToProps)(withStyles(styles)(ConnectedProblemList));

export default ProblemList;