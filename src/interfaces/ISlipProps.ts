import Slip from "../models/Slip";

export default interface ISlipProps {
    showSlip(): void,
    isHidden: boolean,
    slip?: Slip
}