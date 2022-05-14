import helpers from "./helpers";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger)

function handleAnimationScreen() {

    const wrapper = document.querySelector('.section-1 .wrapper');
    const innerWrapper = wrapper.querySelector('.inner-wrapper');

    let tl = gsap.timeline();

    function startAnimation() {

        tl.set(wrapper, {perspective: 1000},);

        const duration = 1;

        tl.to(wrapper, 1, {yPercent: 50}, 0);
        tl.to(wrapper, 1, {xPercent: -60,}, 1);
        tl.to(innerWrapper, 1, {rotationY: 30, rotationX: 10}, 1)


        ScrollTrigger.create({
            animation: tl,
            trigger: wrapper,
            start: '-10% top',
            end: '100% 50px',
            scrub: 2,
            pin: true,
            toggleActions: 'restart restart restart reverse',
            // markers: true,
        });
    }

    let animationActive = false;


    if ( !helpers.isMobile() ) {
        startAnimation()
        animationActive = true
    }


    window.addEventListener("resize", function (ev) {
        const screenWidth = window.innerWidth;

        if ( screenWidth < 768 ) {
            animationActive = false;
            tl.kill()
        }
        else {
            if ( !animationActive ) {
                startAnimation();
                animationActive = true;
            }
        }
    })

}

export default function () {
    handleAnimationScreen();
}