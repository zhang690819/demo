namespace Vm {
    interface orderDetails {
        id: number;
        count: number;
        name: string;
        avatar: string;
        price: number;
    }
    interface order {
        account: number;
        addressId: number;
        details: Array<Vm.orderDetails>
        orderId: string;
        orderTime: string;
        pay: 0 | 1;
        receiveDetail: string;
        receiveName: string;
        receivePhone: string;
        receiveRegion: string;
        uName: string
    }
}
namespace HttpPayLoad {
    interface confirmOrder {
        ids: Array<number>;
        account: number;
        addressId: number;
    }
}