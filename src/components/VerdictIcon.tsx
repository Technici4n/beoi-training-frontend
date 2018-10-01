import { Avatar, CircularProgress, withStyles } from '@material-ui/core';
import { Clear, Done } from '@material-ui/icons';
import * as React from "react";
import { themeColors } from '../constants/theme';
import { Verdict, VerdictType } from "../types";

const styles = {
    avatar: {
        backgroundColor: '#fff',
        margin: 10,
    },
    greenAvatar: {
        backgroundColor: themeColors.primary[500],
        color: '#fff',
        margin: 10,
    },
    pinkAvatar: {
        backgroundColor: themeColors.secondary[500],
        color: '#fff',
        margin: 10,
    },
    row: {
        display: 'flex',
        justifyContent: 'center',
    },
};

class Props {
    classes: any;
    verdict: Verdict;
};

const VerdictIcon = (props: Props) => {
    const { classes, verdict } = props;
    let icon;
    let klass;
    switch (verdict.type) {
        case VerdictType.Accepted:
            icon = <Done />;
            klass = classes.greenAvatar;
            break;
        case VerdictType.Rejected:
            icon = <Clear />;
            klass = classes.pinkAvatar;
            break;
        case VerdictType.Unknown:
            icon = <CircularProgress size={30} />;
            klass = classes.avatar;
            break;
    };
    const avatar = <Avatar className={klass}>{icon}</Avatar>;
    return avatar;
};

export default withStyles(styles)(VerdictIcon);