console.log('Cerrage-GEE loaded...');

// overall styles to mute errors
const styleSheet = `

.message.severity-error {
  opacity: 0.5;
}

.message.severity-warning {
  opacity: 0.5;
}

.message.severity-info {
  opacity: 0.5;
}

.explorer.simple.string {
  opacity: 0.8;
}
`;

const cErrMsg = (theme = undefined) => {
  const msgEl = document.createElement('div');
  const msgBg = document.createElement('div');
  const msg = document.createElement('span');
  const slot = document.createElement('slot');
  const hr = document.createElement('hr');
  msgEl.classList.add('cerrage', 'explorer', 'message', 'simple', 'string');
  msgBg.classList.add('cerrage', 'message-background');
  msg.classList.add('cerrage', 'summary');
  hr.classList.add('cerrage', 'divider');

  /*  example of error message structure in GEE
    <ee-console-log>
      <div class="message severity-error">
        <!--?lit$123456$-->
        <!--?lit$123456$-->
        <span class="summary"><!--?lit$123456$-->Line 0: error message</span>
        <slot></slot>
        <div class="internal-info"> <!--?lit$123456$-->
          <div class="stack-trace"><!--?lit$123456$--></div>
        </div>
      </div>
      <hr class="divider">
    </ee-console-log>
  */

  const messageStyles = {
    verdant_valley: `background: #a5d6a7; color: #333; padding: 10px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); font-family: 'Arial', sans-serif;`,
    coastal_calm: `background: #e9f5f5; color: #333; padding: 10px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); font-family: 'Roboto', sans-serif;`,
    desert_dawn: `background: #f5e9e9; color: #333; padding: 10px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); font-family: 'Georgia', serif;`,
    mountain_majesty: `background: #d5e1f2; color: #333; padding: 10px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); font-family: 'Times New Roman', serif;`,
    aurora_borealis: `background: linear-gradient(to right, #004a7f, #0085ca, #4a85ca); color: #fff; padding: 10px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); font-family: 'Arial', sans-serif;`,
    cosmic_constellation: `background: #252526; color: #fff; padding: 10px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); font-family: 'Courier New', monospace;`,
    sylvan_sanctuary: `background: #375d35; color: #fff; padding: 10px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); font-family: 'Verdana', sans-serif;`,
    coral_reef: `background: #f5f5e9; color: #333; padding: 10px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); font-family: 'Comic Sans MS', cursive;`,
    glacier_glint: `background: #e9f5f9; color: #333; padding: 10px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); font-family: 'Helvetica', sans-serif;`,
  };

  const messageList = [
    `Every bug you fix brings you closer to charting the unknown territories of your code.`,
    `Errors are like hidden landmarks - discover them, and you'll uncover new paths to success.`,
    `Don't worry, even the most seasoned explorers encounter obstacles. It's all part of the coding adventure!`,
    `Remember, even the Earth's tectonic plates shift and adjust - embrace change, and your code will evolve too.`,
    `Keep going! The path to a flawless program may be winding, but the views are worth it.`,
    `Your Eureka! moment may be moments away. Even Archimedes had to take a break every now and then...`,
    `Coding is like navigating uncharted waters - sometimes you need to change course to find the best route.`,
    `The most resilient ecosystems are the most diverse. Embrace the variety of errors as a sign of a healthy and adaptable codebase.`,
    `Debugging is like a treasure hunt - each clue brings you closer to the hidden gems within your code.`,
    `Keep going! The path to a flawless program may be winding, but the views are worth it.`,
    `Patience is a virtue in both coding and Earth Science. The most magnificent landscapes took eons to form.`,
    `Coding is like carving a canyon - each stroke reveals new layers of potential.`,
    `Errors are like stars - they guide us through the darkness and lead us to new wonders.`,
    `Remember, even the most brilliant scientists make mistakes. It's all part of the process of exploration.`,
    `Don't be afraid to experiment! The most groundbreaking discoveries often come from unexpected paths.`,
    `Happy coding, fellow explorer! May your journey be filled with wonder and adventure.`,
  ];
  

  const decorations = [
    '🌍', // Earth
    '🌱', // Plant
    '🌿', // Leaf
    '🌲', // Tree
    '🌳', // Deciduous Tree
    '🏞️', // Landscape
    '🗺️', // World Map
    '🌐', // Globe with Meridians
    '🌄', // Sunrise Over Mountains
    '🌅', // Sunrise
    '🌠', // Shooting Star
    '🌊', // Water Wave
    '🏔️', // Snow-Capped Mountain
    '🏝️', // Desert Island
    '🗻', // Mount Fuji
    '🌋', // Volcano
    '🏕️', // Camping
    '🌈', // Rainbow
    '🌌', // Milky Way
    '🌞', // Sun with Face
    '🌓', // First Quarter Moon
    '🌙', // Crescent Moon
    '🌟', // Star
    '🚀', // Rocket
    '🛰️', // Satellite
    '🌎', // Earth Globe Americas
    '🌏', // Earth Globe Asia-Australia
    '🌔', // Waxing Gibbous Moon
    '🌕', // Full Moon
    '🛤️', // Railway Track
    '',
  ];

  function fetchRandomArrayItem(inputArray) {
    return inputArray[Math.floor(Math.random() * inputArray.length)];
  }

  function fetchRandomObjectValue(inputObject) {
    const x = fetchRandomArrayItem(Object.keys(messageStyles));
    return inputObject[x];
  }

  const messageStyle =
    !!theme && Object.keys(messageStyles).includes(theme)
      ? messageStyles[theme]
      : fetchRandomObjectValue(messageStyles);
  const msgText = fetchRandomArrayItem(messageList);
  const decoration =
    fetchRandomArrayItem(decorations) +
    fetchRandomArrayItem(decorations) +
    fetchRandomArrayItem(decorations);
  msg.innerHTML = `  ${decoration}  ${msgText}  `;

  msgBg.style.cssText = messageStyle;
  msgBg.appendChild(msg);
  msgEl.appendChild(msgBg);
  msgEl.appendChild(slot);
  msgEl.appendChild(hr);

  return msgEl;
};

const styleEl = (container) => {
  const style = document.createElement('style');
  style.textContent = styleSheet;
  // container.appendChild(style);
  container.insertBefore(style, container.firstChild);
};

const observer = new MutationObserver((mutationsList, observer) => {
  // Look through all mutations that just occured
  for (let mutation of mutationsList) {
    // If the addedNodes property has one or more nodes
    if (mutation.addedNodes.length) {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeName === 'EE-CONSOLE-LOG') {
          n = node.shadowRoot;
          setTimeout(() => {
            // make sure children exist before selecting
            const s = n.querySelectorAll('style');
            if (s.length < 1) styleEl(n);
            // get list of errors
            const e = n.querySelectorAll('div.severity-error');
            // allow only one message per error
            const x = n.querySelectorAll('div.cerrage');
            if (e.length > 0 && x.length < 1) {
              msg = cErrMsg(); // get msg html/ span
              // insert after shadowRoot style element
              const s0 = n.querySelectorAll('style')[0] ?? n.firstChild;
              s0.insertAdjacentElement('afterend', msg);
            }
          }, 0);
        }
      });
    }
  }
});

// Start observing the document with the configured parameters
observer.observe(document, { childList: true, subtree: true });
