# chrome-logs-extension

## Installation

1. Clone repository to local environment
2. Open Chrome browser
3. Go to Chrome extensions (chrome://extensions/)
4. Turn on 'Developer mode'
5. Click 'Load unpacked'
6. Select the extension directory
7. And Walla... You are good to go!

## Usage

1. On AWS **'Log Groups'** or **'Log Insight'**
2. Select **entire** message (a valid json)
3. Two ways to convert String to Json:
   * Right click on selected text
      1. Select Ravin-AI >> Convert to JSON
      2. Will open new tab with JSON Message
   * Click on extension action button
      1. Will open popup window with JSON Message

## Notes
~~~
The first conversion (Right click on selected text) should work on any valid stringJson at any website.
the second conversion (Click on extension action button) should work only at aws 'Log Groups' or 'Log Insight'
~~~