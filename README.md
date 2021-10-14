# Lead Connector Website Modules

## Styles
Add the following into the `<head>` tag of the website, where "tracking" type codes go.

### Without Modules
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/Third-River-Marketing-LLC/lead-connector-website-modules@latest/styles/css/style-no-modules.min.css" />

The above code is a link to the "universal styles" that we use on every site. This contains things such as "turn the mobile menu background white" and "reduce the line-height/spacing of the mobile menu"

### With Modules
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/Third-River-Marketing-LLC/lead-connector-website-modules@latest/styles/css/style.min.css" />

The above code contains the same "universal styles", but also contains some more generic code for easy use to create some additional HTML modules, such as flex boxes, grids, and card elements.

# JavaScript

## Modules
Module codes get dropped in a "Custom HTML/Javascript" block, not in the header or footer. Place them exactly where you want the final element to show up. For example: `<script heading="Some New Heading" src="[…]"></script>`

### Concrete Calculators
These have some additional available attributes you can add as well. Add `heading="Text_Goes_Here"` to replace the title or `notice="Text_Goest_here"` to change the italic notice. You can even add `debug="true"` to use Alex's versions, and `version="1"` (any number/string) to try and fetch a fresh cached version.

#### Concrete Volume Calculator
    <script src="https://cdn.jsdelivr.net/gh/Third-River-Marketing-LLC/lead-connector-website-modules@latest/concrete-calculators/init.js?v=9" calculator="concrete-volume"></script>

#### Block Wall Calculator
	<script src="https://cdn.jsdelivr.net/gh/Third-River-Marketing-LLC/lead-connector-website-modules@latest/concrete-calculators/init.js?v=9" calculator="block-wall"></script>

#### Column Calculator
	<script src="https://cdn.jsdelivr.net/gh/Third-River-Marketing-LLC/lead-connector-website-modules@latest/concrete-calculators/init.js?v=9" calculator="column"></script>