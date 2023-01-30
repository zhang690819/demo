import http from "@/utils/http";

export default {
    getAllList: ():Promise<Array<Vm.cartList>> => http<null,Array<Vm.cartList>>({url: "/cart/list", method: "post"}),
    increase: (id: number): Promise<null> => http({url: "/cart/increase/" + id, method: "post"}),
    decrease: (id: number): Promise<null> => http({url: "/cart/decrease/" + id, method: "post"}),
    remove: (data: {ids: Array<number>}) => http<{ids: Array<number>}, null>({url: "/cart/remove", method: "post", data}),
    getIdsList: (data: {ids:Array<number>}):Promise<Array<Vm.cartList>> => http<{ids:Array<number>}, Array<Vm.cartList>>({url: '/cart/list_ids', method: 'post', data})
}