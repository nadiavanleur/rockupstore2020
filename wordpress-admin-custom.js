var helperTexts = [
  {
    selector: '[name="post_title"]#title',
    text: "<i>[Required]</i> Should be 20 to 70 characters.",
  },
  {
    selector: "#postdivrich > *",
    text:
      "<i>[Optional]</i>\
        <ul>\
            <li>- Add a longer description here.</li>\
            <li>- This will be added to the bottom of the product page.</li>\
            <li>- You could use this for size charts, for example, but there are many more uses.</li>\
        </ul>",
  },
  {
    fieldLabel: "Product short description",
    text:
      "<i>[Required]</i>\
        <ul>\
            <li>- Should be 30 to 300 characters.</li>\
            <li>- The short description will appear below the product title, above the price.</li>\
        </ul>",
  },
  {
    fieldLabel: "Product data",
    text:
      '<ul>\
            <li>- If you have options (like size) -> select "<a href="https://docs.woocommerce.com/document/variable-product/" target="_blank">Variable product</a>".</li>\
            <li>- If you don\'t have options -> select "Simple product".</li>\
        </ul>',
  },
  {
    selector: "#_regular_price",
    text:
      "↳ <i>[Required]</i>\
        <ul>\
            <li>- Price <b>should</b> include € 3 for website maintenance and administration costs (unless otherwise discussed).</li>\
            <li>- Price <b>should</b> include shipping costs.</li>\
        </ul>",
  },
  {
    selector: "#_sku",
    text:
      "↳ <i>[Required]</i>\
        <ul>\
            <li>- Code to keep track of your product.</li>\
            <li>- You can come up with this code yourself.</li>\
        </ul>",
  },
  {
    selector: "#_manage_stock",
    text:
      '↳\
        <ul>\
            <li>- For "Variable product" -> don\'t check.</li>\
            <li>- For "Simple product" -> do check.</li>\
        </ul>',
  },
  {
    selector: '[name="attribute_taxonomy"]',
    text:
      '↳ For "Variable product": <i>[Required]</i>\
        <ol>\
            <li>Click "add".</li>\
            <li>Enter a name (ex. "Size").</li>\
            <li>Enter attribute values divided by "|". (ex. "S | M | L")</li>\
            <li>Check "Used for variations"</li>\
            <li>After adding attributes click "Save attributes" and go to the "Variations"-tab.</li>\
        </ol>',
  },
  {
    selector: "#variable_product_options_inner > div > select",
    text:
      '↳ In the dropdown above select "Create variations from all attributes" and click "Go".',
  },
  //   {
  //     fieldLabel: "Manage stock?",
  //     text: '↳ Check "Manage stock?" <i>[Required]</i>',
  //   },
  {
    selector: ".variable_pricing",
    text: '↳ "Regular price" <i>[Required]</i>',
  },
  {
    selector: "#product_shipping_class",
    text:
      '<ul>\
          <li>- Select the shipping class with your username and based on national shipping costs (within the Netherlands). If your username or the correct price is not there, please contact <a href="mailto:admin@subflow.nl" target="_blank">admin@subflow.nl</a>.</li>\
          <li>- When a customer buys more than one of your products they will only pay for shipping once.</li>\
          <li>- On the website the shipping will visibly be included in the price. The customer will not see the shipping costs. When a customer adds more than one of your products they will see a discount.<br>\
              <br>\
              For example:<br>\
              Product X costs € 10, and it\'s shipping costs € 2. The customer will see a product price of € 12. When the customer adds Product X to their cart 3 times they will only have to pay for shipping once. Meaning they get a € 4 discount (2 times shipping costs) and their total becomes €32 (instead of € 36, if they would have to pay for shipping for each product individually).\
          </li>\
      </ul>',
  },
  {
    fieldLabel: "Product categories",
    text:
      "<i>[Required]</i> Select all categories that apply to your product as well as your designer name.<br><br>For example if you sell a t-shirt you would select: all products, clothing, tops, tees, designers, and finally your designer name.",
  },
  {
    fieldLabel: "Product tags",
    text:
      "<i>[Required]</i> Add about 5 tags describing your product. This will allow your product to be more findable in Google and other search engines.",
  },
  {
    fieldLabel: "Product image",
    text:
      "<i>[Required]</i> This image should have a white background and will be visible in product overview.",
  },
  {
    fieldLabel: "Product gallery",
    text:
      "<i>[Optional, but preferred]</i> Add more images so customers have more details. The main product image does not have to be added again.",
  },
];

var fieldLabels = [...document.querySelectorAll("h2")];

for (var i = 0; i < helperTexts.length; i++) {
  var helperText = helperTexts[i];

  var helperElement = document.createElement("div");
  helperElement.className = "c-helper-text";
  helperElement.innerHTML = helperText.text;

  var beforeElement;
  if (helperText.fieldLabel) {
    for (var j = 0; j < fieldLabels.length; j++) {
      if (fieldLabels[j].innerText.includes(helperText.fieldLabel)) {
        beforeElement = fieldLabels[j];
      }
    }
  } else {
    beforeElement = document.querySelector(helperText.selector);
  }

  if (beforeElement) {
    console.log(helperText.selector);
    console.log(helperText.fieldLabel);
    console.log(beforeElement);
    console.log(beforeElement.parentNode);
    console.log();
    console.log();
    console.log();
    console.log();
    console.log();
    console.log();
    console.log();
    console.log();

    beforeElement = beforeElement.parentNode;
    beforeElement.parentNode.insertBefore(
      helperElement,
      beforeElement.nextSibling
    );
  } else {
    console.log(
      "beforeElement not found: " +
        (helperText.selector || helperText.fieldLabel)
    );
  }
}
