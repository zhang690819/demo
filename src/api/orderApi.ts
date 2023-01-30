import http from "@/utils/http";

export default {
    getAllOrder: ():Promise<Array<Vm.order>> => http<null, Array<Vm.order>>({url: "/order/list_all"}),
    getPayOrder: (): Promise<Array<Vm.order>> => http<null, Array<Vm.order>>({url: "/order/list_pay"}),
    getUnpayOrder: (): Promise<Array<Vm.order>> => http<null, Array<Vm.order>>({url: "/order/list_unpay"}),
    pay: (id: string): Promise<null> => http({url: '/order/pay/' + id}),
    remove: (id: string): Promise<null> => http({url: '/order/remove/' + id}),
    confirmOrder: (data: HttpPayLoad.confirmOrder) => http<HttpPayLoad.confirmOrder,null>({url: '/order/confirm', method: 'post', data})
}