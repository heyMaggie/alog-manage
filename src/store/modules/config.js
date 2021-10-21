let configObj = { jgdw: 0.0001, sldw: 100 };
if (localStorage.configObj) {
    configObj = JSON.parse(localStorage.configObj);
}
const initialState = {
    name: "张三",
    ...configObj,
};
export default (state = initialState, action) => {
    switch (action.type) {
        case "setConfig":
            return Object.assign({}, state, action.payload);
        case "CHANGE_NAME":
            return Object.assign({}, state, {
                name: action.payload,
            });
        default:
            return state;
    }
};
