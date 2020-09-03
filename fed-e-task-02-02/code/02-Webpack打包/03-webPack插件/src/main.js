import createHeading from './heading.js';
const heading = createHeading();
document.body.append(heading);

const Link = () =>{
    return document.createElement('a');
}