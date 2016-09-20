# Otsimo AAC SPECS App

An app to compose phrases for kids with autism.

Otsimo AAC is an application that ables kids with autism who can not speak to compose phrases by tapping on the words. Otsimo AAC uses picture exchange communication system.

This project was tested with the latest version of nodeJS and npm, please make sure you have atleast node.js 5+ and NPM 3+ installed.

## Usage & Develop

- Clone or fork this repository
- run `npm install` to install dependencies
- run `npm run start` to fire up dev server
- open browser to [`http://localhost:3001`](http://localhost:3001)

## Build

to create a ready production distribution package of the project please run:

```
npm run build
```

after running build the generated files will be available at `/dist`

## Testing

This seed is has protractor and karma for end to end testing and unit testing respectively.

### Unit Testing

make sure your tests are named with a `-test.js` suffix then. to run karma simply run:

```
npm test
```

### End to end Testing

to start protractor tests please run:

```
npm run protractor
```

## Classes

<dl>
<dt><a href="#AppController">AppController</a></dt>
<dd></dd>
<dt><a href="#GridController">GridController</a></dt>
<dd></dd>
<dt><a href="#GridController">GridController</a></dt>
<dd></dd>
<dt><a href="#HeaderController">HeaderController</a></dt>
<dd></dd>
<dt><a href="#PhraseController">PhraseController</a></dt>
<dd></dd>
<dt><a href="#PhraseController">PhraseController</a></dt>
<dd></dd>
<dt><a href="#RecentController">RecentController</a></dt>
<dd></dd>
<dt><a href="#SymbolController">SymbolController</a></dt>
<dd></dd>
<dt><a href="#EventManager">EventManager</a></dt>
<dd></dd>
<dt><a href="#LSManager">LSManager</a></dt>
<dd></dd>
<dt><a href="#TTSManager">TTSManager</a></dt>
<dd></dd>
<dt><a href="#ResponsiveVoiceDriver">ResponsiveVoiceDriver</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#returnTime">returnTime()</a> ⇒ <code>number</code></dt>
<dd><p>Get unix time</p>
</dd>
<dt><a href="#updateCurrentPhraseScroll">updateCurrentPhraseScroll()</a></dt>
<dd><p>Updates the current phrase&#39;s scroll amount
called after a new word pushed to current phrase</p>
</dd>
<dt><a href="#capitalize">capitalize(str)</a> ⇒ <code>string</code></dt>
<dd><p>capitalize first letter</p>
</dd>
<dt><a href="#deviceType">deviceType(w, h)</a> ⇒ <code>string</code></dt>
<dd><p>Find the device the types</p>
</dd>
<dt><a href="#appPhrase">appPhrase(currentPhrase)</a></dt>
<dd><p>Custom Event: Sends submitted current phrase as string with white spaces (word1 word2 word3 ...).</p>
</dd>
<dt><a href="#appInterval">appInterval(timeInterval)</a></dt>
<dd><p>Custom Event: Sends the time interval changes in the recent tab</p>
</dd>
<dt><a href="#appDerive">appDerive(derived)</a></dt>
<dd><p>Custom Event: Sends the derivable word when user holds on one.</p>
</dd>
<dt><a href="#appWord">appWord(word, x, y)</a></dt>
<dd><p>Custom Event: Sends a word that added to current pharase list</p>
</dd>
<dt><a href="#getHistoryAsArray">getHistoryAsArray()</a> ⇒ <code>array</code></dt>
<dd><p>Returns the phrase history as an array</p>
</dd>
<dt><a href="#updateHistoryAsString">updateHistoryAsString(json)</a></dt>
<dd><p>Updates the history object with given</p>
</dd>
<dt><a href="#addPhrase2History">addPhrase2History(array)</a></dt>
<dd><p>Adds a phrase (array of word objects) to the history</p>
</dd>
<dt><a href="#speak">speak(text2Speak)</a></dt>
<dd><p>speak</p>
</dd>
</dl>

<a name="AppController"></a>

## AppController
**Kind**: global class  

* [AppController](#AppController)
    * _instance_
        * [.runApp()](#AppController+runApp)
        * [.setSettings()](#AppController+setSettings)
        * [.loadSymbols()](#AppController+loadSymbols)
        * [.checkCapabilities()](#AppController+checkCapabilities)
        * [.setUIText()](#AppController+setUIText)
        * [.resolutionListener()](#AppController+resolutionListener)
    * _static_
        * [.AppController](#AppController.AppController)
            * [new AppController($scope, $global, $http, TTSManager)](#new_AppController.AppController_new)

<a name="AppController+runApp"></a>

### appController.runApp()
Does the inital tasks to start the app.

**Kind**: instance method of <code>[AppController](#AppController)</code>  
<a name="AppController+setSettings"></a>

### appController.setSettings()
Sets the setting properties fron otsimo object

**Kind**: instance method of <code>[AppController](#AppController)</code>  
<a name="AppController+loadSymbols"></a>

### appController.loadSymbols()
Loads symbol package respect to language

**Kind**: instance method of <code>[AppController](#AppController)</code>  
<a name="AppController+checkCapabilities"></a>

### appController.checkCapabilities()
Checks if the device or installed otsimo app is supporting TTS.

**Kind**: instance method of <code>[AppController](#AppController)</code>  
<a name="AppController+setUIText"></a>

### appController.setUIText()
Sets UI text setting properties from otsimo kv object

**Kind**: instance method of <code>[AppController](#AppController)</code>  
<a name="AppController+resolutionListener"></a>

### appController.resolutionListener()
Listens any resolution changes

**Kind**: instance method of <code>[AppController](#AppController)</code>  
<a name="AppController.AppController"></a>

### AppController.AppController
**Kind**: static class of <code>[AppController](#AppController)</code>  
<a name="new_AppController.AppController_new"></a>

#### new AppController($scope, $global, $http, TTSManager)
Creates an instance of AppController.


| Param | Type |
| --- | --- |
| $scope | <code>any</code> |
| $global | <code>any</code> |
| $http | <code>angular.IHttpService</code> |
| TTSManager | <code>[TTSManager](#TTSManager)</code> |

<a name="GridController"></a>

## GridController
**Kind**: global class  

* [GridController](#GridController)
    * [new GridController($scope, $global, $timeout, LSManager)](#new_GridController_new)
    * [.controllerInit()](#GridController+controllerInit)
    * [.changeTab(tabExp)](#GridController+changeTab)
    * [.pushNavigationHistory(tab)](#GridController+pushNavigationHistory)
    * [.sliceArray(symbolQuantity)](#GridController+sliceArray)
    * [.mapStyle(symb)](#GridController+mapStyle) ⇒ <code>Object</code>
    * [.returnMaxPage()](#GridController+returnMaxPage) ⇒ <code>number</code>
    * [.goBack()](#GridController+goBack)
    * [.goNextMain()](#GridController+goNextMain)
    * [.goPrevMain()](#GridController+goPrevMain)
    * [.updateGridSlicing()](#GridController+updateGridSlicing)
    * [.go2FirstPage()](#GridController+go2FirstPage) ⇒ <code>number</code>
    * [.getPage()](#GridController+getPage) ⇒ <code>number</code>
    * [.animateSlicing()](#GridController+animateSlicing)
    * [.updateGridQuantity()](#GridController+updateGridQuantity)
    * [.changeGridSize(gridX, gridY)](#GridController+changeGridSize)
    * [.checkOrientation(orientation)](#GridController+checkOrientation)

<a name="new_GridController_new"></a>

### new GridController($scope, $global, $timeout, LSManager)
Creates an instance of GridController.


| Param | Type |
| --- | --- |
| $scope | <code>any</code> |
| $global | <code>any</code> |
| $timeout | <code>any</code> |
| LSManager | <code>[LSManager](#LSManager)</code> |

<a name="GridController+controllerInit"></a>

### gridController.controllerInit()
Create or facilitate new functions for $scope or $global service.

**Kind**: instance method of <code>[GridController](#GridController)</code>  
<a name="GridController+changeTab"></a>

### gridController.changeTab(tabExp)
Handles logical actions about tab change.

**Kind**: instance method of <code>[GridController](#GridController)</code>  

| Param | Type | Description |
| --- | --- | --- |
| tabExp | <code>string</code> | the ne tab |

<a name="GridController+pushNavigationHistory"></a>

### gridController.pushNavigationHistory(tab)
Stores the history of navigation (navigation history used for "goback" navigation)

**Kind**: instance method of <code>[GridController](#GridController)</code>  

| Param | Type | Description |
| --- | --- | --- |
| tab | <code>string</code> | for history pushing |

<a name="GridController+sliceArray"></a>

### gridController.sliceArray(symbolQuantity)
Handles paging of the grid. Slices the currently showed array into grid size.

**Kind**: instance method of <code>[GridController](#GridController)</code>  

| Param | Type |
| --- | --- |
| symbolQuantity | <code>number</code> |

<a name="GridController+mapStyle"></a>

### gridController.mapStyle(symb) ⇒ <code>Object</code>
Gives appropriate classNames with respect to the class of the symbol
in the currently showing symbol array.

**Kind**: instance method of <code>[GridController](#GridController)</code>  
**Returns**: <code>Object</code> - the symbol object  

| Param | Type | Description |
| --- | --- | --- |
| symb | <code>Object</code> | the symbol object |

<a name="GridController+returnMaxPage"></a>

### gridController.returnMaxPage() ⇒ <code>number</code>
Calculates the max page quantity.
in the currently showing symbol array.

**Kind**: instance method of <code>[GridController](#GridController)</code>  
**Returns**: <code>number</code> - max page  
<a name="GridController+goBack"></a>

### gridController.goBack()
Navigation function to go to prior page or view.
Go back symbol only shows up when there is a prior view.

**Kind**: instance method of <code>[GridController](#GridController)</code>  
<a name="GridController+goNextMain"></a>

### gridController.goNextMain()
Navigation function to go to next page
In current symbol array.

**Kind**: instance method of <code>[GridController](#GridController)</code>  
<a name="GridController+goPrevMain"></a>

### gridController.goPrevMain()
Navigation function to go to previous page
In current symbol array.

**Kind**: instance method of <code>[GridController](#GridController)</code>  
<a name="GridController+updateGridSlicing"></a>

### gridController.updateGridSlicing()
Updates sliceAmount and calls sliceArray function
Also calls animateSlicing function.

**Kind**: instance method of <code>[GridController](#GridController)</code>  
<a name="GridController+go2FirstPage"></a>

### gridController.go2FirstPage() ⇒ <code>number</code>
Navigates user to the first page
In the currently showing symbol array.

**Kind**: instance method of <code>[GridController](#GridController)</code>  
**Returns**: <code>number</code> - current pageNo for test  
<a name="GridController+getPage"></a>

### gridController.getPage() ⇒ <code>number</code>
currently showing page's number.

**Kind**: instance method of <code>[GridController](#GridController)</code>  
**Returns**: <code>number</code> - the page number  
<a name="GridController+animateSlicing"></a>

### gridController.animateSlicing()
Adds animation to slicing (page or view changes)
By adding class to the carrier DOM element
Actual animations are handles in CSS.

**Kind**: instance method of <code>[GridController](#GridController)</code>  
<a name="GridController+updateGridQuantity"></a>

### gridController.updateGridQuantity()
Updates the quantity of the symbols in the grid
with respect to the current page/view.

**Kind**: instance method of <code>[GridController](#GridController)</code>  
<a name="GridController+changeGridSize"></a>

### gridController.changeGridSize(gridX, gridY)
Initilizes the grid size by given X,Y variables.

**Kind**: instance method of <code>[GridController](#GridController)</code>  

| Param | Type | Description |
| --- | --- | --- |
| gridX | <code>number</code> | number of grid item on horizontal |
| gridY | <code>number</code> | number of grid item on vertical |

<a name="GridController+checkOrientation"></a>

### gridController.checkOrientation(orientation)
Updates the gridSize with respect to current
Orientation type.
Eg: if orientation changes, then change gridSize as; X-Y => Y=X

**Kind**: instance method of <code>[GridController](#GridController)</code>  

| Param | Type | Description |
| --- | --- | --- |
| orientation | <code>string</code> | Orientation name |

<a name="GridController"></a>

## GridController
**Kind**: global class  

* [GridController](#GridController)
    * [new GridController($scope, $global, $timeout, LSManager)](#new_GridController_new)
    * [.controllerInit()](#GridController+controllerInit)
    * [.changeTab(tabExp)](#GridController+changeTab)
    * [.pushNavigationHistory(tab)](#GridController+pushNavigationHistory)
    * [.sliceArray(symbolQuantity)](#GridController+sliceArray)
    * [.mapStyle(symb)](#GridController+mapStyle) ⇒ <code>Object</code>
    * [.returnMaxPage()](#GridController+returnMaxPage) ⇒ <code>number</code>
    * [.goBack()](#GridController+goBack)
    * [.goNextMain()](#GridController+goNextMain)
    * [.goPrevMain()](#GridController+goPrevMain)
    * [.updateGridSlicing()](#GridController+updateGridSlicing)
    * [.go2FirstPage()](#GridController+go2FirstPage) ⇒ <code>number</code>
    * [.getPage()](#GridController+getPage) ⇒ <code>number</code>
    * [.animateSlicing()](#GridController+animateSlicing)
    * [.updateGridQuantity()](#GridController+updateGridQuantity)
    * [.changeGridSize(gridX, gridY)](#GridController+changeGridSize)
    * [.checkOrientation(orientation)](#GridController+checkOrientation)

<a name="new_GridController_new"></a>

### new GridController($scope, $global, $timeout, LSManager)
Creates an instance of GridController.


| Param | Type |
| --- | --- |
| $scope | <code>any</code> |
| $global | <code>any</code> |
| $timeout | <code>any</code> |
| LSManager | <code>[LSManager](#LSManager)</code> |

<a name="GridController+controllerInit"></a>

### gridController.controllerInit()
Create or facilitate new functions for $scope or $global service.

**Kind**: instance method of <code>[GridController](#GridController)</code>  
<a name="GridController+changeTab"></a>

### gridController.changeTab(tabExp)
Handles logical actions about tab change.

**Kind**: instance method of <code>[GridController](#GridController)</code>  

| Param | Type | Description |
| --- | --- | --- |
| tabExp | <code>string</code> | the ne tab |

<a name="GridController+pushNavigationHistory"></a>

### gridController.pushNavigationHistory(tab)
Stores the history of navigation (navigation history used for "goback" navigation)

**Kind**: instance method of <code>[GridController](#GridController)</code>  

| Param | Type | Description |
| --- | --- | --- |
| tab | <code>string</code> | for history pushing |

<a name="GridController+sliceArray"></a>

### gridController.sliceArray(symbolQuantity)
Handles paging of the grid. Slices the currently showed array into grid size.

**Kind**: instance method of <code>[GridController](#GridController)</code>  

| Param | Type |
| --- | --- |
| symbolQuantity | <code>number</code> |

<a name="GridController+mapStyle"></a>

### gridController.mapStyle(symb) ⇒ <code>Object</code>
Gives appropriate classNames with respect to the class of the symbol
in the currently showing symbol array.

**Kind**: instance method of <code>[GridController](#GridController)</code>  
**Returns**: <code>Object</code> - the symbol object  

| Param | Type | Description |
| --- | --- | --- |
| symb | <code>Object</code> | the symbol object |

<a name="GridController+returnMaxPage"></a>

### gridController.returnMaxPage() ⇒ <code>number</code>
Calculates the max page quantity.
in the currently showing symbol array.

**Kind**: instance method of <code>[GridController](#GridController)</code>  
**Returns**: <code>number</code> - max page  
<a name="GridController+goBack"></a>

### gridController.goBack()
Navigation function to go to prior page or view.
Go back symbol only shows up when there is a prior view.

**Kind**: instance method of <code>[GridController](#GridController)</code>  
<a name="GridController+goNextMain"></a>

### gridController.goNextMain()
Navigation function to go to next page
In current symbol array.

**Kind**: instance method of <code>[GridController](#GridController)</code>  
<a name="GridController+goPrevMain"></a>

### gridController.goPrevMain()
Navigation function to go to previous page
In current symbol array.

**Kind**: instance method of <code>[GridController](#GridController)</code>  
<a name="GridController+updateGridSlicing"></a>

### gridController.updateGridSlicing()
Updates sliceAmount and calls sliceArray function
Also calls animateSlicing function.

**Kind**: instance method of <code>[GridController](#GridController)</code>  
<a name="GridController+go2FirstPage"></a>

### gridController.go2FirstPage() ⇒ <code>number</code>
Navigates user to the first page
In the currently showing symbol array.

**Kind**: instance method of <code>[GridController](#GridController)</code>  
**Returns**: <code>number</code> - current pageNo for test  
<a name="GridController+getPage"></a>

### gridController.getPage() ⇒ <code>number</code>
currently showing page's number.

**Kind**: instance method of <code>[GridController](#GridController)</code>  
**Returns**: <code>number</code> - the page number  
<a name="GridController+animateSlicing"></a>

### gridController.animateSlicing()
Adds animation to slicing (page or view changes)
By adding class to the carrier DOM element
Actual animations are handles in CSS.

**Kind**: instance method of <code>[GridController](#GridController)</code>  
<a name="GridController+updateGridQuantity"></a>

### gridController.updateGridQuantity()
Updates the quantity of the symbols in the grid
with respect to the current page/view.

**Kind**: instance method of <code>[GridController](#GridController)</code>  
<a name="GridController+changeGridSize"></a>

### gridController.changeGridSize(gridX, gridY)
Initilizes the grid size by given X,Y variables.

**Kind**: instance method of <code>[GridController](#GridController)</code>  

| Param | Type | Description |
| --- | --- | --- |
| gridX | <code>number</code> | number of grid item on horizontal |
| gridY | <code>number</code> | number of grid item on vertical |

<a name="GridController+checkOrientation"></a>

### gridController.checkOrientation(orientation)
Updates the gridSize with respect to current
Orientation type.
Eg: if orientation changes, then change gridSize as; X-Y => Y=X

**Kind**: instance method of <code>[GridController](#GridController)</code>  

| Param | Type | Description |
| --- | --- | --- |
| orientation | <code>string</code> | Orientation name |

<a name="HeaderController"></a>

## HeaderController
**Kind**: global class  
**Export**:   

* [HeaderController](#HeaderController)
    * _instance_
        * [.controllerInit()](#HeaderController+controllerInit)
        * [.changeCurrentTab(tabExp)](#HeaderController+changeCurrentTab)
        * [.openRecent()](#HeaderController+openRecent)
        * [.goHome()](#HeaderController+goHome)
        * [.openGrid()](#HeaderController+openGrid)
        * [.quitGame()](#HeaderController+quitGame)
        * [.animIconTouch(iconId)](#HeaderController+animIconTouch)
    * _static_
        * [.HeaderController](#HeaderController.HeaderController)
            * [new HeaderController($scope, $global, $timeout)](#new_HeaderController.HeaderController_new)

<a name="HeaderController+controllerInit"></a>

### headerController.controllerInit()
Create or facilitate new functions for $scope or $global service.

**Kind**: instance method of <code>[HeaderController](#HeaderController)</code>  
<a name="HeaderController+changeCurrentTab"></a>

### headerController.changeCurrentTab(tabExp)
This function handles the text and variable changes
on the view when the tab is changed.
Also calles changeTab function.

**Kind**: instance method of <code>[HeaderController](#HeaderController)</code>  

| Param | Type | Description |
| --- | --- | --- |
| tabExp | <code>string</code> | new tab name |

<a name="HeaderController+openRecent"></a>

### headerController.openRecent()
Opens recent tab.

**Kind**: instance method of <code>[HeaderController](#HeaderController)</code>  
<a name="HeaderController+goHome"></a>

### headerController.goHome()
Initilize Going the entrance screen when;
Current tab is not main or,
The page is not 0 or,
there is a currentGroup or currentDerivable

**Kind**: instance method of <code>[HeaderController](#HeaderController)</code>  
<a name="HeaderController+openGrid"></a>

### headerController.openGrid()
Opens the grid page

**Kind**: instance method of <code>[HeaderController](#HeaderController)</code>  
<a name="HeaderController+quitGame"></a>

### headerController.quitGame()
Quits the application and turns back to Otsimo app hub if the isHome is true.
Else, get the app to home (goHome)

**Kind**: instance method of <code>[HeaderController](#HeaderController)</code>  
<a name="HeaderController+animIconTouch"></a>

### headerController.animIconTouch(iconId)
Does animation for icon's DOM that is given.

**Kind**: instance method of <code>[HeaderController](#HeaderController)</code>  

| Param | Type | Description |
| --- | --- | --- |
| iconId | <code>string</code> | the icon id |

<a name="HeaderController.HeaderController"></a>

### HeaderController.HeaderController
**Kind**: static class of <code>[HeaderController](#HeaderController)</code>  
<a name="new_HeaderController.HeaderController_new"></a>

#### new HeaderController($scope, $global, $timeout)
Creates an instance of HeaderController.


| Param | Type |
| --- | --- |
| $scope | <code>any</code> |
| $global | <code>any</code> |
| $timeout | <code>any</code> |

<a name="PhraseController"></a>

## PhraseController
**Kind**: global class  
**Export**:   

* [PhraseController](#PhraseController)
    * [new PhraseController()](#new_PhraseController_new)
    * [new PhraseController($scope, $global, $timeout, EventManager, TTSManager, LSManager)](#new_PhraseController_new)
    * [.controllerInit()](#PhraseController+controllerInit)
    * [.removeLastWord()](#PhraseController+removeLastWord)
    * [.submitPhrase()](#PhraseController+submitPhrase)
    * [.bsTouchStart()](#PhraseController+bsTouchStart)
    * [.bsTouchEnd()](#PhraseController+bsTouchEnd)

<a name="new_PhraseController_new"></a>

### new PhraseController()
PhraseController

<a name="new_PhraseController_new"></a>

### new PhraseController($scope, $global, $timeout, EventManager, TTSManager, LSManager)
Creates an instance of PhraseController.


| Param | Type |
| --- | --- |
| $scope | <code>any</code> |
| $global | <code>any</code> |
| $timeout | <code>any</code> |
| EventManager | <code>[EventManager](#EventManager)</code> |
| TTSManager | <code>[TTSManager](#TTSManager)</code> |
| LSManager | <code>[LSManager](#LSManager)</code> |

<a name="PhraseController+controllerInit"></a>

### phraseController.controllerInit()
Create or facilitate new functions for $scope or $global service.

**Kind**: instance method of <code>[PhraseController](#PhraseController)</code>  
<a name="PhraseController+removeLastWord"></a>

### phraseController.removeLastWord()
Remove Last Word from the current phrase.

**Kind**: instance method of <code>[PhraseController](#PhraseController)</code>  
<a name="PhraseController+submitPhrase"></a>

### phraseController.submitPhrase()
Submit - Save to History - Play the current phrase.

**Kind**: instance method of <code>[PhraseController](#PhraseController)</code>  
<a name="PhraseController+bsTouchStart"></a>

### phraseController.bsTouchStart()
TouchStart function for backspace button.
Check backspace hold action in 500 m-secs.

**Kind**: instance method of <code>[PhraseController](#PhraseController)</code>  
<a name="PhraseController+bsTouchEnd"></a>

### phraseController.bsTouchEnd()
TouchEnd function for backspace button.
Clear the timeout for removing all words from current phrase.

**Kind**: instance method of <code>[PhraseController](#PhraseController)</code>  
<a name="PhraseController"></a>

## PhraseController
**Kind**: global class  

* [PhraseController](#PhraseController)
    * [new PhraseController()](#new_PhraseController_new)
    * [new PhraseController($scope, $global, $timeout, EventManager, TTSManager, LSManager)](#new_PhraseController_new)
    * [.controllerInit()](#PhraseController+controllerInit)
    * [.removeLastWord()](#PhraseController+removeLastWord)
    * [.submitPhrase()](#PhraseController+submitPhrase)
    * [.bsTouchStart()](#PhraseController+bsTouchStart)
    * [.bsTouchEnd()](#PhraseController+bsTouchEnd)

<a name="new_PhraseController_new"></a>

### new PhraseController()
PhraseController

<a name="new_PhraseController_new"></a>

### new PhraseController($scope, $global, $timeout, EventManager, TTSManager, LSManager)
Creates an instance of PhraseController.


| Param | Type |
| --- | --- |
| $scope | <code>any</code> |
| $global | <code>any</code> |
| $timeout | <code>any</code> |
| EventManager | <code>[EventManager](#EventManager)</code> |
| TTSManager | <code>[TTSManager](#TTSManager)</code> |
| LSManager | <code>[LSManager](#LSManager)</code> |

<a name="PhraseController+controllerInit"></a>

### phraseController.controllerInit()
Create or facilitate new functions for $scope or $global service.

**Kind**: instance method of <code>[PhraseController](#PhraseController)</code>  
<a name="PhraseController+removeLastWord"></a>

### phraseController.removeLastWord()
Remove Last Word from the current phrase.

**Kind**: instance method of <code>[PhraseController](#PhraseController)</code>  
<a name="PhraseController+submitPhrase"></a>

### phraseController.submitPhrase()
Submit - Save to History - Play the current phrase.

**Kind**: instance method of <code>[PhraseController](#PhraseController)</code>  
<a name="PhraseController+bsTouchStart"></a>

### phraseController.bsTouchStart()
TouchStart function for backspace button.
Check backspace hold action in 500 m-secs.

**Kind**: instance method of <code>[PhraseController](#PhraseController)</code>  
<a name="PhraseController+bsTouchEnd"></a>

### phraseController.bsTouchEnd()
TouchEnd function for backspace button.
Clear the timeout for removing all words from current phrase.

**Kind**: instance method of <code>[PhraseController](#PhraseController)</code>  
<a name="RecentController"></a>

## RecentController
**Kind**: global class  
**Export**:   

* [RecentController](#RecentController)
    * [new RecentController()](#new_RecentController_new)
    * _instance_
        * [.controllerInit()](#RecentController+controllerInit)
        * [.loadRecentPhrase(index)](#RecentController+loadRecentPhrase)
        * [.changeInterval(val)](#RecentController+changeInterval)
    * _static_
        * [.RecentController](#RecentController.RecentController)
            * [new RecentController($scope, $global, EventManager)](#new_RecentController.RecentController_new)

<a name="new_RecentController_new"></a>

### new RecentController()
RecentController

<a name="RecentController+controllerInit"></a>

### recentController.controllerInit()
Create or facilitate new functions for $scope or $global service.

**Kind**: instance method of <code>[RecentController](#RecentController)</code>  
<a name="RecentController+loadRecentPhrase"></a>

### recentController.loadRecentPhrase(index)
Loads a prior phrase from history to the current phrase.
If there is; Adds the old phrase to end of the current phrase.

**Kind**: instance method of <code>[RecentController](#RecentController)</code>  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | the index |

<a name="RecentController+changeInterval"></a>

### recentController.changeInterval(val)
Changes the showing history interval to stated interval.

**Kind**: instance method of <code>[RecentController](#RecentController)</code>  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The value which can be 1,2,3,4 |

<a name="RecentController.RecentController"></a>

### RecentController.RecentController
**Kind**: static class of <code>[RecentController](#RecentController)</code>  
<a name="new_RecentController.RecentController_new"></a>

#### new RecentController($scope, $global, EventManager)
Creates an instance of RecentController.


| Param | Type |
| --- | --- |
| $scope | <code>any</code> |
| $global | <code>any</code> |
| EventManager | <code>any</code> |

<a name="SymbolController"></a>

## SymbolController
**Kind**: global class  
**Export**:   

* [SymbolController](#SymbolController)
    * [new SymbolController()](#new_SymbolController_new)
    * _instance_
        * [.wordTouchStart(wordObj, index)](#SymbolController+wordTouchStart)
        * [.wordTouchEnd(wordObj, index)](#SymbolController+wordTouchEnd)
        * [.clickAnimStart(index)](#SymbolController+clickAnimStart)
        * [.clickAnimEnd(index)](#SymbolController+clickAnimEnd)
        * [.clickAnimStop()](#SymbolController+clickAnimStop)
        * [.clickWord(wordObj)](#SymbolController+clickWord)
    * _static_
        * [.SymbolController](#SymbolController.SymbolController)
            * [new SymbolController($scope, $http, $timeout, $global, EventManager, TTSManager)](#new_SymbolController.SymbolController_new)

<a name="new_SymbolController_new"></a>

### new SymbolController()
The SymbolController

<a name="SymbolController+wordTouchStart"></a>

### symbolController.wordTouchStart(wordObj, index)
Called when user starts touch action.
Handles hold actions if user holds on symbol 300ms

**Kind**: instance method of <code>[SymbolController](#SymbolController)</code>  

| Param | Type |
| --- | --- |
| wordObj | <code>Object</code> |
| index | <code>number</code> |

<a name="SymbolController+wordTouchEnd"></a>

### symbolController.wordTouchEnd(wordObj, index)
Called when user ends touch event.
Cancels the onhold actions when touch canceled before 300ms

**Kind**: instance method of <code>[SymbolController](#SymbolController)</code>  

| Param | Type |
| --- | --- |
| wordObj | <code>Object</code> |
| index | <code>number</code> |

<a name="SymbolController+clickAnimStart"></a>

### symbolController.clickAnimStart(index)
Starts click animation by adding className to the symbol with given index

**Kind**: instance method of <code>[SymbolController](#SymbolController)</code>  

| Param | Type |
| --- | --- |
| index | <code>number</code> |

<a name="SymbolController+clickAnimEnd"></a>

### symbolController.clickAnimEnd(index)
Reverses click animation by removing className to the symbol with given index

**Kind**: instance method of <code>[SymbolController](#SymbolController)</code>  

| Param | Type |
| --- | --- |
| index | <code>number</code> |

<a name="SymbolController+clickAnimStop"></a>

### symbolController.clickAnimStop()
Cancels the animation for all symbol grids.
Kills transition by adding a className (transitionKill)

**Kind**: instance method of <code>[SymbolController](#SymbolController)</code>  
<a name="SymbolController+clickWord"></a>

### symbolController.clickWord(wordObj)
Pushes the symbol object to current phrase
Sends word's string to device's TTS Service.

**Kind**: instance method of <code>[SymbolController](#SymbolController)</code>  

| Param | Type |
| --- | --- |
| wordObj | <code>Object</code> |

<a name="SymbolController.SymbolController"></a>

### SymbolController.SymbolController
**Kind**: static class of <code>[SymbolController](#SymbolController)</code>  
<a name="new_SymbolController.SymbolController_new"></a>

#### new SymbolController($scope, $http, $timeout, $global, EventManager, TTSManager)
Creates an instance of SymbolController.


| Param | Type |
| --- | --- |
| $scope | <code>any</code> |
| $http | <code>any</code> |
| $timeout | <code>any</code> |
| $global | <code>any</code> |
| EventManager | <code>[EventManager](#EventManager)</code> |
| TTSManager | <code>[TTSManager](#TTSManager)</code> |

<a name="EventManager"></a>

## EventManager
**Kind**: global class  
**Export**:   
<a name="new_EventManager_new"></a>

### new EventManager()
EventManager handles all events

<a name="LSManager"></a>

## LSManager
**Kind**: global class  
**Export**:   
<a name="new_LSManager_new"></a>

### new LSManager()
LSManager handles actions with localstorage utility
 The recent phrase history is stored in the localstorage utility of HTML5
 This service contains an interface for modules to interact with localstorage.

<a name="TTSManager"></a>

## TTSManager
**Kind**: global class  
**Export**:   
<a name="new_TTSManager_new"></a>

### new TTSManager()
TTSManager handles tts actions

<a name="ResponsiveVoiceDriver"></a>

## ResponsiveVoiceDriver
**Kind**: global class  
**Export**:   
<a name="new_ResponsiveVoiceDriver_new"></a>

### new ResponsiveVoiceDriver()
Dummy voice driver for development, using responsivevoice.com api.

<a name="returnTime"></a>

## returnTime() ⇒ <code>number</code>
Get unix time

**Kind**: global function  
<a name="updateCurrentPhraseScroll"></a>

## updateCurrentPhraseScroll()
Updates the current phrase's scroll amount
called after a new word pushed to current phrase

**Kind**: global function  
<a name="capitalize"></a>

## capitalize(str) ⇒ <code>string</code>
capitalize first letter

**Kind**: global function  

| Param | Type |
| --- | --- |
| str | <code>string</code> |

<a name="deviceType"></a>

## deviceType(w, h) ⇒ <code>string</code>
Find the device the types

**Kind**: global function  
**Returns**: <code>string</code> - the device types which can be 'phone' or 'tablet'  

| Param | Type | Description |
| --- | --- | --- |
| w | <code>number</code> | Width |
| h | <code>number</code> | Height |

<a name="appPhrase"></a>

## appPhrase(currentPhrase)
Custom Event: Sends submitted current phrase as string with white spaces (word1 word2 word3 ...).

**Kind**: global function  

| Param | Type |
| --- | --- |
| currentPhrase | <code>string</code> |

<a name="appInterval"></a>

## appInterval(timeInterval)
Custom Event: Sends the time interval changes in the recent tab

**Kind**: global function  

| Param | Type |
| --- | --- |
| timeInterval | <code>number</code> |

<a name="appDerive"></a>

## appDerive(derived)
Custom Event: Sends the derivable word when user holds on one.

**Kind**: global function  

| Param | Type |
| --- | --- |
| derived | <code>string</code> |

<a name="appWord"></a>

## appWord(word, x, y)
Custom Event: Sends a word that added to current pharase list

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| word | <code>string</code> | the word |
| x | <code>number</code> | grid height |
| y | <code>number</code> | grid width |

<a name="getHistoryAsArray"></a>

## getHistoryAsArray() ⇒ <code>array</code>
Returns the phrase history as an array

**Kind**: global function  
**Returns**: <code>array</code> - lastPhrases  
<a name="updateHistoryAsString"></a>

## updateHistoryAsString(json)
Updates the history object with given

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| json | <code>string</code> | string of the history |

<a name="addPhrase2History"></a>

## addPhrase2History(array)
Adds a phrase (array of word objects) to the history

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>array</code> | of word objects |

<a name="speak"></a>

## speak(text2Speak)
speak

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| text2Speak | <code>string</code> | the text to speak |
