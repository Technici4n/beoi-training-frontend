import { List, ListItem, ListItemText, Hidden } from "@material-ui/core";
import * as React from "react";
import { connect } from "react-redux";
import { Problem, Submission, User, ProblemMap } from "../types";
import VerdictIcon from "./VerdictIcon";

class Props {
    problems: ProblemMap;
    submissions: Submission[];
    users: User[];
};

// @ts-ignore
const mapStateToProps = ({ vjudge: { problems, submissions, users } }): Props => ({
    problems, submissions, users,
});

function padTwo(i: number): string {
    // @ts-ignore
    return i.toString().padStart(2, '0');
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Sep', 'Oct', 'Nov', 'Dec'];
function formatTime(time: Date): string {
    const month = time.getMonth() - 1;
    const day = padTwo(time.getDate());
    const hours = padTwo(time.getHours());
    const mins = padTwo(time.getMinutes());
    return `${day} ${MONTHS[month]} at ${hours}:${mins}`;
};

function openTab(url: string) {
    window.open(url, "_blank");
}

const ConnectedSubmissionList = ({ problems, submissions, users }: Props) => {
    const userHashmap: User[] = [];
    for (const u of users) {
        userHashmap[u.id] = u;
    }
    return (
        <div id="SubmissionList">
            <h2>Recent Activity</h2>
            <List>
                {submissions.map(s => (
                    <ListItem button onClick={openTab.bind(undefined, Problem.getLink(s.judge, s.problem_name))}>
                        <VerdictIcon verdict={s.verdict} />
                        <ListItemText
                            primary={
                                <span>
                                    {problems[s.judge][s.problem_name].title}
                                    <Hidden smDown> (problem <em>{s.problem_name}</em> on {s.judge})</Hidden>
                                </span>
                            }
                            secondary={`${userHashmap[s.user_id].name}, ${formatTime(s.time)}`} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
}

const SubmissionList = connect(mapStateToProps)(ConnectedSubmissionList);

export default SubmissionList;