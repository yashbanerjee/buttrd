const WAVE_PATH =
  'M724.457 0L0 0L0 576.403L2.638 574.438C126.882 629.262 123.881 532.618 229.298 546.839C334.714 561.059 348.994 663.972 464.143 666.966C571.834 669.772 594.755 499.686 719.272 574.438C811.501 629.824 863.345 530.279 968.398 567.328C1073.815 604.47 1147.306 698.775 1255.907 656.113C1348.59 619.719 1336.311 537.015 1441 556.756L1441 0L724.366 0Z'

export function WaveDivider({ background, pathFill, svgStyle }) {
  return (
    <div className="wave" style={{ background }}>
      <svg viewBox="0 490 1441 177" preserveAspectRatio="none" height="130" xmlns="http://www.w3.org/2000/svg" style={svgStyle}>
        <path fill={pathFill} d={WAVE_PATH} />
      </svg>
    </div>
  )
}
