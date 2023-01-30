import http from "@/utils/http";

export default {
    getCategory: (id:number): Promise<Array<Vm.CategoryList>> => http({url: "/category/list/" + id})
}