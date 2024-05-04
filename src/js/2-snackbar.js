import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
const radioBtns = document.querySelectorAll('[type = "radio"]');

iziToast.settings ({
titleColor: 'white',
messageColor: 'white',
position: 'topRight',
})

document.querySelector('.form').addEventListener('submit', function (event) {
    event.preventDefault();

    const delayInput = document.querySelector('input[name="delay"]');
    const delay = parseInt(document.querySelector('input[name="delay"]').value);
    const state = document.querySelector('input[name="state"]:checked').value;

    const promise = new Promise((resolve, reject) => {
        if (state === 'fulfilled') {
            resolve(delay);
        } else {
            reject(delay);
        }
    });

    promise.then((delay) => {
        setTimeout(() => {
            iziToast.show({
                title: 'OK',
                message: `Fulfilled promise in ${delay}ms`,
                backgroundColor: 'green',
            })
        }, delay);
        radioBtns.forEach((radio) => {
            radio.checked = false;
            delayInput.value = null;
        })
    }).catch((delay) => {
        setTimeout(() => {
            iziToast.show({
                title: 'ERROR',
                message: `Rejected promise in ${delay}ms`,
                backgroundColor: 'red',
            });
        }, delay);
        radioBtns.forEach((radio) => {
            radio.checked = false;
            delayInput.value = null;
        })
    });
});