# Pricing-tables
Pricing tables for Parousya subscription plans


# Deploy to Github Page
- Go to Settings > Pages

![](./images/githubpage.png)

- Settings Build and deployment

    - Source: `Deploy from A branch`
    - Branch: `main` - `/(root)`

- Save change.

- Go `https://parousya.github.io/Pricing-tables/` to check

# Use
- Add these js files to the header.
```html
<script src="https://parousya.github.io/Pricing-tables/pricing-table.js"></script>
```

- Embed this code where you need to display it.
```html
<pricing-table iframe-src="https://parousya.github.io/Pricing-tables/" price-api="https://go-api-dev.parousya.com/cms/stripe/prices" btn-target=https://www.parousya.com/sign-up.html></pricing-table>
```

- Note: 
    - `iframe-src`: Pricing table page link (https://parousya.github.io/Pricing-tables/)
    - `price-api`: Stripe Product Price List API. It is provisioned by the environment, so it depends on the environment you use. Please set the correct value.
    - `btn-target`: Destination when the button is clicked.