import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import { ElMessage, ElMessageBox} from 'element-plus';
import router from '@/router';

interface HttpResult<R> {
    code: 500 | 404 | 401 | 200 | 199;
    data: R;
    msg: string;
}
// 封装axios，方便api调用
function http<T = null, R = null>(options: AxiosRequestConfig<T>): Promise<R> {
    const defaultHeaders = {Authorization: sessionStorage.getItem("token")};
    options.headers = Object.assign({}, defaultHeaders, options.headers || {});
    return axios(options)
        .then((response: AxiosResponse<HttpResult<R>>) => {
            const {status, data, statusText} = response;
            if(status === 200) return data;
            else throw new Error(statusText);
        })
        .then((response: HttpResult<R>) => {
            const {code, data, msg} = response;
            switch(code) {
                case 200: return data;
                case 401:
                    ElMessageBox.alert(msg, '提示', {
                        confirmButtonText: '确定',
                    }).then(() => {
                       router.push({name: 'Login'})
                    })
                    return data
                case 199:
                case 404:
                case 500:
                    throw new Error(msg);
                default:
                    // 如果此处报错，则说明code的case不全
                    let a: never = code;
                    throw new Error('Can not reach here..')
            }
        })
        .catch(e => {
            ElMessage.error(e.message)
            throw e;
        });
}

export default http;