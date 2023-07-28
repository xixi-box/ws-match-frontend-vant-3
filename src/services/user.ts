import myAxios from "../plugins/myAxios";
import {setCurrentUserState} from "../states/user";


export const getCurrentUser = async () => {
    // 不存在则从远程获取
    const res = await myAxios.get('/user/current');
    if (res.code === 0) {
        setCurrentUserState(res.data);
        return res.data;
    }
    return null;
}

