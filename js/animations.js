'use strict';

/**#############################################################################
 * ########################ANIMACIÓN BOTON SEARCH###############################
 * #############################################################################
 */
const pokeball = document.querySelector('.pokeBtn');

const tl = gsap.timeline({
  defaults: { duration: 1, ease: 'back.out(1.7)' },
});

pokeball.addEventListener('click', (e) => {
  e.preventDefault();

  tl.play(0);

  tl.to('.pokeBtn', {
    rotation: 360,
    scale: 1.1,
  });
});

/**#############################################################################
 * ########################ANIMACIÓN INICIO#####################################
 * #############################################################################
 */
const ball = document.querySelector('.ball');

// TweenMax.fromTo(
//   ball,
//   1,
//   { rotate: -45, yoyo: true, repeat: 10 },
//   { rotate: 45, yoyo: true, repeat: 10 }
// );

ball.addEventListener('click', (e) => {
  e.preventDefault();

  //timeline con duración y ease
  const tl = gsap.timeline({
    defaults: { duration: 2, ease: 'circ.out' },
  });

  //evitar clickable elements
  tl.to('.ball', { pointerEvents: 'none' });

  //para ocultar el scroll durante la animación
  tl.to('body', { overflow: 'hidden' }, '<');

  //giro de la pokeball
  tl.to(
    '.ball',
    {
      rotation: 720,
      scale: 6,
      opacity: 0,
      display: 'none',
    },
    '<'
  );

  //apertura de la pokedex
  tl.fromTo('.first', { x: 0 }, { x: -1600, display: 'none' }, '<');
  tl.to('.second', { x: 1600, display: 'none' }, '<');

  //opacidad del text
  tl.to('.text', { opacity: 0, display: 'none' }, '<');

  //mostrar el scroll al terminar la animación
  tl.to('body', { overflow: 'visible' });

  //animación entrada header
  tl.from('header', { opacity: 0, y: -300, duration: 2 }, '<');
});
