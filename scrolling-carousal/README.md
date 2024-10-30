# Scrolling  Carousel Effect

This project demonstrates a **Scrolling  Carousel** where a set of images or icons scroll continuously in a seamless loop. It's ideal for displaying technology stacks, sponsor logos, or partner icons on a website.

![Scrolling Logo Carousel](./sliding-carousal.gif)

## How It Works

The carousel creates an infinite scrolling effect by moving a set of logos horizontally across the screen using CSS animations.

### Key CSS Styles Explained

Here are the important styles used to create the scrolling effect:

- **`.logo-slider { overflow: hidden; }`**  
  This hides the logos that are outside the visible area of the carousel, allowing only the logos within the specified width to be shown.

- **`.logo-track { display: flex; animation: scroll 20s linear infinite; }`**  
  The `flex` layout arranges the logos horizontally, and the `animation` moves the track from right to left in a loop over 20 seconds. The `infinite` keyword ensures that the animation keeps repeating.

- **`@keyframes scroll { transform: translateX(-50%); }`**  
  This animation shifts the `.logo-track` container horizontally by `-50%`, creating the scrolling effect. As soon as one set of logos finishes scrolling, the next set starts.

- **`.logo-slider:hover { animation-play-state: paused; }`**  
  The scrolling animation is paused when the user hovers over the logos, allowing them to view the logos more clearly.

### Seamless Scrolling

The continuous scrolling is achieved by duplicating the logos inside the `.logo-track` container:

- **`.logo-slide`**  
  Each `.logo-slide` holds a set of logos. By repeating the same set of logos twice within the `.logo-track`, the carousel creates a seamless loop, ensuring that when one set of logos scrolls out of view, the next set is already in position to scroll in.

---

By understanding and using these key CSS rules, you can easily replicate the smooth scrolling effect in your own projects. It’s a flexible and responsive design that works across all devices.

View the page live at: https://madesh02104.github.io/common-web_structures-layoutss/scrolling-carousal