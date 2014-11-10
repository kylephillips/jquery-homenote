;(function($){
	$.fn.homenote = function(options){

		var settings = $.extend({
			currencysym : '$',
			currency : 'Dollars',
			termtype : "years", // years or months
			term : "30",
			principal : "250,000",
			dptype : 'percentage', // percentage or downlump
			dpamount : '20%',
			rate : '6.5',
			resulttext : 'Your monthly payment:'
		}, options );
		options = $.extend(settings, options);

		// Change the term type between years and months
		$(document).on('change', 'input[name="termtype"]', function(){
			settings.termtype = $(this).val();
			$('#term').val( convertTermLength() );
		});

		// Change the down type between lump sum and percentage
		$(document).on('change', 'input[name="dptype"]', function(){
			settings.dptype = $(this).val();
			$('#dpamount').val( convertDownPayment() );
		});

		// Perform the calculation
		$(document).on('click', '#calchomenote', function(e){
			e.preventDefault();
			$('#results').hide()
				.html(settings.resulttext + ' <strong>' + settings.currencysym + calculate() + '</strong>')
				.show();
		});

		/**
		* Converts down between percentate and lump sum 
		*/
		function convertDownPayment()
		{
			var total = $('#purchasePrice').val().replace(/[^0-9\.]/g, '');
			var amount = $('#dpamount').val().replace(/[^0-9\.]/g, '');

			if ( settings.dptype === 'percentage' ){
				return (amount / total) * 100 + '%';
			} else {
				var perc = amount / 100;
				return total * perc;
			}
		}

		/**
		* Converts term between years and months
		*/
		function convertTermLength()
		{
			var term = $('#term').val();
			return ( $('input:radio[name="termtype"]:checked').val() === 'months' ) ? term * 12 : term / 12;
		}

		/**
		* Returns total left on loan
		*/
		function amountLeft()
		{
			// Determine amount left on loan
			var type = $('input:radio[name="dptype"]:checked').val();
			var total = $('#purchasePrice').val().replace(/[^0-9\.]/g, '');
			var down = $('#dpamount').val().replace(/[^0-9\.]/g, '');
			
			if ( type === 'percentage' ){
				var percentage =  down / 100;
				return total - (total * percentage);
			} else {
				return total - down;
			}
		}

		/**
		* Returns number of payments left
		*/
		function paymentsLeft()
		{
			var term = $('#term').val();
			return ( $('input:radio[name="termtype"]:checked').val() === 'months' ) ? term : term * 12;
		}


		function calculate()
		{
			// Standard Mortgage Formula:
			// M = P[i(1+i)n] / [(1+i)n - 1]
			// x = (1+i)n

			var P = amountLeft();
			var i = ($('#rate').val().replace(/[^0-9\.]/g, '') / 100) / 12;
			var n = paymentsLeft();
			var x = Math.pow((1 + i ), n);
			var M = ( P * ((i * x) / (x - 1)) ).toFixed(2);
			return M;
		}


		function returnOutput()
		{
			// form to output
			var out = "<form id='homenote' role='form' class='well'>";

			// Purchase Price
			out += "<div class='form-group'><label for='purchasePrice'>Purchase Price (" + settings.currencysym + ")</label>";
			out += "<input type='text' class='form-control' id='purchasePrice' value='" + settings.principal + "'></div></hr>";

			// Down Payment
			out += "<div class='form-group'><label for='downPayment'>Down Payment</label><input type='text' class='form-control' id='dpamount' value='" + settings.dpamount + "'></div>";

			// Down Payment Type - Percentage
			out += "<label class='radio-inline'><input type='radio' name='dptype' id='downpercentage' value='percentage'";
			if ( settings.dptype === 'percentage' ){ out += ' checked'; }
			out += ">Percent (%)</label>";

			// Down Payment Type - Lump Sum
			out += "<label class='radio-inline'><input type='radio' name='dptype' id='downlump' value='downlump'";
			if ( settings.dptype === 'downlump' ){ out += " checked"; }
			out += ">" + settings.currency + " (" + settings.currencysym + ")</label><hr>";

			// Rate
			out += "<div class='form-group'><label for='rate'>Rate (%)</label><input type='text' class='form-control' id='rate' value='" + settings.rate + "'></div><hr>";

			// Term
			out += "<div class='form-group'><label for='rate'>Term</label><input type='text' class='form-control' id='term' value='" + settings.term + "'></div>";

			// Term in Years
			out += "<label class='radio-inline'><input type='radio' name='termtype' id='years' value='years' ";
			if ( settings.termtype === 'years' ){ out += 'checked'; }
			out += ">Years</label>";

			// Term in Months
			out += "<label class='radio-inline'><input type='radio' name='termtype' id='months' value='months'";
			if ( settings.termtype === 'months' ){ out += 'checked'; }
			out += ">Months</label><hr>";

			// Resultss
			out += "<div class='alert alert-success' style='display:none;' id='results'></div>";
			
			// Submit Button
			out += "<button type='submit' class='btn btn-primary btn-block' id='calchomenote'>Calculate</button></form>";

			return out;
		}

		$(this).html(returnOutput());
		
	};

}(jQuery));