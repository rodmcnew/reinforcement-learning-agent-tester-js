

MUST:
// stats display: !!!!! @TODO !!!!! consider animation frames for 60hz !!!!! (maybe the app should request animation frame then ask the gamerunner for the stats, maybe tick() changes to be this) (20 is 50hz but what if machine can't handle that?)
- Fix and re-enable "export agent brain"
- remove time waster from hand programed agent (or make it configurable?)
- fix all features after multi threading
- IMPORTANT: Fix agent bars vanish/freeze-last-scene on hand-programed
- Learn more about cleaning up react refs
- Publish latest layerganza
- Consider making rewards not fractions? (could make long-term goals harder? or not?)
- Consider red is -1 and bottom is +100? or +1000?
- Consider rendering reward as chart like ludicrous speed chart?
- Consider better bar charts with obvious min and max? maybe cap to max incase it goes over? maybe drive from rules config?
- Get rid of ancient .propTypes and class components
- Consider redux or similar and also making agent data display use react
- use react for agent bar chart view
- rm console.logs
- fix all @TODOs
- [UX defect] going from ludicrous to paused hides the game
SHOULD:
- add to notes: php -S localhost:8000
- consider worker.js file name and where it is in folders
- consider consts for many things like service worker action names
- consider using redux and sagas for main state and to start tickers and things
# Performance:
Must
- on very fast, consider that getAction is 1ms while rendering is 8ms
- Look more for memory leaks during long runs
- Consider React.memo, useCallback, and maybe more components inside game renderer
- Consider that when new games happen, frames drop
- Debounce (or something) the rendering during ludicrous speed
- Profile more on the production build
- Look for subtile memory leaks like in ludicrous chart
- Consider that ludicrous speed updates stats per game instead of per some interval. seems odd.
- could cross thread communication objects be made smaller?

Should
- Consider large amount of dom eles

# Performance completed:
- Analyzed NN performance including loops, var vs let, defining above loops
- Looked for memory leaks
- Setup basic automated performance test of layerganza
- Set goal of 60fps for "very fast" and tweaked it toward this (still not perfect)
- Saved 0.5ms by memoizing and useCallBacking TopControls. Also used the React Dev Tools "why did it render" setting 
- Got ticks from 28ms to 12ms mostly by doing only one state update rather than two
   - Got ticks from 12ms to 4ms by using canvas instead of TDs. (had some dropped frames before)
      - Then got to 3ms by using canvas for agent reward chart.
- Fixed "On ludacris speed, profiler shows "long task" warning" by doing less per tick. It now doesn't drop any frames or lag on user input.
- Dynamic game tick batch sizes for ludicrous speed
- Got perfect 60 APM/FPS with animation frames
- Made dynamic game tick batching for ludicrous speed to ensure high APM while keeping the UI responsive for agents of various speeds
- Got rid of 784 concated strings by sending pre-created color strings to pixel canvas (saved about 2mb of memory?)
- Took observation renderer from 
- Consider agent.exp cap?
- 2021-09-28
  - Prevented double rendering during new games by removing the onRender() call in newGame()
  - Discovered that stats display alone is causing "layout" and "paint"
  - Told it to do production build but not minify code to make things easier to profile
    - Also named some useEffect functions so can see them in profiler
  - converted drawEnvironmentView to useEffect (draw after canvas rendered)
  - found drawEnvironmentView is being called twice because of position updates. used ref instead of useState to prevent this.
    - On very fast mode on 4x slowdown on mac i9:
      - 4ms vs 2ms for drawEnvironment
      - 40 APM vs 55 APM
  - saved a little time by calling "ctx.fillStyle =" less often
  - At end of night github version runs 40 APM while local prod build runs at 55 APM. Not sure what all helped tho. This is for 4x slowdown i9 mac on "very fast" app setting.
  - Found out chrome slowdowns cannot be trusted to stay on
  - possible improvements:
    - figure out why animation frame fires so long after useEffect in the frame
      - could it be replaced by the react scheduler?
      - UPDATE:
        - switching to drawing on canvases inside useLayoutEffect instead of useEffect seems to have solved this
          - looks cleaner in flame chart but doesn't give more APM?
    - webGl
    - run agent or game+agent in a web worker 
- 2021-09-29
  - Got rudimentary webworker going. seems to solve 60hz at 4x slowdown
  - In one test, drawing on canvas with useLayoutEffect seemed to get 45APM while useEffect got 40APM (6x slowdown mode). 

#Notes:
- Observatoin render before messing with it: 1.43, 2.24, 2.24, 1.86, 1.65.   And takeAction: 9.55, 9.42, 17.9 (for status change too), 11.9, 9.54
- When setting state twice per tick, ticks were take 22ms, had dropped frames
- Had 615 to 14627 listeners
- Found react dev tools "why did it render" setting - used this, React.memo, useCallback to stop top control from rendering
- Make observation loops directly draw
- Ui->drawEnvView 2.31, 1.2, 2.29
- learned that chrome can forget slowdown
# Questions and notes:
- How would you fix low frame rate?
    - Profile it, look at flame chart
        - See if you are dropping frames meaning processing takes longer than a frame does
        - Look for anything red such as dropped frames, tasks taking too long, layout reflows
        - Look at the resource usage chart and see if you see anything there
        - Look at the bottom up view and see if any slow functions stand out
        - If its redux, use the redux profiler to see if any slow components stand out
        - See what is taking so much processing power. It could be:
          - Slow JavaScript functions
          - Slowness from triggering React re-rendering
          - Slowness from the browser rending
        - Dig deep to understand what is causing the biggest slowdown and start there
    - possible fixes:
        - Memoize and cache
        - Debounce and related


obs render 4 to 5ms in react profiler 2nd numb
784 concat strings