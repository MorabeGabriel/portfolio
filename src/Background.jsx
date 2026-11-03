import { useEffect, useRef } from 'react'

// A drifting network of nodes and edges (a nod to graph algorithms).
// Lines also reach toward the pointer. Pauses when the tab is hidden
// and draws a single still frame if the visitor prefers reduced motion.
export default function Background() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const pointer = { x: -9999, y: -9999 }
    let w = 0, h = 0, raf = 0, frame = 0, nodes = [], rgb = '199,119,221'

    const readColor = () => {
      const c = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim()
      const m = /^#([0-9a-f]{6})$/i.exec(c)
      if (m) { const n = parseInt(m[1], 16); rgb = `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}` }
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth; h = window.innerHeight
      canvas.width = w * dpr; canvas.height = h * dpr
      canvas.style.width = w + 'px'; canvas.style.height = h + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.max(26, Math.min(72, Math.round((w * h) / 20000)))
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.28, vy: (Math.random() - 0.5) * 0.28,
        r: 1 + Math.random() * 1.6,
      }))
      readColor()
      if (reduce.matches) draw()
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      if (frame++ % 60 === 0) readColor()
      const link = 150, link2 = link * link, reach = 190, reach2 = reach * reach
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        if (!reduce.matches) {
          a.x += a.vx; a.y += a.vy
          if (a.x < 0 || a.x > w) a.vx *= -1
          if (a.y < 0 || a.y > h) a.vy *= -1
        }
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j], dx = a.x - b.x, dy = a.y - b.y, d2 = dx * dx + dy * dy
          if (d2 < link2) {
            ctx.strokeStyle = `rgba(${rgb},${(1 - Math.sqrt(d2) / link) * 0.22})`
            ctx.lineWidth = 1
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke()
          }
        }
        const px = a.x - pointer.x, py = a.y - pointer.y, p2 = px * px + py * py
        if (p2 < reach2) {
          ctx.strokeStyle = `rgba(${rgb},${(1 - Math.sqrt(p2) / reach) * 0.5})`
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(pointer.x, pointer.y); ctx.stroke()
        }
        ctx.fillStyle = `rgba(${rgb},0.55)`
        ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2); ctx.fill()
      }
    }

    const loop = () => { draw(); raf = requestAnimationFrame(loop) }
    const start = () => { cancelAnimationFrame(raf); if (reduce.matches) draw(); else loop() }
    const onMove = (e) => { pointer.x = e.clientX; pointer.y = e.clientY }
    const onLeave = () => { pointer.x = pointer.y = -9999 }
    const onVis = () => { if (document.hidden) cancelAnimationFrame(raf); else start() }

    resize(); start()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerleave', onLeave)
    document.addEventListener('visibilitychange', onVis)
    reduce.addEventListener?.('change', start)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeave)
      document.removeEventListener('visibilitychange', onVis)
      reduce.removeEventListener?.('change', start)
    }
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
      <div className="bg-glow absolute inset-0" />
      <canvas ref={ref} className="absolute inset-0" />
    </div>
  )
}
