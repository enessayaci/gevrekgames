# autochange_text.js
A js script that changes the text of an element automatically and uses a fading animation to do so.

### The implementation is really simple.

```html
<!DOCTYPE html>

<html>
<body>
<!-- the element that is going to be changed needs to have the id 'changing' -->
<p id='changing'></p>

<!-- jquery needed -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

<!-- importing the script i wrote -->
<script src='https://cdn.rawgit.com/abartzos/autochange_text.js/master/autochange_text.js'></script>

<!-- using the script, with the list below, the default duration is 3 and it is a minimum
because anything lower than that is too fast for the animation -->
<script>
    startChangingText(['lorem', 'ipsum', 'dolor', 'sit','amet'], 3)
</script>

</body>
</html>
```

And that's it! Just remember to put the scripts at the very bottom of your <body> and read the comments before you start customizing it.
