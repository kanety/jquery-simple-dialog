# jquery-simple-dialog

A jquery plugin for simple dialog.

## Dependencies

* jquery

## Installation

Install from npm:

    $ npm install @kanety/jquery-simple-dialog --save

## Usage

Build html as follows:

```html
<div id="content">
  <div id="drag">Dialog Title</div>
  <div>content</div>
  <div>content</div>
  <hr>
  <div>
    <button type="button" id="ok">OK</button>
    <button type="button" id="cancel">Cancel</button>
  </div>
</div>
<button type="button" id="open">Open</button>
```

Then run:

```javascript
$('#content').simpleDialog({
  opener: '#open',
  closer: '#ok,#cancel'
});
```

### Options

Draggable dialog:

```javascript
$('#content').simpleDialog({
  dragger: '#drag'
});
```

Modal dialog:

```javascript
$('#content').simpleDialog({
  modal: true
});
```

Focus elements when dialog is opened:

```javascript
$('#content').simpleDialog({
  focus: '#ok'
});
```

### Callbacks

Run callbacks when a dialog is opened or closed:

```javascript
$('#content').simpleDialog({
  ...
}).on('dialog:open', function(e, $handler) {
  console.log("opened by " + $handler.attr('id'));
}).on('dialog:close', function(e, $handler) {
  console.log("closed by " + $handler.attr('id'));
});
```

## License

The library is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
