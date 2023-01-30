import http from "@/utils/http";

export default {
    getAddressList: (): Promise<Array<Vm.address>> => http<null, Array<Vm.address>>({url: "/address/list"}),
    addAddress: (data: HttpPayLoad.addAddress): Promise<number> =>http<HttpPayLoad.addAddress, number>({url: '/address/add',method: "post", data}),
    updateAddress: (data: HttpPayLoad.addAddress): Promise<null> =>http<HttpPayLoad.addAddress, null>({url: '/address/update',method: "post", data}),
    remove: (id: number): Promise<null> => http({url: '/address/remove/' + id}),
    setDefault: (id: number): Promise<null> => http({url: '/address/set_default/' + id}),
    getModel: (id: number): Promise<Vm.address> => http<null,Vm.address>({url: '/address/model/' + id}),
    getDefault: (): Promise<Vm.address> => http<null,Vm.address>({url: '/address/get_default'})
}