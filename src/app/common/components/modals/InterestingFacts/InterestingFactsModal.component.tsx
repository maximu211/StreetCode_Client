import './InterestingFactsModal.styles.scss';
import { Modal } from "antd";
import { useMobx } from "@stores/root-store";
import { observer } from "mobx-react-lite";

interface Props {

}

const text = "7 (20) березня члени Центральної Ради обрали Михайла Грушевського своїм головою.\n    Рішення було прийняте без відома самого Грушевського, що свідчить про його колосальний авторитет.\n    На той час Грушевський навіть знаходився поза Україною, але повернувся, щоб обійняти посаду.\n    longTextlongTextlongTextlongTextlongTextlongTextlongTextlongTextlongTextlongTextlongTextlongText";
const cancelBtnSvg = <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
        d="M17.2868 13.998L27.3105 3.99625C27.7494 3.55724 27.996 2.96181 27.996 2.34095C27.996 1.72009
        27.7494 1.12466 27.3105 0.685649C26.8715 0.246635 26.2762 0 25.6554 0C25.0346 0 24.4393 0.246635 24.0003
        0.685649L14 10.7107L3.99966 0.685649C3.56071 0.246635 2.96537 -4.62576e-09 2.3446 0C1.72383 4.62576e-09
        1.12848 0.246635 0.68953 0.685649C0.250579 1.12466 0.00397823 1.72009 0.00397822 2.34095C0.00397822 2.96181
        0.250579 3.55724 0.68953 3.99625L10.7132 13.998L0.68953 23.9998C0.471041 24.2165 0.297623 24.4744 0.179277
        24.7585C0.0609309 25.0426 0 25.3473 0 25.6551C0 25.9628 0.0609309 26.2676 0.179277 26.5517C0.297623 26.8358
        0.471041 27.0936 0.68953 27.3104C0.906234 27.5289 1.16405 27.7023 1.44812 27.8207C1.73218 27.9391 2.03687 28
        2.3446 28C2.65233 28 2.95701 27.9391 3.24108 27.8207C3.52514 27.7023 3.78296 27.5289 3.99966 27.3104L14
        17.2853L24.0003 27.3104C24.217 27.5289 24.4749 27.7023 24.7589 27.8207C25.043 27.9391 25.3477 28 25.6554 28C25.9631
        28 26.2678 27.9391 26.5519 27.8207C26.8359 27.7023 27.0938 27.5289 27.3105 27.3104C27.529 27.0936 27.7024 26.8358
        27.8207 26.5517C27.9391 26.2676 28 25.9628 28 25.6551C28 25.3473 27.9391 25.0426 27.8207 24.7585C27.7024 24.4744
        27.529 24.2165 27.3105 23.9998L17.2868 13.998Z"
        fill="#D3CDCA"
    />
</svg>

const InterestingFactsModal = (props: Props) => {
    const { interestingFactsStore: { closeModal, isOpen } } = useMobx();

    return (
        <Modal className={"interestingFactsModal"}
            open={isOpen}
            onCancel={closeModal}
            footer={null}
            maskClosable
            closeIcon={cancelBtnSvg}
        >
            <div className={"factsImgContainer"}>

            </div>
            <div className={"factsContentContainer"}>
                <h1>Голова Центральної Ради</h1>
                <div className={"factsTextContainer"}>
                    {text}
                </div>
            </div>
        </Modal>
    );
}

export default observer(InterestingFactsModal);