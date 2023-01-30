import http from "@/utils/http";

export default {
    getIdList: (id: number): Promise<Vm.Product> => http<null, Vm.Product>({url: "/product/model/" + id}),
    addCart: (data: HttpPayLoad.AddCart): Promise<null> => http<HttpPayLoad.AddCart, null>({url: "/cart/add", method: 'post', data})
}