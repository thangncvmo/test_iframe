fetchData();

function fetchData() {
    document.addEventListener("DOMContentLoaded", () => {

        const urlParams = decodeURI(window.location.search)
            .replace('?', '')
            .split('&')
            .map(param => param.split('='))
            .reduce((values, [key, value]) => {
                values[key] = value
                return values
            }, {})

        if (urlParams.price_api) {
            document.getElementById('loading').style.display = 'flex';
            fetch(urlParams.price_api)
                .then((response) => response.json())
                .then((data) => {
                    document.getElementById('loading').style.display = 'none';
                    processData(data, urlParams);
                }).then(() => postHeightToParent());
        }
    });
}

function calPriceAmount(data) {
    let priceAmount = 0;
    if (data.tiers && data.tiers[0]) {
        priceAmount = parseInt(parseInt(data.tiers[0].flat_amount) / 100) || 0;
    } else {
        priceAmount = parseInt(parseInt(data.unit_amount) / 100) || 0
    }
    return priceAmount
}

function pricePriviewContent(data) {
    const cardPricePreview = document.createElement("div");
    cardPricePreview.classList.add('planCheckout__price__preview_content__inner');

    data.tiers.map((item, idx) => {
        const cardPricePreviewItem = document.createElement("div");
        let textContent = "";
        if (idx == 0) {
            textContent = `First ${item.up_to || '∞'}: $${(item.unit_amount || 0) / 100} per unit + $${(item.flat_amount || 0) / 100}`
        } else {
            textContent = `Next ${item.up_to || '∞'}: $${(item.unit_amount || 0) / 100} per unit`
        }
        cardPricePreviewItem.textContent = textContent;
        cardPricePreview.appendChild(cardPricePreviewItem);
    })

    return cardPricePreview


}

function featureSvgIcon() {
    const cardFeatureItemSvg = document.createElement("div");
    cardFeatureItemSvg.classList.add('plan__include__icon');
    cardFeatureItemSvg.innerHTML = '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check-circle" class="svg-inline--fa fa-check-circle fa-w-16 fa-fw " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"> <path fill="currentColor" d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path></svg>';
    return cardFeatureItemSvg;
}

function cardButton(target, data, enterprisePlan) {
    const cardButton = document.createElement("div");
    cardButton.classList.add('plan__button');
    const cardButtonA = document.createElement("a");
    cardButtonA.classList.add('btn', 'btn-primary', 'btn-lg', 'btn-block');
    let textContent = 'Start Trial'
    if (enterprisePlan.includes(data.product.id)) {
        textContent = 'Contact Us';
    } else if (calPriceAmount(data) == 0) {
        textContent = 'Start Free';
    }
    cardButtonA.textContent = textContent;
    cardButtonA.setAttribute('href', target);
    cardButtonA.setAttribute('target', '_top');
    cardButton.appendChild(cardButtonA);
    return cardButton
}

function featureItem(textContent) {
    const featureItem = document.createElement("li");
    featureItem.classList.add('mb-2');
    featureItem.appendChild(featureSvgIcon());
    const cardFeatureItemText = document.createTextNode(textContent);
    featureItem.appendChild(cardFeatureItemText);
    return featureItem;
}


function featureListItem(textContent) {
    const cardFeature = document.createElement("div");
    cardFeature.classList.add('plan__include');

    const cardFeatureTitle = document.createElement("p");
    cardFeatureTitle.textContent = "Includes:";
    cardFeature.appendChild(cardFeatureTitle);

    const cardFeatureList = document.createElement("ul");
    cardFeatureList.classList.add('list-unstyled');

    textContent.split(', ').map(feature => {
        cardFeatureList.appendChild(featureItem(feature));
    })

    cardFeature.appendChild(cardFeatureList);

    return cardFeature;
}

function planPricePreviewIcon() {
    const cardPricePreview = document.createElement("div");
    cardPricePreview.classList.add('plan__price__preview');

    const cardPricePreviewIcon = document.createElement("div");
    cardPricePreviewIcon.classList.add('plan__price__preview__icon');
    cardPricePreviewIcon.innerHTML = '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="eye" class="svg-inline--fa fa-eye fa-w-18 fa-fw" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"> <path fill="currentColor" d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"></path></svg>'

    cardPricePreview.appendChild(cardPricePreviewIcon);
    const cardPricePreviewText = document.createElement("span");
    cardPricePreviewText.textContent = "Pricing preview";
    cardPricePreview.appendChild(cardPricePreviewText);
    return cardPricePreview;
}

