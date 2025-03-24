# Test project (pixi.js) - Solution
- [Project specification](https://github.com/internet-unable/practice-projects/blob/main/03-pixi.js_test-task/Games%20Core%20Development%20Test.pdf)
- [Live Site](https://practice-projects-6wnm.vercel.app)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Known issues](#known-issues)
  - [Continued development](#continued-development)
- [Author](#author)

## My process
### Built with
- JavaScript
- Pixi.js
- OOP and MVC approaches
- A bit of simple HTML5 and CSS3
- Vite

### What I learned
During this project, I had the opportunity to dive deep into Pixi.js and get hands-on experience working with it. Exploring the documentation was fascinating, and I enjoyed discovering tools that helped me create different shapes and animate them as they fell down the canvas.

One of the biggest challenges I faced was properly implementing shapes and calculating their areas accurately. It took some effort to ensure that each shape was drawn correctly and that the area formulas returned precise results.

Along the way, I encountered several structural issues, which led me to the following key discoveries:
- I learned that using the right combination of Container and Graphics is essential for creating a properly structured container with a border.
- I discovered that Rectangle should be used for hitArea in a Container to correctly handle events like clicks and interactions.

Additionally, I had the chance to refresh my knowledge of structuring an application using the MVC pattern. Since so many projects nowadays rely on React, I realized that I had started to forget some core concepts of classic application architecture. I had to spend some time researching and recalling best practices to structure everything properly.

Overall, this was a great learning experience that reinforced my understanding of Pixi.js and application architecture.

### Known issues
Even though I already took longer than expected to develop this application (since I needed time to familiarize myself with Pixi.js), there are still some unresolved issues. I wanted to document them to show that I’m aware of these challenges and to have the option to revisit and fix them later:
- A preloader should be added while the application is loading and initializing. Pixi.js takes a short amount of time to set up all elements, which can affect the user experience. A loading screen would make the transition smoother.
- According to the task requirements, the application was supposed to support random irregular shapes. I implemented this class but disabled it for now because I couldn’t fully resolve the positioning issue when resizing. Most likely, I need to revisit the drawing formula for this shape.
- In some cases, shapes can spawn near the canvas borders, causing part of the shape to be clipped and hidden. A proper offset adjustment should be applied when a shape spawns too close to the edges.
- Additional controls could enhance the user experience, such as:
    - Stop (pause movement of all shapes)
    - Continue (resume movement of all shapes)
    - Delete all (remove all shapes from the canvas)
    - Possibly, other useful controls as well.

### Continued development
Overall, by identifying these issues, I can continue developing this application in a way that systematically addresses and resolves them.

## Author
- [Telegram](https://t.me/konstantin_moiseenko)
- [LinkedIn](https://www.linkedin.com/in/konstantin-moiseenko-947810a1/)
