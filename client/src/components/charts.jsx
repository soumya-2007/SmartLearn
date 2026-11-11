/* Hand-built SVG charts — no chart dependency, fully themed. */

export function LineChart({
  data,
  compare,
  height = 168,
  color = 'var(--teal)',
  compareColor = '#C8D8D1',
  max,
  suffix = ' min',
}) {
  const width = 620
  const pad = 10
  const values = [...data.map((d) => d.value), ...(compare || []).map((d) => d.value)]
  const top = max || Math.max(...values, 1) * 1.18
  const stepX = data.length > 1 ? (width - pad * 2) / (data.length - 1) : 0

  const pointsFor = (series) =>
    series.map((point, index) => {
      const x = pad + index * stepX
      const y = pad + (1 - point.value / top) * (height - pad * 2)
      return [x, y]
    })

  const toPath = (points) =>
    points
      .map(([x, y], index) => {
        if (index === 0) return `M${x},${y}`
        const [prevX, prevY] = points[index - 1]
        const midX = (prevX + x) / 2
        return `C${midX},${prevY} ${midX},${y} ${x},${y}`
      })
      .join(' ')

  const points = pointsFor(data)
  const line = toPath(points)
  const area = `${line} L${pad + (data.length - 1) * stepX},${height - pad} L${pad},${
    height - pad
  } Z`

  return (
    <div className="chart">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={`Activity chart: ${data
          .map((point) => `${point.label} ${point.value}`)
          .join(', ')}`}
        preserveAspectRatio="none"
        style={{ width: '100%', height }}
      >
        <defs>
          <linearGradient id="lineFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.22" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75, 1].map((fraction) => (
          <line
            key={fraction}
            x1={0}
            x2={width}
            y1={pad + fraction * (height - pad * 2)}
            y2={pad + fraction * (height - pad * 2)}
            stroke="#E9EFEB"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        ))}
        <path d={area} fill="url(#lineFill)" stroke="none" />
        {compare ? (
          <path
            d={toPath(pointsFor(compare))}
            fill="none"
            stroke={compareColor}
            strokeWidth="2"
            strokeDasharray="5 6"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        ) : null}
        <path
          d={line}
          fill="none"
          stroke={color}
          strokeWidth="2.6"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        {points.map(([x, y], index) => (
          <circle
            key={`${x}-${y}`}
            cx={x}
            cy={y}
            r={index === points.length - 1 ? 4.5 : 2.6}
            fill={index === points.length - 1 ? color : '#fff'}
            stroke={color}
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
      <div className="chart__labels">
        {data.map((point, index) => (
          <span key={`${point.label}-${index}`}>
            {point.label}
            <b>
              {point.value}
              {suffix}
            </b>
          </span>
        ))}
      </div>
    </div>
  )
}

export function BarChart({ data, suffix = '%', tone = 'teal' }) {
  return (
    <div className="bars" role="img" aria-label="Bar chart by topic">
      {data.map((item) => (
        <div className="bars__col" key={item.label}>
          <span className="bars__value">
            {item.value}
            {suffix}
          </span>
          <div className="bars__track">
            <div
              className={`bars__fill is-${tone}`}
              style={{ height: `${item.value}%` }}
            />
          </div>
          <span className="bars__label">{item.label}</span>
        </div>
      ))}
    </div>
  )
}

export function Sparkline({ data, color = 'var(--teal)', width = 108, height = 36 }) {
  const values = data.map((d) => (typeof d === 'number' ? d : d.value))
  const max = Math.max(...values, 1)
  const min = Math.min(...values)
  const range = max - min || 1
  const step = values.length > 1 ? width / (values.length - 1) : 0
  const path = values
    .map((value, index) => {
      const x = index * step
      const y = height - 4 - ((value - min) / range) * (height - 8)
      return `${index === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')
  const area = `${path} L${width},${height} L0,${height} Z`

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      aria-hidden="true"
      className="sparkline"
    >
      <path d={area} fill={color} opacity="0.12" />
      <path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function HorizontalBars({ items, tone = 'teal' }) {
  return (
    <div className="hbars">
      {items.map((item) => (
        <div className="hbars__row" key={item.label}>
          <span className="hbars__label">{item.label}</span>
          <div className="hbars__track">
            <div
              className={`hbars__fill is-${item.tone || tone}`}
              style={{ width: `${item.value}%` }}
            />
          </div>
          <span className="hbars__value">{item.value}%</span>
        </div>
      ))}
    </div>
  )
}
