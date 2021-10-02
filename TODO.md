# MUST:
- consider using redux and sagas for main state and to start tickers and things. or maybe useReducer
- [UX defect] going from ludicrous to paused hides the game
- fix all @TODOs
# SHOULD:
- Consider making rewards not fractions? (could make long-term goals harder? or not?)
- Consider red is -1 and bottom is +100? or +1000?
- Consider rendering reward as chart like ludicrous speed chart?
- Consider better bar charts with obvious min and max? maybe cap to max incase it goes over? maybe drive from rules config?
- use react for agent bar chart view
- rm console.logs
- consider worker.js file name and where it is in folders
- consider enums/consts for speeds
- consider https://webpack.js.org/guides/web-workers/ "As of webpack 5, you can use Web Workers without worker-loader."
- rendering trail seems to start on the 2nd position of a game rather than the first
# COULD:
- could cross thread communication objects be made smaller? (such as chart/history data, maybe others?)
# WONT
- Kill the worker to exit ludicrous speed so i don't need batches. This would complicate things too much.