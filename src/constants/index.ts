import { Config, State } from "../types";

export const initialState: State = {
    vjudge: {
        problems: {},
        problemsets: [],
        submissions: [],
        users: [],
        userStatus: [],
    },
};

export const CONFIG: Config = {
    VJUDGE_DATA_URL: '/data',
};