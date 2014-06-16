#HomeNote.js - a simple jQuery mortgage calculator

 * Allows calculations on both total months or total years in term
 * Down payment may be provided in either a percentage or lump sum payment (dollar amount)
 
 ![Screenshot](https://raw.githubusercontent.com/kylephillips/homenote/master/example/images/screenshot.png)


##How to use
Include jQuery and homenote.js in your layout and target the container the form will appear in with homenote().


```javascript
<script src="path/to/jquery.min.js"></script>
<script src="path/to/jquery.homenote.min.js"></script>
$(function(){
  $('#div').homenote();
});
```


###Pass it some options:
| Options       | Type           | Default  |  Description
| ------------- |:-------------:| -----|:---------:
| currencysym      | string | $ | Currency symbol used in form
| currency      | string      |   Dollars | Currency used in form (Dollars/Euros/etc)
| termtype | string      |    years | Default term type. ```years``` or ```months```
| term  |  string | 30 | Default loan term
| principal | string | $250,000 | Default purchase price
| dptype | string | percentage | Default down payment type ```percentage``` or ```lumpsum```
| dpamount | string | 20% | Default down payment amount
| rate | string | 6.5 | Default percentage rate
| resulttext | string | Your monthly payment: | Text describing the resulting calculation



### Styling the form

The generated html uses standard form classes from [bootstrap](https://getbootstrap.com).
