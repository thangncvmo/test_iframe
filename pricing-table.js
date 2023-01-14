document.addEventListener("DOMContentLoaded", () => {

    window.addEventListener('message', function (e) {
        let message = e.data;

        if (message.height) {
            const iframe = document.querySelectorAll("pricing-table iframe");
            if (iframe.length > 0) {
                iframe[0].style.height = message.height + 'px';
            }
        }

    }, false);

    function createIframe() {
        const pricingTable = document.getElementsByTagName("pricing-table");
        if (pricingTable.length > 0) {
            const iframeSrc = pricingTable[0].getAttribute('iframe-src');
            const priceApi = pricingTable[0].getAttribute('price-api');
            const btnTarget = pricingTable[0].getAttribute('btn-target');
            if (iframeSrc && priceApi && btnTarget) {
                const iframeFullSrc = `${iframeSrc}?price_api=${priceApi}&target=${btnTarget}`;
                const iframe = document.createElement("iframe");
                iframe.setAttribute('frameborder', '0');
                iframe.setAttribute('scrolling', 'no');
                iframe.setAttribute('style', 'overflow:hidden;height:100%;width:100%');
                iframe.src = iframeFullSrc;
                pricingTable[0].replaceChildren();
                pricingTable[0].appendChild(iframe);
            } else {
                console.log('The pricing-table tag requires the following attributes: btn-target, price-api, iframe-src');
            }
        } else {
            console.log('Tag pricing-table could not be found.');
        }

    }

    createIframe()
})