function popularPlanEle() {
    const popularPlan = document.createElement("span");
    popularPlan.classList.add('popularPlan');
    popularPlan.textContent = 'Most Popular';
    return popularPlan;
}

function priceElement(data, enterprisePlan) {
    const cardPrice = document.createElement("div");
    cardPrice.classList.add('plan__price');

    if (enterprisePlan.includes(data.product.id)) {
        return cardPrice;
    }

    const cardPriceStartAt = document.createElement("p");
    cardPriceStartAt.textContent = "Starting at";
    cardPrice.appendChild(cardPriceStartAt);

    const cardPriceContent = document.createElement("div");
    cardPriceContent.classList.add('plan__price__content');
    const cardPriceCurrence = document.createElement("span");

    const priceAmount = calPriceAmount(data);

    cardPriceCurrence.textContent = `$${priceAmount}`;
    cardPriceContent.appendChild(cardPriceCurrence);

    const cardPriceText = document.createElement("span");
    cardPriceText.innerHTML = "per <br>month";
    cardPriceContent.appendChild(cardPriceText);

    cardPrice.appendChild(cardPriceContent);

    const cardPriceDes = document.createElement("p");
    cardPriceDes.textContent = "Billed monthly based on usage";
    cardPrice.appendChild(cardPriceDes);

    if (data.tiers && data.tiers.length > 0) {
        cardPrice.appendChild(pricePriviewContent(data));
    }

    return cardPrice;
}

function planHeader(data, mostPopular) {
    const cardHeader = document.createElement("div");
    cardHeader.classList.add('mb-4', 'plan__header');

    const cardHeaderName = document.createElement("h5");
    cardHeaderName.textContent = data.product.name;
    if (mostPopular.includes(data.product.id)) {
        cardHeaderName.appendChild(popularPlanEle());
    }

    cardHeader.appendChild(cardHeaderName);

    const cardHeaderDes = document.createElement("p");
    cardHeaderDes.textContent = data.product.description;
    cardHeader.appendChild(cardHeaderDes);
    return cardHeader;
}

function planElement(data, mostPopular, enterprisePlan, urlParams) {
    const prNode = document.createElement("div");
    prNode.classList.add('mt-4', 'mt-xl-0', 'plan', 'col-12', 'col-sm-6', 'col-md-4', 'col-lg-3', 'col-xl-3');

    const cardNode = document.createElement("div");
    cardNode.classList.add('h-100', 'card');

    const cardContainer = document.createElement("div");
    cardContainer.classList.add('d-flex', 'flex-column', 'card-body');

    cardContainer.appendChild(planHeader(data, mostPopular));

    cardContainer.appendChild(priceElement(data, enterprisePlan));
    cardContainer.appendChild(cardButton(urlParams.target, data, enterprisePlan));

    if (data.product.metadata.feature_list) {
        cardContainer.appendChild(featureListItem(data.product.metadata.feature_list));
    }


    cardNode.appendChild(cardContainer);
    prNode.appendChild(cardNode);

    return prNode;

}

function processData(data, urlParams) {
    const pricingTable = document.getElementsByTagName('pricing-table');
    const pricingTableRow = document.createElement("div");
    pricingTableRow.classList.add('py-xl-4', 'px-xl-6', 'justify-content-center', 'row');

    const mostPopular = data.is_most_popular || [];
    const enterprisePlan = data.contact_us_plan || [];
    data.data.map(item => {
        pricingTableRow.appendChild(planElement(item, mostPopular, enterprisePlan, urlParams));
        pricingTable[0].appendChild(pricingTableRow);
    })
}

window.addEventListener('resize', function (event) {
    postHeightToParent();
}, true);


function postHeightToParent() {
    const pricingTable = document.getElementsByTagName('pricing-table');
    const pricingTableClient = pricingTable.length > 0 ? pricingTable[0].getBoundingClientRect() : null
    let message = { 
        height: pricingTableClient.height || document.body.offsetHeight, 
        scrollHeight: document.body.scrollHeight, 
        innerHeight: pricingTable[0].innerHeight || document.body.innerHeight, 
        width: pricingTableClient.width || document.body.offsetWidth,  
        scrollWidth: document.body.scrollWidth,  
        innerWidth: pricingTable[0].innerWidth || document.body.innerWidth,  
    };
    // window.top refers to parent window
    window.top.postMessage(message, "*");
}