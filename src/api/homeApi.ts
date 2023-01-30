import http from "@/utils/http";

export default {
    getList: (data: httpPayLoad.Product):Promise<Array<Vm.Product>> => http<httpPayLoad.Product, Array<Vm.Product>>({url: "/product/list", method: "post", data})
}