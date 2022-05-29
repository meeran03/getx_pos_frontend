import React from 'react';
import { addSale } from 'Services/Sale';
import { cartState } from 'states/cartState';
import LeftSideBar from './LeftSideBar';
import PageContent from './PageContent';
import "./pos.css"
import RightSideBar from './RightSideBar';
import audioURL from '../../assets/audio/notification.mp3';
import useSound from 'use-sound';

export function ModalReceipt(props) {
    const [cart, setCart] = cartState.use()
    const { data } = props
    const [playSound] = useSound(audioURL);
    const submit = () => {
        let obj = data;
        obj.variations = cart;
        addSale(obj).then(res => {
            console.log(res)
            setCart([]);
            props.setOpen(false);
            playSound();
        })
        // console.log(data)
    }
    return (
        <div x-show="isShowModalReceipt"
            class="fixed w-full h-screen left-0 top-0 z-10 flex flex-wrap justify-center content-center p-24">
            <div x-show="isShowModalReceipt" class="fixed glass w-full h-screen left-0 top-0 z-0"
            // x-on:click="closeModalReceipt()" 
            // x-transition:enter="transition ease-out duration-100"
            // x-transition:enter-start="opacity-0" x-transition:enter-end="opacity-100"
            // x-transition:leave="transition ease-in duration-100" x-transition:leave-start="opacity-100"
            // x-transition:leave-end="opacity-0"
            ></div>
            <div x-show="isShowModalReceipt" class="w-96 rounded-3xl bg-white shadow-xl overflow-hidden z-10"
            // x-transition:enter="transition ease-out duration-100"
            // x-transition:enter-start="opacity-0 transform scale-90"
            // x-transition:enter-end="opacity-100 transform scale-100"
            // x-transition:leave="transition ease-in duration-100"
            // x-transition:leave-start="opacity-100 transform scale-100"
            // x-transition:leave-end="opacity-0 transform scale-90"
            >
                <div id="receipt-content" class="text-left w-full text-sm p-6 overflow-auto">
                    <div class="text-center">
                        <img src={require('../../assets/img/logo2.png')} alt="Tailwind POS" class="mb-3 w-8 h-8 inline-block" />
                        <h2 class="text-xl font-semibold">Getx POS</h2>
                        <p>Below is Your Invoice</p>
                    </div>
                    {/* <div class="flex mt-4 text-xs">
                        <div class="flex-grow">Invoice No: <span x-text="receiptNo">{data.invoice_no}</span></div>
                        <div x-text="receiptDate"></div>
                    </div> */}
                    <hr class="my-2" />
                    <div>
                        <table class="w-full text-xs">
                            <thead>
                                <tr>
                                    <th class="py-1 w-1/12 text-center">#</th>
                                    <th class="py-1 text-left">Item</th>
                                    <th class="py-1 w-2/12 text-center">Qty</th>
                                    <th class="py-1 w-3/12 text-right">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map((item, index) => {
                                    return (
                                        <tr>
                                            <td class="py-1 text-center">{index + 1}</td>
                                            <td class="py-1 text-left">
                                                <span>{item.name}</span>
                                                <br />
                                                <small>{item.sell_price}</small>
                                            </td>
                                            <td class="py-1 text-center">{item.quantity}</td>
                                            <td class="py-1 text-right">Rs. {parseFloat(item.sell_price) * parseFloat(item.quantity)}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <hr class="my-2" />
                    <div>
                        <div class="flex text-xs font-semibold">
                            <div class="flex-grow">Subtotal: </div>
                            <div x-text="priceFormat(cash)">{parseFloat(data.final_total) + parseFloat(data.discount_amount)}</div>
                        </div>
                        <div class="flex text-xs font-semibold">
                            <div class="flex-grow">Discount: </div>
                            <div x-text="priceFormat(cash)">{data.discount_amount}</div>
                        </div>
                        <div class="flex font-semibold">
                            <div class="flex-grow">Total</div>
                            <div x-text="priceFormat(getTotalPrice())">{data.final_total}</div>
                        </div>
                        <hr class="my-2" />
                        <div class="flex text-xs font-semibold">
                            <div class="flex-grow">Customer: </div>
                            <div x-text="priceFormat(change)">{data.customer}</div>
                        </div>
                    </div>
                </div>
                <div class="p-4 w-full">
                    <button class="bg-cyan-500 text-white text-lg px-4 py-3 rounded-2xl w-full focus:outline-none"
                        // x-on:click="printAndProceed()"
                        onClick={submit}
                    >PROCEED</button>
                </div>
            </div>
        </div >
    )
}


export function ModalFirstTime(props) {
    return (
        <div x-show="firstTime"
            class="fixed glass w-full h-screen left-0 top-0 z-10 flex flex-wrap justify-center content-center p-24">
            <div class="w-96 rounded-3xl p-8 bg-white shadow-xl">
                <div class="text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="inline-block" width="123.3" height="123.233"
                        viewBox="0 0 32.623 32.605">
                        <path
                            d="M15.612 0c-.36.003-.705.01-1.03.021C8.657.223 5.742 1.123 3.4 3.472.714 6.166-.145 9.758.019 17.607c.137 6.52.965 9.271 3.542 11.768 1.31 1.269 2.658 2 4.73 2.57.846.232 2.73.547 3.56.596.36.021 2.336.048 4.392.06 3.162.018 4.031-.016 5.63-.221 3.915-.504 6.43-1.778 8.234-4.173 1.806-2.396 2.514-5.731 2.516-11.846.001-4.407-.42-7.59-1.278-9.643-1.463-3.501-4.183-5.53-8.394-6.258-1.634-.283-4.823-.475-7.339-.46z"
                            fill="#fff" />
                        <path
                            d="M16.202 13.758c-.056 0-.11 0-.16.003-.926.031-1.38.172-1.747.538-.42.421-.553.982-.528 2.208.022 1.018.151 1.447.553 1.837.205.198.415.313.739.402.132.036.426.085.556.093.056.003.365.007.686.009.494.003.63-.002.879-.035.611-.078 1.004-.277 1.286-.651.282-.374.392-.895.393-1.85 0-.688-.066-1.185-.2-1.506-.228-.547-.653-.864-1.31-.977a7.91 7.91 0 00-1.147-.072zM16.22 19.926c-.056 0-.11 0-.16.003-.925.031-1.38.172-1.746.539-.42.42-.554.981-.528 2.207.02 1.018.15 1.448.553 1.838.204.198.415.312.738.4.132.037.426.086.556.094.056.003.365.007.686.009.494.003.63-.002.88-.034.61-.08 1.003-.278 1.285-.652.282-.374.393-.895.393-1.85 0-.688-.066-1.185-.2-1.506-.228-.547-.653-.863-1.31-.977a7.91 7.91 0 00-1.146-.072zM22.468 13.736c-.056 0-.11.001-.161.003-.925.032-1.38.172-1.746.54-.42.42-.554.98-.528 2.207.021 1.018.15 1.447.553 1.837.205.198.415.313.739.401.132.037.426.086.556.094.056.003.364.007.685.009.494.003.63-.002.88-.035.611-.078 1.004-.277 1.285-.651.282-.375.393-.895.393-1.85 0-.688-.065-1.185-.2-1.506-.228-.547-.653-.864-1.31-.977a7.91 7.91 0 00-1.146-.072z"
                            fill="#00dace" />
                        <path
                            d="M9.937 13.736c-.056 0-.11.001-.161.003-.925.032-1.38.172-1.746.54-.42.42-.554.98-.528 2.207.021 1.018.15 1.447.553 1.837.204.198.415.313.738.401.133.037.427.086.556.094.056.003.365.007.686.009.494.003.63-.002.88-.035.61-.078 1.003-.277 1.285-.651.282-.375.393-.895.393-1.85 0-.688-.066-1.185-.2-1.506-.228-.547-.653-.864-1.31-.977a7.91 7.91 0 00-1.146-.072zM16.202 7.59c-.056 0-.11 0-.16.002-.926.032-1.38.172-1.747.54-.42.42-.553.98-.528 2.206.022 1.019.151 1.448.553 1.838.205.198.415.312.739.401.132.037.426.086.556.093.056.003.365.007.686.01.494.002.63-.003.879-.035.611-.079 1.004-.278 1.286-.652.282-.374.392-.895.393-1.85 0-.688-.066-1.185-.2-1.505-.228-.547-.653-.864-1.31-.978a7.91 7.91 0 00-1.147-.071z"
                            fill="#00bcd4" />
                        <g>
                            <path
                                d="M15.612 0c-.36.003-.705.01-1.03.021C8.657.223 5.742 1.123 3.4 3.472.714 6.166-.145 9.758.019 17.607c.137 6.52.965 9.271 3.542 11.768 1.31 1.269 2.658 2 4.73 2.57.846.232 2.73.547 3.56.596.36.021 2.336.048 4.392.06 3.162.018 4.031-.016 5.63-.221 3.915-.504 6.43-1.778 8.234-4.173 1.806-2.396 2.514-5.731 2.516-11.846.001-4.407-.42-7.59-1.278-9.643-1.463-3.501-4.183-5.53-8.394-6.258-1.634-.283-4.823-.475-7.339-.46z"
                                fill="#fff" />
                            <path
                                d="M16.202 13.758c-.056 0-.11 0-.16.003-.926.031-1.38.172-1.747.538-.42.421-.553.982-.528 2.208.022 1.018.151 1.447.553 1.837.205.198.415.313.739.402.132.036.426.085.556.093.056.003.365.007.686.009.494.003.63-.002.879-.035.611-.078 1.004-.277 1.286-.651.282-.374.392-.895.393-1.85 0-.688-.066-1.185-.2-1.506-.228-.547-.653-.864-1.31-.977a7.91 7.91 0 00-1.147-.072zM16.22 19.926c-.056 0-.11 0-.16.003-.925.031-1.38.172-1.746.539-.42.42-.554.981-.528 2.207.02 1.018.15 1.448.553 1.838.204.198.415.312.738.4.132.037.426.086.556.094.056.003.365.007.686.009.494.003.63-.002.88-.034.61-.08 1.003-.278 1.285-.652.282-.374.393-.895.393-1.85 0-.688-.066-1.185-.2-1.506-.228-.547-.653-.863-1.31-.977a7.91 7.91 0 00-1.146-.072zM22.468 13.736c-.056 0-.11.001-.161.003-.925.032-1.38.172-1.746.54-.42.42-.554.98-.528 2.207.021 1.018.15 1.447.553 1.837.205.198.415.313.739.401.132.037.426.086.556.094.056.003.364.007.685.009.494.003.63-.002.88-.035.611-.078 1.004-.277 1.285-.651.282-.375.393-.895.393-1.85 0-.688-.065-1.185-.2-1.506-.228-.547-.653-.864-1.31-.977a7.91 7.91 0 00-1.146-.072z"
                                fill="#00dace" />
                            <path
                                d="M9.937 13.736c-.056 0-.11.001-.161.003-.925.032-1.38.172-1.746.54-.42.42-.554.98-.528 2.207.021 1.018.15 1.447.553 1.837.204.198.415.313.738.401.133.037.427.086.556.094.056.003.365.007.686.009.494.003.63-.002.88-.035.61-.078 1.003-.277 1.285-.651.282-.375.393-.895.393-1.85 0-.688-.066-1.185-.2-1.506-.228-.547-.653-.864-1.31-.977a7.91 7.91 0 00-1.146-.072zM16.202 7.59c-.056 0-.11 0-.16.002-.926.032-1.38.172-1.747.54-.42.42-.553.98-.528 2.206.022 1.019.151 1.448.553 1.838.205.198.415.312.739.401.132.037.426.086.556.093.056.003.365.007.686.01.494.002.63-.003.879-.035.611-.079 1.004-.278 1.286-.652.282-.374.392-.895.393-1.85 0-.688-.066-1.185-.2-1.505-.228-.547-.653-.864-1.31-.978a7.91 7.91 0 00-1.147-.071z"
                                fill="#00bcd4" />
                        </g>
                    </svg>
                    <h3 class="text-center text-2xl mb-8">FIRST TIME?</h3>
                </div>
                <div class="text-left">
                    <button
                        // x-on:click="startWithSampleData()"
                        class="text-left w-full mb-3 rounded-xl bg-blue-gray-500 text-white focus:outline-none hover:bg-cyan-400 px-4 py-4">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline-block -mt-1 mr-2" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20" />
                        </svg>
                        LOAD SAMPLE DATA
                    </button>
                    <button
                        // x-on:click="startBlank()"
                        class="text-left w-full rounded-xl bg-blue-gray-500 text-white focus:outline-none hover:bg-teal-400 px-4 py-4">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline-block -mt-1 mr-2" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                        LEAVE IT EMPTY
                    </button>
                </div>
            </div>
        </div>
    )
}

export default function POSScreen(props) {
    const [open, setOpen] = React.useState(false)
    const [data, setData] = React.useState({
        invoice_no: '',
    })
    return (
        <body class="bg-blue-gray-50"
        // x-data="initApp()" x-init="initDatabase()"
        >
            <div class="hide-print flex flex-row h-screen antialiased text-blue-gray-800">
                <LeftSideBar />
                <div class="flex-grow flex">
                    <PageContent />
                    <RightSideBar data={data} setData={setData} setOpen={setOpen} open={open} />
                </div>

                {/* <ModalFirstTime /> */}

                {open && <ModalReceipt setOpen={setOpen} data={data} />}
            </div>
        </body>
    );
}