# Creating a Basic Responsive Webpage Layout

- The core idea of creating a responsive webpage lies in structuring semantic elements like **header**, **main**, **footer**, and their substructures properly. There isn't one correct way to implement this, but let's explore one possible approach to achieve it.

We will look at how each page structure is made to align with each other.

## Header

- **Absolute positioning** with `top: 0` and `width: 100%` makes the header stick to the top of the page.
- The items inside the header are aligned using **flexbox**.
- Toggle an **'active'** class for navigation links using a little **JavaScript** to create a hamburger menu for smaller screens.

## Main

- The **main** section contains the **hero section** and the **content section**, each with its own content.
- The **main** section is made to occupy the whole available height of the page using the `flex: 1` property.

## Footer

- Since the **main** section occupies the remaining space on the page, it automatically pushes the footer to the bottom.
- No extra layout adjustments are required for the footer.

### Key Points

1. Making the **body** element a **flexbox** is essential, otherwise, the `flex: 1` property on the **main** tag will not work.
2. Use **media queries** to create a responsive design. Adjust the layout, font size, and image size based on different screen widths.
3. Using **CSS Grid** for the content and aside sections makes it easy to control the layout across different screen sizes. On larger screens, the grid layout has two columns, while on smaller screens, it switches to one column.
4. Make sure to use **rem/em** units for scalable font sizes and margins to ensure flexibility across various screen sizes.

View the page live at: [https://madesh02104.github.io/common-web_structures-layoutss/basic-page-layout](https://madesh02104.github.io/common-web_structures-layoutss/basic-page-layout)
