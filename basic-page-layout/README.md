#Creating a basic resposive webpage layout

    -The core idea of creating a responsive webpage lies in structuring the the semantic structures like header, main, footer and their sub structures in a proper way. There isn't one corect way to implement this. So lets see one of posssible ways to achieve it.

We will look at how each of the page structure is made to align with each other.

##Header

    - Absolute positioning with **top:0** and **width:100%** will make the header stick to top.
    - The items inside the header are aligned with flexbox.
    - Toggle an 'active' class for navLinks using a little javascript to mke a hamburger menu for smaller screens.

##Main

    -Main contains the hero-section and the content section, each of which has their own content.
    -Main is made to occupy the whole available height of the page by **flex:1** property.

##Footer

    -Since main occupies the remaining space in the page, it automatically pushes the footer to the bottom.
    - No extra layouting is required

### Key Points

1. Making the **body** element a **flexbox** is essential, otherwise, the **flex: 1** property on the **main** tag will not work.
2. Use **media queries** to create responsive design. Adjust the layout, font size, and image size based on different screen widths.
3. Using CSS Grid for the content and aside sections makes it easy to control the layout for different screen sizes. On larger screens, the grid layout has two columns, while on smaller screens, it switches to one column.
4. Make sure to use **rem/em** for scalable font and margin sizes to ensure flexibility across various screen sizes.
