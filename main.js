(function(){
    var TxtRotate = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
      };

      TxtRotate.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
          this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
          this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

        var that = this;
        var delta = 300 - Math.random() * 100;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
          delta = this.period;
          this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
          this.isDeleting = false;
          this.loopNum++;
          delta = 500;
        }

        setTimeout(function() {
          that.tick();
        }, delta);
      };

      window.onload = function() {
        var elements = document.getElementsByClassName('txt-rotate');
        for (var i=0; i<elements.length; i++) {
          var toRotate = elements[i].getAttribute('data-rotate');
          var period = elements[i].getAttribute('data-period');
          if (toRotate) {
            new TxtRotate(elements[i], JSON.parse(toRotate), period);
          }
        }
        // INJECT CSS
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #fff }";
        document.body.appendChild(css);
      };
  })();

$(window).scroll(function (event) {
	var scroll = $(window).scrollTop();
	if(scroll > 100 && window.matchMedia('(min-width: 1200px)').matches){
		if(! $("#websiteHeaderLogo").hasClass("smallNav")){
			$("#websiteHeaderLogo").addClass("smallNav");
			$("#websiteHeaderLogo").animate({"height": "1.4em"}, { duration: 400, queue: false });
			$(".navbar-right > li").animate({"padding": "0px"}, { duration: 400, queue: false });
			$("#websiteNavbar").animate({"min-height": "56px"}, { duration: 400, queue: false });
			console.log("header shrink");
		}
	}
	else if(scroll < 120 && window.matchMedia('(min-width: 1200px)').matches){
		if($("#websiteHeaderLogo").hasClass("smallNav")){
			$("#websiteHeaderLogo").removeClass("smallNav");
			$("#websiteNavbar").animate({"min-height": "80px"}, { duration: 200, queue: false });
			$(".navbar-right > li").animate({"padding": "0.9em 0.1em"}, { duration: 200, queue: false });
			$("#websiteHeaderLogo").animate({"height": "2.4em"}, { duration: 400, queue: false });
			console.log("header expand");
		}
	}
});
$(document).ready(function(){
  $('#startThread').on('click',function(){
    $('#startThread').on('click',function(){
      $.ajax({
          type: "GET",
          cache: false,
          url: "/dashboard/documentation/start_update",
          success: function(data) {
              console.log(data.ids)
              $('#startThread').addClass("dashboard-button-isdisabled")
              $('#thread_msg').text("Updating doc. Please wait, it can take few minutes (4-5min)...")
              var i = 0;
              var threadInterval = setInterval(function(){
                  checkTask("/dashboard/documentation/check_update/" + data.ids, function(check){
                      if(check.is_done){
                          $('#startThread').removeClass("dashboard-button-isdisabled")
                          $('#thread_msg').text('')
                          window.clearInterval(threadInterval)
                      }
                      if(++i === 1000){
                          $('#startThread').removeClass("dashboard-button-isdisabled")
                          $('#thread_msg').text('Update failed. Please restart.')
                          window.clearInterval(threadInterval)
                      }
                  })
              },1000)
          }
      })
  })
  function checkTask(url,cb){
      $.ajax({
          type: "GET",
          cache: false,
          url: url,
          dataType: "json",
          success: function(data) {
              cb(data)
          }
      })
  }

  })
})

