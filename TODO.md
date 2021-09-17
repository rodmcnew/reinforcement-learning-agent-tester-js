- Publish latest layerganza
- Consider making rewards not fractions? (could make long-term goals harder? or not?)
- Consider red is -1 and bottom is +100? or +1000?
- Consider making bottom never red
- Consider rendering reward as chart like ludicrous speed chart?
- Consider better bar charts with obvious min and max? maybe cap to max incase it goes over? maybe drive from rules config?
- Get rid of ancient .propTypes and class components

# Performance:
Must
- On very fast mode, its roughly 60fps but sometimes there are actions that don't get rendered. maybe sync better with 60fps or use requestAnimationFrame?
- On ludacris speed, profiler shows "long task" warning
- on very fast, consider that getAction is 1ms while rendering is 8ms
- Look more for memory leaks during long runs
- Consider React.memo, useCallback, and maybe more components inside game renderer
- Consider that when new games happen, frames drop
- Debounce (or something) the rendering during ludicrous speed
- Profile more on the production build
- Look for subtile memory leaks like in ludicrous chart

Should
- Consider large amount of dom eles

# Performance completed:
- Analyzed NN performance including loops, var vs let, defining above loops
- Looked for memory leaks
- Setup basic automated performance test of layerganza
- Set goal of 60fps for "very fast" and tweaked it toward this (still not perfect)
- Saved 0.5ms by memoizing and useCallBacking TopControls. Also used the React Dev Tools "why did it render" setting 
- Got ticks from 28ms to 4ms by using canvas instead of TDs. Then got to 3ms by using canvas for agent reward chart.


#Notes:
- Observatoin render before messing with it: 1.43, 2.24, 2.24, 1.86, 1.65.   And takeAction: 9.55, 9.42, 17.9 (for status change too), 11.9, 9.54
- When setting state twice per tick, ticks were take 22ms, had dropped frames
- Had 615 to 14627 listeners
- Found react dev tools "why did it render" setting - used this, React.memo, useCallback to stop top control from rendering
- ObservationRenderer.js:34 was 2ms