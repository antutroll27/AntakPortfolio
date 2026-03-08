type RevealOptions = {
    duration?: number;
    stagger?: number;
    ease?: string;
};

export const reducedMotionCheck = (): boolean =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const revealClipPath = async (elements: Element[] | NodeListOf<Element>, options: RevealOptions = {}) => {
    if (reducedMotionCheck()) {
        [...elements].forEach((el) => {
            (el as HTMLElement).style.opacity = '1';
            (el as HTMLElement).style.clipPath = 'none';
        });
        return;
    }

    const { gsap } = await import('gsap');
    gsap.fromTo(
        elements,
        { clipPath: 'inset(100% 0 0 0)' },
        {
            clipPath: 'inset(0% 0 0 0)',
            duration: options.duration ?? 0.9,
            stagger: options.stagger ?? 0.12,
            ease: options.ease ?? 'power3.out'
        }
    );
};

export const staggerFadeIn = async (elements: Element[] | NodeListOf<Element>, options: RevealOptions = {}) => {
    const { gsap } = await import('gsap');
    const targets = [...elements];
    if (reducedMotionCheck()) {
        gsap.fromTo(targets, { opacity: 0 }, { opacity: 1, duration: 0.35, stagger: 0.02 });
        return;
    }

    gsap.fromTo(
        targets,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: options.duration ?? 0.45, stagger: options.stagger ?? 0.03, ease: options.ease ?? 'power2.out' }
    );
};

export const textScramble = async (element: HTMLElement, finalText: string, duration = 1.2) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    if (reducedMotionCheck()) {
        element.textContent = finalText;
        return;
    }

    const { gsap } = await import('gsap');
    let frame = 0;
    gsap.to({}, {
        duration,
        onUpdate: () => {
            frame += 1;
            const progress = Math.min(frame / 24, 1);
            element.textContent = [...finalText]
                .map((char, index) => (char === ' ' ? char : index < progress * finalText.length ? finalText[index] : chars[Math.floor(Math.random() * chars.length)]))
                .join('');
        },
        onComplete: () => {
            element.textContent = finalText;
        }
    });
};

export const horizontalScrollPin = async (container: HTMLElement, cardsSelector = '[data-work-card]') => {
    if (reducedMotionCheck()) return;

    const cards = Array.from(container.querySelectorAll(cardsSelector));
    if (cards.length < 2) return;

    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);

    const totalWidth = cards.reduce((sum, card) => sum + (card as HTMLElement).offsetWidth + 16, 0);
    const viewport = window.innerWidth;
    const distance = Math.max(totalWidth - viewport, 0);

    gsap.to(cards, {
        x: -distance,
        ease: 'none',
        scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: `+=${distance}`,
            scrub: true,
            pin: true
        }
    });
};

