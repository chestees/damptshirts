function getOn() {
	$(this).height($(this).height() + 10);
	$('.top_tags', $(this)).css('display', 'block');
}
function getOff() {
	$(this).height($(this).height() - 10);
	$('.top_tags', $(this)).css('display', 'none');
}

$(function () {
	$("#ThumbsDown").on('click', function () {
		var intDiggID = $(this).attr('name');
		var intThumb = -1;
		Thumbs(intDiggID, intThumb);
	});
	$('#ThumbsUp').on('click', function () {
		var intDiggID = $(this).attr('name');
		var intThumb = 1;
		Thumbs(intDiggID, intThumb);
	});
	function Thumbs(intDiggID, intThumb) {
		$.ajax({
			url: "/thumbs.aspx",
			data: "DiggID=" + intDiggID + "&Thumb=" + intThumb,
			success: function (Response) {
				var mySplitResponse = Response.split(",");
				intDiggID = mySplitResponse[0];
				intThumbs_New = mySplitResponse[1];
				$('#ThumbID_' + intDiggID).fadeOut('fast', function () {
					$('#ThumbID_' + intDiggID).addClass('PlusMinus');
					if (parseFloat(intThumbs_New) > 0) {
						$('#ThumbID_' + intDiggID).html('+' + intThumbs_New);
						$('#ThumbID_' + intDiggID).addClass('Positive');
					} else if (parseFloat(intThumbs_New) < 0) {
						$('#ThumbID_' + intDiggID).html('-' + intThumbs_New);
						$('#ThumbID_' + intDiggID).addClass('Negative');
					} else {
						$('#ThumbID_' + intDiggID).html(intThumbs_New);
					}
					$('#ThumbID_' + intDiggID).delay(500).fadeIn('fast');
				});
			}
		});
	}
	//SEARCH
	function mySearch() {
		if ($('#inpSearch').val() != "") {
			strSearch = $('#inpSearch').val();
		} else {
			strSearch = "Null";
		}
		if ('<%= varConst.cSiteName %>' == 'damptshirts') {
			window.location.replace('/<%= varConst.cSEODirectory%>/search/0/' + strSearch.replace(/ /g, "-") + '/');
		} else {
			window.location.replace('/' + strSearch.replace(/ /g, "-") + '/search/0/');
		}
	}
	$("#inpSearch").keyup(function (event) {
		if (event.keyCode == 13) {
			mySearch();
		}
	});
	$('#btnSearch').click(function () {
		mySearch();
	});

	$('.cog').hoverIntent(getOn, getOff);
});