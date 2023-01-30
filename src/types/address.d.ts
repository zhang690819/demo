namespace Vm {
    interface address {
        id: number;
        isDefault: 0 | 1;
        name: string;
        receiveDetail: string;
        receiveName: string;
        receivePhone: string;
        receiveRegion: string;
    }
}

namespace HttpPayLoad {
    interface addAddress {
        id: number;
        receiveName: string;
        receivePhone: string;
        receiveRegion: string;
        receiveDetail: string;
    }
}