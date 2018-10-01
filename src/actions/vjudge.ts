import { AnyAction, Dispatch } from "redux";
import { CONFIG } from "../constants";

/**
 * Queries the server for updated vjudge data
 */
export function fetch_data() {
    return (dispatch: Dispatch) => {
        // Standard AJAX request
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                try {
                    const act = updateData(JSON.parse(this.responseText));
                    dispatch(act);
                } catch (e) {
                    console.log('Could not parse response JSON:', e);
                };
            }
        };
        xhttp.open('GET', CONFIG.VJUDGE_DATA_URL + '?_=' + new Date().getTime(), true);
        xhttp.send();
    }
}


////////////////////////////
// ==== Action types ==== //
////////////////////////////
export const UPDATE_DATA = 'UPDATE_DATA';

function updateData(payload: any): AnyAction {
    return {
        payload,
        type: UPDATE_DATA,
    };
}