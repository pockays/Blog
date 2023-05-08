import { ElLoading } from 'element-plus'

let loading: any
export const startLoading = () => {
    interface Options {
        lock: boolean;
        text: string;
        background: string;
    }
    const options: Options = {
        lock: true,
        text: "加载中...",
        background: 'rgba(0,0,0,0.7)'
    }
    loading = ElLoading.service(options)
}
export const endLoading = () => {
    loading.close()
}