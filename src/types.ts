export interface Config {
    VJUDGE_DATA_URL: string,
};

export class Problem {
    public judge: string;
    public name: string;
    public title: string;
    public static getLink(judge: string, name: string) {
        return `https://vjudge.net/problem/${judge}-${name}`;
    };
};

export class Problemset {
    public title: string;
    public problems: ProblemsetProblem[];
};

export class ProblemsetProblem {
    public judge: string;
    public name: string;
};

export class State {
    public vjudge: VjudgeState;
};

export class Submission {
    public judge: string;
    public problem_name: string;
    public time: Date;
    public user_id: number;
    public verdict: Verdict;
};

export class User {
    public id: number;
    public name: string;
    public vjudge_username: string;
};

export class UserStatus {
    public user: User;
    public acCount: number;
    public resultMap: { [key: string]: { [key: string]: number } };
};

export class Verdict {
    public verdict: string;
    public type: VerdictType;
    public constructor(v: string) {
        this.verdict = v;
        this.type =
            v === 'AC' ? VerdictType.Accepted :
                v === 'SUBMITTED' || v === 'PENDING' ? VerdictType.Unknown :
                    VerdictType.Rejected;
    };
};

export enum VerdictType {
    Accepted,
    Rejected,
    Unknown,
};

export type ProblemMap = { [k: string]: { [k: string]: Problem } };

export class VjudgeState {
    public problems: ProblemMap;
    public problemsets: Problemset[];
    public submissions: Submission[];
    public users: User[];
    public userStatus: UserStatus[];
};
