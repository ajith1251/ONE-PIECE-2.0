import { useState, useLayoutEffect, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import heroQuotes from '../data/heroQuotes'
import './Hero.css'

gsap.registerPlugin(ScrollTrigger)

/** Duration each quote is displayed before rotating to the next (in milliseconds) */
const QUOTE_INTERVAL_MS = 7000

const scenes = [
  {
    title: 'Dawn of the Storm',
    description:
      'A silent ocean shivers beneath storm-lit clouds. The horizon feels endless, and every ripple carries the weight of a legend waiting to rise.',
   
  },
  {
    title: 'Execution at Dawn',
    description:
      'A marble platform cuts through golden mist. The crowd holds its breath as a pirate legend stands beneath the first fragile sunrise.',
    cta: 'Feel the Weight',
  },
  {
    title: 'My treasure? If you want it, you can have it!',
    description:
      'The camera draws near. Calm meets storm. His quiet smile is the spark that turns fear into destiny.',
    cta: 'See the Truth',
  },
  {
    title: 'The Fleet Awakens',
    description:
      'A thousand sails blossom across the sea. The age of pirates erupts in motion, light, and the promise of freedom.',
    cta: 'Ride the Wind',
  },
  {
    title: 'Captain of Tomorrow',
    description:
      'The bow becomes a throne. A young captain stands ready, eyes locked on the horizon and a future full of hope.',
    cta: 'Join the Voyage',
  },
  {
    title: 'ONE PIECE',
    description:
      'At the climax of the sequence, the dream is revealed. The sea, the ship, the captain—everything converges into a single promise of legend.',
    cta: 'Embrace the Legend',
  },
]

export default function Hero() {
  const heroRef = useRef(null)
  const videoRef = useRef(null)
  const indicatorRef = useRef(null)
  const sceneRefs = useRef([])
  const [quoteIndex, setQuoteIndex] = useState(0)
  const [isQuoteHidden, setIsQuoteHidden] = useState(false)

  useEffect(() => {
    let fadeOutTimer, fadeInTimer
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    const cycleInterval = setInterval(() => {
      if (prefersReducedMotion) {
        // Reduced motion: swap instantly with no delays
        setQuoteIndex((prev) => (prev + 1) % heroQuotes.length)
        setIsQuoteHidden(false)
        return
      }

      // Phase 1: Start fade-out of current quote
      setIsQuoteHidden(true)

      // Phase 2: After fade-out completes, change text while hidden
      fadeOutTimer = setTimeout(() => {
        setQuoteIndex((prev) => (prev + 1) % heroQuotes.length)

        // Phase 3: Small delay for DOM update, then start fade-in
        fadeInTimer = setTimeout(() => {
          setIsQuoteHidden(false)
        }, 50)
      }, 400)
    }, QUOTE_INTERVAL_MS)

    return () => {
      clearInterval(cycleInterval)
      clearTimeout(fadeOutTimer)
      clearTimeout(fadeInTimer)
    }
  }, [])

  const assignSceneRef = (element, index) => {
    sceneRefs.current[index] = element
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const playPromise = video.play()
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        /* Autoplay prevented — muted is already set, user interaction needed */
      })
    }
  }, [])

  useLayoutEffect(() => {
    if (!heroRef.current) return

    const context = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add(
        {
          isDesktop: '(min-width: 960px)',
          isTablet: '(min-width: 640px) and (max-width: 959px)',
          isMobile: '(max-width: 639px)',
        },
        () => {
          const heroHeight = window.innerHeight
          const endValue = `+=${Math.round(heroHeight * 4.4)}`

          const buildTimeline = () => {
            const sceneElements = sceneRefs.current
            if (sceneElements.length !== scenes.length || sceneElements.some((element) => !element)) {
              requestAnimationFrame(buildTimeline)
              return
            }

            const timeline = gsap.timeline({
              scrollTrigger: {
                trigger: heroRef.current,
                start: 'top top',
                end: endValue,
                scrub: 0.95,
                pin: true,
                anticipatePin: 1,
              },
            })

            gsap.set(sceneElements, {
              autoAlpha: 0,
              y: 30,
              filter: 'blur(16px)',
              scale: 0.98,
            })

            const fadeInDuration = 0.3
            const fadeOutDuration = 0.22
            const sceneGap = 0.55
            const sceneDuration = fadeInDuration + fadeOutDuration + sceneGap

            sceneElements.forEach((content, index) => {
              const entrance = index * sceneDuration
              const exit = entrance + fadeInDuration + sceneGap

              timeline.fromTo(
                content,
                {
                  autoAlpha: 0,
                  y: 24,
                  filter: 'blur(16px)',
                  scale: 0.98,
                },
                {
                  autoAlpha: 1,
                  y: 0,
                  filter: 'blur(0px)',
                  scale: 1,
                  duration: fadeInDuration,
                  ease: 'power3.out',
                },
                entrance,
              )

              if (index < sceneElements.length - 1) {
                timeline.to(
                  content,
                  {
                    autoAlpha: 0,
                    y: -24,
                    filter: 'blur(12px)',
                    scale: 1.02,
                    duration: fadeOutDuration,
                    ease: 'power3.in',
                  },
                  exit,
                )
              }
            })
          }

          buildTimeline()
        },
      )

      gsap.to(indicatorRef.current, {
        autoAlpha: 0,
        y: 16,
        duration: 0.75,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top+=80',
          end: 'top top+=240',
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      })
    }, heroRef)

    return () => {
      context.revert()
    }
  }, [])

  return (
    <section className="hero" ref={heroRef} aria-label="One Piece cinematic hero">
      <div className="hero__media">
        <video
          ref={videoRef}
          className="hero__video"
          src="/video/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          tabIndex={-1}
        />
        <div className="hero__overlay" aria-hidden="true" />
      </div>

      <div className="hero__content">
        <div className="hero__content-inner">
          {scenes.map((scene, index) => (
            <article
              key={scene.title}
              className="hero__scene"
              style={{ zIndex: index + 1 }}
              ref={(element) => assignSceneRef(element, index)}
            >
              <div className="hero__scene-copy">
                <h1>{scene.title}</h1>
                <p>{scene.description}</p>
                <button type="button" className="hero__button">
                  {scene.cta}
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      <p className={`hero__quote${isQuoteHidden ? ' hero__quote--hidden' : ''}`}>
        “{heroQuotes[quoteIndex]}”
      </p>

      <div className="hero__scroll-indicator" ref={indicatorRef} aria-hidden="true">
        <div className="hero__scroll-label">Scroll to begin</div>
        <div className="hero__mouse">
          <span className="hero__mouse-wheel" />
        </div>
      </div>
    </section>
  )
}
