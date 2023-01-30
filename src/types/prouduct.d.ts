namespace Vm {
    interface Product {
        id: number;
        cid: number;
        name: string;
        avatar: string;
        brief: string;
        price: number;
        sale: number;
        rate: number;
        bannerImags: string;
        otherImgs: string;
    }
}

namespace httpPayLoad {
    interface Product {
        name: string;
        cid: number;
        orderCol: string;
        orderDir: string;
        begin: number;
        pageSize: number;
    }
}