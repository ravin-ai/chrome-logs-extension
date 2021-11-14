# chrome-logs-extension

INSTALL:
1. Clone repository to local environment
2. Open Chrome browser
3. Go to Chrome extensions (chrome://extensions/)
4. Turn on 'Developer mode'
5. Click 'Load unpacked'
6. Select the extension directory
7. And Walla... You good to go

USAGE:
1. On AWS 'Log Groups' or 'Log Insight'
2. Select entire message
3. Two ways to convert String to Json:
   3.1. Right click on selected text
      3.1.1. Select Ravin-AI >> Convert to JSON
      3.1.2 Will open new tab with JSON Message
   3.2. Click on extension action button
      3.2.1 Will open popup window with JSON Message

NOTES:
The first conversion should work on any valid stringJson at any website.
the second conversion should work only at aws 'Log Groups' or 'Log Insight'