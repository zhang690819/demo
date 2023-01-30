import { createPinia } from "pinia";
import useAddress from "./addressStore";

const pinia = createPinia();

export default pinia;
export {useAddress}