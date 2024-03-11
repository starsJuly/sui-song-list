import config from "../config/constants";

export const include = (obj1, obj2) => {
    return obj1?.toString().toLowerCase().includes(obj2.toLowerCase())
}

export const getCursor = () => {
    return config.Cursor ? 'url("./assets/cursor/pointer.png"), pointer' : 'pointer'
}
