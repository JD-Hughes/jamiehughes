//Not my code... Props to these guys ⬇
//https://codepen.io/n-sayenko/pen/qOXKVr
//https://github.com/VincentGarreau/particles.js/

particlesJS("particles-js", {
    particles: {
        number: {
            value: 100, //How many are on the screen (Default: 400)
            density: {
                enable: true,
                value_area: 800,
            },
        },
        color: {
            value: "#ffffff",
        },
        shape: {
            type: "image",
            stroke: {
                width: 3,
                color: "#fff",
            },
            polygon: {
                nb_sides: 5,
            },
            image: {
                src: "https://pnggrid.com/wp-content/uploads/2021/04/Heart-emoji-1024x905.png",
                width: 100,
                height: 100,
            },
        },
        opacity: {
            value: 0.7,
            random: false,
            anim: {
                enable: false,
                speed: 1,
                opacity_min: 0.1,
                sync: false,
            },
        },
        size: {
            value: 8, //How large are they (Default: 5)
            random: true,
            anim: {
                enable: false,
                speed: 20,
                size_min: 0.1,
                sync: false,
            },
        },
        line_linked: {
            enable: false,
            distance: 50,
            color: "#ffffff",
            opacity: 0.6,
            width: 1,
        },
        move: {
            enable: true,
            speed: 2, // How fast do they fall (Default: 5)
            direction: "bottom",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
                enable: true,
                rotateX: 300,
                rotateY: 1200,
            },
        },
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: {
                enable: true,
                mode: "bubble",
            },
            onclick: {
                enable: true,
                mode: "repulse",
            },
            resize: true,
        },
        modes: {
            grab: {
                distance: 150,
                line_linked: {
                    opacity: 1,
                },
            },
            bubble: {
                distance: 200,
                size: 15, //How big do they get on hover (Default: 40)
                duration: 2,
                opacity: 8,
                speed: 3,
            },
            repulse: {
                distance: 200,
                duration: 0.2,
            },
            push: {
                particles_nb: 4,
            },
            remove: {
                particles_nb: 2,
            },
        },
    },
    retina_detect: true,
});