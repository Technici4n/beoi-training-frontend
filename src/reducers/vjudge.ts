import { UPDATE_DATA } from "../actions/vjudge";
import { initialState } from "../constants";
import { Submission, VjudgeState, Verdict, UserStatus, Problemset } from "../types";
import { AnyAction } from "redux";

export function reduceVjudge(state: VjudgeState = initialState.vjudge, action: AnyAction): VjudgeState {
    switch (action.type) {
        case UPDATE_DATA:
            return handleUpdateData(state, action);
    }
    return state;
}

function handleUpdateData(_: VjudgeState, action: AnyAction): VjudgeState {
    const payload = action.payload;

    const mapTime = (t: string): Date => new Date(Number.parseInt(t));
    const mapVerdict = (v: string): Verdict => new Verdict(v);
    const mapSubmission = (s: any): Submission => {
        return {
            ...s,
            time: mapTime(s.time),
            verdict: mapVerdict(s.status),
        };
    };

    const problemsetProblems: any = payload.problemset_problems;
    let i = 0;
    const problemsets: Problemset[] = [];
    for (let j = 0; j < payload.problemsets.length; ++j) {
        let ps: Problemset = {
            title: payload.problemsets[j].title,
            problems: [],
        };
        while(i < problemsetProblems.length && problemsetProblems[i].problemset_id === j) {
            const x = problemsetProblems[i];
            const {judge, name} = x;
            ps.problems.push({ judge, name });
            ++i;
        }
        problemsets.push(ps);
    }

    /* Use two pointers to get every user's UserProblem */
    const userProblems: any = payload.userProblems;
    let up = 0;
    let userStatus: UserStatus[] = [];
    for (const user of payload.users) {
        let acCount = 0;
        let rm = {};
        while (up < userProblems.length && userProblems[up].user_id === user.id) {
            const x = userProblems[up];
            rm[x.judge] = rm[x.judge] || {};
            rm[x.judge][x.problem_name] = Number(Boolean(x.accepted));
            ++up;
        }

        problemsets.forEach(ps => {
            ps.problems.forEach(pp => {
                if(pp.judge in rm && pp.name in rm[pp.judge]) {
                    acCount += rm[pp.judge][pp.name];
                }
            });
        });

        userStatus.push({ user, acCount, resultMap: rm });
    }
    userStatus.sort((a, b) => b.acCount - a.acCount || (b.user.name < a.user.name ? 1 : -1));

    const problemHashmap = {};
    for (const p of payload.problems) {
        problemHashmap[p.judge] = problemHashmap[p.judge] || {};
        problemHashmap[p.judge][p.name] = p;
    }

    return {
        problems: problemHashmap,
        problemsets: problemsets,
        submissions: payload.submissions.map(mapSubmission),
        users: payload.users,
        userStatus,
    }
}